/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 * 
 * Originally from:
 * https://github.com/zhukov/webogram
 * Copyright (C) 2014 Igor Zhukov <igor.beatle@gmail.com>
 * https://github.com/zhukov/webogram/blob/master/LICENSE
 */

import { MOUNT_CLASS_TO } from "../../config/debug";
import Modes from "../../config/modes";
import { CancellablePromise, deferredPromise } from "../../helpers/cancellablePromise";
import { notifyAll, notifySomeone } from "../../helpers/context";
import { getFileNameByLocation } from "../../helpers/fileName";
import { nextRandomInt } from "../../helpers/random";
import { InputFile, InputFileLocation, UploadFile } from "../../layer";
import CacheStorageController from "../cacheStorage";
import cryptoWorker from "../crypto/cryptoworker";
import FileManager from "../filemanager";
import { logger, LogTypes } from "../logger";
import apiManager from "./apiManager";
import { isWebpSupported } from "./mtproto.worker";

type Delayed = {
  offset: number, 
  writeFilePromise: CancellablePromise<unknown>, 
  writeFileDeferred: CancellablePromise<unknown>
};

export type DownloadOptions = {
  dcId: number, 
  location: InputFileLocation, 
  size?: number,
  fileName?: string,
  mimeType?: string,
  limitPart?: number,
  queueId?: number,
  onlyCache?: boolean,
};

type MyUploadFile = UploadFile.uploadFile;

const MAX_FILE_SAVE_SIZE = 20e6;

export class ApiFileManager {
  private cacheStorage = new CacheStorageController('cachedFiles');

  private cachedDownloadPromises: {
    [fileName: string]: CancellablePromise<Blob>
  } = {};

  private uploadPromises: {
    [fileName: string]: Set<CancellablePromise<InputFile>>
  } = {};

  private downloadPulls: {
    [dcId: string]: Array<{
      id: number,
      queueId: number,
      cb: () => Promise<MyUploadFile | void>,
      deferred: {
        resolve: (...args: any[]) => void,
        reject: (...args: any[]) => void
      },
      activeDelta: number
    }>
  } = {};
  private downloadActives: {[dcId: string]: number} = {};

  public webpConvertPromises: {[fileName: string]: CancellablePromise<Uint8Array>} = {};

  private log: ReturnType<typeof logger> = logger('AFM', LogTypes.Error | LogTypes.Log);
  private tempId = 0;
  private queueId = 0;
  private debug = Modes.debug;

  private downloadRequest(dcId: 'upload', id: number, cb: () => Promise<void>, activeDelta: number, queueId?: number): Promise<void>;
  private downloadRequest(dcId: number, id: number, cb: () => Promise<MyUploadFile>, activeDelta: number, queueId?: number): Promise<MyUploadFile>;
  private downloadRequest(dcId: number | string, id: number, cb: () => Promise<MyUploadFile | void>, activeDelta: number, queueId: number = 0) {
    if(this.downloadPulls[dcId] === undefined) {
      this.downloadPulls[dcId] = [];
      this.downloadActives[dcId] = 0;
    }

    const downloadPull = this.downloadPulls[dcId];

    const promise = new Promise<MyUploadFile | void>((resolve, reject) => {
      downloadPull.push({id, queueId, cb, deferred: {resolve, reject}, activeDelta});
    });

    setTimeout(() => {
      this.downloadCheck(dcId);
    }, 0);

    return promise;
  }

  private downloadCheck(dcId: string | number) {
    const downloadPull = this.downloadPulls[dcId];
    const downloadLimit = dcId === 'upload' ? 24 : 24;
    //const downloadLimit = Infinity;

    if(this.downloadActives[dcId] >= downloadLimit || !downloadPull || !downloadPull.length) {
      return false;
    }

    //const data = downloadPull.shift();
    const data = downloadPull.findAndSplice(d => d.queueId === 0) || downloadPull.findAndSplice(d => d.queueId === this.queueId) || downloadPull.shift();
    const activeDelta = data.activeDelta || 1;

    this.downloadActives[dcId] += activeDelta;

    data.cb()
    .then((result) => {
      this.downloadActives[dcId] -= activeDelta;
      this.downloadCheck(dcId);

      data.deferred.resolve(result);
    }, (error: Error) => {
      // @ts-ignore
      if(!error || !error.type || (error.type !== 'DOWNLOAD_CANCELED' && error.type !== 'UPLOAD_CANCELED')) {
        this.log.error('downloadCheck error:', error);
      }

      this.downloadActives[dcId] -= activeDelta;
      this.downloadCheck(dcId);

      data.deferred.reject(error);
    });
  }

  public setQueueId(queueId: number) {
    //this.log.error('setQueueId', queueId);
    this.queueId = queueId;
  }

  private getFileStorage() {
    return this.cacheStorage;
  }

  public cancelDownload(fileName: string) {
    const promises = (this.cachedDownloadPromises[fileName] ? [this.cachedDownloadPromises[fileName]] : []) || 
      (this.uploadPromises[fileName] ? Array.from(this.uploadPromises[fileName]) : []);
    let canceled = false;
    for(let i = 0, length = promises.length; i < length; ++i) {
      const promise = promises[i];
      if(promise && !promise.isRejected && !promise.isFulfilled) {
        promise.cancel();
        canceled = true;
      }
    }

    return canceled;
  }

  public requestFilePart(dcId: number, location: InputFileLocation, offset: number, limit: number, id = 0, queueId = 0, checkCancel?: () => void) {
    return this.downloadRequest(dcId, id, async() => {
      checkCancel && checkCancel();

      return apiManager.invokeApi('upload.getFile', {
        location,
        offset,
        limit
      } as any, {
        dcId,
        fileDownload: true
      }) as Promise<MyUploadFile>;
    }, this.getDelta(limit), queueId);
  }

  /* private convertBlobToBytes(blob: Blob) {
    return blob.arrayBuffer().then(buffer => new Uint8Array(buffer));
  } */

  private getDelta(bytes: number) {
    return bytes / 1024 / 128;
  }

  private getLimitPart(size: number): number {
    let bytes: number;

    bytes = 512;
    /* if(size < 1e6 || !size) bytes = 512;
    else if(size < 3e6) bytes = 256;
    else bytes = 128; */

    return bytes * 1024;
  }

  private uncompressTGS = (bytes: Uint8Array, fileName: string) => {
    //this.log('uncompressTGS', bytes, bytes.slice().buffer);
    // slice нужен потому что в uint8array - 5053 length, в arraybuffer - 5084
    return cryptoWorker.gzipUncompress<string>(bytes.slice().buffer, true);
  };

  private convertWebp = (bytes: Uint8Array, fileName: string) => {
    const convertPromise = deferredPromise<Uint8Array>();

    const task = {type: 'convertWebp', payload: {fileName, bytes}};
    notifySomeone(task);
    return this.webpConvertPromises[fileName] = convertPromise;
  };

  public downloadFile(options: DownloadOptions): CancellablePromise<Blob> {
    if(!FileManager.isAvailable()) {
      return Promise.reject({type: 'BROWSER_BLOB_NOT_SUPPORTED'});
    }

    const size = options.size ?? 0;
    const {dcId, location} = options;

    let process: ApiFileManager['uncompressTGS'] | ApiFileManager['convertWebp'];

    if(options.mimeType === 'image/webp' && !isWebpSupported()) {
      process = this.convertWebp;
      options.mimeType = 'image/png';
    } else if(options.mimeType === 'application/x-tgsticker') {
      process = this.uncompressTGS;
      options.mimeType = 'application/json';
    }

    const fileName = getFileNameByLocation(location, {fileName: options.fileName});
    const cachedPromise = this.cachedDownloadPromises[fileName];
    const fileStorage = this.getFileStorage();

    this.debug && this.log('downloadFile', fileName, size, location, options.mimeType);

    /* if(options.queueId) {
      this.log.error('downloadFile queueId:', fileName, options.queueId);
    } */

    if(cachedPromise) {
      //this.log('downloadFile cachedPromise');

      if(size) {
        return cachedPromise.then((blob: Blob) => {
          if(blob.size < size) {
            this.debug && this.log('downloadFile need to deleteFile, wrong size:', blob.size, size);

            return this.deleteFile(fileName).then(() => {
              return this.downloadFile(options);
            }).catch(() => {
              return this.downloadFile(options);
            });
          } else {
            return blob;
          }
        });
      } else {
        return cachedPromise;
      }
    }

    const deferred = deferredPromise<Blob>();
    const mimeType = options.mimeType || 'image/jpeg';

    let canceled = false;
    let resolved = false;
    let cacheFileWriter: ReturnType<typeof FileManager['getFakeFileWriter']>;
    let errorHandler = (error: any) => {
      delete this.cachedDownloadPromises[fileName];
      deferred.reject(error);
      errorHandler = () => {};

      if(cacheFileWriter && (!error || error.type !== 'DOWNLOAD_CANCELED')) {
        cacheFileWriter.truncate();
      }
    };

    const id = this.tempId++;

    fileStorage.getFile(fileName).then(async(blob: Blob) => {
      //this.log('maybe cached', fileName);
      //throw '';

      if(blob.size < size) {
        //this.log('downloadFile need to deleteFile 2, wrong size:', blob.size, size);
        await this.deleteFile(fileName);
        throw false;
      }

      deferred.resolve(blob);
    }).catch(() => {
      //this.log('not cached', fileName);
      const fileWriterPromise = fileStorage.getFileWriter(fileName, mimeType);

      fileWriterPromise.then((fileWriter) => {
        cacheFileWriter = fileWriter;
        const limit = options.limitPart || this.getLimitPart(size);
        let offset: number;
        let startOffset = 0;
        let writeFilePromise: CancellablePromise<unknown> = Promise.resolve(),
          writeFileDeferred: CancellablePromise<unknown>;
        //const maxRequests = 13107200 / limit; // * 100 Mb speed
        const maxRequests = Infinity;

        //console.error('maxRequests', maxRequests);

        const processDownloaded = async(bytes: Uint8Array, offset: number) => {
          if(process) {
            //const perf = performance.now();
            const processed = await process(bytes, fileName);
            //this.log('downloadFile process downloaded time', performance.now() - perf, mimeType, process);
            return processed;
          }
  
          return bytes;
        };

        const delayed: Delayed[] = [];
        offset = startOffset;
        do {
          ////this.log('offset:', startOffset);
          writeFileDeferred = deferredPromise<void>();
          delayed.push({offset, writeFilePromise, writeFileDeferred});
          writeFilePromise = writeFileDeferred;
          offset += limit;
        } while(offset < size);

        let done = 0;
        const superpuper = async() => {
          //if(!delayed.length) return;

          const {offset, writeFilePromise, writeFileDeferred} = delayed.shift();
          try {
            const result = await this.requestFilePart(dcId, location, offset, limit, id, options.queueId, checkCancel);

            const bytes: Uint8Array = result.bytes as any;

            if(delayed.length) {
              superpuper();
            }

            this.debug && this.log('downloadFile requestFilePart result:', fileName, result);
            const isFinal = offset + limit >= size || !bytes.byteLength;
            if(bytes.byteLength) {
              //done += limit;
              done += bytes.byteLength;

              //if(!isFinal) {
                ////this.log('deferred notify 2:', {done: offset + limit, total: size}, deferred);
                deferred.notify({done, offset, total: size});
              //}

              const processedResult = await processDownloaded(bytes, offset);
              checkCancel();

              await writeFilePromise;
              checkCancel();

              await FileManager.write(fileWriter, processedResult);
            }

            writeFileDeferred.resolve();

            if(isFinal) {
              resolved = true;

              deferred.resolve(fileWriter.finalize(size < MAX_FILE_SAVE_SIZE));
            }
          } catch(err) {
            errorHandler(err);
          }
        };

        for(let i = 0, length = Math.min(maxRequests, delayed.length); i < length; ++i) {
          superpuper();
        }
      }).catch((err) => {
        if(!['STORAGE_OFFLINE'].includes(err)) {
          this.log.error('saveFile error:', err);
        }
      });
    });

    const checkCancel = () => {
      if(canceled) {
        const error = new Error('Canceled');
        // @ts-ignore
        error.type = 'DOWNLOAD_CANCELED';
        throw error;
      }
    };

    deferred.cancel = () => {
      if(!canceled && !resolved) {
        canceled = true;
        delete this.cachedDownloadPromises[fileName];
        errorHandler({type: 'DOWNLOAD_CANCELED'});
      }
    };

    deferred.notify = (progress: {done: number, total: number, offset: number}) => {
      notifyAll({progress: {fileName, ...progress}});
    };

    this.cachedDownloadPromises[fileName] = deferred;

    deferred.finally(() => {
      delete this.cachedDownloadPromises[fileName];
    });

    return deferred;
  }

  private deleteFile(fileName: string) {
    //this.log('will delete file:', fileName);
    delete this.cachedDownloadPromises[fileName];
    return this.getFileStorage().delete(fileName);
  }

  public uploadFile({file, fileName}: {file: Blob | File, fileName: string}) {
    const fileSize = file.size, 
      isBigFile = fileSize >= 10485760;

    let canceled = false,
      resolved = false,
      doneParts = 0,
      partSize = 262144; // 256 Kb

    /* if(fileSize > (524288 * 3000)) {
      partSize = 1024 * 1024;
      activeDelta = 8;
    } else  */if(fileSize > 67108864) {
      partSize = 524288;
    } else if(fileSize < 102400) {
      partSize = 32768;
    }

    const activeDelta = this.getDelta(partSize);

    const totalParts = Math.ceil(fileSize / partSize);
    const fileId: [number, number] = [nextRandomInt(0xFFFFFFFF), nextRandomInt(0xFFFFFFFF)];

    let _part = 0;

    const resultInputFile: InputFile = {
      _: isBigFile ? 'inputFileBig' : 'inputFile',
      id: fileId as any,
      parts: totalParts,
      name: fileName,
      md5_checksum: ''
    };

    const deferredHelper: {
      resolve?: (input: typeof resultInputFile) => void,
      reject?: (error: any) => void,
      notify?: (details: {done: number, total: number}) => void
    } = {
      notify: (details: {done: number, total: number}) => {}
    };
    const deferred: CancellablePromise<typeof resultInputFile> = new Promise((resolve, reject) => {
      if(totalParts > 4000) {
        return reject({type: 'FILE_TOO_BIG'});
      }

      deferredHelper.resolve = resolve;
      deferredHelper.reject = reject;
    });
    Object.assign(deferred, deferredHelper);

    if(totalParts > 4000) {
      return deferred;
    }
    
    let errorHandler = (error: any) => {
      if(error?.type !== 'UPLOAD_CANCELED') {
        this.log.error('Up Error', error);
      }

      deferred.reject(error);
      canceled = true;
      errorHandler = () => {};
    };

    const method = isBigFile ? 'upload.saveBigFilePart' : 'upload.saveFilePart';

    const id = this.tempId++;

    /* setInterval(() => {
      console.log(file);
    }, 1e3); */

    const self = this;
    function* generator() {
      for(let offset = 0; offset < fileSize; offset += partSize) {
        const part = _part++; // 0, 1
        yield self.downloadRequest('upload', id, () => {
          return new Promise<void>((uploadResolve, uploadReject) => {
            const reader = new FileReader();
            const blob = file.slice(offset, offset + partSize);
    
            reader.onloadend = (e) => {
              if(canceled) {
                uploadReject({type: 'UPLOAD_CANCELED'});
                return;
              }
              
              if(e.target.readyState !== FileReader.DONE) {
                self.log.error('wrong readyState!');
                uploadReject({type: 'WRONG_READY_STATE'});
                return;
              }
  
              let buffer = e.target.result as ArrayBuffer;
              self.debug && self.log('Upload file part, isBig:', isBigFile, part, buffer.byteLength, new Uint8Array(buffer).length, new Uint8Array(buffer).slice().length);

              /* const u = new Uint8Array(buffer.byteLength);
              for(let i = 0; i < u.length; ++i) {
                //u[i] = Math.random() * 255 | 0;
                u[i] = 0;
              }
              buffer = u.buffer; */
  
              /* setTimeout(() => {
                doneParts++;
                uploadResolve();
  
                //////this.log('Progress', doneParts * partSize / fileSize);

                self.log('done part', part, doneParts);
  
                deferred.notify({done: doneParts * partSize, total: fileSize});
  
                if(doneParts >= totalParts) {
                  deferred.resolve(resultInputFile);
                  resolved = true;
                }
              }, 1250);
              return; */

              apiManager.invokeApi(method, {
                file_id: fileId,
                file_part: part,
                file_total_parts: totalParts,
                bytes: buffer/* new Uint8Array(buffer) */
              } as any, {
                //startMaxLength: partSize + 256,
                fileUpload: true
              }).then((result) => {
                doneParts++;
                uploadResolve();
  
                //////this.log('Progress', doneParts * partSize / fileSize);
  
                deferred.notify({done: doneParts * partSize, total: fileSize});
  
                if(doneParts >= totalParts) {
                  deferred.resolve(resultInputFile);
                  resolved = true;
                }
              }, errorHandler);
            };
    
            reader.readAsArrayBuffer(blob);
          });
        }, activeDelta).catch(errorHandler);
      }
    }

    const it = generator();
    const process = () => {
      if(canceled) return;
      const r = it.next();
      if(r.done || canceled) return;
      (r.value as Promise<void>).then(process);
    };

    const maxRequests = Infinity;
    //const maxRequests = 10;
    /* for(let i = 0; i < 10; ++i) {
      process();
    } */
    for(let i = 0, length = Math.min(maxRequests, totalParts); i < length; ++i) {
      process();
    }

    deferred.cancel = () => {
      //this.log('cancel upload', canceled, resolved);
      if(!canceled && !resolved) {
        canceled = true;
        errorHandler({type: 'UPLOAD_CANCELED'});
      }
    };

    deferred.notify = (progress: {done: number, total: number}) => {
      notifyAll({progress: {fileName, ...progress}});
    };

    deferred.finally(() => {
      set.delete(deferred);
      if(!set.size) {
        delete this.uploadPromises[fileName];
      }
    });

    const set = this.uploadPromises[fileName] ?? (this.uploadPromises[fileName] = new Set());
    set.add(deferred);
    return deferred;
  }
}

const apiFileManager = new ApiFileManager();
MOUNT_CLASS_TO.apiFileManager = apiFileManager;
export default apiFileManager;

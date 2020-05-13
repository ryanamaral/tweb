import appPhotosManager, { MTPhoto } from '../lib/appManagers/appPhotosManager';
//import CryptoWorker from '../lib/crypto/cryptoworker';
import apiManager from '../lib/mtproto/mtprotoworker';
import LottieLoader from '../lib/lottieLoader';
import appStickersManager from "../lib/appManagers/appStickersManager";
import appDocsManager from "../lib/appManagers/appDocsManager";
import { formatBytes } from "../lib/utils";
import ProgressivePreloader from './preloader';
import LazyLoadQueue from './lazyLoadQueue';
import apiFileManager from '../lib/mtproto/apiFileManager';
import appWebpManager from '../lib/appManagers/appWebpManager';
import VideoPlayer, { MediaProgressLine } from '../lib/mediaPlayer';
import { RichTextProcessor } from '../lib/richtextprocessor';
import { CancellablePromise } from '../lib/polyfill';
import { renderImageFromUrl } from './misc';
import appMessagesManager from '../lib/appManagers/appMessagesManager';
import { Layouter, RectPart } from './groupedLayout';
import { Poll, PollResults } from '../lib/appManagers/appPollsManager';
import PollElement from './poll';

export type MTDocument = {
  _: 'document' | 'documentEmpty',
  pFlags: any,
  flags: number,
  id: string,
  access_hash: string,
  file_reference: Uint8Array | number[],
  date: number,
  mime_type: string,
  size: number,
  thumbs: MTPhotoSize[],
  dc_id: number,
  attributes: any[],
  
  thumb?: MTPhotoSize,
  type?: string,
  h?: number,
  w?: number,
  file_name?: string,
  file?: File,
  duration?: number,
  downloaded?: boolean,
  url?: string,
  version?: any,

  audioTitle?: string,
  audioPerformer?: string,

  sticker?: boolean,
  stickerEmoji?: string,
  stickerEmojiRaw?: string,
  stickerSetInput?: any,

  animated?: boolean
};

export type MTPhotoSize = {
  _: string,
  w?: number,
  h?: number,
  size?: number,
  type?: string, // i, m, x, y, w by asc
  location?: any,
  bytes?: Uint8Array // if type == 'i'
};

export function wrapVideo({doc, container, message, boxWidth, boxHeight, withTail, isOut, middleware, lazyLoadQueue}: {
  doc: MTDocument, 
  container: HTMLDivElement, 
  message: any, 
  boxWidth: number, 
  boxHeight: number, 
  withTail?: boolean, 
  isOut?: boolean,
  middleware: () => boolean,
  lazyLoadQueue: LazyLoadQueue
}) {
  let img: HTMLImageElement | SVGImageElement;

  if(withTail) {
    img = wrapMediaWithTail(doc, message, container, boxWidth, boxHeight, isOut);
  } else if(!boxWidth && !boxHeight) { // album
    let sizes = doc.thumbs;
    if(!doc.downloaded && sizes && sizes[0].bytes) {
      appPhotosManager.setAttachmentPreview(sizes[0].bytes, container, false);
    }

    img = container.firstElementChild as HTMLImageElement || new Image();

    if(!container.contains(img)) {
      container.append(img);
    }
  } else {
    if(!container.firstElementChild || (container.firstElementChild.tagName != 'IMG' && container.firstElementChild.tagName != 'VIDEO')) {
      let size = appPhotosManager.setAttachmentSize(doc, container, boxWidth, boxHeight);
    }
    
    img = container.firstElementChild as HTMLImageElement || new Image();
    
    if(!container.contains(img)) {
      container.append(img);
    }
  }

  let video = document.createElement('video');
  if(withTail) {
    let foreignObject = document.createElementNS("http://www.w3.org/2000/svg", 'foreignObject');
    let width = img.getAttributeNS(null, 'width');
    let height = img.getAttributeNS(null, 'height');
    foreignObject.setAttributeNS(null, 'width', width);
    foreignObject.setAttributeNS(null, 'height', height);
    video.width = +width;
    video.height = +height;
    foreignObject.append(video);
    img.parentElement.append(foreignObject);
  }

  let source = document.createElement('source');
  video.append(source);

  let span: HTMLSpanElement;
  if(doc.type != 'round') {
    span = document.createElement('span');
    span.classList.add('video-time');
    container.append(span);

    if(doc.type != 'gif') {
      span.innerText = (doc.duration + '').toHHMMSS(false);

      let spanPlay = document.createElement('span');
      spanPlay.classList.add('video-play', 'tgico-largeplay', 'btn-circle', 'position-center');
      container.append(spanPlay);
    } else {
      span.innerText = 'GIF';
    }
  }
  
  let loadVideo = () => {
    let promise = appDocsManager.downloadDoc(doc);

    if(message.media.preloader) { // means upload
      message.media.preloader.attach(container);
    } else if(!doc.downloaded) {
      let preloader = new ProgressivePreloader(container, true);
      preloader.attach(container, true, promise);
    }
    
    return promise.then(blob => {
      if(middleware && !middleware()) {
        return;
      }

      //return;
      
      //console.log('loaded doc:', doc, doc.url, blob, container);
      
      renderImageFromUrl(source, doc.url);
      source.type = doc.mime_type;
      video.append(source);

      if(!withTail) {
        if(img && container.contains(img)) {
          container.removeChild(img);
        }

        container.append(video);
      }
      
      if(doc.type == 'gif') {
        video.autoplay = true;
        video.loop = true;
      } else if(doc.type == 'round') {
        //video.dataset.ckin = doc.type == 'round' ? 'circle' : 'default';
        video.dataset.ckin = 'circle';
        video.dataset.overlay = '1';
        let player = new VideoPlayer(video/* , doc.type != 'round' */);
      }
    });
  };

  if(doc.size >= 20e6 && !doc.downloaded) {
    let downloadDiv = document.createElement('div');
    downloadDiv.classList.add('download');

    let span = document.createElement('span');
    span.classList.add('btn-circle', 'tgico-download');
    downloadDiv.append(span);

    downloadDiv.addEventListener('click', () => {
      downloadDiv.remove();
      loadVideo();
    });

    container.prepend(downloadDiv);

    return;
  }
  
  return doc.downloaded ? loadVideo() : lazyLoadQueue.push({div: container, load: loadVideo, wasSeen: true});
}

let formatDate = (timestamp: number) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const date = new Date(timestamp * 1000);
  
  return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear() 
  + ' at ' + date.getHours() + ':' + ('0' + date.getMinutes()).slice(-2);
};

export function wrapDocument(doc: MTDocument, withTime = false, uploading = false): HTMLDivElement {
  if(doc.type == 'voice') {
    return wrapVoiceMessage(doc, withTime);
  } else if(doc.type == 'audio') {
    return wrapAudio(doc, withTime);
  }

  let extSplitted = doc.file_name ? doc.file_name.split('.') : '';
  let ext = '';
  ext = extSplitted.length > 1 && Array.isArray(extSplitted) ? extSplitted.pop().toLowerCase() : 'file';

  let docDiv = document.createElement('div');
  docDiv.classList.add('document', `ext-${ext}`);
  
  let ext2 = ext;
  if(doc.type == 'photo') {
    docDiv.classList.add('photo');
    ext2 = `<img src="${URL.createObjectURL(doc.file)}">`;
  }
  
  let fileName = doc.file_name || 'Unknown.file';
  let size = formatBytes(doc.size);
  
  if(withTime) {
    size += ' · ' + formatDate(doc.date);
  }
  
  docDiv.innerHTML = `
  <div class="document-ico">${ext2}</div>
  ${!uploading ? `<div class="document-download"><div class="tgico-download"></div></div>` : ''}
  <div class="document-name">${fileName}</div>
  <div class="document-size">${size}</div>
  `;
  
  if(!uploading) {
    let downloadDiv = docDiv.querySelector('.document-download') as HTMLDivElement;
    let preloader: ProgressivePreloader;
    let promise: CancellablePromise<Blob>;
    
    docDiv.addEventListener('click', () => {
      if(!promise) {
        if(downloadDiv.classList.contains('downloading')) {
          return; // means not ready yet
        }
        
        if(!preloader) {
          preloader = new ProgressivePreloader(null, true);
        }
        
        appDocsManager.saveDocFile(doc.id).then(res => {
          promise = res.promise;
          
          preloader.attach(downloadDiv, true, promise);
          
          promise.then(() => {
            downloadDiv.classList.remove('downloading');
            downloadDiv.remove();
          });
        })
        
        downloadDiv.classList.add('downloading');
      } else {
        downloadDiv.classList.remove('downloading');
        promise = null;
      }
    });
  }
  
  return docDiv;
}

export function wrapAudio(doc: MTDocument, withTime = false): HTMLDivElement {
  let div = document.createElement('div');
  div.classList.add('audio');
  
  console.log('wrapAudio doc:', doc);
  
  let durationStr = String(doc.duration | 0).toHHMMSS(true);
  let title = doc.audioTitle || doc.file_name;
  let subtitle = doc.audioPerformer ? RichTextProcessor.wrapPlainText(doc.audioPerformer) : '';
  /* let durationStr = '3:24';
  let title = 'Million Telegrams';
  let subtitle = 'Best Artist'; */

  if(withTime) {
    subtitle += (subtitle ? ' · ' : '') + formatDate(doc.date);
  } else if(!subtitle) {
    subtitle = 'Unknown Artist';
  }
  
  div.innerHTML = `
  <div class="audio-download"><div class="tgico-download"></div></div>
  <div class="audio-toggle audio-ico tgico-largeplay"></div>
  <div class="audio-details">
    <div class="audio-title">${title}</div>
    <div class="audio-subtitle">${subtitle}</div>
    <div class="audio-time">${durationStr}</div>
  </div>
  `;

  /* if(!subtitle) {
    div.classList.add('audio-no-subtitle');
  } */
  
  //////console.log('wrapping audio', doc, doc.attributes[0].waveform);
  
  let timeDiv = div.lastElementChild as HTMLDivElement;
  
  let downloadDiv = div.querySelector('.audio-download') as HTMLDivElement;
  let preloader: ProgressivePreloader;
  let promise: CancellablePromise<Blob>;
  let progress: MediaProgressLine;

  let onClick = () => {
    if(!promise) {
      if(!preloader) {
        preloader = new ProgressivePreloader(null, true);
      }
      
      promise = appDocsManager.downloadDoc(doc.id);
      preloader.attach(downloadDiv, true, promise);
      
      promise.then(blob => {
        downloadDiv.classList.remove('downloading');
        downloadDiv.remove();
        
        let audio = document.createElement('audio');
        let source = document.createElement('source');
        source.src = doc.url;
        source.type = doc.mime_type;
        
        audio.volume = 1;

        progress = new MediaProgressLine(audio);
        
        div.removeEventListener('click', onClick);
        let toggle = div.querySelector('.audio-toggle') as HTMLDivElement;
        let subtitle = div.querySelector('.audio-subtitle') as HTMLDivElement;
        let launched = false;

        toggle.addEventListener('click', () => {
          if(!launched) {
            div.classList.add('audio-show-progress');
            launched = true;
          }

          subtitle.innerHTML = '';
          subtitle.append(progress.container);

          if(audio.paused) {
            if(lastAudioToggle && lastAudioToggle.classList.contains('tgico-largepause')) {
              lastAudioToggle.click();
            }
            
            audio.currentTime = 0;
            audio.play();
            
            lastAudioToggle = toggle;
            
            toggle.classList.remove('tgico-largeplay');
            toggle.classList.add('tgico-largepause');
          } else {
            audio.pause();
            toggle.classList.add('tgico-largeplay');
            toggle.classList.remove('tgico-largepause');
          }
        });
        
        audio.addEventListener('ended', () => {
          toggle.classList.add('tgico-largeplay');
          toggle.classList.remove('tgico-largepause');

          timeDiv.innerText = String(audio.currentTime | 0).toHHMMSS(true);
        });
        
        audio.style.display = 'none';
        audio.append(source);
        div.append(audio);
      });
      
      downloadDiv.classList.add('downloading');
    } else {
      downloadDiv.classList.remove('downloading');
      promise.cancel();
      promise = null;
    }
  };
  
  div.addEventListener('click', onClick);
  div.click();
  
  return div;
}

let lastAudioToggle: HTMLDivElement = null;
export function wrapVoiceMessage(doc: MTDocument, withTime = false): HTMLDivElement {
  let div = document.createElement('div');
  div.classList.add('audio', 'is-voice');
  
  let duration = doc.duration;
  
  let durationStr = String(duration | 0).toHHMMSS(true);
  
  div.innerHTML = `
  <div class="audio-toggle audio-ico tgico-largeplay"></div>
  <div class="audio-download"><div class="tgico-download"></div></div>
  <div class="audio-time">${durationStr}</div>
  `;
  
  //////console.log('wrapping audio', doc, doc.attributes[0].waveform);
  
  let timeDiv = div.lastElementChild as HTMLDivElement;
  
  let downloadDiv = div.querySelector('.audio-download') as HTMLDivElement;
  let preloader: ProgressivePreloader;
  let promise: CancellablePromise<Blob>;
  
  let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.classList.add('audio-waveform');
  svg.setAttributeNS(null, 'width', '190');
  svg.setAttributeNS(null, 'height', '23');
  svg.setAttributeNS(null, 'viewBox', '0 0 190 23');
  
  div.insertBefore(svg, div.lastElementChild);
  let wave = doc.attributes[0].waveform as Uint8Array;
  
  let index = 0;
  let skipped = 0;
  for(let uint8 of wave) {
    if (index > 0 && index % 4 == 0) {
      ++index;
      ++skipped;
      continue;
    }
    let percents = uint8 / 255;
    
    let height = 23 * percents;
    if(/* !height ||  */height < 2) {
      height = 2;
    }
    
    svg.insertAdjacentHTML('beforeend', `
    <rect x="${(index - skipped) * 4}" y="${23 - height}" width="2" height="${height}" rx="1" ry="1"></rect>
    `);
    
    ++index;
  }
  
  let progress = div.querySelector('.audio-waveform') as HTMLDivElement;
  
  let onClick = () => {
    if(!promise) {
      if(!preloader) {
        preloader = new ProgressivePreloader(null, true);
      }
      
      promise = appDocsManager.downloadDoc(doc.id);
      preloader.attach(downloadDiv, true, promise);
      
      promise.then(blob => {
        downloadDiv.classList.remove('downloading');
        downloadDiv.remove();
        
        let audio = document.createElement('audio');
        let source = document.createElement('source');
        source.src = doc.url;
        source.type = doc.mime_type;
        
        audio.volume = 1;
        
        div.removeEventListener('click', onClick);
        let toggle = div.querySelector('.audio-toggle') as HTMLDivElement;
        
        let interval = 0;
        let lastIndex = 0;
        
        toggle.addEventListener('click', () => {
          if(audio.paused) {
            if(lastAudioToggle && lastAudioToggle.classList.contains('tgico-largepause')) {
              lastAudioToggle.click();
            }
            
            audio.currentTime = 0;
            audio.play();
            
            lastAudioToggle = toggle;
            
            toggle.classList.remove('tgico-largeplay');
            toggle.classList.add('tgico-largepause');
            
            (Array.from(svg.children) as HTMLElement[]).forEach(node => node.classList.remove('active'));
            
            interval = setInterval(() => {
              if(lastIndex > svg.childElementCount || isNaN(audio.duration)) {
                clearInterval(interval);
                return;
              }

              timeDiv.innerText = String(audio.currentTime | 0).toHHMMSS(true);
              
              lastIndex = Math.round(audio.currentTime / audio.duration * 47);
              
              //svg.children[lastIndex].setAttributeNS(null, 'fill', '#000');
              //svg.children[lastIndex].classList.add('active'); #Иногда пропускает полоски..
              (Array.from(svg.children) as HTMLElement[]).slice(0,lastIndex+1).forEach(node => node.classList.add('active'));
              //++lastIndex;
              //console.log('lastIndex:', lastIndex, audio.currentTime);
              //}, duration * 1000 / svg.childElementCount | 0/* 63 * duration / 10 */);
            }, 20);
          } else {
            audio.pause();
            toggle.classList.add('tgico-largeplay');
            toggle.classList.remove('tgico-largepause');
            
            clearInterval(interval);
          }
        });
        
        audio.addEventListener('ended', () => {
          toggle.classList.add('tgico-largeplay');
          toggle.classList.remove('tgico-largepause');
          clearInterval(interval);
          (Array.from(svg.children) as HTMLElement[]).forEach(node => node.classList.remove('active'));
          
          timeDiv.innerText = String(audio.currentTime | 0).toHHMMSS(true);
        });
        
        let mousedown = false, mousemove = false;
        progress.addEventListener('mouseleave', (e) => {
          if(mousedown) {
            audio.play();
            mousedown = false;
          }
          mousemove = false;
        })
        progress.addEventListener('mousemove', (e) => {
          mousemove = true;
          if(mousedown) scrub(e, audio, progress);
        });
        progress.addEventListener('mousedown', (e) => {
          e.preventDefault();
          if(!audio.paused) {
            audio.pause();
            scrub(e, audio, progress);
            mousedown = true;
          }
        });
        progress.addEventListener('mouseup', (e) => {
          if (mousemove && mousedown) {
            audio.play();
            mousedown = false;
          }
        });
        progress.addEventListener('click', (e) => {
          if(!audio.paused) scrub(e, audio, progress);
        });
        
        function scrub(e: MouseEvent, audio: HTMLAudioElement, progress: HTMLDivElement) {
          let scrubTime = e.offsetX / 190 /* width */ * audio.duration;
          (Array.from(svg.children) as HTMLElement[]).forEach(node => node.classList.remove('active'));
          lastIndex = Math.round(scrubTime / audio.duration * 47);
          
          (Array.from(svg.children) as HTMLElement[]).slice(0,lastIndex+1).forEach(node => node.classList.add('active'));
          audio.currentTime = scrubTime;
        }
        
        audio.style.display = 'none';
        audio.append(source);
        div.append(audio);
      });
      
      downloadDiv.classList.add('downloading');
    } else {
      downloadDiv.classList.remove('downloading');
      promise.cancel();
      promise = null;
    }
  };
  
  div.addEventListener('click', onClick);
  div.click();
  
  return div;
}

function wrapMediaWithTail(photo: any, message: {mid: number, message: string}, container: HTMLDivElement, boxWidth: number, boxHeight: number, isOut: boolean) {
  let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.classList.add('bubble__media-container', isOut ? 'is-out' : 'is-in');

  let image = document.createElementNS("http://www.w3.org/2000/svg", "image");
  svg.append(image);
  
  let size = appPhotosManager.setAttachmentSize(photo._ == 'document' ? photo : photo.id, svg, boxWidth, boxHeight);
  
  let width = +svg.getAttributeNS(null, 'width');
  let height = +svg.getAttributeNS(null, 'height');

  let clipID = 'clip' + message.mid;
  svg.dataset.clipID = clipID;
  
  let defs = document.createElementNS("http://www.w3.org/2000/svg", 'defs');
  let clipPathHTML: string = '';
  
  if(message.message) {
    //clipPathHTML += `<rect width="${width}" height="${height}"></rect>`;
  } else {
    if(isOut) {
      clipPathHTML += `
      <use href="#message-tail" transform="translate(${width - 2}, ${height}) scale(-1, -1)"></use>
      <path />
      `;
    } else {
      clipPathHTML += `
      <use href="#message-tail" transform="translate(2, ${height}) scale(1, -1)"></use>
      <path />
      `;
    }
  }

  defs.innerHTML = `<clipPath id="${clipID}">${clipPathHTML}</clipPath>`;
  
  svg.prepend(defs);
  container.appendChild(svg);

  return image;
}

export function wrapPhoto(photoID: string, message: any, container: HTMLDivElement, boxWidth = 380, boxHeight = 380, withTail = true, isOut = false, lazyLoadQueue: LazyLoadQueue, middleware: () => boolean, size: MTPhotoSize = null) {
  let photo = appPhotosManager.getPhoto(photoID);

  let image: SVGImageElement | HTMLImageElement;
  if(withTail) {
    image = wrapMediaWithTail(photo, message, container, boxWidth, boxHeight, isOut);
  } else if(size) { // album
    let sizes = photo.sizes;
    if(!photo.downloaded && sizes && sizes[0].bytes) {
      appPhotosManager.setAttachmentPreview(sizes[0].bytes, container, false);
    }

    image = container.firstElementChild as HTMLImageElement || new Image();

    if(!container.contains(image)) {
      container.appendChild(image);
    }
  } else if(boxWidth && boxHeight) { // means webpage's preview
    size = appPhotosManager.setAttachmentSize(photoID, container, boxWidth, boxHeight, false);
    
    image = container.firstElementChild as HTMLImageElement || new Image();
    
    if(!container.contains(image)) {
      container.appendChild(image);
    }
  }

  //console.log('wrapPhoto downloaded:', photo, photo.downloaded, container);

  // так нельзя делать, потому что может быть загружен неправильный размер картинки
  /* if(photo.downloaded && photo.url) {
    renderImageFromUrl(image, photo.url);
    return;
  } */

  let preloader: ProgressivePreloader;
  if(message.media.preloader) { // means upload
    message.media.preloader.attach(container);
  } else if(!photo.downloaded) {
    preloader = new ProgressivePreloader(container, false);
  }

  let load = () => {
    let promise = appPhotosManager.preloadPhoto(photoID, size);
    
    if(preloader) {
      preloader.attach(container, true, promise);
    }
    
    return promise.then(() => {
      if(middleware && !middleware()) return;

      renderImageFromUrl(image || container, photo.url);
    });
  };
  
  /////////console.log('wrapPhoto', load, container, image);
  
  return photo.downloaded ? load() : lazyLoadQueue.push({div: container, load: load, wasSeen: true});
}

export function wrapSticker(doc: MTDocument, div: HTMLDivElement, middleware?: () => boolean, lazyLoadQueue?: LazyLoadQueue, group?: string, canvas?: boolean, play = false, onlyThumb = false) {
  let stickerType = doc.mime_type == "application/x-tgsticker" ? 2 : (doc.mime_type == "image/webp" ? 1 : 0);

  if(stickerType == 2 && !LottieLoader.loaded) {
    LottieLoader.loadLottie();
  }
  
  if(!stickerType) {
    console.error('wrong doc for wrapSticker!', doc);
    return Promise.resolve();
  }
  
  //console.log('wrap sticker', doc, div, onlyThumb);
  
  if(doc.thumbs && !div.firstElementChild && (!doc.downloaded || stickerType == 2)) {
    let thumb = doc.thumbs[0];
    
    //console.log('wrap sticker', thumb, div);
    
    if(thumb.bytes) {
      apiFileManager.saveSmallFile(thumb.location, thumb.bytes);
      
      appPhotosManager.setAttachmentPreview(thumb.bytes, div, true);
      
      if(onlyThumb) return Promise.resolve();
    }
  }
  
  if(onlyThumb && doc.thumbs) {
    let thumb = doc.thumbs[0];
    
    let load = () => apiFileManager.downloadSmallFile({
      _: 'inputDocumentFileLocation',
      access_hash: doc.access_hash,
      file_reference: doc.file_reference,
      thumb_size: thumb.type,
      id: doc.id
    }, {dcID: doc.dc_id}).then(blob => {
      let img = new Image();
      
      appWebpManager.polyfillImage(img, blob);
      
      div.append(img);
      
      div.dataset.docID = doc.id;
      appStickersManager.saveSticker(doc);
    });
    
    return lazyLoadQueue ? (lazyLoadQueue.push({div, load}), Promise.resolve()) : load();
  }
  
  let downloaded = doc.downloaded;
  let load = () => appDocsManager.downloadDoc(doc.id).then(blob => {
    //console.log('loaded sticker:', blob, div);
    if(middleware && !middleware()) return;
    
    /* if(div.firstElementChild) {
      div.firstElementChild.remove();
    } */
    
    if(stickerType == 2) {
      const reader = new FileReader();
      
      reader.addEventListener('loadend', async(e) => {
        console.time('decompress sticker' + doc.id);
        console.time('render sticker' + doc.id);
        // @ts-ignore
        const text = e.srcElement.result;
        let json = await apiManager.gzipUncompress<string>(text, true);

        console.timeEnd('decompress sticker' + doc.id);
        
        let animation = await LottieLoader.loadAnimation({
          container: div,
          loop: false,
          autoplay: false,
          animationData: JSON.parse(json),
          renderer: canvas ? 'canvas' : 'svg'
        }, group);

        console.timeEnd('render sticker' + doc.id);

        if(div.firstElementChild && div.firstElementChild.tagName != 'CANVAS') {
          div.firstElementChild.remove();
        }
        
        if(!canvas) {
          div.addEventListener('mouseover', (e) => {
            let animation = LottieLoader.getAnimation(div, group);
            
            if(animation) {
              //console.log('sticker hover', animation, div);
              
              // @ts-ignore
              animation.loop = true;
              
              // @ts-ignore
              if(animation.currentFrame == animation.totalFrames - 1) {
                animation.goToAndPlay(0, true);
              } else {
                animation.play();
              }
              
              div.addEventListener('mouseout', () => {
                // @ts-ignore
                animation.loop = false;
              }, {once: true});
            }
          });
        } /* else {
          let canvas = div.firstElementChild as HTMLCanvasElement;
          if(!canvas.width && !canvas.height) {
            console.log('Need lottie resize');
            
            // @ts-ignore
            animation.resize();
          }
        } */
        
        if(play) {
          animation.play();
        }
      });
      
      reader.readAsArrayBuffer(blob);
    } else if(stickerType == 1) {
      let img = new Image();

      if(!downloaded && (!div.firstElementChild || div.firstElementChild.tagName != 'IMG')) {
        img.style.opacity = '' + 0;

        img.onload = () => {
          window.requestAnimationFrame(() => {
            img.style.opacity = '';
          });
        };
      }

      if(!doc.url) {
        appWebpManager.polyfillImage(img, blob).then((url) => {
          doc.url = url;
          
          if(div.firstElementChild && div.firstElementChild != img) {
            div.firstElementChild.remove();
          }
        });
      } else {
        img.src = doc.url;
      }

      div.append(img);
    }
    
    div.dataset.docID = doc.id;
    appStickersManager.saveSticker(doc);
  });
  
  return lazyLoadQueue && (!doc.downloaded || stickerType == 2) ? (lazyLoadQueue.push({div, load, wasSeen: group == 'chat'}), Promise.resolve()) : load();
}

export function wrapReply(title: string, subtitle: string, message?: any) {
  let div = document.createElement('div');
  div.classList.add('reply');
  
  let replyBorder = document.createElement('div');
  replyBorder.classList.add('reply-border');
  
  let replyContent = document.createElement('div');
  replyContent.classList.add('reply-content');
  
  let replyTitle = document.createElement('div');
  replyTitle.classList.add('reply-title');
  
  let replySubtitle = document.createElement('div');
  replySubtitle.classList.add('reply-subtitle');
  
  replyTitle.innerHTML = title ? RichTextProcessor.wrapEmojiText(title) : '';
  
  let media = message && message.media;
  if(media) {
    replySubtitle.innerHTML = message.rReply;
    
    if(media.photo || (media.document && ['video'].indexOf(media.document.type) !== -1)) {
      let replyMedia = document.createElement('div');
      replyMedia.classList.add('reply-media');
      
      let photo = media.photo || media.document;
      
      let sizes = photo.sizes || photo.thumbs;
      if(sizes && sizes[0].bytes) {
        appPhotosManager.setAttachmentPreview(sizes[0].bytes, replyMedia, false, true);
      }
      
      appPhotosManager.preloadPhoto(photo, appPhotosManager.choosePhotoSize(photo, 32, 32))
      .then(blob => {
        renderImageFromUrl(replyMedia, photo._ == 'photo' ? photo.url : URL.createObjectURL(blob));
      });
      
      replyContent.append(replyMedia);
      div.classList.add('is-reply-media');
    }
  } else {
    replySubtitle.innerHTML = subtitle ? RichTextProcessor.wrapEmojiText(subtitle) : '';
  }
  
  replyContent.append(replyTitle, replySubtitle);
  div.append(replyBorder, replyContent);
  
  /////////console.log('wrapReply', title, subtitle, media);
  
  return div;
}

export function wrapAlbum({groupID, attachmentDiv, middleware, uploading, lazyLoadQueue, isOut}: {
  groupID: string, 
  attachmentDiv: HTMLElement,
  middleware?: () => boolean,
  lazyLoadQueue?: LazyLoadQueue,
  uploading?: boolean,
  isOut: boolean
}) {
  let items: {size: MTPhotoSize, media: any, message: any}[] = [];

  // higher msgID will be the last in album
  let storage = appMessagesManager.groupedMessagesStorage[groupID];
  for(let mid in storage) {
    let m = appMessagesManager.getMessage(+mid);
    let media = m.media.photo || m.media.document;

    let size: any = media._ == 'photo' ? appPhotosManager.choosePhotoSize(media, 380, 380) : {w: media.w, h: media.h};
    items.push({size, media, message: m});
  }

  let spacing = 2;
  let layouter = new Layouter(items.map(i => ({w: i.size.w, h: i.size.h})), 451, 100, spacing);
  let layout = layouter.layout();
  console.log('layout:', layout, items.map(i => ({w: i.size.w, h: i.size.h})));

  /* let borderRadius = window.getComputedStyle(realParent).getPropertyValue('border-radius');
  let brSplitted = fillPropertyValue(borderRadius); */

  for(let {geometry, sides} of layout) {
    let item = items.shift();
    if(!item) {
      console.error('no item for layout!');
      continue;
    }

    let {size, media, message} = item;
    let div = document.createElement('div');
    div.classList.add('album-item');
    div.dataset.mid = message.mid;

    div.style.width = geometry.width + 'px';
    div.style.height = geometry.height + 'px';
    div.style.top = geometry.y + 'px';
    div.style.left = geometry.x + 'px';

    if(sides & RectPart.Right) {
      attachmentDiv.style.width = geometry.width + geometry.x + 'px';
    }

    if(sides & RectPart.Bottom) {
      attachmentDiv.style.height = geometry.height + geometry.y + 'px';
    }

    if(sides & RectPart.Left && sides & RectPart.Top) {
      div.style.borderTopLeftRadius = 'inherit';
    }

    if(sides & RectPart.Left && sides & RectPart.Bottom) {
      div.style.borderBottomLeftRadius = 'inherit';
    }

    if(sides & RectPart.Right && sides & RectPart.Top) {
      div.style.borderTopRightRadius = 'inherit';
    }

    if(sides & RectPart.Right && sides & RectPart.Bottom) {
      div.style.borderBottomRightRadius = 'inherit';
    }

    if(media._ == 'photo') {
      wrapPhoto(
        media.id,
        message,
        div,
        0,
        0,
        false,
        isOut,
        lazyLoadQueue,
        middleware,
        size
      );
    } else {
      wrapVideo({
        doc: message.media.document,
        container: div,
        message,
        boxWidth: 0,
        boxHeight: 0,
        withTail: false,
        isOut,
        lazyLoadQueue,
        middleware
      });
    }

    /* let load = () => appPhotosManager.preloadPhoto(media._ == 'photo' ? media.id : media, size)
    .then((blob) => {
      if(middleware && !middleware()) {
        console.warn('peer changed');
        return;
      }

      if(!uploading) {
        preloader.detach();
      }
      
      if(media && media.url) {
        renderImageFromUrl(div, media.url);
      } else {
        let url = URL.createObjectURL(blob);
        
        let img = new Image();
        img.src = url;
        img.onload = () => {
          div.style.backgroundImage = 'url(' + url + ')';
        };
      }
      
      //div.style.backgroundImage = 'url(' + url + ')';
    });

    load(); */

    // @ts-ignore
    //div.style.backgroundColor = '#' + Math.floor(Math.random() * (2 ** 24 - 1)).toString(16).padStart(6, '0');

    attachmentDiv.append(div);
  }
}

export function wrapPoll(pollID: string, mid: number) {
  let elem = new PollElement();
  elem.setAttribute('poll-id', pollID);
  elem.setAttribute('message-id', '' + mid);
  return elem;
}
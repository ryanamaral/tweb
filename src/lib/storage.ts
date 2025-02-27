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

import { Database } from "../config/databases";
import DATABASE_SESSION from "../config/databases/session";
import { CancellablePromise, deferredPromise } from "../helpers/cancellablePromise";
import { throttle } from "../helpers/schedulers";
import { WorkerTaskTemplate } from "../types";
import IDBStorage from "./idb";

function noop() {}

export interface LocalStorageProxySetTask extends WorkerTaskTemplate {
  type: 'localStorageProxy',
  payload: {
    type: 'set',
    keys: string[],
    values: any[]
  }
};

export interface LocalStorageProxyDeleteTask extends WorkerTaskTemplate {
  type: 'localStorageProxy',
  payload: {
    type: 'delete',
    keys: string[]
  }
};

export default class AppStorage<Storage extends Record<string, any>, T extends Database<any>/* Storage extends {[name: string]: any} *//* Storage extends Record<string, any> */> {
  private static STORAGES: AppStorage<any, Database<any>>[] = [];
  private storage: IDBStorage<T>;//new CacheStorageController('session');

  //private cache: Partial<{[key: string]: Storage[typeof key]}> = {};
  private cache: Partial<Storage> = {};
  private useStorage = true;

  private getPromises: Map<keyof Storage, CancellablePromise<Storage[keyof Storage]>> = new Map();
  private getThrottled: () => void;

  private keysToSet: Set<keyof Storage> = new Set();
  private saveThrottled: () => void;
  private saveDeferred = deferredPromise<void>();

  private keysToDelete: Set<keyof Storage> = new Set();
  private deleteThrottled: () => void;
  private deleteDeferred = deferredPromise<void>();

  constructor(private db: T, storeName: typeof db['stores'][number]['name']) {
    this.storage = new IDBStorage<T>(db, storeName);

    AppStorage.STORAGES.push(this);

    this.saveThrottled = throttle(async() => {
      const deferred = this.saveDeferred;
      this.saveDeferred = deferredPromise<void>();

      const set = this.keysToSet;
      if(set.size) {
        const keys = Array.from(set.values()) as string[];
        set.clear();

        try {
          //console.log('setItem: will set', key/* , value */);
          //await this.cacheStorage.delete(key); // * try to prevent memory leak in Chrome leading to 'Unexpected internal error.'
          //await this.storage.save(key, new Response(value, {headers: {'Content-Type': 'application/json'}}));

          const values = keys.map(key => this.cache[key]);
          if(db === DATABASE_SESSION && !('localStorage' in self)) { // * support legacy Webogram's localStorage
            self.postMessage({
              type: 'localStorageProxy', 
              payload: {
                type: 'set',
                keys,
                values
              }
            } as LocalStorageProxySetTask);
          }

          await this.storage.save(keys, values);
          //console.log('setItem: have set', key/* , value */);
        } catch(e) {
          //this.useCS = false;
          console.error('[AS]: set error:', e, keys/* , value */);
        }
      }

      deferred.resolve();

      if(set.size) {
        this.saveThrottled();
      }
    }, 16, false);

    this.deleteThrottled = throttle(async() => {
      const deferred = this.deleteDeferred;
      this.deleteDeferred = deferredPromise<void>();

      const set = this.keysToDelete;
      if(set.size) {
        const keys = Array.from(set.values()) as string[];
        set.clear();

        try {
          if(db === DATABASE_SESSION && !('localStorage' in self)) { // * support legacy Webogram's localStorage
            self.postMessage({
              type: 'localStorageProxy', 
              payload: {
                type: 'delete',
                keys
              }
            } as LocalStorageProxyDeleteTask);
          }

          await this.storage.delete(keys);
        } catch(e) {
          console.error('[AS]: delete error:', e, keys);
        }
      }

      deferred.resolve();

      if(set.size) {
        this.deleteThrottled();
      }
    }, 16, false);

    this.getThrottled = throttle(async() => {
      const keys = Array.from(this.getPromises.keys());

      this.storage.get(keys as string[]).then(values => {
        for(let i = 0, length = keys.length; i < length; ++i) {
          const key = keys[i];
          const deferred = this.getPromises.get(key);
          if(deferred) {
            // @ts-ignore
            deferred.resolve(this.cache[key] = values[i]);
            this.getPromises.delete(key);
          }
        }
      }, (error) => {
        if(!['NO_ENTRY_FOUND', 'STORAGE_OFFLINE'].includes(error)) {
          this.useStorage = false;
          console.error('[AS]: get error:', error, keys, storeName);
        }

        for(let i = 0, length = keys.length; i < length; ++i) {
          const key = keys[i];
          const deferred = this.getPromises.get(key);
          if(deferred) {
            //deferred.reject(error);
            deferred.resolve();
            this.getPromises.delete(key);
          }
        }
      }).finally(() => {
        if(this.getPromises.size) {
          this.getThrottled();
        }
      });
    }, 16, false);
  }

  public isAvailable() {
    return this.useStorage;
  }

  public getCache() {
    return this.cache;
  }

  public getFromCache<T extends keyof Storage>(key: T) {
    return this.cache[key];
  }

  public setToCache(key: keyof Storage, value: Storage[typeof key]) {
    return this.cache[key] = value;
  }

  public async get<T extends keyof Storage>(key: T, useCache = true): Promise<Storage[T]> {
    if(this.cache.hasOwnProperty(key) && useCache) {
      return this.getFromCache(key);
    } else if(this.useStorage) {
      const r = this.getPromises.get(key);
      if(r) return r as any;

      const p = deferredPromise<Storage[typeof key]>();
      this.getPromises.set(key, p);

      this.getThrottled();

      return p;
    }/*  else {
      throw 'something went wrong';
    } */
  }

  public getAll() {
    return this.storage.getAll().catch(() => []);
  }

  public set(obj: Partial<Storage>, onlyLocal = false) {
    //console.log('storageSetValue', obj, callback, arguments);

    for(const key in obj) {
      if(obj.hasOwnProperty(key)) {
        const value = obj[key];
        this.setToCache(key, value);

        // let perf = /* DEBUG */false ? performance.now() : 0;
        // value = JSON.stringify(value);

        // if(perf) {
        //   let elapsedTime = performance.now() - perf;
        //   if(elapsedTime > 10) {
        //     console.warn('LocalStorage set: stringify time by JSON.stringify:', elapsedTime, key);
        //   }
        // }
        
        /* perf = performance.now();
        value = stringify(value);
        console.log('LocalStorage set: stringify time by own stringify:', performance.now() - perf); */

        if(this.useStorage && !onlyLocal) {
          this.keysToSet.add(key);
          this.keysToDelete.delete(key);
          this.saveThrottled();
        }
      }
    }

    return this.useStorage ? this.saveDeferred : Promise.resolve();
  }

  public delete(key: keyof Storage, saveLocal = false) {
    /* if(!this.cache.hasOwnProperty(key)) {
      return;
    } */

    // ! it is needed here
    key = '' + key;

    if(!saveLocal) {
      delete this.cache[key];
    }
    
    if(this.useStorage) {
      this.keysToSet.delete(key);
      this.keysToDelete.add(key);
      this.deleteThrottled();
    }

    return this.useStorage ? this.deleteDeferred : Promise.resolve();
  }

  public clear() {
    return this.storage.deleteAll().catch(noop);
  }

  public static toggleStorage(enabled: boolean) {
    return Promise.all(this.STORAGES.map(storage => {
      storage.useStorage = enabled;
      
      if(!enabled) {
        storage.keysToSet.clear();
        storage.keysToDelete.clear();
        storage.getPromises.forEach((deferred) => deferred.resolve());
        storage.getPromises.clear();

        if(storage.db === DATABASE_SESSION && 'localStorage' in self) { // * support legacy Webogram's localStorage
          localStorage.clear();
        }

        return storage.clear();
      } else {
        if(storage.db === DATABASE_SESSION && 'localStorage' in self) { // * support legacy Webogram's localStorage
          for(const i in storage.cache) {
            if(storage.cache[i] !== undefined) {
              localStorage.setItem(i, JSON.stringify(storage.cache[i]));
            }
          }
        }

        return storage.set(storage.cache);
      }
    })).catch(noop);
  }

  public deleteDatabase() {
    return IDBStorage.deleteDatabase().catch(noop);
  }
}

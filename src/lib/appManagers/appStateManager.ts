/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

import type { Dialog } from './appMessagesManager';
import type { UserAuth } from '../mtproto/mtproto_config';
import type { User } from './appUsersManager';
import type { AuthState } from '../../types';
import type FiltersStorage from '../storages/filters';
import type DialogsStorage from '../storages/dialogs';
import EventListenerBase from '../../helpers/eventListenerBase';
import rootScope from '../rootScope';
import stateStorage from '../stateStorage';
import { logger } from '../logger';
import { copy, setDeepProperty, validateInitObject } from '../../helpers/object';
import App from '../../config/app';
import DEBUG, { MOUNT_CLASS_TO } from '../../config/debug';
import AppStorage from '../storage';
import { Chat } from '../../layer';
import { isMobile } from '../../helpers/userAgent';
import DATABASE_STATE from '../../config/databases/state';
import sessionStorage from '../sessionStorage';

const REFRESH_EVERY = 24 * 60 * 60 * 1000; // 1 day
const REFRESH_EVERY_WEEK = 24 * 60 * 60 * 1000 * 7; // 7 days
const STATE_VERSION = App.version;

export type Background = {
  type: 'color' | 'image' | 'default',
  blur: boolean,
  highlightningColor?: string,
  color?: string,
  slug?: string,
};

export type Theme = {
  name: 'day' | 'night' | 'system',
  background: Background
};

export type State = {
  allDialogsLoaded: DialogsStorage['allDialogsLoaded'],
  pinnedOrders: DialogsStorage['pinnedOrders'],
  contactsList: number[],
  updates: Partial<{
    seq: number,
    pts: number,
    date: number
  }>,
  filters: FiltersStorage['filters'],
  maxSeenMsgId: number,
  stateCreatedTime: number,
  recentEmoji: string[],
  topPeers: number[],
  recentSearch: number[],
  version: typeof STATE_VERSION,
  authState: AuthState,
  hiddenPinnedMessages: {[peerId: string]: number},
  settings: {
    messagesTextSize: number,
    sendShortcut: 'enter' | 'ctrlEnter',
    animationsEnabled: boolean,
    autoDownload: {
      contacts: boolean
      private: boolean
      groups: boolean
      channels: boolean
    },
    autoPlay: {
      gifs: boolean,
      videos: boolean
    },
    stickers: {
      suggest: boolean,
      loop: boolean
    },
    emoji: {
      suggest: boolean,
      big: boolean
    },
    background?: Background, // ! DEPRECATED
    themes: Theme[],
    theme: Theme['name'],
    notifications: {
      sound: boolean
    },
    nightTheme?: boolean, // ! DEPRECATED
  },
  keepSigned: boolean
};

export const STATE_INIT: State = {
  allDialogsLoaded: {},
  pinnedOrders: {},
  contactsList: [],
  updates: {},
  filters: {},
  maxSeenMsgId: 0,
  stateCreatedTime: Date.now(),
  recentEmoji: [],
  topPeers: [],
  recentSearch: [],
  version: STATE_VERSION,
  authState: {
    _: isMobile ? 'authStateSignIn' : 'authStateSignQr'
  },
  hiddenPinnedMessages: {},
  settings: {
    messagesTextSize: 16,
    sendShortcut: 'enter',
    animationsEnabled: true,
    autoDownload: {
      contacts: true,
      private: true,
      groups: true,
      channels: true
    },
    autoPlay: {
      gifs: true,
      videos: true
    },
    stickers: {
      suggest: true,
      loop: true
    },
    emoji: {
      suggest: true,
      big: true
    },
    themes: [{
      name: 'day',
      background: {
        type: 'image',
        blur: false,
        slug: 'ByxGo2lrMFAIAAAAmkJxZabh8eM', // * new blurred camomile,
        highlightningColor: 'hsla(85.5319, 36.9171%, 40.402%, 0.4)'
      }
    }, {
      name: 'night',
      background: {
        type: 'color',
        blur: false,
        color: '#0f0f0f',
        highlightningColor: 'hsla(0, 0%, 3.82353%, 0.4)'
      }
    }],
    theme: 'system',
    notifications: {
      sound: false
    }
  },
  keepSigned: true
};

const ALL_KEYS = Object.keys(STATE_INIT) as any as Array<keyof State>;

const REFRESH_KEYS = ['contactsList', 'stateCreatedTime',
  'maxSeenMsgId', 'filters', 'topPeers'] as any as Array<keyof State>;

const REFRESH_KEYS_WEEK = ['dialogs', 'allDialogsLoaded', 'updates', 'pinnedOrders'] as any as Array<keyof State>;

export class AppStateManager extends EventListenerBase<{
  save: (state: State) => Promise<void>,
  peerNeeded: (peerId: number) => void,
  peerUnneeded: (peerId: number) => void,
}> {
  public static STATE_INIT = STATE_INIT;
  private loaded: Promise<State>;
  private log = logger('STATE'/* , LogLevels.error */);

  private state: State;

  private neededPeers: Map<number, Set<string>> = new Map();
  private singlePeerMap: Map<string, number> = new Map();

  public storages = {
    users: new AppStorage<Record<number, User>, typeof DATABASE_STATE>(DATABASE_STATE, 'users'),
    chats: new AppStorage<Record<number, Chat>, typeof DATABASE_STATE>(DATABASE_STATE, 'chats'),
    dialogs: new AppStorage<Record<number, Dialog>, typeof DATABASE_STATE>(DATABASE_STATE, 'dialogs')
  };

  public storagesResults: {[key in keyof AppStateManager['storages']]: any[]} = {} as any;

  public storage = stateStorage;

  constructor() {
    super();
    this.loadSavedState();
  }

  public loadSavedState(): Promise<State> {
    if(this.loaded) return this.loaded;
    console.time('load state');
    this.loaded = new Promise((resolve) => {
      const storagesKeys = Object.keys(this.storages) as Array<keyof AppStateManager['storages']>;
      const storagesPromises: Promise<any>[] = storagesKeys.map(key => this.storages[key].getAll());

      const promises: Promise<any>[] = ALL_KEYS.map(key => stateStorage.get(key))
      .concat(sessionStorage.get('user_auth'))
      .concat(stateStorage.get('user_auth' as any)) // support old webk format
      .concat(storagesPromises);

      Promise.all(promises).then(async(arr) => {
        /* const self = this;
        const skipHandleKeys = new Set(['isProxy', 'filters', 'drafts']);
        const getHandler = (path?: string) => {
          return {
            get(target: any, key: any) {
              if(key === 'isProxy') {
                return true;
              }

              const prop = target[key];

              if(prop !== undefined && !skipHandleKeys.has(key) && !prop.isProxy && typeof(prop) === 'object') {
                target[key] = new Proxy(prop, getHandler(path || key));
                return target[key];
              }
              
              return prop;
            },
            set(target: any, key: any, value: any) {
              console.log('Setting', target, `.${key} to equal`, value, path);
          
              target[key] = value;

              // @ts-ignore
              self.pushToState(path || key, path ? self.state[path] : value, false);

              return true;
            }
          };
        }; */

        let state: State = this.state = {} as any;

        // ! then can't store false values
        for(let i = 0, length = ALL_KEYS.length; i < length; ++i) {
          const key = ALL_KEYS[i];
          const value = arr[i];
          if(value !== undefined) {
            // @ts-ignore
            state[key] = value;
          } else {
            this.pushToState(key, copy(STATE_INIT[key]));
          }
        }

        arr.splice(0, ALL_KEYS.length);

        // * Read auth
        let auth = arr.shift() as UserAuth | number;
        let shiftedWebKAuth = arr.shift() as UserAuth | number;
        if(!auth && shiftedWebKAuth) { // support old webk auth
          auth = shiftedWebKAuth;
          const keys: string[] = ['dc', 'server_time_offset', 'xt_instance'];
          for(let i = 1; i <= 5; ++i) {
            keys.push(`dc${i}_server_salt`);
            keys.push(`dc${i}_auth_key`);
          }

          const values = await Promise.all(keys.map(key => stateStorage.get(key as any)));
          keys.push('user_auth');
          values.push(typeof(auth) === 'number' ? {dcID: values[0] || App.baseDcId, id: auth} : auth);

          let obj: any = {};
          keys.forEach((key, idx) => {
            obj[key] = values[idx];
          });

          await sessionStorage.set(obj);
        }
        
        if(!auth) { // try to read Webogram's session from localStorage
          try {
            const keys = Object.keys(localStorage);
            for(let i = 0; i < keys.length; ++i) {
              const key = keys[i];
              let value: any;
              try {
                value = localStorage.getItem(key);
                value = JSON.parse(value);
              } catch(err) {
                //console.error(err);
              }

              sessionStorage.set({
                [key as any]: value
              });
            }

            auth = sessionStorage.getFromCache('user_auth');
          } catch(err) {
            this.log.error('localStorage import error', err);
          }
        }

        if(auth) {
          // ! Warning ! DON'T delete this
          state.authState = {_: 'authStateSignedIn'};
          rootScope.dispatchEvent('user_auth', typeof(auth) === 'number' ? {dcID: 0, id: auth} : auth); // * support old version
        }

        // * Read storages
        for(let i = 0, length = storagesKeys.length; i < length; ++i) {
          this.storagesResults[storagesKeys[i]] = arr[i] as any;
        }

        arr.splice(0, storagesKeys.length);

        const time = Date.now();
        if((state.stateCreatedTime + REFRESH_EVERY) < time) {
          if(DEBUG) {
            this.log('will refresh state', state.stateCreatedTime, time);
          }

          const r = (keys: typeof REFRESH_KEYS) => {
            keys.forEach(key => {
              this.pushToState(key, copy(STATE_INIT[key]));
  
              // @ts-ignore
              const s = this.storagesResults[key];
              if(s && s.length) {
                s.length = 0;
              }
            });
          };
          
          r(REFRESH_KEYS);

          if((state.stateCreatedTime + REFRESH_EVERY_WEEK) < time) {
            if(DEBUG) {
              this.log('will refresh updates');
            }

            r(REFRESH_KEYS_WEEK);
          }
        }
        
        //state = this.state = new Proxy(state, getHandler());

        // * support old version
        if(!state.settings.hasOwnProperty('theme') && state.settings.hasOwnProperty('nightTheme')) {
          state.settings.theme = state.settings.nightTheme ? 'night' : 'day';
          this.pushToState('settings', state.settings);
        }

        // * support old version
        if(!state.settings.hasOwnProperty('themes') && state.settings.background) {
          state.settings.themes = copy(STATE_INIT.settings.themes);
          const theme = state.settings.themes.find(t => t.name === state.settings.theme);
          if(theme) {
            theme.background = state.settings.background;
            this.pushToState('settings', state.settings);
          }
        }

        validateInitObject(STATE_INIT, state, (missingKey) => {
          // @ts-ignore
          this.pushToState(missingKey, state[missingKey]);
        });

        if(state.version !== STATE_VERSION) {
          this.pushToState('version', STATE_VERSION);
        }

        // ! probably there is better place for it
        rootScope.settings = state.settings;

        if(DEBUG) {
          this.log('state res', state, copy(state));
        }
        
        //return resolve();

        console.timeEnd('load state');
        resolve(state);
      }).catch(resolve);
    });

    return this.loaded;
  }

  public getState() {
    return this.state === undefined ? this.loadSavedState() : Promise.resolve(this.state);
  }

  public setByKey(key: string, value: any) {
    setDeepProperty(this.state, key, value);
    rootScope.dispatchEvent('settings_updated', {key, value});

    const first = key.split('.')[0];
    // @ts-ignore
    this.pushToState(first, this.state[first]);
  }

  public pushToState<T extends keyof State>(key: T, value: State[T], direct = true) {
    if(direct) {
      this.state[key] = value;
    }

    this.storage.set({
      [key]: value
    });
  }

  public requestPeer(peerId: number, type: string, limit?: number) {
    let set = this.neededPeers.get(peerId);
    if(set && set.has(type)) {
      return;
    }

    if(!set) {
      set = new Set();
      this.neededPeers.set(peerId, set);
    }

    set.add(type);
    this.dispatchEvent('peerNeeded', peerId);

    if(limit !== undefined) {
      this.keepPeerSingle(peerId, type);
    }
  }

  public isPeerNeeded(peerId: number) {
    return this.neededPeers.has(peerId);
  }

  public keepPeerSingle(peerId: number, type: string) {
    const existsPeerId = this.singlePeerMap.get(type);
    if(existsPeerId && existsPeerId !== peerId && this.neededPeers.has(existsPeerId)) {
      const set = this.neededPeers.get(existsPeerId);
      set.delete(type);

      if(!set.size) {
        this.neededPeers.delete(existsPeerId);
        this.dispatchEvent('peerUnneeded', existsPeerId);
      }
    }

    if(peerId) {
      this.singlePeerMap.set(type, peerId);
    }
  }

  /* public resetState() {
    for(let i in this.state) {
      // @ts-ignore
      this.state[i] = false;
    }
    sessionStorage.set(this.state).then(() => {
      location.reload();
    });
  } */
}

//console.trace('appStateManager include');

const appStateManager = new AppStateManager();
MOUNT_CLASS_TO.appStateManager = appStateManager;
export default appStateManager;

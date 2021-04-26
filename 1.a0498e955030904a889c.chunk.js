(this.webpackJsonp=this.webpackJsonp||[]).push([[1],{14:function(e,t,r){"use strict";r.r(t),r.d(t,"STATE_INIT",(function(){return d})),r.d(t,"AppStateManager",(function(){return m}));var n=r(46),s=r(9),o=r(64),a=r(26),i=r(15),c=r(43),u=r(2),h=r(10);const l=u.a.version,d={dialogs:[],allDialogsLoaded:{},chats:{},users:{},messages:[],contactsList:[],updates:{},filters:{},maxSeenMsgId:0,stateCreatedTime:Date.now(),recentEmoji:[],topPeers:[],recentSearch:[],version:l,authState:{_:"authStateSignIn"},hiddenPinnedMessages:{},settings:{messagesTextSize:16,sendShortcut:"enter",animationsEnabled:!0,autoDownload:{contacts:!0,private:!0,groups:!0,channels:!0},autoPlay:{gifs:!0,videos:!0},stickers:{suggest:!0,loop:!0},themes:[{name:"day",background:{type:"image",blur:!1,slug:"ByxGo2lrMFAIAAAAmkJxZabh8eM",highlightningColor:"hsla(85.5319, 36.9171%, 40.402%, 0.4)"}},{name:"night",background:{type:"color",blur:!1,color:"#0f0f0f",highlightningColor:"hsla(0, 0%, 3.82353%, 0.4)"}}],theme:"day",notifications:{sound:!1}},keepSigned:!0,drafts:{}},g=Object.keys(d),f=["dialogs","allDialogsLoaded","messages","contactsList","stateCreatedTime","updates","maxSeenMsgId","filters","topPeers"];class m extends n.a{constructor(){super(),this.log=Object(a.b)("STATE"),this.tempId=0,this.loadSavedState()}loadSavedState(){return this.loaded?this.loaded:this.loaded=new Promise(e=>{Promise.all(g.concat("user_auth").map(e=>o.a.get(e))).then(t=>{var r;let n={};g.forEach((e,r)=>{const s=t[r];n[e]=void 0!==s?s:Object(i.a)(d[e])});const o=Date.now();if(n.stateCreatedTime+864e5<o){h.b&&this.log("will refresh state",n.stateCreatedTime,o),f.forEach(e=>{n[e]=Object(i.a)(d[e])});const e={},t={};(null===(r=n.recentSearch)||void 0===r?void 0:r.length)&&n.recentSearch.forEach(r=>{r<0?t[r]=n.chats[r]:e[r]=n.users[r]}),n.users=e,n.chats=t}if(!n.settings.hasOwnProperty("themes")&&n.settings.background){const e=d.settings.themes.find(e=>e.name===d.settings.theme);e&&(e.background=Object(i.a)(n.settings.background))}!n.settings.hasOwnProperty("theme")&&n.settings.hasOwnProperty("nightTheme")&&(n.settings.theme=n.settings.nightTheme?"night":"day"),Object(i.k)(d,n),this.state=n,this.state.version=l,s.default.settings=this.state.settings,h.b&&this.log("state res",n,Object(i.a)(n));const a=t[t.length-1];a&&(this.state.authState={_:"authStateSignedIn"},s.default.broadcast("user_auth","number"!=typeof a?a.id:a)),e(this.state)}).catch(e).finally(()=>{setInterval(()=>{this.tempId++,this.saveState()},1e4)})})}getState(){return void 0===this.state?this.loadSavedState():Promise.resolve(this.state)}saveState(){if(void 0===this.state||this.savePromise)return;const e=this.tempId;this.savePromise=Object(c.c)().then(()=>Promise.all(this.dispatchEvent("save",this.state)).then(()=>Object(c.c)()).then(()=>o.a.set(this.state)).then(()=>{this.savePromise=null,this.tempId!==e&&this.saveState()}))}setByKey(e,t){Object(i.j)(this.state,e,t),s.default.broadcast("settings_updated",{key:e,value:t})}pushToState(e,t){this.state[e]=t}setPeer(e,t){const r=e>0?this.state.users:this.state.chats;r.hasOwnProperty(e)||(r[e]=t)}resetState(){for(let e in this.state)this.state[e]=!1;o.a.set(this.state).then(()=>{location.reload()})}}m.STATE_INIT=d;const v=new m;h.a.appStateManager=v,t.default=v},15:function(e,t,r){"use strict";function n(e){if(null===e||"object"!=typeof e)return e;if(e instanceof Date)return new Date(e.getTime());if(Array.isArray(e)){return e.map(e=>n(e))}let t=new e.constructor;for(var r in e)e.hasOwnProperty(r)&&(t[r]=n(e[r]));return t}function s(e,t){const r=Object.keys,n=typeof e;return e&&t&&"object"===n&&n===typeof t?r(e).length===r(t).length&&r(e).every(r=>s(e[r],t[r])):e===t}function o(e,t){const r={writable:!0,configurable:!0},n={};t.forEach(t=>{void 0===e[t]&&(n[t]=r)}),Object.defineProperties(e,n)}function a(e,t="asc"){if(!e)return[];const r=Object.keys(e).map(e=>+e);return"asc"===t?r.sort((e,t)=>e-t):r.sort((e,t)=>t-e)}function i(e,t){if(!e)return t;for(var r in e)t.hasOwnProperty(r)||delete e[r];for(var r in t)e[r]=t[r];return e}function c(e,t,r){"byteLength"in r[e]&&(r[e]=[...r[e]]),t&&t[e]!==r[e]&&(t[e].length=r[e].length,r[e].forEach((r,n)=>{t[e][n]=r}),r[e]=t[e])}function u(e){return"object"==typeof e&&null!==e}function h(e,t){const r=t.split(".");let n=e;return r.forEach(e=>{e&&(n=n[e])}),n}function l(e,t,r){const n=t.split(".");h(e,n.slice(0,-1).join("."))[n.pop()]=r}function d(e,t){for(const r in e)typeof t[r]!=typeof e[r]?t[r]=n(e[r]):u(e[r])&&d(e[r],t[r])}function g(e,t){if(t)for(let r in t)void 0!==t[r]&&(e[r]=t[r])}r.d(t,"a",(function(){return n})),r.d(t,"b",(function(){return s})),r.d(t,"c",(function(){return o})),r.d(t,"e",(function(){return a})),r.d(t,"i",(function(){return i})),r.d(t,"h",(function(){return c})),r.d(t,"f",(function(){return u})),r.d(t,"d",(function(){return h})),r.d(t,"j",(function(){return l})),r.d(t,"k",(function(){return d})),r.d(t,"g",(function(){return g}))},26:function(e,t,r){"use strict";r.d(t,"a",(function(){return n})),r.d(t,"b",(function(){return i}));var n,s=r(10);!function(e){e[e.log=1]="log",e[e.warn=2]="warn",e[e.error=4]="error",e[e.debug=8]="debug"}(n||(n={}));const o=Date.now();function a(){return"["+((Date.now()-o)/1e3).toFixed(3)+"]"}function i(e,t=n.log|n.warn|n.error){function r(...r){return t&n.log&&console.log(a(),e,...r)}return s.b||(t=n.error),r.warn=function(...r){return t&n.warn&&console.warn(a(),e,...r)},r.info=function(...r){return t&n.log&&console.info(a(),e,...r)},r.error=function(...r){return t&n.error&&console.error(a(),e,...r)},r.trace=function(...r){return t&n.log&&console.trace(a(),e,...r)},r.debug=function(...r){return t&n.debug&&console.debug(a(),e,...r)},r.setPrefix=function(t){e="["+t+"]:"},r.setPrefix(e),r}},43:function(e,t,r){"use strict";r.d(t,"b",(function(){return l})),r.d(t,"c",(function(){return d}));var n=r(30),s=r(16),o=r(9),a=r(10);let i=!1,c=Promise.resolve(),u=0;const h=console.log.bind(console.log,"[HEAVY-ANIMATION]:"),l=(e,t)=>{i||(c=Object(n.a)(),o.default.broadcast("event-heavy-animation-start"),i=!0,a.b&&h("start")),++u,a.b&&h("attach promise, length:",u,t);const r=[void 0!==t?Object(s.d)(t):void 0,e.finally(()=>{})].filter(Boolean),l=performance.now();return Promise.race(r).then(()=>{--u,a.b&&h("promise end, length:",u,performance.now()-l),u||(i=!1,u=0,o.default.broadcast("event-heavy-animation-end"),c.resolve(),a.b&&h("end"))}),c},d=()=>c;t.a=(e,t,r)=>{i&&e();const n=r?r.add.bind(r,o.default):o.default.addEventListener.bind(o.default),s=r?r.removeManual.bind(r,o.default):o.default.removeEventListener.bind(o.default);return n("event-heavy-animation-start",e),n("event-heavy-animation-end",t),()=>{s("event-heavy-animation-end",t),s("event-heavy-animation-start",e)}}},64:function(e,t,r){"use strict";var n=r(10);const s=new(r(79).a)({storeName:"session"});n.a.appStorage=s,t.a=s},69:function(e,t,r){"use strict";r.d(t,"b",(function(){return n})),r.d(t,"a",(function(){return s}));const n=e=>new Promise(t=>{const r=new FileReader;r.addEventListener("loadend",e=>{t(e.srcElement.result)}),r.readAsText(e)});function s(e,t=""){let r;const n=function(e){if(-1===["image/jpeg","image/png","image/gif","image/webp","image/bmp","video/mp4","video/webm","video/quicktime","audio/ogg","audio/mpeg","audio/mp4","application/json"].indexOf(e))return"application/octet-stream";return e}(t);try{r=new Blob(e,{type:n})}catch(t){let s=new BlobBuilder;e.forEach(e=>{s.append(e)}),r=s.getBlob(n)}return r}},79:function(e,t,r){"use strict";r.d(t,"a",(function(){return h}));var n=r(16);var s={name:"tweb"+(r(50).a.test?"_test":""),version:7,stores:[{name:"session"},{name:"stickerSets"},{name:"users"},{name:"chats"},{name:"dialogs"},{name:"messages"}]},o=r(69),a=r(15),i=r(26);class c{constructor(e){this.storageIsAvailable=!0,this.log=Object(i.b)("IDB"),this.name=s.name,this.version=s.version,this.stores=s.stores,Object(a.g)(this,e),this.openDatabase(!0)}isAvailable(){return this.storageIsAvailable}openDatabase(e=!1){if(this.openDbPromise&&!e)return this.openDbPromise;try{var t=indexedDB.open(this.name,this.version);if(!t)throw new Error}catch(e){return this.log.error("error opening db",e.message),this.storageIsAvailable=!1,Promise.reject(e)}let r=!1;return setTimeout(()=>{r||t.onerror({type:"IDB_CREATE_TIMEOUT"})},3e3),this.openDbPromise=new Promise((e,n)=>{t.onsuccess=s=>{r=!0;const o=t.result;let a=!1;this.log("Opened"),o.onerror=e=>{this.storageIsAvailable=!1,this.log.error("Error creating/accessing IndexedDB database",e),n(e)},o.onclose=e=>{this.log.error("closed:",e),!a&&this.openDatabase()},o.onabort=e=>{this.log.error("abort:",e);const t=e.target;this.openDatabase(a=!0),t.onerror&&t.onerror(e),o.close()},o.onversionchange=e=>{this.log.error("onversionchange, lol?")},e(o)},t.onerror=e=>{r=!0,this.storageIsAvailable=!1,this.log.error("Error creating/accessing IndexedDB database",e),n(e)},t.onupgradeneeded=e=>{r=!0,this.log.warn("performing idb upgrade from",e.oldVersion,"to",e.newVersion);var t=e.target.result;this.stores.forEach(e=>{t.objectStoreNames.contains(e.name)||((e,t)=>{var r;const n=e.createObjectStore(t.name);if(null===(r=t.indexes)||void 0===r?void 0:r.length)for(const e of t.indexes)n.createIndex(e.indexName,e.keyPath,e.objectParameters)})(t,e)})}})}delete(e){return this.openDatabase().then(t=>{try{var r=t.transaction([this.storeName],"readwrite").objectStore(this.storeName).delete(e)}catch(e){return Promise.reject(e)}return new Promise((t,n)=>{const s=setTimeout(()=>{this.log.error("delete: request not finished!",e,r),t()},3e3);r.onsuccess=e=>{t(),clearTimeout(s)},r.onerror=e=>{n(e),clearTimeout(s)}})})}deleteAll(){return this.openDatabase().then(e=>{try{const r=e.transaction([this.storeName],"readwrite");var t=r.objectStore(this.storeName).clear()}catch(e){return Promise.reject(e)}return new Promise((e,r)=>{const n=setTimeout(()=>{this.log.error("deleteAll: request not finished",t)},3e3);t.onsuccess=t=>{e(),clearTimeout(n)},t.onerror=e=>{r(e),clearTimeout(n)}})})}save(e,t){return this.openDatabase().then(r=>{const n=n=>{this.log.error("save: transaction error:",e,t,r,n,n&&n.name),n&&"InvalidStateError"!==n.name||setTimeout(()=>{this.save(e,t)},2e3)};return new Promise((s,o)=>{try{const a=r.transaction([this.storeName],"readwrite");a.onerror=e=>{n(a.error),o(a.error),clearTimeout(i)},a.oncomplete=e=>{s(),clearTimeout(i)};const i=setTimeout(()=>{this.log.error("save: transaction not finished",e,a)},1e4),c=a.objectStore(this.storeName);Array.isArray(e)||(e=[].concat(e),t=[].concat(t));for(let r=0,n=e.length;r<n;++r){c.put(t[r],e[r]).onerror=e=>{o(a.error),clearTimeout(i)}}}catch(e){n(e),o(e)}})})}saveFile(e,t){return t instanceof Blob||(t=Object(o.a)([t])),this.save(e,t)}get(e){return this.openDatabase().then(t=>{try{const n=t.transaction([this.storeName],"readonly");var r=n.objectStore(this.storeName).get(e)}catch(t){this.log.error("get error:",t,e,r,r.error)}return new Promise((t,n)=>{const s=setTimeout(()=>{this.log.error("get request not finished!",e,r),n()},3e3);r.onsuccess=function(e){const o=r.result;void 0===o?n("NO_ENTRY_FOUND"):t(o),clearTimeout(s)},r.onerror=()=>{clearTimeout(s),n()}})})}getAll(){return this.openDatabase().then(e=>{try{const r=e.transaction([this.storeName],"readonly");var t=r.objectStore(this.storeName).getAll()}catch(e){this.log.error("getAll error:",e,t,t.error)}return new Promise((e,r)=>{const n=setTimeout(()=>{this.log.error("getAll request not finished!",t),r()},3e3);t.onsuccess=function(s){const o=t.result;void 0===o?r("NO_ENTRY_FOUND"):e(o),clearTimeout(n)},t.onerror=()=>{clearTimeout(n),r()}})})}}var u=function(e,t,r,n){return new(r||(r=Promise))((function(s,o){function a(e){try{c(n.next(e))}catch(e){o(e)}}function i(e){try{c(n.throw(e))}catch(e){o(e)}}function c(e){var t;e.done?s(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(a,i)}c((n=n.apply(e,t||[])).next())}))};class h{constructor(e){this.cache={},this.useStorage=!0,this.updateKeys=new Set,this.storage=new c(e),h.STORAGES.push(this),this.saveThrottled=Object(n.e)(()=>u(this,void 0,void 0,(function*(){const e=Array.from(this.updateKeys.values());this.updateKeys.clear();try{yield this.storage.save(e,e.map(e=>this.cache[e]))}catch(t){console.error("[AS]: set error:",t,e)}})),50,!1)}getCache(){return this.cache}getFromCache(e){return this.cache[e]}setToCache(e,t){return this.cache[e]=t}get(e){return u(this,void 0,void 0,(function*(){if(this.cache.hasOwnProperty(e))return this.getFromCache(e);if(this.useStorage){let t;try{t=yield this.storage.get(e)}catch(r){["NO_ENTRY_FOUND","STORAGE_OFFLINE"].includes(r)||(this.useStorage=!1,console.error("[AS]: get error:",r,e,t))}return this.cache[e]=t}}))}set(e,t=!1){return u(this,void 0,void 0,(function*(){for(const r in e)if(e.hasOwnProperty(r)){const n=e[r];this.setToCache(r,n),this.useStorage&&!t&&(this.updateKeys.add(r),this.saveThrottled())}}))}remove(e,t=!1){return u(this,void 0,void 0,(function*(){if(t||delete this.cache[e],this.useStorage)try{yield this.storage.delete(e)}catch(e){this.useStorage=!1,console.error("[AS]: remove error:",e)}}))}clear(){return this.storage.deleteAll()}static toggleStorage(e){return Promise.all(this.STORAGES.map(t=>(t.useStorage=e,e?t.set(t.cache):(t.updateKeys.clear(),t.clear()))))}}h.STORAGES=[]}}]);
//# sourceMappingURL=1.a0498e955030904a889c.chunk.js.map
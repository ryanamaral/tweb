!function(e){function t(t){for(var n,i,r=t[0],a=t[1],c=0,u=[];c<r.length;c++)i=r[c],Object.prototype.hasOwnProperty.call(o,i)&&o[i]&&u.push(o[i][0]),o[i]=0;for(n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n]);for(s&&s(t);u.length;)u.shift()()}var n={},o={7:0};function i(t){if(n[t])return n[t].exports;var o=n[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,i),o.l=!0,o.exports}i.e=function(e){var t=[],n=o[e];if(0!==n)if(n)t.push(n[2]);else{var r=new Promise((function(t,i){n=o[e]=[t,i]}));t.push(n[2]=r);var a,c=document.createElement("script");c.charset="utf-8",c.timeout=120,i.nc&&c.setAttribute("nonce",i.nc),c.src=function(e){return i.p+""+({8:"npm.qr-code-styling"}[e]||e)+"."+{0:"6ffc75b404af648856b7",1:"b74862673d51136cbc4c",2:"a0dfe9a5a562c65cdcda",3:"d64c2278f9238015ed0c",4:"84f147c1d2958cc344c0",5:"52648d9662b1593a9884",6:"c3a541ea520b05378d16",8:"12a5bd6e5bd7192b0ebe",9:"4d961456388a6d1b0f0d",10:"6b67eea64fe905468c72",11:"5201fbc3a229decf48fd",12:"1760b8b3be8e5e33dad5",13:"f117bf1df69cbe7b1b76",14:"855c67889251fd4df654",15:"7e59e802652fe49733de",16:"e3bc1d20c4c76f9f04ae",17:"b0390ecea392ef68f951",18:"8a70549f455ad0294e4a",19:"1868a01c903f34815618"}[e]+".chunk.js"}(e);var s=new Error;a=function(t){c.onerror=c.onload=null,clearTimeout(u);var n=o[e];if(0!==n){if(n){var i=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src;s.message="Loading chunk "+e+" failed.\n("+i+": "+r+")",s.name="ChunkLoadError",s.type=i,s.request=r,n[1](s)}o[e]=void 0}};var u=setTimeout((function(){a({type:"timeout",target:c})}),12e4);c.onerror=c.onload=a,document.head.appendChild(c)}return Promise.all(t)},i.m=e,i.c=n,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)i.d(n,o,function(t){return e[t]}.bind(null,o));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i.oe=function(e){throw console.error(e),e};var r=this.webpackJsonp=this.webpackJsonp||[],a=r.push.bind(r);r.push=t,r=r.slice();for(var c=0;c<r.length;c++)t(r[c]);var s=a;i(i.s=6)}([function(e,t,n){"use strict";function o(e,t){return e.closest("."+t)}n.d(t,"a",(function(){return o}))},function(e,t,n){"use strict";n.r(t),n.d(t,"userAgent",(function(){return o})),n.d(t,"isApple",(function(){return i})),n.d(t,"isAndroid",(function(){return r})),n.d(t,"isChromium",(function(){return a})),n.d(t,"ctx",(function(){return c})),n.d(t,"isAppleMobile",(function(){return s})),n.d(t,"isSafari",(function(){return u})),n.d(t,"isMobileSafari",(function(){return d})),n.d(t,"isMobile",(function(){return l}));const o=navigator?navigator.userAgent:null,i=-1!==navigator.userAgent.search(/OS X|iPhone|iPad|iOS/i),r=-1!==navigator.userAgent.toLowerCase().indexOf("android"),a=/Chrome/.test(navigator.userAgent)&&/Google Inc/.test(navigator.vendor),c="undefined"!=typeof window?window:self,s=(/iPad|iPhone|iPod/.test(navigator.platform)||"MacIntel"===navigator.platform&&navigator.maxTouchPoints>1)&&!c.MSStream,u=!!("safari"in c)||!(!o||!(/\b(iPad|iPhone|iPod)\b/.test(o)||o.match("Safari")&&!o.match("Chrome"))),d=u&&s,l=-1!=navigator.userAgent.search(/iOS|iPhone OS|Android|BlackBerry|BB10|Series ?[64]0|J2ME|MIDP|opera mini|opera mobi|mobi.+Gecko|Windows Phone/i)},function(e,t,n){"use strict";t.a={id:1025907,hash:"452b0359b988148995f22ff0f4229750",version:"0.4.0",langPackVersion:"0.1.2",langPack:"macos",langPackCode:"en",domains:[],baseDcId:2}},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var o=n(2),i=n(0);function r(e){e.style.transform="translateY(-99999px)",e.focus(),setTimeout(()=>{e.style.transform=""},0)}var a=n(1),c=(n(3),n(4),n(5),function(e,t,n,o){return new(n||(n=Promise))((function(i,r){function a(e){try{s(o.next(e))}catch(e){r(e)}}function c(e){try{s(o.throw(e))}catch(e){r(e)}}function s(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,c)}s((o=o.apply(e,t||[])).next())}))});document.addEventListener("DOMContentLoaded",()=>c(void 0,void 0,void 0,(function*(){Element.prototype.toggleAttribute||(Element.prototype.toggleAttribute=function(e,t){return void 0!==t&&(t=!!t),this.hasAttribute(e)?!!t||(this.removeAttribute(e),!1):!1!==t&&(this.setAttribute(e,""),!0)});const e=window.visualViewport||window;let t=!1;const c=()=>{const n=.01*(t&&!f.default.overlayIsActive?e.height||e.innerHeight:window.innerHeight);document.documentElement.style.setProperty("--vh",n+"px")};window.addEventListener("resize",c),c();const s=new Proxy(Worker,{construct:(e,t)=>new e(t[0]+location.search)});Worker=s;const[u,d,l,f,m,h]=yield Promise.all([n.e(16).then(n.bind(null,106)),n.e(17).then(n.bind(null,21)),Promise.resolve().then(n.bind(null,1)),n.e(15).then(n.bind(null,9)),n.e(0).then(n.bind(null,17)),Promise.all([n.e(0),n.e(1)]).then(n.bind(null,8))]),p=()=>{t=1===b&&l.isSafari&&d.isTouchSupported&&!f.default.overlayIsActive,c(),e!==window&&(t?(window.removeEventListener("resize",c),e.addEventListener("resize",c)):(e.removeEventListener("resize",c),window.addEventListener("resize",c)))};let b;if(f.default.on("im_tab_change",e=>{const t=void 0!==b;b=e,(t||1===b)&&p()}),f.default.on("overlay_toggle",()=>{p()}),l.isApple){if(l.isSafari&&(document.documentElement.classList.add("is-safari"),d.isTouchSupported)){let e="clientY",n=0;const o={capture:!0,passive:!1},a=t=>{const o=t.touches[0],r=Object(i.a)(o.target,"scrollable-y");if(r){const i=o[e],a=n-i,c=r.scrollTop,s=r.scrollHeight,u=r.clientHeight,d=c?Math.round(c+r.clientHeight+a):c+a;(s===u||d>=s||d<=0)&&t.preventDefault()}else t.preventDefault()};document.addEventListener("focusin",i=>{t&&(r(i.target),document.addEventListener("touchmove",a,o),document.addEventListener("touchstart",t=>{if(t.touches.length>1)return;const o=t.touches[0];n=o[e]}))}),document.addEventListener("focusout",()=>{document.removeEventListener("touchmove",a,o)}),document.addEventListener("visibilitychange",()=>{t&&document.activeElement&&document.activeElement.blur&&r(document.activeElement)})}document.documentElement.classList.add("is-mac","emoji-supported"),l.isAppleMobile&&document.documentElement.classList.add("is-ios")}else l.isAndroid&&document.documentElement.classList.add("is-android");d.isTouchSupported?document.documentElement.classList.add("is-touch"):document.documentElement.classList.add("no-touch");const v=performance.now(),g=h.default.getCacheLangPack(),[y,w]=yield Promise.all([m.default.getState(),g]);w.appVersion!==o.a.langPackVersion&&h.default.getLangPack(w.lang_code),console.log("got state, time:",performance.now()-v);const P=y.authState;if("authStateSignedIn"!==P._){console.log("Will mount auth page:",P._,Date.now()/1e3);const e=document.getElementById("auth-pages");if(e){const t=e.querySelector(".scrollable");d.isTouchSupported&&!a.isMobileSafari||t.classList.add("no-scrollbar");const n=document.createElement("div");n.classList.add("auth-placeholder"),t.prepend(n),t.append(n.cloneNode())}switch(P._){case"authStateSignIn":(yield Promise.all([n.e(0),n.e(1),n.e(2),n.e(4)]).then(n.bind(null,92))).default.mount();break;case"authStateAuthCode":(yield Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(4)]).then(n.bind(null,101))).default.mount(P.sentCode);break;case"authStatePassword":(yield Promise.all([n.e(0),n.e(1),n.e(2),n.e(10)]).then(n.bind(null,76))).default.mount();break;case"authStateSignUp":(yield Promise.all([n.e(0),n.e(1),n.e(2),n.e(11)]).then(n.bind(null,94))).default.mount(P.authCode)}}else console.log("Will mount IM page:",Date.now()/1e3),(yield Promise.all([n.e(0),n.e(1),n.e(2),n.e(19)]).then(n.bind(null,47))).default.mount();const S=(yield n.e(13).then(n.bind(null,16))).ripple;Array.from(document.getElementsByClassName("rp")).forEach(e=>S(e))})))}]);
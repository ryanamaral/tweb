!function(e){function t(t){for(var n,i,r=t[0],a=t[1],c=0,u=[];c<r.length;c++)i=r[c],Object.prototype.hasOwnProperty.call(o,i)&&o[i]&&u.push(o[i][0]),o[i]=0;for(n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n]);for(s&&s(t);u.length;)u.shift()()}var n={},o={6:0};function i(t){if(n[t])return n[t].exports;var o=n[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,i),o.l=!0,o.exports}i.e=function(e){var t=[],n=o[e];if(0!==n)if(n)t.push(n[2]);else{var r=new Promise((function(t,i){n=o[e]=[t,i]}));t.push(n[2]=r);var a,c=document.createElement("script");c.charset="utf-8",c.timeout=120,i.nc&&c.setAttribute("nonce",i.nc),c.src=function(e){return i.p+""+({7:"npm.qr-code-styling"}[e]||e)+"."+{0:"452fa212e17dcfc07564",1:"d277a05da0ddbd61e879",2:"bef04531cf630e1a636b",3:"0569d6b92a7de0f0a851",4:"fc923c7353ccf84d4de5",5:"355f2ad2c0c8017d8531",7:"2e7e4a2714f67e84bff6",8:"8c5df7a7a3fabe3bdef2",9:"2ac796df2ce96d99103e",10:"a7161ae69fb00bfc77c8",11:"c865e39548ea32a6843e",12:"99c5d4dc05c86a3c6eb6",13:"ad9e325a134b755538d1",14:"5f4014aa8206c73e5631",15:"9be69b3aee818869c82a",16:"4cfe21152eb4e113e0cf",17:"7f4b6acb3087ff73699f",18:"8c0f1e5243d025452e9e",19:"8d6591f9950affeeaeb1",20:"a98395234a268e64d56e",21:"359f2ec8336d3765108e"}[e]+".chunk.js"}(e);var s=new Error;a=function(t){c.onerror=c.onload=null,clearTimeout(u);var n=o[e];if(0!==n){if(n){var i=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src;s.message="Loading chunk "+e+" failed.\n("+i+": "+r+")",s.name="ChunkLoadError",s.type=i,s.request=r,n[1](s)}o[e]=void 0}};var u=setTimeout((function(){a({type:"timeout",target:c})}),12e4);c.onerror=c.onload=a,document.head.appendChild(c)}return Promise.all(t)},i.m=e,i.c=n,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)i.d(n,o,function(t){return e[t]}.bind(null,o));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i.oe=function(e){throw console.error(e),e};var r=this.webpackJsonp=this.webpackJsonp||[],a=r.push.bind(r);r.push=t,r=r.slice();for(var c=0;c<r.length;c++)t(r[c]);var s=a;i(i.s=6)}([function(e,t,n){"use strict";function o(e,t){return e.closest("."+t)}n.d(t,"a",(function(){return o}))},function(e,t,n){"use strict";n.r(t),n.d(t,"userAgent",(function(){return o})),n.d(t,"isApple",(function(){return i})),n.d(t,"isAndroid",(function(){return r})),n.d(t,"isChromium",(function(){return a})),n.d(t,"ctx",(function(){return c})),n.d(t,"isAppleMobile",(function(){return s})),n.d(t,"isSafari",(function(){return u})),n.d(t,"isMobileSafari",(function(){return d})),n.d(t,"isMobile",(function(){return l}));const o=navigator?navigator.userAgent:null,i=-1!==navigator.userAgent.search(/OS X|iPhone|iPad|iOS/i),r=-1!==navigator.userAgent.toLowerCase().indexOf("android"),a=/Chrome/.test(navigator.userAgent)&&/Google Inc/.test(navigator.vendor),c="undefined"!=typeof window?window:self,s=(/iPad|iPhone|iPod/.test(navigator.platform)||"MacIntel"===navigator.platform&&navigator.maxTouchPoints>1)&&!c.MSStream,u=!!("safari"in c)||!(!o||!(/\b(iPad|iPhone|iPod)\b/.test(o)||o.match("Safari")&&!o.match("Chrome"))),d=u&&s,l=-1!=navigator.userAgent.search(/iOS|iPhone OS|Android|BlackBerry|BB10|Series ?[64]0|J2ME|MIDP|opera mini|opera mobi|mobi.+Gecko|Windows Phone/i)},function(e,t,n){"use strict";t.a={id:1025907,hash:"452b0359b988148995f22ff0f4229750",version:"0.4.1",langPackVersion:"0.1.3",langPack:"macos",langPackCode:"en",domains:[],baseDcId:2}},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var o=n(2),i=n(0);function r(e){e.style.transform="translateY(-99999px)",e.focus(),setTimeout(()=>{e.style.transform=""},0)}var a=n(1),c=(n(3),n(4),n(5),function(e,t,n,o){return new(n||(n=Promise))((function(i,r){function a(e){try{s(o.next(e))}catch(e){r(e)}}function c(e){try{s(o.throw(e))}catch(e){r(e)}}function s(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,c)}s((o=o.apply(e,t||[])).next())}))});document.addEventListener("DOMContentLoaded",()=>c(void 0,void 0,void 0,(function*(){Element.prototype.toggleAttribute||(Element.prototype.toggleAttribute=function(e,t){return void 0!==t&&(t=!!t),this.hasAttribute(e)?!!t||(this.removeAttribute(e),!1):!1!==t&&(this.setAttribute(e,""),!0)});const e=window.visualViewport||window;let t,c=!1;const s=()=>{const n=.01*(c&&!m.default.overlayIsActive?e.height||e.innerHeight:window.innerHeight);t!==n&&(t=n,document.documentElement.style.setProperty("--vh",n+"px"))};window.addEventListener("resize",s),s();const u=new Proxy(Worker,{construct:(e,t)=>new e(t[0]+location.search)});Worker=u;const[d,l,f,m,h,p]=yield Promise.all([n.e(17).then(n.bind(null,104)),n.e(19).then(n.bind(null,21)),Promise.resolve().then(n.bind(null,1)),n.e(16).then(n.bind(null,9)),Promise.all([n.e(1),n.e(15)]).then(n.bind(null,14)),Promise.all([n.e(0),n.e(1),n.e(2)]).then(n.bind(null,8))]),v=()=>{c=1===b&&f.isSafari&&l.isTouchSupported&&!m.default.overlayIsActive,s(),e!==window&&(c?(window.removeEventListener("resize",s),e.addEventListener("resize",s)):(e.removeEventListener("resize",s),window.addEventListener("resize",s)))};let b;if(m.default.on("im_tab_change",e=>{const t=void 0!==b;b=e,(t||1===b)&&v()}),m.default.on("overlay_toggle",()=>{v()}),f.isApple){if(f.isSafari&&(document.documentElement.classList.add("is-safari"),l.isTouchSupported)){let e="clientY",t=0;const n={capture:!0,passive:!1},o=n=>{const o=n.touches[0],r=Object(i.a)(o.target,"scrollable-y");if(r){const i=o[e],a=t-i,c=r.scrollTop,s=r.scrollHeight,u=r.clientHeight,d=c?Math.round(c+r.clientHeight+a):c+a;(s===u||d>=s||d<=0)&&n.preventDefault()}else n.preventDefault()};document.addEventListener("focusin",i=>{c&&(r(i.target),document.addEventListener("touchmove",o,n),document.addEventListener("touchstart",n=>{if(n.touches.length>1)return;const o=n.touches[0];t=o[e]}))}),document.addEventListener("focusout",()=>{document.removeEventListener("touchmove",o,n)}),document.addEventListener("visibilitychange",()=>{c&&document.activeElement&&document.activeElement.blur&&r(document.activeElement)})}document.documentElement.classList.add("is-mac","emoji-supported"),f.isAppleMobile&&document.documentElement.classList.add("is-ios")}else f.isAndroid&&document.documentElement.classList.add("is-android");l.isTouchSupported?document.documentElement.classList.add("is-touch"):document.documentElement.classList.add("no-touch");const g=performance.now(),y=p.default.getCacheLangPack(),[P,w]=yield Promise.all([h.default.getState(),y]);w.appVersion!==o.a.langPackVersion&&p.default.getLangPack(w.lang_code),console.log("got state, time:",performance.now()-g);const S=P.authState;if("authStateSignedIn"!==S._){console.log("Will mount auth page:",S._,Date.now()/1e3);const e=document.getElementById("auth-pages");if(e){const t=e.querySelector(".scrollable");l.isTouchSupported&&!a.isMobileSafari||t.classList.add("no-scrollbar");const n=document.createElement("div");n.classList.add("auth-placeholder"),t.prepend(n),t.append(n.cloneNode())}switch(S._){case"authStateSignIn":(yield Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(13)]).then(n.bind(null,76))).default.mount();break;case"authStateAuthCode":(yield Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(8)]).then(n.bind(null,85))).default.mount(S.sentCode);break;case"authStatePassword":(yield Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(11)]).then(n.bind(null,66))).default.mount();break;case"authStateSignUp":(yield Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(12)]).then(n.bind(null,78))).default.mount(S.authCode)}}else console.log("Will mount IM page:",Date.now()/1e3),(yield Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(21)]).then(n.bind(null,37))).default.mount();const E=(yield Promise.all([n.e(0),n.e(18)]).then(n.bind(null,17))).ripple;Array.from(document.getElementsByClassName("rp")).forEach(e=>E(e))})))}]);
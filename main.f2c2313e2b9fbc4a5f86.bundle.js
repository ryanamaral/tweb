!function(e){function t(t){for(var n,i,a=t[0],r=t[1],c=0,d=[];c<a.length;c++)i=a[c],Object.prototype.hasOwnProperty.call(o,i)&&o[i]&&d.push(o[i][0]),o[i]=0;for(n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n]);for(s&&s(t);d.length;)d.shift()()}var n={},o={8:0};function i(t){if(n[t])return n[t].exports;var o=n[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,i),o.l=!0,o.exports}i.e=function(e){var t=[],n=o[e];if(0!==n)if(n)t.push(n[2]);else{var a=new Promise((function(t,i){n=o[e]=[t,i]}));t.push(n[2]=a);var r,c=document.createElement("script");c.charset="utf-8",c.timeout=120,i.nc&&c.setAttribute("nonce",i.nc),c.src=function(e){return i.p+""+({9:"npm.qr-code-styling"}[e]||e)+"."+{0:"ca3eca3ddcd5443a3be1",1:"59696e8df5038d75dcdb",2:"67a12571d732a0b8ff7b",3:"a2f4ef6927d1a0d437ef",4:"431950a408b4fe4b78d7",5:"86bb38e19933ced048d9",6:"374df9c714c61f730a86",7:"d93579198a3eea273be0",9:"d2e04559a2484c4f7ba0",10:"ddad581be93dd23ec7db",11:"19c9c705bd2cbc26d995",12:"5d82238b4c0f21e51619",13:"9c01df55d46e96110c80",14:"432a3caf2840f92700f7",15:"50806c16cda4a8483c23",16:"b818863ac92a0913187a",17:"68397aa4a1e76e490f41",18:"db258e9080d245a5c996",19:"2b57d951a59ab3fac831",20:"7b8e92b334f79070e1e4",21:"2a501652fb9b15bd7fc2",22:"6625b42d5ea13a09fe59",23:"5636034e618cb131c2a2",24:"0e253bc7f5541332609e",25:"74613ac6b67acc4a777d",26:"0376252548a004673fae",27:"3be8fa8a36f132be5609"}[e]+".chunk.js"}(e);var s=new Error;r=function(t){c.onerror=c.onload=null,clearTimeout(d);var n=o[e];if(0!==n){if(n){var i=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;s.message="Loading chunk "+e+" failed.\n("+i+": "+a+")",s.name="ChunkLoadError",s.type=i,s.request=a,n[1](s)}o[e]=void 0}};var d=setTimeout((function(){r({type:"timeout",target:c})}),12e4);c.onerror=c.onload=r,document.head.appendChild(c)}return Promise.all(t)},i.m=e,i.c=n,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)i.d(n,o,function(t){return e[t]}.bind(null,o));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i.oe=function(e){throw console.error(e),e};var a=this.webpackJsonp=this.webpackJsonp||[],r=a.push.bind(a);a.push=t,a=a.slice();for(var c=0;c<a.length;c++)t(a[c]);var s=r;i(i.s=7)}([function(e,t,n){"use strict";n.r(t),n.d(t,"userAgent",(function(){return o})),n.d(t,"isApple",(function(){return i})),n.d(t,"isAndroid",(function(){return a})),n.d(t,"isChromium",(function(){return r})),n.d(t,"ctx",(function(){return c})),n.d(t,"isAppleMobile",(function(){return s})),n.d(t,"isSafari",(function(){return d})),n.d(t,"isFirefox",(function(){return u})),n.d(t,"isMobileSafari",(function(){return l})),n.d(t,"isMobile",(function(){return f}));const o=navigator?navigator.userAgent:null,i=-1!==navigator.userAgent.search(/OS X|iPhone|iPad|iOS/i),a=-1!==navigator.userAgent.toLowerCase().indexOf("android"),r=/Chrome/.test(navigator.userAgent)&&/Google Inc/.test(navigator.vendor),c="undefined"!=typeof window?window:self,s=(/iPad|iPhone|iPod/.test(navigator.platform)||"MacIntel"===navigator.platform&&navigator.maxTouchPoints>1)&&!c.MSStream,d=!!("safari"in c)||!(!o||!(/\b(iPad|iPhone|iPod)\b/.test(o)||o.match("Safari")&&!o.match("Chrome"))),u=navigator.userAgent.toLowerCase().indexOf("firefox")>-1,l=d&&s,f=-1!=navigator.userAgent.search(/iOS|iPhone OS|Android|BlackBerry|BB10|Series ?[64]0|J2ME|MIDP|opera mini|opera mobi|mobi.+Gecko|Windows Phone/i)},function(e,t,n){"use strict";function o(e,t){return e.closest("."+t)}n.d(t,"a",(function(){return o}))},function(e,t,n){"use strict";function o(){return!(!document.activeElement||!document.activeElement.blur)&&(document.activeElement.blur(),!0)}n.d(t,"a",(function(){return o}))},function(e,t,n){"use strict";const o={id:1025907,hash:"452b0359b988148995f22ff0f4229750",version:"0.5.6",langPackVersion:"0.2.1",langPack:"macos",langPackCode:"en",domains:[],baseDcId:2,isMainDomain:"web.telegram.org"===location.hostname,suffix:"K"};o.isMainDomain&&(o.id=2496,o.hash="8da85b0d5bfe62527e5b244c209159c3"),t.a=o},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var o=n(3),i=n(2),a=n(1);function r(e){e.style.transform="translateY(-99999px)",e.focus(),setTimeout(()=>{e.style.transform=""},0)}var c=n(0),s=(n(4),n(5),n(6),function(e,t,n,o){return new(n||(n=Promise))((function(i,a){function r(e){try{s(o.next(e))}catch(e){a(e)}}function c(e){try{s(o.throw(e))}catch(e){a(e)}}function s(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(r,c)}s((o=o.apply(e,t||[])).next())}))});document.addEventListener("DOMContentLoaded",()=>s(void 0,void 0,void 0,(function*(){Element.prototype.toggleAttribute||(Element.prototype.toggleAttribute=function(e,t){return void 0!==t&&(t=!!t),this.hasAttribute(e)?!!t||(this.removeAttribute(e),!1):!1!==t&&(this.setAttribute(e,""),!0)});const e=window.visualViewport||window;let t,s=!1;const d=()=>{const n=.01*(s&&!h.default.overlayIsActive?e.height||e.innerHeight:window.innerHeight);t!==n&&(t<n&&Object(i.a)(),t=n,document.documentElement.style.setProperty("--vh",n+"px"))};window.addEventListener("resize",d),d();const u=new Proxy(Worker,{construct:(e,t)=>new e(t[0]+location.search)});Worker=u;const[l,f,m,h,b,p]=yield Promise.all([n.e(20).then(n.bind(null,122)),n.e(22).then(n.bind(null,18)),Promise.resolve().then(n.bind(null,0)),n.e(19).then(n.bind(null,10)),Promise.all([n.e(0),n.e(23)]).then(n.bind(null,17)),Promise.all([n.e(0),n.e(2)]).then(n.bind(null,8))]),v=()=>{s=1===g&&m.isSafari&&f.isTouchSupported&&!h.default.overlayIsActive,d(),e!==window&&(s?(window.removeEventListener("resize",d),e.addEventListener("resize",d)):(e.removeEventListener("resize",d),window.addEventListener("resize",d)))};let g;if(h.default.addEventListener("im_tab_change",e=>{const t=void 0!==g;g=e,(t||1===g)&&v()}),h.default.addEventListener("overlay_toggle",()=>{v()}),m.isApple){if(m.isSafari&&(document.documentElement.classList.add("is-safari"),m.isMobile&&f.isTouchSupported)){let e="clientY",t=0;const n={capture:!0,passive:!1},o=n=>{const o=n.touches[0],i=Object(a.a)(o.target,"scrollable-y");if(i){const a=o[e],r=t-a,c=i.scrollTop,s=i.scrollHeight,d=i.clientHeight,u=c?Math.round(c+i.clientHeight+r):c+r;(s===d||u>=s||u<=0)&&n.preventDefault()}else n.preventDefault()};document.addEventListener("focusin",i=>{s&&(r(i.target),document.addEventListener("touchmove",o,n),document.addEventListener("touchstart",n=>{if(n.touches.length>1)return;const o=n.touches[0];t=o[e]}))}),document.addEventListener("focusout",()=>{document.removeEventListener("touchmove",o,n)}),document.addEventListener("visibilitychange",()=>{s&&document.activeElement&&document.activeElement.blur&&r(document.activeElement)})}document.documentElement.classList.add("is-mac","emoji-supported"),m.isAppleMobile&&document.documentElement.classList.add("is-ios")}else m.isAndroid&&document.documentElement.classList.add("is-android");f.isTouchSupported?document.documentElement.classList.add("is-touch"):document.documentElement.classList.add("no-touch");const y=performance.now(),P=p.default.getCacheLangPack();const[w,E]=yield Promise.all([b.default.getState(),P]);function S(e,t){e.style.opacity="0",t.then(()=>{window.requestAnimationFrame(()=>{e.style.opacity=""})})}h.default.setThemeListener(),E.appVersion!==o.a.langPackVersion&&p.default.getLangPack(E.lang_code),console.log("got state, time:",performance.now()-y);const L=w.authState;if("authStateSignedIn"!==L._){console.log("Will mount auth page:",L._,Date.now()/1e3);const e=document.getElementById("auth-pages");let t,o;if(e){t=e.querySelector(".scrollable"),f.isTouchSupported&&!c.isMobileSafari||t.classList.add("no-scrollbar"),t.style.opacity="0";const n=document.createElement("div");n.classList.add("auth-placeholder"),t.prepend(n),t.append(n.cloneNode())}switch(L._){case"authStateSignIn":o=(yield Promise.all([n.e(0),n.e(1),n.e(2),n.e(4),n.e(13)]).then(n.bind(null,81))).default.mount();break;case"authStateSignQr":o=(yield Promise.all([n.e(0),n.e(2),n.e(4),n.e(5),n.e(21)]).then(n.bind(null,87))).default.mount();break;case"authStateAuthCode":o=(yield Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(10)]).then(n.bind(null,94))).default.mount(L.sentCode);break;case"authStatePassword":o=(yield Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(11)]).then(n.bind(null,77))).default.mount();break;case"authStateSignUp":o=(yield Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(12)]).then(n.bind(null,100))).default.mount(L.authCode)}if(t){o&&(yield o);S(t,"fonts"in document?document.fonts.ready:Promise.resolve())}}else console.log("Will mount IM page:",Date.now()/1e3),S(document.getElementById("main-columns"),"fonts"in document?Promise.all(["400 1rem Roboto","500 1rem Roboto"].map(e=>document.fonts.load(e))):Promise.resolve()),(yield Promise.all([n.e(0),n.e(2),n.e(4),n.e(25)]).then(n.bind(null,44))).default.mount();const A=(yield n.e(16).then(n.bind(null,22))).ripple;Array.from(document.getElementsByClassName("rp")).forEach(e=>A(e))})))}]);
//# sourceMappingURL=main.f2c2313e2b9fbc4a5f86.bundle.js.map
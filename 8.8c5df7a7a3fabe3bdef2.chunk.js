(this.webpackJsonp=this.webpackJsonp||[]).push([[8,10,11,12,13,18,21],{12:function(e,t,n){"use strict";var i=n(8),s=n(17);t.a=(e,t={})=>{const n=document.createElement("button");return n.className=e+(t.icon?" tgico-"+t.icon:""),t.noRipple||(t.rippleSquare&&n.classList.add("rp-square"),Object(s.ripple)(n)),t.onlyMobile&&n.classList.add("only-handhelds"),t.disabled&&(n.disabled=!0),t.text&&n.append(Object(i.i18n)(t.text)),n}},16:function(e,t,n){"use strict";n.d(t,"a",(function(){return d}));var i=n(7),s=n(19),a=n(34),o=n(8),r=n(11);let l=()=>{document.addEventListener("paste",e=>{if(!e.target.hasAttribute("contenteditable")&&!e.target.parentElement.hasAttribute("contenteditable"))return;e.preventDefault();let t=(e.originalEvent||e).clipboardData.getData("text/plain"),n=r.b.parseEntities(t);n=n.filter(e=>"messageEntityEmoji"===e._||"messageEntityLinebreak"===e._),t=r.b.wrapRichText(t,{entities:n,noLinks:!0,wrappingDraft:!0}),window.document.execCommand("insertHTML",!1,t)}),l=null};const c=e=>{const t=(e instanceof HTMLInputElement?e.value:e.innerText)[0];let n="ltr";t&&Object(a.b)(t)&&(n="rtl"),e.style.direction=n};var d;!function(e){e[e.Neutral=0]="Neutral",e[e.Valid=1]="Valid",e[e.Error=2]="Error"}(d||(d={}));t.b=class{constructor(e={}){this.options=e,this.container=document.createElement("div"),this.container.classList.add("input-field"),e.maxLength&&(e.showLengthOn=Math.round(e.maxLength/3));const{placeholder:t,maxLength:n,showLengthOn:a,name:r,plainText:d}=e;let h,u,p=e.label||e.labelText;if(d)this.container.innerHTML=`\n      <input type="text" ${r?`name="${r}"`:""} autocomplete="off" ${p?'required=""':""} class="input-field-input">\n      `,h=this.container.firstElementChild,h.addEventListener("input",()=>c(h));else{l&&l(),this.container.innerHTML='\n      <div contenteditable="true" class="input-field-input"></div>\n      ',h=this.container.firstElementChild;const t=new MutationObserver(()=>{c(h),u&&u()});h.addEventListener("input",()=>{Object(i.s)(h)&&(h.innerHTML=""),this.inputFake&&(this.inputFake.innerHTML=h.innerHTML,this.onFakeInput())}),t.observe(h,{characterData:!0,childList:!0,subtree:!0}),e.animate&&(h.classList.add("scrollable","scrollable-y"),this.wasInputFakeClientHeight=0,this.showScrollDebounced=Object(s.a)(()=>this.input.classList.remove("no-scrollbar"),150,!1,!0),this.inputFake=document.createElement("div"),this.inputFake.setAttribute("contenteditable","true"),this.inputFake.className=h.className+" input-field-input-fake")}if(t&&Object(o._i18n)(h,t,void 0,"placeholder"),p&&(this.label=document.createElement("label"),this.setLabel(),this.container.append(this.label)),n){const e=this.container.lastElementChild;let t=!1;u=()=>{const s=h.classList.contains("error"),o=d?h.value.length:[...Object(i.l)(h)].length,r=n-o,l=r<0;h.classList.toggle("error",l),l||r<=a?(this.setLabel(),e.append(` (${n-o})`),t||(t=!0)):(s&&!l||t)&&(this.setLabel(),t=!1)},h.addEventListener("input",u)}this.input=h}setLabel(){this.label.textContent="",this.options.labelText?this.label.innerHTML=this.options.labelText:this.label.append(Object(o.i18n)(this.options.label,this.options.labelOptions))}onFakeInput(){const{scrollHeight:e,clientHeight:t}=this.inputFake;this.wasInputFakeClientHeight&&this.wasInputFakeClientHeight!==t&&(this.input.classList.add("no-scrollbar"),this.showScrollDebounced()),this.wasInputFakeClientHeight=t,this.input.style.height=e?e+"px":""}get value(){return this.options.plainText?this.input.value:Object(i.l)(this.input)}set value(e){this.setValueSilently(e,!1);const t=new Event("input",{bubbles:!0,cancelable:!0});this.input.dispatchEvent(t)}setValueSilently(e,t=!0){this.options.plainText?this.input.value=e:(this.input.innerHTML=e,this.inputFake&&(this.inputFake.innerHTML=e,t&&this.onFakeInput()))}isValid(){return!this.input.classList.contains("error")&&this.value!==this.originalValue}setOriginalValue(e="",t=!1){this.originalValue=e,this.options.plainText||(e=r.b.wrapDraftText(e)),t?this.setValueSilently(e,!1):this.value=e}setState(e,t){t&&(this.label.textContent="",this.label.append(Object(o.i18n)(t,this.options.labelOptions))),this.input.classList.toggle("error",!!(e&d.Error)),this.input.classList.toggle("valid",!!(e&d.Valid))}setError(e){this.setState(d.Error,e)}}},17:function(e,t,n){"use strict";n.r(t),n.d(t,"ripple",(function(){return l}));var i=n(0),s=n(58),a=n(21),o=n(9);let r=0;function l(e,t=(()=>Promise.resolve()),n=null,l=!1){if(e.querySelector(".c-ripple"))return;e.classList.add("rp");let c=document.createElement("div");c.classList.add("c-ripple");let d;e.classList.contains("rp-square")&&c.classList.add("is-square"),e[l?"prepend":"append"](c);const h=(e,i)=>{const o=Date.now(),l=document.createElement("div"),h=r++,p=1e3*+window.getComputedStyle(c).getPropertyValue("--ripple-duration").replace("s","");d=()=>{let e=Date.now()-o;const t=()=>{s.a.mutate(()=>{l.remove()}),n&&n(h)};if(e<p){let n=Math.max(p-e,p/2);setTimeout(()=>l.classList.add("hiding"),Math.max(n-p/2,0)),setTimeout(t,n)}else l.classList.add("hiding"),setTimeout(t,p/2);a.isTouchSupported||window.removeEventListener("contextmenu",d),d=null,u=!1},t&&t(h),window.requestAnimationFrame(()=>{const t=c.getBoundingClientRect();l.classList.add("c-ripple__circle");const n=e-t.left,s=i-t.top,a=Math.sqrt(Math.pow(Math.abs(s-t.height/2)+t.height/2,2)+Math.pow(Math.abs(n-t.width/2)+t.width/2,2)),o=n-a/2,r=s-a/2;l.style.width=l.style.height=a+"px",l.style.left=o+"px",l.style.top=r+"px",c.append(l)})};let u=!1;if(a.isTouchSupported){let t=()=>{d&&d()};e.addEventListener("touchstart",n=>{if(!o.default.settings.animationsEnabled)return;if(n.touches.length>1||u||["BUTTON","A"].includes(n.target.tagName)&&n.target!==e||Object(i.a)(n.target,"c-ripple")!==c)return;u=!0;let{clientX:s,clientY:a}=n.touches[0];h(s,a),e.addEventListener("touchend",t,{once:!0}),window.addEventListener("touchmove",n=>{n.cancelBubble=!0,n.stopPropagation(),t(),e.removeEventListener("touchend",t)},{once:!0})},{passive:!0})}else e.addEventListener("mousedown",t=>{if(![0,2].includes(t.button))return;if(!o.default.settings.animationsEnabled)return;if("0"===e.dataset.ripple||Object(i.a)(t.target,"c-ripple")!==c||"A"===t.target.tagName)return!1;if(u)return u=!1,!1;let{clientX:n,clientY:s}=t;h(n,s),window.addEventListener("mouseup",d,{once:!0}),window.addEventListener("contextmenu",d,{once:!0})})}},27:function(e,t,n){"use strict";n.d(t,"b",(function(){return c})),n.d(t,"a",(function(){return d}));var i=n(21),s=n(26),a=n(55),o=n(43),r=n(7);class l{constructor(e,t="",n=document.createElement("div")){this.el=e,this.container=n,this.onScrollMeasure=0,this.isHeavyAnimationInProgress=!1,this.needCheckAfterAnimation=!1,this.container.classList.add("scrollable"),this.log=Object(s.b)("SCROLL"+(t?"-"+t:""),s.a.error),e&&(Array.from(e.children).forEach(e=>this.container.append(e)),e.append(this.container))}setListeners(){window.addEventListener("resize",this.onScroll,{passive:!0}),this.container.addEventListener("scroll",this.onScroll,{passive:!0,capture:!0}),Object(o.a)(()=>{this.isHeavyAnimationInProgress=!0,this.onScrollMeasure&&(this.needCheckAfterAnimation=!0,window.cancelAnimationFrame(this.onScrollMeasure))},()=>{this.isHeavyAnimationInProgress=!1,this.needCheckAfterAnimation&&(this.onScroll(),this.needCheckAfterAnimation=!1)})}append(e){this.container.append(e)}scrollIntoViewNew(e,t,n,i,s,o,r){return Object(a.b)(this.container,e,t,n,i,s,o,r)}}class c extends l{constructor(e,t="",n=300,i){super(e,t),this.onScrollOffset=n,this.onAdditionalScroll=null,this.onScrolledTop=null,this.onScrolledBottom=null,this.lastScrollTop=0,this.lastScrollDirection=0,this.loadedAll={top:!0,bottom:!1},this.onScroll=()=>{if(this.isHeavyAnimationInProgress)return this.onScrollMeasure&&window.cancelAnimationFrame(this.onScrollMeasure),void(this.needCheckAfterAnimation=!0);(this.onScrolledTop||this.onScrolledBottom||this.splitUp||this.onAdditionalScroll)&&(this.onScrollMeasure&&window.cancelAnimationFrame(this.onScrollMeasure),this.onScrollMeasure=window.requestAnimationFrame(()=>{this.onScrollMeasure=0;const e=this.container.scrollTop;this.lastScrollDirection=this.lastScrollTop===e?0:this.lastScrollTop<e?1:-1,this.lastScrollTop=e,this.onAdditionalScroll&&0!==this.lastScrollDirection&&this.onAdditionalScroll(),this.checkForTriggers&&this.checkForTriggers()}))},this.checkForTriggers=()=>{if(!this.onScrolledTop&&!this.onScrolledBottom)return;if(this.isHeavyAnimationInProgress)return void this.onScroll();const e=this.container.scrollHeight;if(!e)return;const t=e-this.container.clientHeight,n=this.lastScrollTop;this.onScrolledTop&&n<=this.onScrollOffset&&this.lastScrollDirection<=0&&this.onScrolledTop(),this.onScrolledBottom&&t-n<=this.onScrollOffset&&this.lastScrollDirection>=0&&this.onScrolledBottom()},this.container.classList.add("scrollable-y"),this.setListeners()}setVirtualContainer(e){this.splitUp=e,this.log("setVirtualContainer:",e,this)}prepend(...e){(this.splitUp||this.padding||this.container).prepend(...e)}append(...e){(this.splitUp||this.padding||this.container).append(...e)}getDistanceToEnd(){return this.scrollHeight-Math.round(this.scrollTop+this.container.offsetHeight)}get isScrolledDown(){return this.getDistanceToEnd()<=1}set scrollTop(e){this.container.scrollTop=e}get scrollTop(){return this.container.scrollTop}get scrollHeight(){return this.container.scrollHeight}}class d extends l{constructor(e,t="",n=300,s=15,a=document.createElement("div")){if(super(e,t,a),this.onScrollOffset=n,this.splitCount=s,this.container=a,this.container.classList.add("scrollable-x"),!i.isTouchSupported){const e=e=>{e.deltaX||(this.container.scrollLeft+=e.deltaY/4,Object(r.f)(e))};this.container.addEventListener("wheel",e,{passive:!1})}}}},30:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var i=n(14),s=n(15),a=n(17),o=n(8);class r{constructor(e={}){const t=this.label=document.createElement("label");t.classList.add("checkbox-field"),e.restriction&&t.classList.add("checkbox-field-restriction"),e.round&&t.classList.add("checkbox-field-round"),e.disabled&&t.classList.add("checkbox-disabled");const n=this.input=document.createElement("input");let r;if(n.type="checkbox",e.name&&(n.id="input-"+e.name),e.checked&&(n.checked=!0),e.stateKey&&i.default.getState().then(t=>{this.checked=Object(s.d)(t,e.stateKey),n.addEventListener("change",()=>{i.default.setByKey(e.stateKey,n.checked)})}),e.text?(r=this.span=document.createElement("span"),r.classList.add("checkbox-caption"),Object(o._i18n)(r,e.text,e.textArgs)):t.classList.add("checkbox-without-caption"),t.append(n),e.toggle){t.classList.add("checkbox-field-toggle");const e=document.createElement("div");e.classList.add("checkbox-toggle"),t.append(e)}else{const e=document.createElement("div");e.classList.add("checkbox-box");const n=document.createElementNS("http://www.w3.org/2000/svg","svg");n.classList.add("checkbox-box-check"),n.setAttributeNS(null,"viewBox","0 0 24 24");const i=document.createElementNS("http://www.w3.org/2000/svg","use");i.setAttributeNS(null,"href","#check"),i.setAttributeNS(null,"x","-1"),n.append(i);const s=document.createElement("div");s.classList.add("checkbox-box-background");const a=document.createElement("div");a.classList.add("checkbox-box-border"),e.append(a,s,n),t.append(e)}r&&t.append(r),e.withRipple?(t.classList.add("checkbox-ripple","hover-effect"),Object(a.ripple)(t,void 0,void 0,!0)):e.withHover&&t.classList.add("hover-effect")}get checked(){return this.input.checked}set checked(e){this.setValueSilently(e);const t=new Event("change",{bubbles:!0,cancelable:!0});this.input.dispatchEvent(t)}setValueSilently(e){this.input.checked=e}}},31:function(e,t,n){"use strict";n.d(t,"b",(function(){return d})),n.d(t,"a",(function(){return h}));var i=n(9),s=n(7),a=n(17),o=n(36),r=n(41),l=n(8),c=n(0);class d{constructor(e,t,n={}){if(this.element=document.createElement("div"),this.container=document.createElement("div"),this.header=document.createElement("div"),this.title=document.createElement("div"),this.onEscape=()=>!0,this.hide=()=>{r.a.back("popup")},this.destroy=()=>{this.onClose&&this.onClose(),this.element.classList.add("hiding"),this.element.classList.remove("active"),this.btnClose&&this.btnClose.removeEventListener("click",this.hide),i.default.overlayIsActive=!1,r.a.removeItem(this.navigationItem),this.navigationItem=void 0,setTimeout(()=>{this.element.remove(),this.onCloseAfterTimeout&&this.onCloseAfterTimeout(),o.a.checkAnimations(!1)},150)},this.element.classList.add("popup"),this.element.className="popup"+(e?" "+e:""),this.container.classList.add("popup-container","z-depth-1"),this.header.classList.add("popup-header"),this.title.classList.add("popup-title"),this.header.append(this.title),n.closable&&(this.btnClose=document.createElement("span"),this.btnClose.classList.add("btn-icon","popup-close","tgico-close"),this.header.prepend(this.btnClose),this.btnClose.addEventListener("click",this.hide,{once:!0})),n.overlayClosable){const e=t=>{Object(c.a)(t.target,"popup-container")||(this.hide(),this.element.removeEventListener("click",e))};this.element.addEventListener("click",e)}if(n.withConfirm&&(this.btnConfirm=document.createElement("button"),this.btnConfirm.classList.add("btn-primary","btn-color-primary"),!0!==n.withConfirm&&this.btnConfirm.append(Object(l.i18n)(n.withConfirm)),this.header.append(this.btnConfirm),Object(a.ripple)(this.btnConfirm)),this.container.append(this.header),n.body&&(this.body=document.createElement("div"),this.body.classList.add("popup-body"),this.container.append(this.body)),t&&t.length){const e=document.createElement("div");e.classList.add("popup-buttons"),2===t.length&&e.classList.add("popup-buttons-row");const n=t.map(e=>{const t=document.createElement("button");return t.className="btn"+(e.isDanger?" danger":" primary"),Object(a.ripple)(t),e.text?t.innerHTML=e.text:t.append(Object(l.i18n)(e.langKey,e.langArgs)),e.callback?t.addEventListener("click",()=>{e.callback(),this.destroy()},{once:!0}):e.isCancel&&t.addEventListener("click",()=>{this.destroy()},{once:!0}),t});e.append(...n),this.container.append(e)}this.element.append(this.container)}show(){this.navigationItem={type:"popup",onPop:this.destroy,onEscape:this.onEscape},r.a.pushItem(this.navigationItem),Object(s.c)(),document.body.append(this.element),this.element.offsetWidth,this.element.classList.add("active"),i.default.overlayIsActive=!0,o.a.checkAnimations(!0)}}const h=e=>(e.find(e=>e.isCancel)||e.push({langKey:"Cancel",isCancel:!0}),e)},37:function(e,t,n){"use strict";n.r(t);var i=n(7),s=n(14),a=n(8),o=n(29),r=function(e,t,n,i){return new(n||(n=Promise))((function(s,a){function o(e){try{l(i.next(e))}catch(e){a(e)}}function r(e){try{l(i.throw(e))}catch(e){a(e)}}function l(e){var t;e.done?s(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(o,r)}l((i=i.apply(e,t||[])).next())}))};const l=new o.a("page-chats",!1,()=>(s.default.pushToState("authState",{_:"authStateSignedIn"}),Promise.resolve().then(n.bind(null,9)).then(e=>{e.default.broadcast("im_mount")}),a.default.requestedServerLanguage||a.default.getCacheLangPack().then(e=>{e.local&&a.default.getLangPack(e.lang_code)}),Object(i.c)(),new Promise(e=>{window.requestAnimationFrame(()=>{n.e(9).then(n.bind(null,67)).finally(()=>r(void 0,void 0,void 0,(function*(){e()})))})})));t.default=l},40:function(e,t,n){"use strict";function i(e,t){return e.closest(t)}n.d(t,"a",(function(){return i}))},42:function(e,t,n){"use strict";var i=n(10),s=n(18),a=n(13);const o=new class{getState(){return a.a.invokeApi("account.getPassword").then(e=>e)}updateSettings(e={}){return this.getState().then(t=>{let n,i;const s={password:null,new_settings:{_:"account.passwordInputSettings",hint:e.hint,email:e.email}};n=e.currentPassword?a.a.computeSRP(e.currentPassword,t):Promise.resolve({_:"inputCheckPasswordEmpty"});const o=t.new_algo,r=new Uint8Array(o.salt1.length+32);return r.randomize(),r.set(o.salt1,0),o.salt1=r,i=e.newPassword?a.a.computeSRP(e.newPassword,t,!0):Promise.resolve(new Uint8Array),Promise.all([n,i]).then(e=>(s.password=e[0],s.new_settings.new_algo=o,s.new_settings.new_password_hash=e[1],a.a.invokeApi("account.updatePasswordSettings",s)))})}check(e,t,n={}){return a.a.computeSRP(e,t).then(e=>a.a.invokeApi("auth.checkPassword",{password:e},n).then(e=>("auth.authorization"===e._&&(s.a.saveApiUser(e.user),a.a.setUserAuth(e.user.id)),e)))}confirmPasswordEmail(e){return a.a.invokeApi("account.confirmPasswordEmail",{code:e})}resendPasswordEmail(){return a.a.invokeApi("account.resendPasswordEmail")}cancelPasswordEmail(){return a.a.invokeApi("account.cancelPasswordEmail")}};i.a.passwordManager=o,t.a=o},47:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var i=n(8);class s{constructor(e){this.element=document.body.querySelector("."+e.className),this.container=document.createElement("div"),this.container.className="container center-align",this.imageDiv=document.createElement("div"),this.imageDiv.className="auth-image",this.title=document.createElement("h4"),e.titleLangKey&&this.title.append(Object(i.i18n)(e.titleLangKey)),this.subtitle=document.createElement("p"),this.subtitle.className="subtitle",e.subtitleLangKey&&this.subtitle.append(Object(i.i18n)(e.subtitleLangKey)),this.container.append(this.imageDiv,this.title,this.subtitle),e.withInputWrapper&&(this.inputWrapper=document.createElement("div"),this.inputWrapper.className="input-wrapper",this.container.append(this.inputWrapper)),this.element.append(this.container)}}},53:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var i=n(7),s=n(16);class a extends s.b{constructor(e={}){super(Object.assign({plainText:!0},e)),this.passwordVisible=!1,this.onVisibilityClick=e=>{Object(i.f)(e),this.passwordVisible=!this.passwordVisible,this.toggleVisible.classList.toggle("eye-hidden",this.passwordVisible),this.input.type=this.passwordVisible?"text":"password",this.onVisibilityClickAdditional&&this.onVisibilityClickAdditional()};const t=this.input;t.type="password",t.setAttribute("required",""),t.autocomplete="off";const n=this.toggleVisible=document.createElement("span");n.classList.add("toggle-visible","tgico"),this.container.classList.add("input-field-password"),this.container.append(n),n.addEventListener("click",this.onVisibilityClick),n.addEventListener("touchend",this.onVisibilityClick)}}},56:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var i=n(28);class s{constructor(e,t){this.passwordInputField=e,this.size=t,this.needFrame=0,this.container=document.createElement("div"),this.container.classList.add("media-sticker-wrapper")}load(){return this.loadPromise?this.loadPromise:this.loadPromise=i.b.loadAnimationFromURL({container:this.container,loop:!1,autoplay:!1,width:this.size,height:this.size,noCache:!0},"assets/img/TwoFactorSetupMonkeyPeek.tgs").then(e=>(this.animation=e,this.animation.addEventListener("enterFrame",e=>{(1===this.animation.direction&&e>=this.needFrame||-1===this.animation.direction&&e<=this.needFrame)&&(this.animation.setSpeed(1),this.animation.pause())}),this.passwordInputField.onVisibilityClickAdditional=()=>{this.passwordInputField.passwordVisible?(this.animation.setDirection(1),this.animation.curFrame=0,this.needFrame=16,this.animation.play()):(this.animation.setDirection(-1),this.animation.curFrame=16,this.needFrame=0,this.animation.play())},i.b.waitForFirstFrame(e)))}remove(){this.animation&&this.animation.remove()}}},64:function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var i=n(48);var s=function(e,t){let n,i,s,a={},o=0,r=0,l=0,c=0,d=0;function h(){e.classList.add("crop-blur"),e.draggable=!1,s=new Image,s.src=e.src,s.draggable=!1,s.classList.add("crop-overlay-image"),t||(t=document.createElement("canvas")),n=document.createElement("div"),n.classList.add("crop-component"),i=document.createElement("div"),i.classList.add("crop-overlay");const a=document.createElement("div");a.classList.add("crop-overlay-color"),n.appendChild(i);e.parentNode.appendChild(n),n.appendChild(s),n.appendChild(e),n.appendChild(a),i.appendChild(s),s.style.maxWidth=e.width+"px",d=e.naturalWidth/e.offsetWidth;const o=e.offsetWidth/2-100,r=e.offsetHeight/2-100;u(200,200),p(o,r),m(o,r),i.addEventListener("mousedown",f,!1),i.addEventListener("touchstart",f,!1),i.addEventListener("wheel",g,!1),document.addEventListener("keypress",v,!1)}function u(e,t){l=e*d,c=t*d,i.style.width=e+"px",i.style.height=t+"px"}function p(e,t){r=t*d,o=e*d,s.style.top=-t+"px",s.style.left=-e+"px"}function m(e,t){i.style.top=t+"px",i.style.left=e+"px"}function b(e){e=e*Math.PI*2;let t,n,a,o,r=Math.floor(i.clientWidth+e),l=Math.floor(i.clientHeight+e),c=s.clientWidth,d=s.clientHeight;r<50||r>c||(t=i.offsetLeft-e/2,n=i.offsetTop-e/2,a=t+r,o=n+l,t<0&&(t=0),n<0&&(n=0),a>c||o>d||(u(r,r),p(t,n),m(t,n)))}function v(e){switch(e.preventDefault(),String.fromCharCode(e.charCode)){case"+":b(4);break;case"-":b(-4)}}function g(e){e.preventDefault(),b(e.deltaY>0?1:-1)}function f(e){e.preventDefault(),e.stopPropagation(),function(e){a.container_width=i.offsetWidth,a.container_height=i.offsetHeight,a.container_left=i.offsetLeft,a.container_top=i.offsetTop,a.mouse_x=(e.clientX||e.pageX||e.touches&&e.touches[0].clientX)+window.scrollX,a.mouse_y=(e.clientY||e.pageY||e.touches&&e.touches[0].clientY)+window.scrollY}(e),document.addEventListener("mousemove",w),document.addEventListener("touchmove",w),document.addEventListener("mouseup",L),document.addEventListener("touchend",L)}function L(e){e.preventDefault(),document.removeEventListener("mouseup",L),document.removeEventListener("touchend",L),document.removeEventListener("mousemove",w),document.removeEventListener("touchmove",w)}function w(e){let t,n,o,r,l={x:0,y:0};e.preventDefault(),e.stopPropagation(),l.x=e.pageX||e.touches&&e.touches[0].pageX,l.y=e.pageY||e.touches&&e.touches[0].pageY,t=l.x-(a.mouse_x-a.container_left),n=l.y-(a.mouse_y-a.container_top),o=i.offsetWidth,r=i.offsetHeight,t<0?t=0:t>s.offsetWidth-o&&(t=s.offsetWidth-o),n<0?n=0:n>s.offsetHeight-r&&(n=s.offsetHeight-r),p(t,n),m(t,n)}return e.complete?h():e.onload=h,{crop:function(){t.width=l,t.height=c,t.getContext("2d").drawImage(e,o,r,l,c,0,0,l,c)},removeHandlers:function(){i.removeEventListener("mousedown",f),i.removeEventListener("touchstart",f),i.removeEventListener("wheel",g),document.removeEventListener("mouseup",L),document.removeEventListener("touchend",L),document.removeEventListener("mousemove",w),document.removeEventListener("touchmove",w),document.removeEventListener("keypress",v),n.remove(),i.remove(),s.remove()}}},a=n(31),o=n(17),r=n(8);class l extends a.b{constructor(){super("popup-avatar",null,{closable:!0}),this.image=new Image,this.cropper={crop:()=>{},removeHandlers:()=>{}},this.h6=document.createElement("h6"),Object(r._i18n)(this.h6,"Popup.Avatar.Title"),this.btnClose.classList.remove("btn-icon"),this.header.append(this.h6),this.cropContainer=document.createElement("div"),this.cropContainer.classList.add("crop"),this.cropContainer.append(this.image),this.input=document.createElement("input"),this.input.type="file",this.input.style.display="none",this.input.addEventListener("change",e=>{const t=e.target.files[0];if(!t)return;const n=new FileReader;n.onload=e=>{const t=e.target.result;this.image=new Image,this.cropContainer.append(this.image),this.image.src=t,this.image.onload=()=>{this.show(),this.cropper=s(this.image,this.canvas),this.input.value=""}},n.readAsDataURL(t)},!1),this.btnSubmit=document.createElement("button"),this.btnSubmit.className="btn-primary btn-color-primary btn-circle btn-crop btn-icon tgico-check z-depth-1",Object(o.ripple)(this.btnSubmit),this.btnSubmit.addEventListener("click",()=>{this.cropper.crop(),this.btnClose.click(),this.canvas.toBlob(e=>{this.blob=e,this.darkenCanvas(),this.resolve()},"image/jpeg",1)}),this.container.append(this.cropContainer,this.btnSubmit,this.input),this.onCloseAfterTimeout=()=>{this.cropper.removeHandlers(),this.image&&this.image.remove()}}resolve(){this.onCrop(()=>i.a.upload(this.blob))}open(e,t){this.canvas=e,this.onCrop=t,this.input.click()}darkenCanvas(){let e=this.canvas.getContext("2d");e.fillStyle="rgba(0, 0, 0, 0.3)",e.fillRect(0,0,this.canvas.width,this.canvas.height)}}},66:function(e,t,n){"use strict";n.r(t);var i=n(20),s=n(23),a=n(14),o=n(42),r=n(29),l=n(37),c=n(12),d=n(53),h=n(56),u=n(11),p=n(8),m=n(47),b=n(7);let v;const g=new r.a("page-password",!0,()=>{const e=new m.a({className:"page-password",withInputWrapper:!0,titleLangKey:"Login.Password.Title",subtitleLangKey:"Login.Password.Subtitle"}),t=Object(c.a)("btn-primary btn-color-primary"),n=new p.default.IntlElement({key:"Login.Next"});t.append(n.element);const a=new d.a({label:"LoginPassword",name:"password"});let r;v=a.input,e.inputWrapper.append(a.container,t);let g,f=()=>(r||(r=window.setInterval(f,1e4)),o.a.getState().then(e=>{g=e,g.hint?Object(b.z)(a.label,Object(b.q)(u.b.wrapEmojiText(g.hint))):a.setLabel()}));t.addEventListener("click",(function(e){if(!v.value.length)return void v.classList.add("error");this.setAttribute("disabled","true");let s=v.value;n.update({key:"PleaseWait"});const c=Object(i.f)(this);o.a.check(s,g).then(e=>{switch(e._){case"auth.authorization":clearInterval(r),l.default.mount(),w&&w.remove();break;default:t.removeAttribute("disabled"),n.update({key:e._}),c.remove()}}).catch(e=>{t.removeAttribute("disabled"),a.input.classList.add("error"),e.type,n.update({key:"PASSWORD_HASH_INVALID"}),c.remove(),f()})})),v.addEventListener("keypress",(function(e){if(this.classList.remove("error"),n.update({key:"Login.Next"}),"Enter"===e.key)return t.click()}));const L=s.b.isMobile?100:166,w=new h.a(a,L);return e.imageDiv.append(w.container),Promise.all([w.load(),f()])},null,()=>{v.focus(),a.default.pushToState("authState",{_:"authStatePassword"}),a.default.saveState()});t.default=g},71:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var i=n(28);class s{constructor(e,t){this.inputField=e,this.size=t,this.max=45,this.needFrame=0,this.container=document.createElement("div"),this.container.classList.add("media-sticker-wrapper");const n=e.input;n.addEventListener("blur",()=>{this.playAnimation(0)}),n.addEventListener("input",t=>{this.playAnimation(e.value.length)})}playAnimation(e){if(!this.animation)return;let t;(e=Math.min(e,30))?(t=Math.round(Math.min(this.max,e)*(165/this.max)+11.33),this.idleAnimation&&(this.idleAnimation.stop(!0),this.idleAnimation.canvas.style.display="none"),this.animation.canvas.style.display=""):t=0;const n=this.needFrame>t?-1:1;this.animation.setDirection(n),0!==this.needFrame&&0===t&&this.animation.setSpeed(7),this.needFrame=t,this.animation.play()}load(){return this.loadPromise?this.loadPromise:this.loadPromise=Promise.all([i.b.loadAnimationFromURL({container:this.container,loop:!0,autoplay:!0,width:this.size,height:this.size},"assets/img/TwoFactorSetupMonkeyIdle.tgs").then(e=>(this.idleAnimation=e,this.inputField.value.length||e.play(),i.b.waitForFirstFrame(e))),i.b.loadAnimationFromURL({container:this.container,loop:!1,autoplay:!1,width:this.size,height:this.size},"assets/img/TwoFactorSetupMonkeyTracking.tgs").then(e=>(this.animation=e,this.inputField.value.length||(this.animation.canvas.style.display="none"),this.animation.addEventListener("enterFrame",e=>{(1===this.animation.direction&&e>=this.needFrame||-1===this.animation.direction&&e<=this.needFrame)&&(this.animation.setSpeed(1),this.animation.pause()),0===e&&0===this.needFrame&&this.idleAnimation&&(this.idleAnimation.canvas.style.display="",this.idleAnimation.play(),this.animation.canvas.style.display="none")}),i.b.waitForFirstFrame(e)))])}remove(){this.animation&&this.animation.remove(),this.idleAnimation&&this.idleAnimation.remove()}}},72:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var i=n(16);class s extends i.b{constructor(e){super(Object.assign({plainText:!0},e));const t=this.input;t.type="tel",t.setAttribute("required",""),t.autocomplete="off";let n=0;this.input.addEventListener("input",t=>{this.input.classList.remove("error"),this.setLabel();const i=this.value.replace(/\D/g,"").slice(0,e.length);this.setValueSilently(i);const s=this.value.length;if(s===e.length)e.onFill(+this.value);else if(s===n)return;n=s})}}},76:function(e,t,n){"use strict";n.r(t);var i=n(20),s=n(27),a=n(82),o=n(14),r=n(13),l=n(11),c=n(7),d=n(29),h=n(16),u=n(30),p=n(12),m=n(1),b=n(55),v=n(21),g=n(2),f=n(49),L=n(8),w=n(28),y=n(17),E=n(40);let k=null;const S=new d.a("page-sign",!0,()=>{f.a.test&&(a.b.push({name:"Test Country",phoneCode:"999 66",code:"TC",emoji:"🤔",pattern:"999 66 XXX XX"}),console.log("Added test country to list!"));const e=a.b.filter(e=>e.emoji).sort((e,t)=>e.name.localeCompare(t.name));let t=null;const o=document.createElement("div");o.classList.add("input-wrapper");const d=new h.b({label:"Login.CountrySelectorLabel",name:"countryCode",plainText:!0});d.container.classList.add("input-select");const y=d.input;y.autocomplete="rrRandomRR";const C=document.createElement("div");C.classList.add("select-wrapper","z-depth-3","hide");const x=document.createElement("span");x.classList.add("arrow","arrow-down"),d.container.append(x);const A=document.createElement("ul");C.appendChild(A);new s.b(C);let O,T=!1,_=()=>{_=null,e.forEach(e=>{T=!0;let t=e.emoji,n=[];e.phoneCode.split(" and ").forEach(i=>{let s=document.createElement("li");var a=document.createElement("span");let o=l.a.wrapRichText(t);s.appendChild(a),a.outerHTML=o,s.append(e.name);var r=document.createElement("span");r.classList.add("phone-code"),r.innerText="+"+i,s.appendChild(r),n.push(s),A.append(s)}),e.li=n}),A.addEventListener("mousedown",(function(n){let i=n.target;"LI"!==i.tagName&&(i=Object(E.a)(i,"LI"));let s=i.childNodes[1].textContent,a=i.querySelector(".phone-code").innerText;y.value=s,t=e.find(e=>e.name===s),M.value=N=a,setTimeout(()=>M.focus(),0)})),d.container.appendChild(C)};_(),y.addEventListener("focus",(function(t){_?_():e.forEach(e=>{e.li.forEach(e=>e.style.display="")}),clearTimeout(O),C.classList.remove("hide"),C.offsetWidth,C.classList.add("active"),y.value&&y.select(),Object(b.b)(S.pageEl.parentElement.parentElement,y,"start",4),setTimeout(()=>{j||(document.addEventListener("mousedown",P,{capture:!0}),j=!0)},0)}));let j=!1;const P=e=>{e.target!==y&&(F(),document.removeEventListener("mousedown",P,{capture:!0}),j=!1)},F=()=>{C.classList.remove("active"),O=window.setTimeout(()=>{C.classList.add("hide")},200)};y.addEventListener("keyup",(function(t){if(t.ctrlKey||"Control"===t.key)return!1;let n=this.value.toLowerCase(),i=[];e.forEach(e=>{let t=-1!==e.name.toLowerCase().indexOf(n);e.li.forEach(e=>e.style.display=t?"":"none"),t&&i.push(e)}),0===i.length&&e.forEach(e=>{e.li.forEach(e=>e.style.display="")})})),x.addEventListener("mousedown",(function(e){e.cancelBubble=!0,e.preventDefault(),y.matches(":focus")?y.blur():y.focus()}));let I=!1,N="";const D=new h.b({label:"Login.PhoneLabel",plainText:!0,name:"phone"});let M=D.input;M.type="tel",M.autocomplete="rr55RandomRR55",M.addEventListener("input",(function(e){this.classList.remove("error"),w.b.loadLottieWorkers();const n=this.value;let s,a;if(Math.abs(n.length-N.length)>1&&!I&&m.isAppleMobile&&(this.value=N+n),I=!1,D.setLabel(),"+"===this.value.replace(/\++/,"+"))this.value="+";else{const e=Object(i.c)(this.value);s=e.formatted,a=e.country,this.value=N=s?"+"+s:""}let o=a?a.name:"";o===y.value||t&&a&&t.phoneCode===a.phoneCode||(y.value=o,t=a),a||this.value.length-1>1?k.style.visibility="":k.style.visibility="hidden"})),M.addEventListener("paste",e=>{I=!0}),M.addEventListener("keypress",(function(e){return k.style.visibility||"Enter"!==e.key?!/\D/.test(e.key)||e.metaKey||e.ctrlKey||"+"===e.key&&e.shiftKey?void 0:(e.preventDefault(),!1):k.click()}));const H=new u.a({text:"Login.KeepSigned",name:"keepSession",withRipple:!0});H.input.checked=!0,k=Object(p.a)("btn-primary btn-color-primary",{text:"Login.Next"}),k.style.visibility="hidden",k.addEventListener("click",(function(e){this.setAttribute("disabled","true"),Object(c.z)(this,Object(L.i18n)("PleaseWait")),Object(i.f)(this);let t=M.value;r.a.invokeApi("auth.sendCode",{phone_number:t,api_id:g.a.id,api_hash:g.a.hash,settings:{_:"codeSettings"}}).then(e=>{n.e(10).then(n.bind(null,85)).then(n=>n.default.mount(Object.assign(e,{phone_number:t})))}).catch(e=>{switch(this.removeAttribute("disabled"),e.type){case"PHONE_NUMBER_INVALID":D.setError(),Object(c.z)(D.label,Object(L.i18n)("Login.PhoneLabelInvalid")),M.classList.add("error"),Object(c.z)(this,Object(L.i18n)("Login.Next"));break;default:console.error("auth.sendCode error:",e),this.innerText=e.type}})}));const V=Object(p.a)("btn-primary btn-secondary btn-primary-transparent primary",{text:"Login.QR.Login"});let R=!1;V.addEventListener("click",()=>{const e=n.e(14).then(n.bind(null,96));let t;V.disabled=!0,R||(t=Object(i.f)(V),R=!0),e.then(e=>{e.default.mount(),setTimeout(()=>{V.removeAttribute("disabled"),t&&t.remove()},200)})}),o.append(d.container,D.container,H.label,k,V);const z=document.createElement("h4");Object(L._i18n)(z,"Login.Title");const W=document.createElement("div");W.classList.add("subtitle"),Object(L._i18n)(W,"Login.StartText"),S.pageEl.querySelector(".container").append(z,W,o);v.isTouchSupported||setTimeout(()=>{M.focus()},0),r.a.invokeApi("help.getConfig").then(e=>{e.suggested_lang_code!==L.default.lastRequestedLangCode&&Promise.all([L.default.getStrings(e.suggested_lang_code,["Login.ContinueOnLanguage"]),L.default.getCacheLangPack()]).then(t=>{const n=[];t[0].forEach(e=>{const t=L.default.strings.get(e.key);t&&(n.push(t),L.default.strings.set(e.key,e))});const s=Object(p.a)("btn-primary btn-secondary btn-primary-transparent primary",{text:"Login.ContinueOnLanguage"});o.append(s),n.forEach(e=>{L.default.strings.set(e.key,e)}),Object(c.b)(s,t=>{Object(c.f)(t),s.disabled=!0,Object(i.f)(s),L.default.getLangPack(e.suggested_lang_code).then(()=>{s.remove()})})})}),r.a.invokeApi("help.getNearestDc").then(e=>{const t=[1,2,3,4,5],n=[e.this_dc];let i;return e.nearest_dc!==e.this_dc&&(i=r.a.getNetworker(e.nearest_dc).then(()=>{n.push(e.nearest_dc)})),(i||Promise.resolve()).then(()=>{const e=()=>{const i=t.shift();i&&setTimeout(()=>{r.a.getNetworker(i,{fileDownload:!0}).finally(e)},n.includes(i)?0:3e3)};e()}),e}).then(n=>{let i=e.find(e=>e.code===n.country);i&&(y.value.length||M.value.length||(y.value=i.name,t=i,M.value=N="+"+i.phoneCode.split(" and ").shift()))})},()=>{k&&(Object(c.z)(k,Object(L.i18n)("Login.Next")),Object(y.ripple)(k,void 0,void 0,!0),k.removeAttribute("disabled")),o.default.pushToState("authState",{_:"authStateSignIn"}),o.default.saveState()});t.default=S},78:function(e,t,n){"use strict";n.r(t);var i=n(12),s=n(16),a=n(20),o=n(64),r=n(7),l=n(14),c=n(8),d=n(13),h=n(11),u=n(47),p=n(29),m=n(37);let b=null;const v=new p.a("page-signUp",!0,()=>Promise.resolve().then(n.bind(null,35)).then(e=>{const t=new u.a({className:"page-signUp",withInputWrapper:!0,titleLangKey:"YourName",subtitleLangKey:"Login.Register.Subtitle"});t.imageDiv.classList.add("avatar-edit"),t.title.classList.add("fullName");const n=document.createElement("canvas");n.id="canvas-avatar",n.className="avatar-edit-canvas";const l=document.createElement("span");l.className="tgico tgico-cameraadd",t.imageDiv.append(n,l);const p=e.default;let v;t.imageDiv.addEventListener("click",()=>{(new o.a).open(n,e=>{v=e})});const g=e=>{const n=f.value||"",i=L.value||"",s=n||i?(n+" "+i).trim():"";s?Object(r.z)(t.title,h.b.wrapEmojiText(s)):Object(r.z)(t.title,Object(c.i18n)("YourName"))};const f=new s.b({label:"FirstName",maxLength:70}),L=new s.b({label:"LastName",maxLength:64}),w=Object(i.a)("btn-primary btn-color-primary"),y=new c.default.IntlElement({key:"StartMessaging"});w.append(y.element),t.inputWrapper.append(f.container,L.container,w),f.input.addEventListener("input",g),L.input.addEventListener("input",g),w.addEventListener("click",(function(e){if(f.input.classList.contains("error")||L.input.classList.contains("error"))return!1;if(!f.value.length)return f.input.classList.add("error"),!1;this.disabled=!0;const t=f.value.trim(),n=L.value.trim(),i={phone_number:b.phone_number,phone_code_hash:b.phone_code_hash,first_name:t,last_name:n};y.update({key:"PleaseWait"});const s=Object(a.f)(this);d.a.invokeApi("auth.signUp",i).then(e=>{switch(e._){case"auth.authorization":d.a.setUserAuth(e.user.id),new Promise((e,t)=>{if(!v)return e();v().then(n=>{p.uploadProfilePhoto(n).then(e,t)},t)}).finally(()=>{m.default.mount()});break;default:y.update({key:e._}),this.removeAttribute("disabled"),s.remove()}}).catch(e=>{this.removeAttribute("disabled"),s.remove(),e.type,y.update({key:e.type})})}))}),e=>{b=e,l.default.pushToState("authState",{_:"authStateSignUp",authCode:e}),l.default.saveState()});t.default=v},85:function(e,t,n){"use strict";n.r(t);var i=n(23),s=n(14),a=n(13),o=n(29),r=n(37),l=n(66),c=n(76),d=n(78),h=n(71),u=n(72),p=n(7),m=n(8),b=function(e,t,n,i){return new(n||(n=Promise))((function(s,a){function o(e){try{l(i.next(e))}catch(e){a(e)}}function r(e){try{l(i.throw(e))}catch(e){a(e)}}function l(e){var t;e.done?s(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(o,r)}l((i=i.apply(e,t||[])).next())}))};let v,g=null,f=null,L=null;const w=new o.a("page-authCode",!0,()=>{const e=g.type.length,t=new u.a({label:"Code",name:"code",length:e,onFill:e=>{s(""+e)}});v=t.input,w.pageEl.querySelector(".input-wrapper").append(t.container);w.pageEl.querySelector(".phone-edit").addEventListener("click",(function(){return c.default.mount()}));const n=()=>{setTimeout(()=>{L.remove()},300)},s=e=>{v.setAttribute("disabled","true");const i={phone_number:g.phone_number,phone_code_hash:g.phone_code_hash,phone_code:e};a.a.invokeApi("auth.signIn",i,{ignoreErrors:!0}).then(e=>{switch(e._){case"auth.authorization":a.a.setUserAuth(e.user.id),r.default.mount(),n();break;case"auth.authorizationSignUpRequired":d.default.mount({phone_number:g.phone_number,phone_code_hash:g.phone_code_hash}),n()}}).catch(e=>b(void 0,void 0,void 0,(function*(){switch(e.type){case"SESSION_PASSWORD_NEEDED":e.handled=!0,yield l.default.mount();break;case"PHONE_CODE_EXPIRED":v.classList.add("error"),Object(p.z)(t.label,Object(m.i18n)("PHONE_CODE_EXPIRED"));break;case"PHONE_CODE_EMPTY":case"PHONE_CODE_INVALID":v.classList.add("error"),Object(p.z)(t.label,Object(m.i18n)("PHONE_CODE_INVALID"));break;default:t.label.innerText=e.type}v.removeAttribute("disabled")})))},o=w.pageEl.querySelector(".auth-image"),f=i.b.isMobile?100:166,L=new h.a(t,f);return o.append(L.container),L.load()},e=>{if(g=e,f){v.value="";const e=document.createEvent("HTMLEvents");e.initEvent("input",!1,!0),v.dispatchEvent(e)}else f=w.pageEl.getElementsByClassName("phone")[0],L=w.pageEl.getElementsByClassName("sent-type")[0];let t,n;switch(f.innerText=g.phone_number,g.type._){case"auth.sentCodeTypeSms":t="Login.Code.SentSms";break;case"auth.sentCodeTypeApp":t="Login.Code.SentInApp";break;case"auth.sentCodeTypeCall":t="Login.Code.SentCall";break;default:t="Login.Code.SentUnknown",n=[g.type._]}Object(p.z)(L,Object(m.i18n)(t,n)),s.default.pushToState("authState",{_:"authStateAuthCode",sentCode:e}),s.default.saveState()},()=>{v.focus()});t.default=w}}]);
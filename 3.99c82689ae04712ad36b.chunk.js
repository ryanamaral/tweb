(this.webpackJsonp=this.webpackJsonp||[]).push([[3],{11:function(e,t,n){"use strict";var i=n(7),s=n(23);t.a=(e,t={})=>{const n=document.createElement("button");return n.className=e+(t.icon?" tgico-"+t.icon:""),t.noRipple||(t.rippleSquare&&n.classList.add("rp-square"),Object(s.ripple)(n)),t.onlyMobile&&n.classList.add("only-handhelds"),t.disabled&&(n.disabled=!0),t.text&&n.append(Object(i.i18n)(t.text)),n}},18:function(e,t,n){"use strict";n.d(t,"a",(function(){return d}));var i=n(6),s=n(22),a=n(35),o=n(7),r=n(10);let l=()=>{document.addEventListener("paste",e=>{if(!e.target.hasAttribute("contenteditable")&&!e.target.parentElement.hasAttribute("contenteditable"))return;e.preventDefault();let t=(e.originalEvent||e).clipboardData.getData("text/plain"),n=r.b.parseEntities(t);n=n.filter(e=>"messageEntityEmoji"===e._||"messageEntityLinebreak"===e._),t=r.b.wrapRichText(t,{entities:n,noLinks:!0,wrappingDraft:!0}),window.document.execCommand("insertHTML",!1,t)}),l=null};const c=e=>{const t=(e instanceof HTMLInputElement?e.value:e.innerText)[0];let n="ltr";t&&Object(a.b)(t)&&(n="rtl"),e.style.direction=n};var d;!function(e){e[e.Neutral=0]="Neutral",e[e.Valid=1]="Valid",e[e.Error=2]="Error"}(d||(d={}));t.b=class{constructor(e={}){this.options=e,this.container=document.createElement("div"),this.container.classList.add("input-field"),e.maxLength&&(e.showLengthOn=Math.round(e.maxLength/3));const{placeholder:t,maxLength:n,showLengthOn:a,name:r,plainText:d}=e;let h,p,u=e.label||e.labelText;if(d)this.container.innerHTML=`\n      <input type="text" ${r?`name="${r}"`:""} autocomplete="off" ${u?'required=""':""} class="input-field-input">\n      `,h=this.container.firstElementChild,h.addEventListener("input",()=>c(h));else{l&&l(),this.container.innerHTML='\n      <div contenteditable="true" class="input-field-input"></div>\n      ',h=this.container.firstElementChild;const t=new MutationObserver(()=>{c(h),p&&p()});h.addEventListener("input",()=>{Object(i.u)(h)&&(h.innerHTML=""),this.inputFake&&(this.inputFake.innerHTML=h.innerHTML,this.onFakeInput())}),t.observe(h,{characterData:!0,childList:!0,subtree:!0}),e.animate&&(h.classList.add("scrollable","scrollable-y"),this.wasInputFakeClientHeight=0,this.showScrollDebounced=Object(s.a)(()=>this.input.classList.remove("no-scrollbar"),150,!1,!0),this.inputFake=document.createElement("div"),this.inputFake.setAttribute("contenteditable","true"),this.inputFake.className=h.className+" input-field-input-fake")}if(t&&Object(o._i18n)(h,t,void 0,"placeholder"),u&&(this.label=document.createElement("label"),this.setLabel(),this.container.append(this.label)),n){const e=this.container.lastElementChild;let t=!1;p=()=>{const s=h.classList.contains("error"),o=d?h.value.length:[...Object(i.n)(h)].length,r=n-o,l=r<0;h.classList.toggle("error",l),l||r<=a?(this.setLabel(),e.append(` (${n-o})`),t||(t=!0)):(s&&!l||t)&&(this.setLabel(),t=!1)},h.addEventListener("input",p)}this.input=h}setLabel(){this.label.textContent="",this.options.labelText?this.label.innerHTML=this.options.labelText:this.label.append(Object(o.i18n)(this.options.label,this.options.labelOptions))}onFakeInput(){const{scrollHeight:e,clientHeight:t}=this.inputFake;this.wasInputFakeClientHeight&&this.wasInputFakeClientHeight!==t&&(this.input.classList.add("no-scrollbar"),this.showScrollDebounced()),this.wasInputFakeClientHeight=t,this.input.style.height=e?e+"px":""}get value(){return this.options.plainText?this.input.value:Object(i.n)(this.input)}set value(e){this.setValueSilently(e,!1);const t=new Event("input",{bubbles:!0,cancelable:!0});this.input.dispatchEvent(t)}setValueSilently(e,t=!0){this.options.plainText?this.input.value=e:(this.input.innerHTML=e,this.inputFake&&(this.inputFake.innerHTML=e,t&&this.onFakeInput()))}isValid(){return!this.input.classList.contains("error")&&this.value!==this.originalValue}setOriginalValue(e="",t=!1){this.originalValue=e,this.options.plainText||(e=r.b.wrapDraftText(e)),t?this.setValueSilently(e,!1):this.value=e}setState(e,t){t&&(this.label.textContent="",this.label.append(Object(o.i18n)(t,this.options.labelOptions))),this.input.classList.toggle("error",!!(e&d.Error)),this.input.classList.toggle("valid",!!(e&d.Valid))}setError(e){this.setState(d.Error,e)}}},23:function(e,t,n){"use strict";n.r(t),n.d(t,"ripple",(function(){return r}));var i=n(0),s=n(21),a=n(8);let o=0;function r(e,t=(()=>Promise.resolve()),n=null,r=!1){if(e.querySelector(".c-ripple"))return;e.classList.add("rp");let l=document.createElement("div");l.classList.add("c-ripple");let c;e.classList.contains("rp-square")&&l.classList.add("is-square"),e[r?"prepend":"append"](l);const d=(e,i)=>{const a=Date.now(),r=document.createElement("div"),d=o++,p=1e3*+window.getComputedStyle(l).getPropertyValue("--ripple-duration").replace("s","");c=()=>{let e=Date.now()-a;if(e<p){let t=Math.max(p-e,p/2);setTimeout(()=>r.classList.add("hiding"),Math.max(t-p/2,0)),setTimeout(()=>{r.remove(),n&&n(d)},t)}else r.classList.add("hiding"),setTimeout(()=>{r.remove(),n&&n(d)},p/2);s.isTouchSupported||window.removeEventListener("contextmenu",c),c=null,h=!1},t&&t(d),window.requestAnimationFrame(()=>{let t=l.getBoundingClientRect();r.classList.add("c-ripple__circle");let n,s,a=e-t.left,o=i-t.top;t.width>t.height?(n=t.width,s=a):(n=t.height,s=o),n-=s>n/2?n-s:s,n*=1.1;let c=a-n/2,d=o-n/2;r.style.width=r.style.height=n+"px",r.style.left=c+"px",r.style.top=d+"px",l.append(r)})};let h=!1;if(s.isTouchSupported){let t=()=>{c&&c()};e.addEventListener("touchstart",n=>{if(!a.default.settings.animationsEnabled)return;if(n.touches.length>1||h||["BUTTON","A"].includes(n.target.tagName)&&n.target!==e||Object(i.a)(n.target,"c-ripple")!==l)return;h=!0;let{clientX:s,clientY:o}=n.touches[0];d(s,o),e.addEventListener("touchend",t,{once:!0}),window.addEventListener("touchmove",n=>{n.cancelBubble=!0,n.stopPropagation(),t(),e.removeEventListener("touchend",t)},{once:!0})},{passive:!0})}else e.addEventListener("mousedown",t=>{if(![0,2].includes(t.button))return;if(!a.default.settings.animationsEnabled)return;if("0"===e.dataset.ripple||Object(i.a)(t.target,"c-ripple")!==l||"A"===t.target.tagName)return!1;if(h)return h=!1,!1;let{clientX:n,clientY:s}=t;d(n,s),window.addEventListener("mouseup",c,{once:!0}),window.addEventListener("contextmenu",c,{once:!0})})}},40:function(e,t,n){"use strict";n.d(t,"b",(function(){return d})),n.d(t,"a",(function(){return h}));var i=n(8),s=n(6),a=n(23),o=n(37),r=n(44),l=n(7),c=n(0);class d{constructor(e,t,n={}){if(this.element=document.createElement("div"),this.container=document.createElement("div"),this.header=document.createElement("div"),this.title=document.createElement("div"),this.onEscape=()=>!0,this.hide=()=>{r.a.back("popup")},this.destroy=()=>{this.onClose&&this.onClose(),this.element.classList.add("hiding"),this.element.classList.remove("active"),this.btnClose&&this.btnClose.removeEventListener("click",this.hide),i.default.overlayIsActive=!1,r.a.removeItem(this.navigationItem),this.navigationItem=void 0,setTimeout(()=>{this.element.remove(),this.onCloseAfterTimeout&&this.onCloseAfterTimeout(),o.a.checkAnimations(!1)},150)},this.element.classList.add("popup"),this.element.className="popup"+(e?" "+e:""),this.container.classList.add("popup-container","z-depth-1"),this.header.classList.add("popup-header"),this.title.classList.add("popup-title"),this.header.append(this.title),n.closable&&(this.btnClose=document.createElement("span"),this.btnClose.classList.add("btn-icon","popup-close","tgico-close"),this.header.prepend(this.btnClose),this.btnClose.addEventListener("click",this.hide,{once:!0})),n.overlayClosable){const e=t=>{Object(c.a)(t.target,"popup-container")||(this.hide(),this.element.removeEventListener("click",e))};this.element.addEventListener("click",e)}if(n.withConfirm&&(this.btnConfirm=document.createElement("button"),this.btnConfirm.classList.add("btn-primary","btn-color-primary"),!0!==n.withConfirm&&this.btnConfirm.append(Object(l.i18n)(n.withConfirm)),this.header.append(this.btnConfirm),Object(a.ripple)(this.btnConfirm)),this.container.append(this.header),n.body&&(this.body=document.createElement("div"),this.body.classList.add("popup-body"),this.container.append(this.body)),t&&t.length){const e=document.createElement("div");e.classList.add("popup-buttons"),2===t.length&&e.classList.add("popup-buttons-row");const n=t.map(e=>{const t=document.createElement("button");return t.className="btn"+(e.isDanger?" danger":" primary"),Object(a.ripple)(t),e.text?t.innerHTML=e.text:t.append(Object(l.i18n)(e.langKey,e.langArgs)),e.callback?t.addEventListener("click",()=>{e.callback(),this.destroy()},{once:!0}):e.isCancel&&t.addEventListener("click",()=>{this.destroy()},{once:!0}),t});e.append(...n),this.container.append(e)}this.element.append(this.container)}show(){this.navigationItem={type:"popup",onPop:this.destroy,onEscape:this.onEscape},r.a.pushItem(this.navigationItem),Object(s.c)(),document.body.append(this.element),this.element.offsetWidth,this.element.classList.add("active"),i.default.overlayIsActive=!0,o.a.checkAnimations(!0)}}const h=e=>(e.find(e=>e.isCancel)||e.push({langKey:"Cancel",isCancel:!0}),e)},83:function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var i=n(53);var s=function(e,t){let n,i,s,a={},o=0,r=0,l=0,c=0,d=0;function h(){e.classList.add("crop-blur"),e.draggable=!1,s=new Image,s.src=e.src,s.draggable=!1,s.classList.add("crop-overlay-image"),t||(t=document.createElement("canvas")),n=document.createElement("div"),n.classList.add("crop-component"),i=document.createElement("div"),i.classList.add("crop-overlay");const a=document.createElement("div");a.classList.add("crop-overlay-color"),n.appendChild(i);e.parentNode.appendChild(n),n.appendChild(s),n.appendChild(e),n.appendChild(a),i.appendChild(s),s.style.maxWidth=e.width+"px",d=e.naturalWidth/e.offsetWidth;const o=e.offsetWidth/2-100,r=e.offsetHeight/2-100;p(200,200),u(o,r),m(o,r),i.addEventListener("mousedown",g,!1),i.addEventListener("touchstart",g,!1),i.addEventListener("wheel",f,!1),document.addEventListener("keypress",b,!1)}function p(e,t){l=e*d,c=t*d,i.style.width=e+"px",i.style.height=t+"px"}function u(e,t){r=t*d,o=e*d,s.style.top=-t+"px",s.style.left=-e+"px"}function m(e,t){i.style.top=t+"px",i.style.left=e+"px"}function v(e){e=e*Math.PI*2;let t,n,a,o,r=Math.floor(i.clientWidth+e),l=Math.floor(i.clientHeight+e),c=s.clientWidth,d=s.clientHeight;r<50||r>c||(t=i.offsetLeft-e/2,n=i.offsetTop-e/2,a=t+r,o=n+l,t<0&&(t=0),n<0&&(n=0),a>c||o>d||(p(r,r),u(t,n),m(t,n)))}function b(e){switch(e.preventDefault(),String.fromCharCode(e.charCode)){case"+":v(4);break;case"-":v(-4)}}function f(e){e.preventDefault(),v(e.deltaY>0?1:-1)}function g(e){e.preventDefault(),e.stopPropagation(),function(e){a.container_width=i.offsetWidth,a.container_height=i.offsetHeight,a.container_left=i.offsetLeft,a.container_top=i.offsetTop,a.mouse_x=(e.clientX||e.pageX||e.touches&&e.touches[0].clientX)+window.scrollX,a.mouse_y=(e.clientY||e.pageY||e.touches&&e.touches[0].clientY)+window.scrollY}(e),document.addEventListener("mousemove",E),document.addEventListener("touchmove",E),document.addEventListener("mouseup",L),document.addEventListener("touchend",L)}function L(e){e.preventDefault(),document.removeEventListener("mouseup",L),document.removeEventListener("touchend",L),document.removeEventListener("mousemove",E),document.removeEventListener("touchmove",E)}function E(e){let t,n,o,r,l={x:0,y:0};e.preventDefault(),e.stopPropagation(),l.x=e.pageX||e.touches&&e.touches[0].pageX,l.y=e.pageY||e.touches&&e.touches[0].pageY,t=l.x-(a.mouse_x-a.container_left),n=l.y-(a.mouse_y-a.container_top),o=i.offsetWidth,r=i.offsetHeight,t<0?t=0:t>s.offsetWidth-o&&(t=s.offsetWidth-o),n<0?n=0:n>s.offsetHeight-r&&(n=s.offsetHeight-r),u(t,n),m(t,n)}return e.complete?h():e.onload=h,{crop:function(){t.width=l,t.height=c,t.getContext("2d").drawImage(e,o,r,l,c,0,0,l,c)},removeHandlers:function(){i.removeEventListener("mousedown",g),i.removeEventListener("touchstart",g),i.removeEventListener("wheel",f),document.removeEventListener("mouseup",L),document.removeEventListener("touchend",L),document.removeEventListener("mousemove",E),document.removeEventListener("touchmove",E),document.removeEventListener("keypress",b),n.remove(),i.remove(),s.remove()}}},a=n(40),o=n(23),r=n(7);class l extends a.b{constructor(){super("popup-avatar",null,{closable:!0}),this.image=new Image,this.cropper={crop:()=>{},removeHandlers:()=>{}},this.h6=document.createElement("h6"),Object(r._i18n)(this.h6,"Popup.Avatar.Title"),this.btnClose.classList.remove("btn-icon"),this.header.append(this.h6),this.cropContainer=document.createElement("div"),this.cropContainer.classList.add("crop"),this.cropContainer.append(this.image),this.input=document.createElement("input"),this.input.type="file",this.input.style.display="none",this.input.addEventListener("change",e=>{const t=e.target.files[0];if(!t)return;const n=new FileReader;n.onload=e=>{const t=e.target.result;this.image=new Image,this.cropContainer.append(this.image),this.image.src=t,this.image.onload=()=>{this.show(),this.cropper=s(this.image,this.canvas),this.input.value=""}},n.readAsDataURL(t)},!1),this.btnSubmit=document.createElement("button"),this.btnSubmit.className="btn-primary btn-color-primary btn-circle btn-crop btn-icon tgico-check z-depth-1",Object(o.ripple)(this.btnSubmit),this.btnSubmit.addEventListener("click",()=>{this.cropper.crop(),this.btnClose.click(),this.canvas.toBlob(e=>{this.blob=e,this.darkenCanvas(),this.resolve()},"image/jpeg",1)}),this.container.append(this.cropContainer,this.btnSubmit,this.input),this.onCloseAfterTimeout=()=>{this.cropper.removeHandlers(),this.image&&this.image.remove()}}resolve(){this.onCrop(()=>i.a.upload(this.blob))}open(e,t){this.canvas=e,this.onCrop=t,this.input.click()}darkenCanvas(){let e=this.canvas.getContext("2d");e.fillStyle="rgba(0, 0, 0, 0.3)",e.fillRect(0,0,this.canvas.width,this.canvas.height)}}}}]);
(this.webpackJsonp=this.webpackJsonp||[]).push([[12],{11:function(e,t,n){"use strict";var i=n(7),s=n(23);t.a=(e,t={})=>{const n=document.createElement("button");return n.className=e+(t.icon?" tgico-"+t.icon:""),t.noRipple||(t.rippleSquare&&n.classList.add("rp-square"),Object(s.ripple)(n)),t.onlyMobile&&n.classList.add("only-handhelds"),t.disabled&&(n.disabled=!0),t.text&&n.append(Object(i.i18n)(t.text)),n}},23:function(e,t,n){"use strict";n.r(t),n.d(t,"ripple",(function(){return o}));var i=n(0),s=n(21),c=n(8);let a=0;function o(e,t=(()=>Promise.resolve()),n=null,o=!1){if(e.querySelector(".c-ripple"))return;e.classList.add("rp");let r=document.createElement("div");r.classList.add("c-ripple");let l;e.classList.contains("rp-square")&&r.classList.add("is-square"),e[o?"prepend":"append"](r);const d=(e,i)=>{const c=Date.now(),o=document.createElement("div"),d=a++,p=1e3*+window.getComputedStyle(r).getPropertyValue("--ripple-duration").replace("s","");l=()=>{let e=Date.now()-c;if(e<p){let t=Math.max(p-e,p/2);setTimeout(()=>o.classList.add("hiding"),Math.max(t-p/2,0)),setTimeout(()=>{o.remove(),n&&n(d)},t)}else o.classList.add("hiding"),setTimeout(()=>{o.remove(),n&&n(d)},p/2);s.isTouchSupported||window.removeEventListener("contextmenu",l),l=null,u=!1},t&&t(d),window.requestAnimationFrame(()=>{let t=r.getBoundingClientRect();o.classList.add("c-ripple__circle");let n,s,c=e-t.left,a=i-t.top;t.width>t.height?(n=t.width,s=c):(n=t.height,s=a),n-=s>n/2?n-s:s,n*=1.1;let l=c-n/2,d=a-n/2;o.style.width=o.style.height=n+"px",o.style.left=l+"px",o.style.top=d+"px",r.append(o)})};let u=!1;if(s.isTouchSupported){let t=()=>{l&&l()};e.addEventListener("touchstart",n=>{if(!c.default.settings.animationsEnabled)return;if(n.touches.length>1||u||["BUTTON","A"].includes(n.target.tagName)&&n.target!==e||Object(i.a)(n.target,"c-ripple")!==r)return;u=!0;let{clientX:s,clientY:a}=n.touches[0];d(s,a),e.addEventListener("touchend",t,{once:!0}),window.addEventListener("touchmove",n=>{n.cancelBubble=!0,n.stopPropagation(),t(),e.removeEventListener("touchend",t)},{once:!0})},{passive:!0})}else e.addEventListener("mousedown",t=>{if(![0,2].includes(t.button))return;if(!c.default.settings.animationsEnabled)return;if("0"===e.dataset.ripple||Object(i.a)(t.target,"c-ripple")!==r||"A"===t.target.tagName)return!1;if(u)return u=!1,!1;let{clientX:n,clientY:s}=t;d(n,s),window.addEventListener("mouseup",l,{once:!0}),window.addEventListener("contextmenu",l,{once:!0})})}},34:function(e,t,n){"use strict";var i=n(11);t.a=(e,t={})=>Object(i.a)("btn-icon",Object.assign({icon:e},t))},50:function(e,t,n){"use strict";var i=n(6),s=n(7),c=n(16),a=n(23);const o=e=>{if(e.element)return e.element;const{icon:t,text:n,onClick:o}=e,r=document.createElement("div");r.className="btn-menu-item tgico-"+t,Object(a.ripple)(r);const l=Object(s.i18n)(n);return l.classList.add("btn-menu-item-text"),r.append(l),e.checkboxField&&(r.append(e.checkboxField.label),Object(i.b)(r,()=>{e.checkboxField.checked=!e.checkboxField.checked},e.options)),Object(i.b)(r,"click"!==i.a?e=>{Object(i.f)(e),o(e),Object(c.b)()}:o,e.options),e.element=r};t.a=(e,t)=>{const n=document.createElement("div");n.classList.add("btn-menu"),t&&e.forEach(e=>{e.options?e.options.listenerSetter=t:e.options={listenerSetter:t}});const i=e.map(o);return n.append(...i),n}},60:function(e,t,n){"use strict";n.r(t),n.d(t,"ButtonMenuToggleHandler",(function(){return o}));var i=n(6),s=n(34),c=n(50),a=n(16);const o=(e,t,n)=>{((null==n?void 0:n.listenerSetter)?n.listenerSetter.add.bind(n.listenerSetter,e):e.addEventListener.bind(e))(i.a,n=>{if(!e.classList.contains("btn-menu-toggle"))return!1;const s=e.querySelector(".btn-menu");Object(i.f)(n),e.classList.contains("menu-open")?Object(a.b)():(t&&t(n),Object(a.d)(s))})};t.default=(e={},t,n,i)=>{const a=Object(s.a)("more btn-menu-toggle",e),r=Object(c.a)(n,e.listenerSetter);return r.classList.add(t),o(a,i,e),a.append(r),a}}}]);
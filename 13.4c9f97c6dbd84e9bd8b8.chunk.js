(this.webpackJsonp=this.webpackJsonp||[]).push([[13,19],{12:function(e,t,n){"use strict";var i=n(8),s=n(18);t.a=(e,t={})=>{const n=document.createElement("button");return n.className=e+(t.icon?" tgico-"+t.icon:""),t.noRipple||(t.rippleSquare&&n.classList.add("rp-square"),Object(s.ripple)(n)),t.onlyMobile&&n.classList.add("only-handhelds"),t.disabled&&(n.disabled=!0),t.text&&n.append(Object(i.i18n)(t.text)),n}},17:function(e,t,n){"use strict";n.d(t,"a",(function(){return d}));var i=n(7),s=n(19),a=n(33),o=n(8),l=n(11);let r=()=>{document.addEventListener("paste",e=>{if(!e.target.hasAttribute("contenteditable")&&!e.target.parentElement.hasAttribute("contenteditable"))return;e.preventDefault();let t=(e.originalEvent||e).clipboardData.getData("text/plain"),n=l.b.parseEntities(t);n=n.filter(e=>"messageEntityEmoji"===e._||"messageEntityLinebreak"===e._),t=l.b.wrapRichText(t,{entities:n,noLinks:!0,wrappingDraft:!0}),window.document.execCommand("insertHTML",!1,t)}),r=null};const c=e=>{const t=(e instanceof HTMLInputElement?e.value:e.innerText)[0];let n="ltr";t&&Object(a.b)(t)&&(n="rtl"),e.style.direction=n};var d;!function(e){e[e.Neutral=0]="Neutral",e[e.Valid=1]="Valid",e[e.Error=2]="Error"}(d||(d={}));t.b=class{constructor(e={}){this.options=e,this.container=document.createElement("div"),this.container.classList.add("input-field"),e.maxLength&&(e.showLengthOn=Math.round(e.maxLength/3));const{placeholder:t,maxLength:n,showLengthOn:a,name:l,plainText:d}=e;let h,u,p=e.label||e.labelText;if(d)this.container.innerHTML=`\n      <input type="text" ${l?`name="${l}"`:""} autocomplete="off" ${p?'required=""':""} class="input-field-input">\n      `,h=this.container.firstElementChild,h.addEventListener("input",()=>c(h));else{r&&r(),this.container.innerHTML='\n      <div contenteditable="true" class="input-field-input"></div>\n      ',h=this.container.firstElementChild;const t=new MutationObserver(()=>{c(h),u&&u()});h.addEventListener("input",()=>{Object(i.s)(h)&&(h.innerHTML=""),this.inputFake&&(this.inputFake.innerHTML=h.innerHTML,this.onFakeInput())}),t.observe(h,{characterData:!0,childList:!0,subtree:!0}),e.animate&&(h.classList.add("scrollable","scrollable-y"),this.wasInputFakeClientHeight=0,this.showScrollDebounced=Object(s.a)(()=>this.input.classList.remove("no-scrollbar"),150,!1,!0),this.inputFake=document.createElement("div"),this.inputFake.setAttribute("contenteditable","true"),this.inputFake.className=h.className+" input-field-input-fake")}if(t&&(Object(o._i18n)(h,t,void 0,"placeholder"),this.inputFake&&Object(o._i18n)(this.inputFake,t,void 0,"placeholder")),p&&(this.label=document.createElement("label"),this.setLabel(),this.container.append(this.label)),n){const e=this.container.lastElementChild;let t=!1;u=()=>{const s=h.classList.contains("error"),o=d?h.value.length:[...Object(i.l)(h)].length,l=n-o,r=l<0;h.classList.toggle("error",r),r||l<=a?(this.setLabel(),e.append(` (${n-o})`),t||(t=!0)):(s&&!r||t)&&(this.setLabel(),t=!1)},h.addEventListener("input",u)}this.input=h}select(){this.input.value&&this.input.select()}setLabel(){this.label.textContent="",this.options.labelText?this.label.innerHTML=this.options.labelText:this.label.append(Object(o.i18n)(this.options.label,this.options.labelOptions))}onFakeInput(){const{scrollHeight:e,clientHeight:t}=this.inputFake;this.wasInputFakeClientHeight&&this.wasInputFakeClientHeight!==t&&(this.input.classList.add("no-scrollbar"),this.showScrollDebounced()),this.wasInputFakeClientHeight=t,this.input.style.height=e?e+"px":""}get value(){return this.options.plainText?this.input.value:Object(i.l)(this.input)}set value(e){this.setValueSilently(e,!1);const t=new Event("input",{bubbles:!0,cancelable:!0});this.input.dispatchEvent(t)}setValueSilently(e,t=!0){this.options.plainText?this.input.value=e:(this.input.innerHTML=e,this.inputFake&&(this.inputFake.innerHTML=e,t&&this.onFakeInput()))}isValid(){return!this.input.classList.contains("error")&&this.value!==this.originalValue}setOriginalValue(e="",t=!1){this.originalValue=e,this.options.plainText||(e=l.b.wrapDraftText(e)),t?this.setValueSilently(e,!1):this.value=e}setState(e,t){t&&(this.label.textContent="",this.label.append(Object(o.i18n)(t,this.options.labelOptions))),this.input.classList.toggle("error",!!(e&d.Error)),this.input.classList.toggle("valid",!!(e&d.Valid))}setError(e){this.setState(d.Error,e)}}},18:function(e,t,n){"use strict";n.r(t),n.d(t,"ripple",(function(){return r}));var i=n(0),s=n(57),a=n(21),o=n(9);let l=0;function r(e,t=(()=>Promise.resolve()),n=null,r=!1){if(e.querySelector(".c-ripple"))return;e.classList.add("rp");let c=document.createElement("div");c.classList.add("c-ripple");let d;e.classList.contains("rp-square")&&c.classList.add("is-square"),e[r?"prepend":"append"](c);const h=(e,i)=>{const o=Date.now(),r=document.createElement("div"),h=l++,p=1e3*+window.getComputedStyle(c).getPropertyValue("--ripple-duration").replace("s","");d=()=>{let e=Date.now()-o;const t=()=>{s.a.mutate(()=>{r.remove()}),n&&n(h)};if(e<p){let n=Math.max(p-e,p/2);setTimeout(()=>r.classList.add("hiding"),Math.max(n-p/2,0)),setTimeout(t,n)}else r.classList.add("hiding"),setTimeout(t,p/2);a.isTouchSupported||window.removeEventListener("contextmenu",d),d=null,u=!1},t&&t(h),window.requestAnimationFrame(()=>{const t=c.getBoundingClientRect();r.classList.add("c-ripple__circle");const n=e-t.left,s=i-t.top,a=Math.sqrt(Math.pow(Math.abs(s-t.height/2)+t.height/2,2)+Math.pow(Math.abs(n-t.width/2)+t.width/2,2)),o=n-a/2,l=s-a/2;r.style.width=r.style.height=a+"px",r.style.left=o+"px",r.style.top=l+"px",c.append(r)})};let u=!1;if(a.isTouchSupported){let t=()=>{d&&d()};e.addEventListener("touchstart",n=>{if(!o.default.settings.animationsEnabled)return;if(n.touches.length>1||u||["BUTTON","A"].includes(n.target.tagName)&&n.target!==e||Object(i.a)(n.target,"c-ripple")!==c)return;u=!0;let{clientX:s,clientY:a}=n.touches[0];h(s,a),e.addEventListener("touchend",t,{once:!0}),window.addEventListener("touchmove",n=>{n.cancelBubble=!0,n.stopPropagation(),t(),e.removeEventListener("touchend",t)},{once:!0})},{passive:!0})}else e.addEventListener("mousedown",t=>{if(![0,2].includes(t.button))return;if(!o.default.settings.animationsEnabled)return;if("0"===e.dataset.ripple||Object(i.a)(t.target,"c-ripple")!==c||"A"===t.target.tagName)return!1;if(u)return u=!1,!1;let{clientX:n,clientY:s}=t;h(n,s),window.addEventListener("mouseup",d,{once:!0}),window.addEventListener("contextmenu",d,{once:!0})})}},27:function(e,t,n){"use strict";n.d(t,"b",(function(){return c})),n.d(t,"a",(function(){return d}));var i=n(21),s=n(26),a=n(54),o=n(41),l=n(7);class r{constructor(e,t="",n=document.createElement("div")){this.el=e,this.container=n,this.onScrollMeasure=0,this.isHeavyAnimationInProgress=!1,this.needCheckAfterAnimation=!1,this.container.classList.add("scrollable"),this.log=Object(s.b)("SCROLL"+(t?"-"+t:""),s.a.error),e&&(Array.from(e.children).forEach(e=>this.container.append(e)),e.append(this.container))}setListeners(){window.addEventListener("resize",this.onScroll,{passive:!0}),this.container.addEventListener("scroll",this.onScroll,{passive:!0,capture:!0}),Object(o.a)(()=>{this.isHeavyAnimationInProgress=!0,this.onScrollMeasure&&(this.needCheckAfterAnimation=!0,window.cancelAnimationFrame(this.onScrollMeasure))},()=>{this.isHeavyAnimationInProgress=!1,this.needCheckAfterAnimation&&(this.onScroll(),this.needCheckAfterAnimation=!1)})}append(e){this.container.append(e)}scrollIntoViewNew(e,t,n,i,s,o,l){return Object(a.b)(this.container,e,t,n,i,s,o,l)}}class c extends r{constructor(e,t="",n=300,i){super(e,t),this.onScrollOffset=n,this.onAdditionalScroll=null,this.onScrolledTop=null,this.onScrolledBottom=null,this.lastScrollTop=0,this.lastScrollDirection=0,this.loadedAll={top:!0,bottom:!1},this.onScroll=()=>{if(this.isHeavyAnimationInProgress)return this.onScrollMeasure&&window.cancelAnimationFrame(this.onScrollMeasure),void(this.needCheckAfterAnimation=!0);(this.onScrolledTop||this.onScrolledBottom||this.splitUp||this.onAdditionalScroll)&&(this.onScrollMeasure&&window.cancelAnimationFrame(this.onScrollMeasure),this.onScrollMeasure=window.requestAnimationFrame(()=>{this.onScrollMeasure=0;const e=this.container.scrollTop;this.lastScrollDirection=this.lastScrollTop===e?0:this.lastScrollTop<e?1:-1,this.lastScrollTop=e,this.onAdditionalScroll&&0!==this.lastScrollDirection&&this.onAdditionalScroll(),this.checkForTriggers&&this.checkForTriggers()}))},this.checkForTriggers=()=>{if(!this.onScrolledTop&&!this.onScrolledBottom)return;if(this.isHeavyAnimationInProgress)return void this.onScroll();const e=this.container.scrollHeight;if(!e)return;const t=e-this.container.clientHeight,n=this.lastScrollTop;this.onScrolledTop&&n<=this.onScrollOffset&&this.lastScrollDirection<=0&&this.onScrolledTop(),this.onScrolledBottom&&t-n<=this.onScrollOffset&&this.lastScrollDirection>=0&&this.onScrolledBottom()},this.container.classList.add("scrollable-y"),this.setListeners()}setVirtualContainer(e){this.splitUp=e,this.log("setVirtualContainer:",e,this)}prepend(...e){(this.splitUp||this.padding||this.container).prepend(...e)}append(...e){(this.splitUp||this.padding||this.container).append(...e)}getDistanceToEnd(){return this.scrollHeight-Math.round(this.scrollTop+this.container.offsetHeight)}get isScrolledDown(){return this.getDistanceToEnd()<=1}set scrollTop(e){this.container.scrollTop=e}get scrollTop(){return this.container.scrollTop}get scrollHeight(){return this.container.scrollHeight}}class d extends r{constructor(e,t="",n=300,s=15,a=document.createElement("div")){if(super(e,t,a),this.onScrollOffset=n,this.splitCount=s,this.container=a,this.container.classList.add("scrollable-x"),!i.isTouchSupported){const e=e=>{e.deltaX||(this.container.scrollLeft+=e.deltaY/4,Object(l.f)(e))};this.container.addEventListener("wheel",e,{passive:!1})}}}},29:function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var i=n(14),s=n(15),a=n(18),o=n(8);class l{constructor(e={}){const t=this.label=document.createElement("label");t.classList.add("checkbox-field"),e.restriction&&t.classList.add("checkbox-field-restriction"),e.round&&t.classList.add("checkbox-field-round"),e.disabled&&t.classList.add("checkbox-disabled");const n=this.input=document.createElement("input");let l;if(n.type="checkbox",e.name&&(n.id="input-"+e.name),e.checked&&(n.checked=!0),e.stateKey&&i.default.getState().then(t=>{this.checked=Object(s.d)(t,e.stateKey),n.addEventListener("change",()=>{i.default.setByKey(e.stateKey,n.checked)})}),e.text?(l=this.span=document.createElement("span"),l.classList.add("checkbox-caption"),Object(o._i18n)(l,e.text,e.textArgs)):t.classList.add("checkbox-without-caption"),t.append(n),e.toggle){t.classList.add("checkbox-field-toggle");const e=document.createElement("div");e.classList.add("checkbox-toggle"),t.append(e)}else{const e=document.createElement("div");e.classList.add("checkbox-box");const n=document.createElementNS("http://www.w3.org/2000/svg","svg");n.classList.add("checkbox-box-check"),n.setAttributeNS(null,"viewBox","0 0 24 24");const i=document.createElementNS("http://www.w3.org/2000/svg","use");i.setAttributeNS(null,"href","#check"),i.setAttributeNS(null,"x","-1"),n.append(i);const s=document.createElement("div");s.classList.add("checkbox-box-background");const a=document.createElement("div");a.classList.add("checkbox-box-border"),e.append(a,s,n),t.append(e)}l&&t.append(l),e.withRipple?(t.classList.add("checkbox-ripple","hover-effect"),Object(a.ripple)(t,void 0,void 0,!0)):e.withHover&&t.classList.add("hover-effect")}get checked(){return this.input.checked}set checked(e){this.setValueSilently(e);const t=new Event("change",{bubbles:!0,cancelable:!0});this.input.dispatchEvent(t)}setValueSilently(e){this.input.checked=e}}},40:function(e,t,n){"use strict";function i(e,t){return e.closest(t)}n.d(t,"a",(function(){return i}))},74:function(e,t,n){"use strict";n.r(t);var i=n(20),s=n(27),a=n(82),o=n(14),l=n(13),r=n(11),c=n(7),d=n(28),h=n(17),u=n(29),p=n(12),b=n(1),m=n(54),g=n(21),v=n(2),f=n(48),L=n(8),E=n(32),w=n(18),y=n(40);let S=null;const k=new d.a("page-sign",!0,()=>{f.a.test&&(a.b.push({name:"Test Country",phoneCode:"999 66",code:"TC",emoji:"🤔",pattern:"999 66 XXX XX"}),console.log("Added test country to list!"));const e=a.b.filter(e=>e.emoji).sort((e,t)=>e.name.localeCompare(t.name));let t=null;const o=document.createElement("div");o.classList.add("input-wrapper");const d=new h.b({label:"Login.CountrySelectorLabel",name:"countryCode",plainText:!0});d.container.classList.add("input-select");const w=d.input;w.autocomplete="rrRandomRR";const x=document.createElement("div");x.classList.add("select-wrapper","z-depth-3","hide");const T=document.createElement("span");T.classList.add("arrow","arrow-down"),d.container.append(T);const O=document.createElement("ul");x.appendChild(O);new s.b(x);let j,C=!1,A=()=>{A=null,e.forEach(e=>{C=!0;let t=e.emoji,n=[];e.phoneCode.split(" and ").forEach(i=>{let s=document.createElement("li");var a=document.createElement("span");let o=r.a.wrapRichText(t);s.appendChild(a),a.outerHTML=o,s.append(e.name);var l=document.createElement("span");l.classList.add("phone-code"),l.innerText="+"+i,s.appendChild(l),n.push(s),O.append(s)}),e.li=n}),O.addEventListener("mousedown",(function(n){let i=n.target;"LI"!==i.tagName&&(i=Object(y.a)(i,"LI"));let s=i.childNodes[1].textContent,a=i.querySelector(".phone-code").innerText;w.value=s,t=e.find(e=>e.name===s),I.value=N=a,setTimeout(()=>I.focus(),0)})),d.container.appendChild(x)};A(),w.addEventListener("focus",(function(t){A?A():e.forEach(e=>{e.li.forEach(e=>e.style.display="")}),clearTimeout(j),x.classList.remove("hide"),x.offsetWidth,x.classList.add("active"),d.select(),Object(m.b)(k.pageEl.parentElement.parentElement,w,"start",4),setTimeout(()=>{M||(document.addEventListener("mousedown",H,{capture:!0}),M=!0)},0)}));let M=!1;const H=e=>{e.target!==w&&(_(),document.removeEventListener("mousedown",H,{capture:!0}),M=!1)},_=()=>{x.classList.remove("active"),j=window.setTimeout(()=>{x.classList.add("hide")},200)};w.addEventListener("keyup",(function(t){if(t.ctrlKey||"Control"===t.key)return!1;let n=this.value.toLowerCase(),i=[];e.forEach(e=>{let t=-1!==e.name.toLowerCase().indexOf(n);e.li.forEach(e=>e.style.display=t?"":"none"),t&&i.push(e)}),0===i.length&&e.forEach(e=>{e.li.forEach(e=>e.style.display="")})})),T.addEventListener("mousedown",(function(e){e.cancelBubble=!0,e.preventDefault(),w.matches(":focus")?w.blur():w.focus()}));let F=!1,N="";const D=new h.b({label:"Login.PhoneLabel",plainText:!0,name:"phone"});let I=D.input;I.type="tel",I.autocomplete="rr55RandomRR55",I.addEventListener("input",(function(e){this.classList.remove("error"),E.b.loadLottieWorkers();const n=this.value;let s,a;if(Math.abs(n.length-N.length)>1&&!F&&b.isAppleMobile&&(this.value=N+n),F=!1,D.setLabel(),"+"===this.value.replace(/\++/,"+"))this.value="+";else{const e=Object(i.c)(this.value);s=e.formatted,a=e.country,this.value=N=s?"+"+s:""}let o=a?a.name:"";o===w.value||t&&a&&t.phoneCode===a.phoneCode||(w.value=o,t=a),a||this.value.length-1>1?S.style.visibility="":S.style.visibility="hidden"})),I.addEventListener("paste",e=>{F=!0}),I.addEventListener("keypress",(function(e){return S.style.visibility||"Enter"!==e.key?!/\D/.test(e.key)||e.metaKey||e.ctrlKey||"+"===e.key&&e.shiftKey?void 0:(e.preventDefault(),!1):S.click()}));const P=new u.a({text:"Login.KeepSigned",name:"keepSession",withRipple:!0});P.input.checked=!0,S=Object(p.a)("btn-primary btn-color-primary",{text:"Login.Next"}),S.style.visibility="hidden",S.addEventListener("click",(function(e){this.setAttribute("disabled","true"),Object(c.z)(this,Object(L.i18n)("PleaseWait")),Object(i.f)(this);let t=I.value;l.a.invokeApi("auth.sendCode",{phone_number:t,api_id:v.a.id,api_hash:v.a.hash,settings:{_:"codeSettings"}}).then(e=>{Promise.all([n.e(4),n.e(16)]).then(n.bind(null,85)).then(n=>n.default.mount(Object.assign(e,{phone_number:t})))}).catch(e=>{switch(this.removeAttribute("disabled"),e.type){case"PHONE_NUMBER_INVALID":D.setError(),Object(c.z)(D.label,Object(L.i18n)("Login.PhoneLabelInvalid")),I.classList.add("error"),Object(c.z)(this,Object(L.i18n)("Login.Next"));break;default:console.error("auth.sendCode error:",e),this.innerText=e.type}})}));const V=Object(p.a)("btn-primary btn-secondary btn-primary-transparent primary",{text:"Login.QR.Login"});let R=!1;V.addEventListener("click",()=>{const e=n.e(14).then(n.bind(null,96));let t;V.disabled=!0,R||(t=Object(i.f)(V),R=!0),e.then(e=>{e.default.mount(),setTimeout(()=>{V.removeAttribute("disabled"),t&&t.remove()},200)})}),o.append(d.container,D.container,P.label,S,V);const q=document.createElement("h4");Object(L._i18n)(q,"Login.Title");const B=document.createElement("div");B.classList.add("subtitle"),Object(L._i18n)(B,"Login.StartText"),k.pageEl.querySelector(".container").append(q,B,o);g.isTouchSupported||setTimeout(()=>{I.focus()},0),l.a.invokeApi("help.getConfig").then(e=>{e.suggested_lang_code!==L.default.lastRequestedLangCode&&Promise.all([L.default.getStrings(e.suggested_lang_code,["Login.ContinueOnLanguage"]),L.default.getCacheLangPack()]).then(t=>{const n=[];t[0].forEach(e=>{const t=L.default.strings.get(e.key);t&&(n.push(t),L.default.strings.set(e.key,e))});const s=Object(p.a)("btn-primary btn-secondary btn-primary-transparent primary",{text:"Login.ContinueOnLanguage"});o.append(s),n.forEach(e=>{L.default.strings.set(e.key,e)}),Object(c.b)(s,t=>{Object(c.f)(t),s.disabled=!0,Object(i.f)(s),L.default.getLangPack(e.suggested_lang_code).then(()=>{s.remove()})})})}),l.a.invokeApi("help.getNearestDc").then(e=>{const t=[1,2,3,4,5],n=[e.this_dc];let i;return e.nearest_dc!==e.this_dc&&(i=l.a.getNetworker(e.nearest_dc).then(()=>{n.push(e.nearest_dc)})),(i||Promise.resolve()).then(()=>{const e=()=>{const i=t.shift();i&&setTimeout(()=>{l.a.getNetworker(i,{fileDownload:!0}).finally(e)},n.includes(i)?0:3e3)};e()}),e}).then(n=>{let i=e.find(e=>e.code===n.country);i&&(w.value.length||I.value.length||(w.value=i.name,t=i,I.value=N="+"+i.phoneCode.split(" and ").shift()))})},()=>{S&&(Object(c.z)(S,Object(L.i18n)("Login.Next")),Object(w.ripple)(S,void 0,void 0,!0),S.removeAttribute("disabled")),o.default.pushToState("authState",{_:"authStateSignIn"}),o.default.saveState()});t.default=k}}]);
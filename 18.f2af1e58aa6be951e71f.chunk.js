(this.webpackJsonp=this.webpackJsonp||[]).push([[18],{34:function(e,t,n){"use strict";n.d(t,"b",(function(){return r})),n.d(t,"a",(function(){return d}));var s=n(18),i=n(23),o=n(36),a=n(37),c=n(11);class l{constructor(e,t="",n=document.createElement("div")){this.el=e,this.container=n,this.onScrollMeasure=0,this.isHeavyAnimationInProgress=!1,this.needCheckAfterAnimation=!1,this.container.classList.add("scrollable"),this.log=Object(i.b)("SCROLL"+(t?"-"+t:""),i.a.Error),e&&(Array.from(e.children).forEach(e=>this.container.append(e)),e.append(this.container))}setListeners(){window.addEventListener("resize",this.onScroll,{passive:!0}),this.container.addEventListener("scroll",this.onScroll,{passive:!0,capture:!0}),Object(a.a)(()=>{this.isHeavyAnimationInProgress=!0,this.onScrollMeasure&&(this.needCheckAfterAnimation=!0,window.cancelAnimationFrame(this.onScrollMeasure))},()=>{this.isHeavyAnimationInProgress=!1,this.needCheckAfterAnimation&&(this.onScroll(),this.needCheckAfterAnimation=!1)})}append(e){this.container.append(e)}scrollIntoViewNew(e,t,n,s,i,a,c){return Object(o.b)(this.container,e,t,n,s,i,a,c)}}class r extends l{constructor(e,t="",n=300,s){super(e,t),this.onScrollOffset=n,this.onAdditionalScroll=null,this.onScrolledTop=null,this.onScrolledBottom=null,this.lastScrollTop=0,this.lastScrollDirection=0,this.loadedAll={top:!0,bottom:!1},this.onScroll=()=>{if(this.isHeavyAnimationInProgress)return this.onScrollMeasure&&window.cancelAnimationFrame(this.onScrollMeasure),void(this.needCheckAfterAnimation=!0);(this.onScrolledTop||this.onScrolledBottom||this.splitUp||this.onAdditionalScroll)&&(this.onScrollMeasure&&window.cancelAnimationFrame(this.onScrollMeasure),this.onScrollMeasure=window.requestAnimationFrame(()=>{this.onScrollMeasure=0;const e=this.container.scrollTop;this.lastScrollDirection=this.lastScrollTop===e?0:this.lastScrollTop<e?1:-1,this.lastScrollTop=e,this.onAdditionalScroll&&0!==this.lastScrollDirection&&this.onAdditionalScroll(),this.checkForTriggers&&this.checkForTriggers()}))},this.checkForTriggers=()=>{if(!this.onScrolledTop&&!this.onScrolledBottom)return;if(this.isHeavyAnimationInProgress)return void this.onScroll();const e=this.container.scrollHeight;if(!e)return;const t=e-this.container.clientHeight,n=this.lastScrollTop;this.onScrolledTop&&n<=this.onScrollOffset&&this.lastScrollDirection<=0&&this.onScrolledTop(),this.onScrolledBottom&&t-n<=this.onScrollOffset&&this.lastScrollDirection>=0&&this.onScrolledBottom()},this.container.classList.add("scrollable-y"),this.setListeners()}setVirtualContainer(e){this.splitUp=e,this.log("setVirtualContainer:",e,this)}prepend(...e){(this.splitUp||this.padding||this.container).prepend(...e)}append(...e){(this.splitUp||this.padding||this.container).append(...e)}getDistanceToEnd(){return this.scrollHeight-Math.round(this.scrollTop+this.container.offsetHeight)}get isScrolledDown(){return this.getDistanceToEnd()<=1}set scrollTop(e){this.container.scrollTop=e}get scrollTop(){return this.container.scrollTop}get scrollHeight(){return this.container.scrollHeight}}class d extends l{constructor(e,t="",n=300,i=15,o=document.createElement("div")){if(super(e,t,o),this.onScrollOffset=n,this.splitCount=i,this.container=o,this.container.classList.add("scrollable-x"),!s.isTouchSupported){const e=e=>{!e.deltaX&&this.container.scrollWidth>this.container.clientWidth&&(this.container.scrollLeft+=e.deltaY/4,Object(c.a)(e))};this.container.addEventListener("wheel",e,{passive:!1})}}}},42:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var s=n(16),i=n(19),o=n(22),a=n(10);class c{constructor(e={}){const t=this.label=document.createElement("label");t.classList.add("checkbox-field"),e.restriction&&t.classList.add("checkbox-field-restriction"),e.round&&t.classList.add("checkbox-field-round"),e.disabled&&this.toggleDisability(!0);const n=this.input=document.createElement("input");let c;if(n.type="checkbox",e.name&&(n.id="input-"+e.name),e.checked&&(n.checked=!0),e.stateKey&&s.default.getState().then(t=>{const o=Object(i.d)(t,e.stateKey);let a;a=e.stateValues?1===e.stateValues.indexOf(o):o,this.setValueSilently(a),n.addEventListener("change",()=>{let t;t=e.stateValues?e.stateValues[n.checked?1:0]:n.checked,s.default.setByKey(e.stateKey,t)})}),e.text?(c=this.span=document.createElement("span"),c.classList.add("checkbox-caption"),Object(a._i18n)(c,e.text,e.textArgs)):t.classList.add("checkbox-without-caption"),t.append(n),e.toggle){t.classList.add("checkbox-field-toggle");const e=document.createElement("div");e.classList.add("checkbox-toggle"),t.append(e)}else{const e=document.createElement("div");e.classList.add("checkbox-box");const n=document.createElementNS("http://www.w3.org/2000/svg","svg");n.classList.add("checkbox-box-check"),n.setAttributeNS(null,"viewBox","0 0 24 24");const s=document.createElementNS("http://www.w3.org/2000/svg","use");s.setAttributeNS(null,"href","#check"),s.setAttributeNS(null,"x","-1"),n.append(s);const i=document.createElement("div");i.classList.add("checkbox-box-background");const o=document.createElement("div");o.classList.add("checkbox-box-border"),e.append(o,i,n),t.append(e)}c&&t.append(c),e.withRipple?(t.classList.add("checkbox-ripple","hover-effect"),Object(o.ripple)(t,void 0,void 0,!0)):e.withHover&&t.classList.add("hover-effect")}get checked(){return this.input.checked}set checked(e){this.setValueSilently(e);const t=new Event("change",{bubbles:!0,cancelable:!0});this.input.dispatchEvent(t)}setValueSilently(e){this.input.checked=e}toggleDisability(e){return this.label.classList.toggle("checkbox-disabled",e),()=>this.toggleDisability(!e)}}},43:function(e,t,n){"use strict";function s(e,t){return t?e.forEach(e=>e.setAttribute("disabled","true")):e.forEach(e=>e.removeAttribute("disabled")),()=>s(e,!t)}n.d(t,"a",(function(){return s}))},47:function(e,t,n){"use strict";function s(e,t){return e.closest(t)}n.d(t,"a",(function(){return s}))},78:function(e,t,n){"use strict";n.r(t);var s=n(20),i=n(34),o=n(57),a=n(16),c=n(14),l=n(15),r=n(31),d=n(27),h=n(42),u=n(17),p=n(0),b=n(36),m=n(18),g=n(3),f=n(59),v=n(10),S=n(29),L=n(22),y=n(47),E=n(1),k=n(54),w=n(62),x=n(99),T=n(85),O=n(74),A=n(11),j=n(12),C=n(26),D=n(43);let N,_=null;const H=new r.a("page-sign",!0,()=>{f.a.test&&(o.b.push({name:"Test Country",phoneCode:"999 66",code:"TC",emoji:"🤔",pattern:"999 66 XXX XX"}),console.log("Added test country to list!"));const e=o.b.filter(e=>e.emoji).sort((e,t)=>e.name.localeCompare(t.name));let t=null;const r=document.createElement("div");r.classList.add("input-wrapper");const L=new d.b({label:"Login.CountrySelectorLabel",name:Object(k.b)(),plainText:!0});L.container.classList.add("input-select");const M=L.input;M.autocomplete=Object(k.b)();const I=document.createElement("div");I.classList.add("select-wrapper","z-depth-3","hide");const P=document.createElement("span");P.classList.add("arrow","arrow-down"),L.container.append(P);const V=document.createElement("ul");I.appendChild(V);new i.b(I);let B=()=>{B=null,e.forEach(e=>{const t=e.emoji,n=[];e.phoneCode.split(" and ").forEach(s=>{const i=document.createElement("li"),o=document.createElement("span"),a=l.a.wrapRichText(t);i.appendChild(o),o.outerHTML=a,i.append(e.name);const c=document.createElement("span");c.classList.add("phone-code"),c.innerText="+"+s,i.appendChild(c),n.push(i),V.append(i)}),e.li=n}),V.addEventListener("mousedown",e=>{if(0!==e.button)return;let t=e.target;"LI"!==t.tagName&&(t=Object(y.a)(t,"LI")),K(t)}),L.container.appendChild(I)};const K=n=>{const s=n.childNodes[1].textContent,i=n.querySelector(".phone-code").innerText;M.value=s,t=e.find(e=>e.name===s),J.value=q=i,U(),setTimeout(()=>J.focus(),0)};let R;B(),M.addEventListener("focus",(function(t){B?B():e.forEach(e=>{e.li.forEach(e=>e.style.display="")}),clearTimeout(R),R=void 0,I.classList.remove("hide"),I.offsetWidth,I.classList.add("active"),L.select(),Object(b.b)(H.pageEl.parentElement.parentElement,M,"start",4),setTimeout(()=>{F||(document.addEventListener("mousedown",X,{capture:!0}),F=!0)},0)}));let F=!1;const X=e=>{Object(E.a)(e.target,"input-select")||e.target!==M&&(U(),document.removeEventListener("mousedown",X,{capture:!0}),F=!1)},U=()=>{void 0===R&&(I.classList.remove("active"),R=window.setTimeout(()=>{I.classList.add("hide"),R=void 0},200))};M.addEventListener("keyup",(function(t){if(t.ctrlKey||"Control"===t.key)return!1;let n=this.value.toLowerCase(),s=[];e.forEach(e=>{let t=-1!==e.name.toLowerCase().indexOf(n);e.li.forEach(e=>e.style.display=t?"":"none"),t&&s.push(e)}),0===s.length?e.forEach(e=>{e.li.forEach(e=>e.style.display="")}):1===s.length&&"Enter"===t.key&&K(s[0].li[0])})),P.addEventListener("mousedown",(function(e){e.cancelBubble=!0,e.preventDefault(),M.matches(":focus")?M.blur():M.focus()}));let W=!1,q="";const z=new d.b({label:"Login.PhoneLabel",plainText:!0,name:"phone"});let J=z.input;J.type="tel",J.autocomplete="rr55RandomRR55",J.addEventListener("input",(function(e){this.classList.remove("error"),S.b.loadLottieWorkers();const n=this.value;let i,o;if(Math.abs(n.length-q.length)>1&&!W&&p.isAppleMobile&&(this.value=q+n),W=!1,z.setLabel(),"+"===this.value.replace(/\++/,"+"))this.value="+";else{const e=Object(s.c)(this.value);i=e.formatted,o=e.country,this.value=q=i?"+"+i:""}let a=o?o.name:"";a===M.value||t&&o&&t.phoneCode===o.phoneCode||(M.value=a,t=o),o||this.value.length-1>1?_.style.visibility="":_.style.visibility="hidden"})),J.addEventListener("paste",e=>{W=!0}),J.addEventListener("keypress",(function(e){return _.style.visibility||"Enter"!==e.key?!/\D/.test(e.key)||e.metaKey||e.ctrlKey||"+"===e.key&&e.shiftKey?void 0:(e.preventDefault(),!1):Y()}));const Q=new h.a({text:"Login.KeepSigned",name:"keepSession",withRipple:!0});Q.input.addEventListener("change",()=>{const e=Q.checked;a.default.pushToState("keepSigned",e),w.a.toggleStorage(e),x.a.toggleStorage(e),c.a.toggleStorage(e)}),a.default.getState().then(e=>{a.default.storage.isAvailable()?Q.checked=e.keepSigned:(Q.checked=!1,Q.label.classList.add("checkbox-disabled"))}),_=Object(u.a)("btn-primary btn-color-primary",{text:"Login.Next"}),_.style.visibility="hidden";const Y=e=>{e&&Object(A.a)(e);const t=Object(D.a)([_,N],!0);Object(C.a)(_,Object(v.i18n)("PleaseWait")),Object(s.f)(_);let i=J.value;c.a.invokeApi("auth.sendCode",{phone_number:i,api_id:g.a.id,api_hash:g.a.hash,settings:{_:"codeSettings"}}).then(e=>{Promise.all([n.e(3),n.e(6),n.e(19)]).then(n.bind(null,90)).then(t=>t.default.mount(Object.assign(e,{phone_number:i})))}).catch(e=>{switch(t(),e.type){case"PHONE_NUMBER_INVALID":z.setError(),Object(C.a)(z.label,Object(v.i18n)("Login.PhoneLabelInvalid")),J.classList.add("error"),Object(C.a)(_,Object(v.i18n)("Login.Next"));break;default:console.error("auth.sendCode error:",e),_.innerText=e.type}})};Object(j.b)(_,Y),N=Object(u.a)("btn-primary btn-secondary btn-primary-transparent primary",{text:"Login.QR.Login"});N.addEventListener("click",()=>{T.default.mount()}),r.append(L.container,z.container,Q.label,_,N);const G=document.createElement("h4");Object(v._i18n)(G,"Login.Title");const Z=document.createElement("div");Z.classList.add("subtitle"),Object(v._i18n)(Z,"Login.StartText"),H.pageEl.querySelector(".container").append(G,Z,r);m.isTouchSupported||setTimeout(()=>{J.focus()},0),Object(O.a)(r),c.a.invokeApi("help.getNearestDc").then(e=>{const t=[1,2,3,4,5],n=[e.this_dc];let s;return e.nearest_dc!==e.this_dc&&(s=c.a.getNetworker(e.nearest_dc).then(()=>{n.push(e.nearest_dc)})),(s||Promise.resolve()).then(()=>{const e=()=>{const s=t.shift();s&&setTimeout(()=>{c.a.getNetworker(s,{fileDownload:!0}).finally(e)},n.includes(s)?0:3e3)};e()}),e}).then(n=>{let s=e.find(e=>e.code===n.country);s&&(M.value.length||J.value.length||(M.value=s.name,t=s,J.value=q="+"+s.phoneCode.split(" and ").shift()))})},()=>{_&&(Object(C.a)(_,Object(v.i18n)("Login.Next")),Object(L.ripple)(_,void 0,void 0,!0),_.removeAttribute("disabled")),N&&N.removeAttribute("disabled"),a.default.pushToState("authState",{_:"authStateSignIn"})});t.default=H}}]);
//# sourceMappingURL=18.f2af1e58aa6be951e71f.chunk.js.map
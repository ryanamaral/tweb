(this.webpackJsonp=this.webpackJsonp||[]).push([[16,22],{35:function(e,t,a){"use strict";a.r(t);var n=a(7),i=a(14),s=a(8),r=a(28),o=function(e,t,a,n){return new(a||(a=Promise))((function(i,s){function r(e){try{u(n.next(e))}catch(e){s(e)}}function o(e){try{u(n.throw(e))}catch(e){s(e)}}function u(e){var t;e.done?i(e.value):(t=e.value,t instanceof a?t:new a((function(e){e(t)}))).then(r,o)}u((n=n.apply(e,t||[])).next())}))};const u=new r.a("page-chats",!1,()=>(i.default.pushToState("authState",{_:"authStateSignedIn"}),Promise.resolve().then(a.bind(null,9)).then(e=>{e.default.broadcast("im_mount")}),s.default.requestedServerLanguage||s.default.getCacheLangPack().then(e=>{e.local&&s.default.getLangPack(e.lang_code)}),Object(n.c)(),new Promise(e=>{window.requestAnimationFrame(()=>{Promise.all([a.e(4),a.e(11)]).then(a.bind(null,66)).finally(()=>o(void 0,void 0,void 0,(function*(){e()})))})})));t.default=u},47:function(e,t,a){"use strict";a.d(t,"a",(function(){return i}));var n=a(8);class i{constructor(e){this.element=document.body.querySelector("."+e.className),this.container=document.createElement("div"),this.container.className="container center-align",this.imageDiv=document.createElement("div"),this.imageDiv.className="auth-image",this.title=document.createElement("h4"),e.titleLangKey&&this.title.append(Object(n.i18n)(e.titleLangKey)),this.subtitle=document.createElement("p"),this.subtitle.className="subtitle",e.subtitleLangKey&&this.subtitle.append(Object(n.i18n)(e.subtitleLangKey)),this.container.append(this.imageDiv,this.title,this.subtitle),e.withInputWrapper&&(this.inputWrapper=document.createElement("div"),this.inputWrapper.className="input-wrapper",this.container.append(this.inputWrapper)),this.element.append(this.container)}}},65:function(e,t,a){"use strict";a.r(t);var n=a(20),i=a(23),s=a(14),r=a(44),o=a(28),u=a(35),l=a(12),c=a(55),d=a(58),p=a(11),h=a(8),m=a(47),b=a(7);let v;const f=new o.a("page-password",!0,()=>{const e=new m.a({className:"page-password",withInputWrapper:!0,titleLangKey:"Login.Password.Title",subtitleLangKey:"Login.Password.Subtitle"}),t=Object(l.a)("btn-primary btn-color-primary"),a=new h.default.IntlElement({key:"Login.Next"});t.append(a.element);const s=new c.a({label:"LoginPassword",name:"password"});let o;v=s.input,e.inputWrapper.append(s.container,t);let f,g=()=>(o||(o=window.setInterval(g,1e4)),r.a.getState().then(e=>{f=e,f.hint?Object(b.z)(s.label,Object(b.q)(p.b.wrapEmojiText(f.hint))):s.setLabel()}));t.addEventListener("click",(function(e){if(!v.value.length)return void v.classList.add("error");this.setAttribute("disabled","true");let i=v.value;a.update({key:"PleaseWait"});const l=Object(n.f)(this);r.a.check(i,f).then(e=>{switch(e._){case"auth.authorization":clearInterval(o),u.default.mount(),E&&E.remove();break;default:t.removeAttribute("disabled"),a.update({key:e._}),l.remove()}}).catch(e=>{t.removeAttribute("disabled"),s.input.classList.add("error"),e.type,a.update({key:"PASSWORD_HASH_INVALID"}),l.remove(),g()})})),v.addEventListener("keypress",(function(e){if(this.classList.remove("error"),a.update({key:"Login.Next"}),"Enter"===e.key)return t.click()}));const y=i.b.isMobile?100:166,E=new d.a(s,y);return e.imageDiv.append(E.container),Promise.all([E.load(),g()])},null,()=>{v.focus(),s.default.pushToState("authState",{_:"authStatePassword"}),s.default.saveState()});t.default=f},76:function(e,t,a){"use strict";a.r(t);var n=a(12),i=a(17),s=a(20),r=a(67),o=a(7),u=a(14),l=a(8),c=a(13),d=a(11),p=a(47),h=a(28),m=a(35);let b=null;const v=new h.a("page-signUp",!0,()=>Promise.resolve().then(a.bind(null,34)).then(e=>{const t=new p.a({className:"page-signUp",withInputWrapper:!0,titleLangKey:"YourName",subtitleLangKey:"Login.Register.Subtitle"});t.imageDiv.classList.add("avatar-edit"),t.title.classList.add("fullName");const a=document.createElement("canvas");a.id="canvas-avatar",a.className="avatar-edit-canvas";const u=document.createElement("span");u.className="tgico tgico-cameraadd",t.imageDiv.append(a,u);const h=e.default;let v;t.imageDiv.addEventListener("click",()=>{(new r.a).open(a,e=>{v=e})});const f=e=>{const a=g.value||"",n=y.value||"",i=a||n?(a+" "+n).trim():"";i?Object(o.z)(t.title,d.b.wrapEmojiText(i)):Object(o.z)(t.title,Object(l.i18n)("YourName"))};const g=new i.b({label:"FirstName",maxLength:70}),y=new i.b({label:"LastName",maxLength:64}),E=Object(n.a)("btn-primary btn-color-primary"),w=new l.default.IntlElement({key:"StartMessaging"});E.append(w.element),t.inputWrapper.append(g.container,y.container,E),g.input.addEventListener("input",f),y.input.addEventListener("input",f),E.addEventListener("click",(function(e){if(g.input.classList.contains("error")||y.input.classList.contains("error"))return!1;if(!g.value.length)return g.input.classList.add("error"),!1;this.disabled=!0;const t=g.value.trim(),a=y.value.trim(),n={phone_number:b.phone_number,phone_code_hash:b.phone_code_hash,first_name:t,last_name:a};w.update({key:"PleaseWait"});const i=Object(s.f)(this);c.a.invokeApi("auth.signUp",n).then(e=>{switch(e._){case"auth.authorization":c.a.setUserAuth(e.user.id),new Promise((e,t)=>{if(!v)return e();v().then(a=>{h.uploadProfilePhoto(a).then(e,t)},t)}).finally(()=>{m.default.mount()});break;default:w.update({key:e._}),this.removeAttribute("disabled"),i.remove()}}).catch(e=>{this.removeAttribute("disabled"),i.remove(),e.type,w.update({key:e.type})})}))}),e=>{b=e,u.default.pushToState("authState",{_:"authStateSignUp",authCode:e}),u.default.saveState()});t.default=v},85:function(e,t,a){"use strict";a.r(t);var n=a(23),i=a(14),s=a(13),r=a(28),o=a(35),u=a(65),l=a(74),c=a(76),d=a(77),p=a(78),h=a(7),m=a(8),b=function(e,t,a,n){return new(a||(a=Promise))((function(i,s){function r(e){try{u(n.next(e))}catch(e){s(e)}}function o(e){try{u(n.throw(e))}catch(e){s(e)}}function u(e){var t;e.done?i(e.value):(t=e.value,t instanceof a?t:new a((function(e){e(t)}))).then(r,o)}u((n=n.apply(e,t||[])).next())}))};let v,f=null,g=null,y=null;const E=new r.a("page-authCode",!0,()=>{const e=f.type.length,t=new p.a({label:"Code",name:"code",length:e,onFill:e=>{i(""+e)}});v=t.input,E.pageEl.querySelector(".input-wrapper").append(t.container);E.pageEl.querySelector(".phone-edit").addEventListener("click",(function(){return l.default.mount()}));const a=()=>{setTimeout(()=>{y.remove()},300)},i=e=>{v.setAttribute("disabled","true");const n={phone_number:f.phone_number,phone_code_hash:f.phone_code_hash,phone_code:e};s.a.invokeApi("auth.signIn",n,{ignoreErrors:!0}).then(e=>{switch(e._){case"auth.authorization":s.a.setUserAuth(e.user.id),o.default.mount(),a();break;case"auth.authorizationSignUpRequired":c.default.mount({phone_number:f.phone_number,phone_code_hash:f.phone_code_hash}),a()}}).catch(e=>b(void 0,void 0,void 0,(function*(){switch(e.type){case"SESSION_PASSWORD_NEEDED":e.handled=!0,yield u.default.mount();break;case"PHONE_CODE_EXPIRED":v.classList.add("error"),Object(h.z)(t.label,Object(m.i18n)("PHONE_CODE_EXPIRED"));break;case"PHONE_CODE_EMPTY":case"PHONE_CODE_INVALID":v.classList.add("error"),Object(h.z)(t.label,Object(m.i18n)("PHONE_CODE_INVALID"));break;default:t.label.innerText=e.type}v.removeAttribute("disabled")})))},r=E.pageEl.querySelector(".auth-image"),g=n.b.isMobile?100:166,y=new d.a(t,g);return r.append(y.container),y.load()},e=>{if(f=e,g){v.value="";const e=document.createEvent("HTMLEvents");e.initEvent("input",!1,!0),v.dispatchEvent(e)}else g=E.pageEl.getElementsByClassName("phone")[0],y=E.pageEl.getElementsByClassName("sent-type")[0];let t,a;switch(g.innerText=f.phone_number,f.type._){case"auth.sentCodeTypeSms":t="Login.Code.SentSms";break;case"auth.sentCodeTypeApp":t="Login.Code.SentInApp";break;case"auth.sentCodeTypeCall":t="Login.Code.SentCall";break;default:t="Login.Code.SentUnknown",a=[f.type._]}Object(h.z)(y,Object(m.i18n)(t,a)),i.default.pushToState("authState",{_:"authStateAuthCode",sentCode:e}),i.default.saveState()},()=>{v.focus()});t.default=E}}]);
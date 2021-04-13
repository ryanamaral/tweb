(this.webpackJsonp=this.webpackJsonp||[]).push([[12,19],{103:function(e,t,i){"use strict";i.r(t);var n=i(13),a=i(39),s=i(47),o=i(76),r=i(92),c=i(62),d=i(59),l=i(22),u=i(2),p=i(12),h=i(8),m=function(e,t,i,n){return new(i||(i=Promise))((function(a,s){function o(e){try{c(n.next(e))}catch(e){s(e)}}function r(e){try{c(n.throw(e))}catch(e){s(e)}}function c(e){var t;e.done?a(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(o,r)}c((n=n.apply(e,t||[])).next())}))};let g;const w=new a.a("page-signQR",!0,()=>g,()=>{g||(g=m(void 0,void 0,void 0,(function*(){const e=w.pageEl.querySelector(".auth-image"),t=document.createElement("div");t.classList.add("input-wrapper");const a=Object(p.a)("btn-primary btn-secondary btn-primary-transparent primary",{text:"Login.QR.Cancel"});t.append(a);const v=e.parentElement,f=document.createElement("h4");Object(h._i18n)(f,"Login.QR.Title");const b=document.createElement("ol");b.classList.add("qr-description"),["Login.QR.Help1","Login.QR.Help2","Login.QR.Help3"].forEach(e=>{const t=document.createElement("li");t.append(Object(h.i18n)(e)),b.append(t)}),v.append(f,b,t),a.addEventListener("click",()=>{r.default.mount(),k=!0});const y=(yield Promise.all([i.e(8).then(i.t.bind(null,105,7))]))[0].default;let k=!1;document.addEventListener("user_auth",()=>{k=!0,g=null},{once:!0});let P,E={ignoreErrors:!0};const L=t=>m(void 0,void 0,void 0,(function*(){try{let i=yield n.a.invokeApi("auth.exportLoginToken",{api_id:u.a.id,api_hash:u.a.hash,except_ids:[]},{ignoreErrors:!0});if("auth.loginTokenMigrateTo"===i._&&(E.dcId||(E.dcId=i.dc_id,n.a.setBaseDcId(i.dc_id)),i=yield n.a.invokeApi("auth.importLoginToken",{token:i.token},E)),"auth.loginTokenSuccess"===i._){const e=i.authorization;return n.a.setUserAuth(e.user.id),s.default.mount(),!0}if(!P||!Object(d.b)(P,i.token)){P=i.token;let t="tg://login?token="+Object(d.d)(i.token).replace(/\+/g,"-").replace(/\//g,"_").replace(/\=+$/,"");const n=new y({width:240*window.devicePixelRatio,height:240*window.devicePixelRatio,data:t,image:"assets/img/logo_padded.svg",dotsOptions:{color:"#000000",type:"rounded"},imageOptions:{imageSize:.75},backgroundOptions:{color:"#ffffff"},qrOptions:{errorCorrectionLevel:"L"}});let a;n.append(e),e.lastChild.classList.add("qr-canvas"),a=n._drawingPromise?n._drawingPromise:Promise.race([Object(l.d)(1e3),new Promise(e=>{n._canvas._image.addEventListener("load",()=>{window.requestAnimationFrame(()=>e())},{once:!0})})]),yield a.then(()=>{Array.from(e.children).slice(0,-1).forEach(e=>{e.remove()})})}if(t){let e=Date.now()/1e3,t=i.expires-e-c.a.serverTimeOffset;yield Object(l.d)(t>5?5e3:1e3*t|0)}}catch(e){switch(e.type){case"SESSION_PASSWORD_NEEDED":console.warn("pageSignQR: SESSION_PASSWORD_NEEDED"),e.handled=!0,o.default.mount(),k=!0,g=null;break;default:console.error("pageSignQR: default error:",e)}}}));return yield L(!1),()=>m(void 0,void 0,void 0,(function*(){for(k=!1;!k&&!(yield L(!0)););}))}))),g.then(e=>{e()})});t.default=w},47:function(e,t,i){"use strict";i.r(t);var n=i(7),a=i(17),s=i(8),o=i(39),r=function(e,t,i,n){return new(i||(i=Promise))((function(a,s){function o(e){try{c(n.next(e))}catch(e){s(e)}}function r(e){try{c(n.throw(e))}catch(e){s(e)}}function c(e){var t;e.done?a(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(o,r)}c((n=n.apply(e,t||[])).next())}))};const c=new o.a("page-chats",!1,()=>(a.default.pushToState("authState",{_:"authStateSignedIn"}),Promise.resolve().then(i.bind(null,9)).then(e=>{e.default.broadcast("im_mount")}),s.default.requestedServerLanguage||s.default.getCacheLangPack().then(e=>{e.local&&s.default.getLangPack(e.lang_code)}),Object(n.c)(),new Promise(e=>{window.requestAnimationFrame(()=>{i.e(9).then(i.bind(null,69)).finally(()=>r(void 0,void 0,void 0,(function*(){e();const t=yield i.e(14).then(i.bind(null,49));Array.from(document.getElementsByClassName("btn-menu-toggle")).forEach(e=>{t.ButtonMenuToggleHandler(e)})})))})})));t.default=c},48:function(e,t,i){"use strict";var n=i(10),a=i(15),s=i(13);const o=new class{getState(){return s.a.invokeApi("account.getPassword").then(e=>e)}updateSettings(e={}){return this.getState().then(t=>{let i,n;const a={password:null,new_settings:{_:"account.passwordInputSettings",hint:e.hint,email:e.email}};i=e.currentPassword?s.a.computeSRP(e.currentPassword,t):Promise.resolve({_:"inputCheckPasswordEmpty"});const o=t.new_algo,r=new Uint8Array(o.salt1.length+32);return r.randomize(),r.set(o.salt1,0),o.salt1=r,n=e.newPassword?s.a.computeSRP(e.newPassword,t,!0):Promise.resolve(new Uint8Array),Promise.all([i,n]).then(e=>(a.password=e[0],a.new_settings.new_algo=o,a.new_settings.new_password_hash=e[1],s.a.invokeApi("account.updatePasswordSettings",a)))})}check(e,t,i={}){return s.a.computeSRP(e,t).then(e=>s.a.invokeApi("auth.checkPassword",{password:e},i).then(e=>("auth.authorization"===e._&&(a.a.saveApiUser(e.user),s.a.setUserAuth(e.user.id)),e)))}confirmPasswordEmail(e){return s.a.invokeApi("account.confirmPasswordEmail",{code:e})}resendPasswordEmail(){return s.a.invokeApi("account.resendPasswordEmail")}cancelPasswordEmail(){return s.a.invokeApi("account.cancelPasswordEmail")}};n.a.passwordManager=o,t.a=o},57:function(e,t,i){"use strict";i.d(t,"a",(function(){return s}));var n=i(7),a=i(19);class s extends a.b{constructor(e={}){super(Object.assign({plainText:!0},e)),this.passwordVisible=!1,this.onVisibilityClick=e=>{Object(n.f)(e),this.passwordVisible=!this.passwordVisible,this.toggleVisible.classList.toggle("eye-hidden",this.passwordVisible),this.input.type=this.passwordVisible?"text":"password",this.onVisibilityClickAdditional&&this.onVisibilityClickAdditional()};const t=this.input;t.type="password",t.setAttribute("required",""),t.autocomplete="off";const i=this.toggleVisible=document.createElement("span");i.classList.add("toggle-visible","tgico"),this.container.classList.add("input-field-password"),this.container.append(i),i.addEventListener("click",this.onVisibilityClick),i.addEventListener("touchend",this.onVisibilityClick)}}},58:function(e,t,i){"use strict";i.d(t,"a",(function(){return a}));var n=i(8);class a{constructor(e){this.element=document.body.querySelector("."+e.className),this.container=document.createElement("div"),this.container.className="container center-align",this.imageDiv=document.createElement("div"),this.imageDiv.className="auth-image",this.title=document.createElement("h4"),e.titleLangKey&&this.title.append(Object(n.i18n)(e.titleLangKey)),this.subtitle=document.createElement("p"),this.subtitle.className="subtitle",e.subtitleLangKey&&this.subtitle.append(Object(n.i18n)(e.subtitleLangKey)),this.container.append(this.imageDiv,this.title,this.subtitle),e.withInputWrapper&&(this.inputWrapper=document.createElement("div"),this.inputWrapper.className="input-wrapper",this.container.append(this.inputWrapper)),this.element.append(this.container)}}},65:function(e,t,i){"use strict";i.d(t,"a",(function(){return a}));var n=i(31);class a{constructor(e,t){this.passwordInputField=e,this.size=t,this.needFrame=0,this.container=document.createElement("div"),this.container.classList.add("media-sticker-wrapper")}load(){return this.loadPromise?this.loadPromise:this.loadPromise=n.b.loadAnimationFromURL({container:this.container,loop:!1,autoplay:!1,width:this.size,height:this.size,noCache:!0},"assets/img/TwoFactorSetupMonkeyPeek.tgs").then(e=>(this.animation=e,this.animation.addEventListener("enterFrame",e=>{(1===this.animation.direction&&e>=this.needFrame||-1===this.animation.direction&&e<=this.needFrame)&&(this.animation.setSpeed(1),this.animation.pause())}),this.passwordInputField.onVisibilityClickAdditional=()=>{this.passwordInputField.passwordVisible?(this.animation.setDirection(1),this.animation.curFrame=0,this.needFrame=16,this.animation.play()):(this.animation.setDirection(-1),this.animation.curFrame=16,this.needFrame=0,this.animation.play())},n.b.waitForFirstFrame(e)))}remove(){this.animation&&this.animation.remove()}}},76:function(e,t,i){"use strict";i.r(t);var n=i(18),a=i(25),s=i(17),o=i(48),r=i(39),c=i(47),d=i(12),l=i(57),u=i(65),p=i(11),h=i(8),m=i(58),g=i(7);let w;const v=new r.a("page-password",!0,()=>{const e=new m.a({className:"page-password",withInputWrapper:!0,titleLangKey:"Login.Password.Title",subtitleLangKey:"Login.Password.Subtitle"}),t=Object(d.a)("btn-primary btn-color-primary"),i=new h.default.IntlElement({key:"Login.Next"});t.append(i.element);const s=new l.a({label:"LoginPassword",name:"password"});let r;w=s.input,e.inputWrapper.append(s.container,t);let v,f=()=>(r||(r=window.setInterval(f,1e4)),o.a.getState().then(e=>{v=e,v.hint?Object(g.B)(s.label,p.b.wrapEmojiText(v.hint)):s.setLabel()}));t.addEventListener("click",(function(e){if(!w.value.length)return void w.classList.add("error");this.setAttribute("disabled","true");let a=w.value;i.update({key:"PleaseWait"});const d=Object(n.f)(this);o.a.check(a,v).then(e=>{switch(e._){case"auth.authorization":clearInterval(r),c.default.mount(),y&&y.remove();break;default:t.removeAttribute("disabled"),i.update({key:e._}),d.remove()}}).catch(e=>{t.removeAttribute("disabled"),s.input.classList.add("error"),e.type,i.update({key:"PASSWORD_HASH_INVALID"}),d.remove(),f()})})),w.addEventListener("keypress",(function(e){if(this.classList.remove("error"),i.update({key:"Login.Next"}),"Enter"===e.key)return t.click()}));const b=a.b.isMobile?100:166,y=new u.a(s,b);return e.imageDiv.append(y.container),Promise.all([y.load(),f()])},null,()=>{w.focus(),s.default.pushToState("authState",{_:"authStatePassword"}),s.default.saveState()});t.default=v}}]);
/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

import App from './config/app';
import blurActiveElement from './helpers/dom/blurActiveElement';
import findUpClassName from './helpers/dom/findUpClassName';
import fixSafariStickyInput from './helpers/dom/fixSafariStickyInput';
import { isMobileSafari } from './helpers/userAgent';
import './materialize.scss';
import './scss/style.scss';
import './scss/tgico.scss';
/* import { computeCheck } from './lib/crypto/srp';
import { salt1, salt2, g, p, srp_id, secure_random, srp_B, password } from './mock/srp'; */

//console.log('pineapples are in my head');

/* console.time('get storage1');
import * as a from './lib/config';
import * as b from './lib/mtproto/mtproto_config';
import * as c from './helpers/userAgent';
import * as d from './lib/mtproto/mtprotoworker';
import * as e from './lib/polyfill';
import * as f from './lib/storage';
a && b && c && d && e && f;
console.timeEnd('get storage1'); */

/* Promise.all([
  import('./components/pageIm'),
  import('./components/pageSignIn'),
  import('./components/misc'),
  import('./lib/storage')
]).then(imports => {
  let [pageIm, pageSignIn, misc, AppStorage] = imports; */

  document.addEventListener('DOMContentLoaded', async() => {
    //let socket = new Socket(2);

    if(!Element.prototype.toggleAttribute) {
      Element.prototype.toggleAttribute = function(name, force) {
        if(force !== void 0) force = !!force;
        
        if(this.hasAttribute(name)) {
          if(force) return true;
    
          this.removeAttribute(name);
          return false;
        }
        if(force === false) return false;
          
        this.setAttribute(name, "");
        return true;
      };
    }

    // We listen to the resize event (https://css-tricks.com/the-trick-to-viewport-units-on-mobile/)
    // @ts-ignore
    const w = window.visualViewport || window; // * handle iOS keyboard
    let setViewportVH = false;
    let lastVH: number;
    const setVH = () => {
      // @ts-ignore
      const vh = (setViewportVH && !rootScope.default.overlayIsActive ? w.height || w.innerHeight : window.innerHeight) * 0.01;
      if(lastVH === vh) {
        return;
      } else if(lastVH < vh) {
        blurActiveElement(); // (Android) fix blur when keyboard is being closed
      }

      lastVH = vh;

      //const vh = document.documentElement.scrollHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);

      //console.log('setVH', vh, setViewportVH ? w : window);

      /* if(setViewportVH && userAgent.isSafari && touchSupport.isTouchSupported && document.activeElement && (document.activeElement as HTMLElement).blur) {
        const rect = document.activeElement.getBoundingClientRect();
        if(rect.top < 0 || rect.bottom >= (w as any).height) {
          fastSmoothScroll(findUpClassName(document.activeElement, 'scrollable-y') || window as any, document.activeElement as HTMLElement, 'center', 4, undefined, FocusDirection.Static);
        }
      } */
    };

    window.addEventListener('resize', setVH);
    setVH();

    // * hook worker constructor to set search parameters (test, debug, etc)
    const workerHandler = {
      construct(target: any, args: any) {
        //console.log(target, args);
        const url = args[0] + location.search;

        return new target(url);
      }
    };
    
    const workerProxy = new Proxy(Worker, workerHandler);
    Worker = workerProxy;

    const [_, touchSupport, userAgent, rootScope, appStateManager, I18n] = await Promise.all([
      import('./lib/polyfill'),
      import('./helpers/touchSupport'),
      import('./helpers/userAgent'),
      import('./lib/rootScope'),
      import('./lib/appManagers/appStateManager'),
      import('./lib/langPack'),
    ])
    //console.timeEnd('get storage');

    //console.log(new Uint8Array([255, 200, 145]).hex);

    const toggleResizeMode = () => {
      setViewportVH = tabId === 1 && userAgent.isSafari && touchSupport.isTouchSupported && !rootScope.default.overlayIsActive;
      setVH();

      if(w !== window) {
        if(setViewportVH) {
          window.removeEventListener('resize', setVH);
          w.addEventListener('resize', setVH);
        } else {
          w.removeEventListener('resize', setVH);
          window.addEventListener('resize', setVH);
        }
      }
    };

    let tabId: number;
    rootScope.default.addEventListener('im_tab_change', (id) => {
      const wasTabId = tabId !== undefined;
      tabId = id;

      if(wasTabId || tabId === 1) {
        toggleResizeMode();
      }
    });
    
    rootScope.default.addEventListener('overlay_toggle', () => {
      toggleResizeMode();
    });

    if(userAgent.isApple) {
      if(userAgent.isSafari) {
        document.documentElement.classList.add('is-safari');

        if(userAgent.isMobile && touchSupport.isTouchSupported) {
          let key: 'clientY' | 'pageY' = 'clientY';
          let startY = 0;
          const o = {capture: true, passive: false};
          const onTouchMove = (e: TouchEvent) => {
            const touch = e.touches[0];

            //console.log('touchmove y', touch[key], startY);
            
            const scrollable = findUpClassName(touch.target, 'scrollable-y');
            if(scrollable) {
              const y = touch[key];
              const scrolled = startY - y;

              /* if(y < startY) {
                startY = y;
              } */

              const scrollTop = scrollable.scrollTop;
              const scrollHeight = scrollable.scrollHeight;
              const clientHeight = scrollable.clientHeight;
              const nextScrollTop = scrollTop ? Math.round(scrollTop + scrollable.clientHeight + scrolled) : scrollTop + scrolled;
              //const needCancel = scrollHeight !== clientHeight ? (scrollTop && diff <= 1) || (scrollTop - diff) < 0 : true;
              const needCancel = scrollHeight === clientHeight || nextScrollTop >= scrollHeight || nextScrollTop <= 0;
              if(needCancel) {
                e.preventDefault();
              }

              //console.log('touchmove with scrollable', scrollTop, startY, scrolled, nextScrollTop, needCancel, e.cancelable);
            } else {
              e.preventDefault();

              //console.log('touchmove no scrollable', e, touch);
            }

            //if(e.target === document.documentElement || e.target === document.body) e.preventDefault();
          };

          // let isOpened = false;
          document.addEventListener('focusin', (e) => {
            if(!setViewportVH) return;
            //console.log('focusin');

            // isOpened = true;
            // document.body.classList.add('is-keyboard-opened');

            fixSafariStickyInput(e.target as HTMLElement);

            document.addEventListener('touchmove', onTouchMove, o);
            document.addEventListener('touchstart', (e) => {
              if(e.touches.length > 1) return;
              const touchStart = e.touches[0];
    
              startY = touchStart[key];
            });
          });

          document.addEventListener('focusout', () => {
            document.removeEventListener('touchmove', onTouchMove, o);
            
            // if(isOpened) {
            //   isOpened = false;
            //   document.body.classList.remove('is-keyboard-opened');
            // }
          });
          
          document.addEventListener('visibilitychange', () => {
            if(!setViewportVH) return;
            //console.log('window visibilitychange');
            if(document.activeElement && (document.activeElement as HTMLElement).blur) {
              fixSafariStickyInput(document.activeElement as HTMLElement);
            }

            /* blurActiveElement();
            window.scrollTo(0, 0);
            setVH(); */
          });
        }
      }
      
      document.documentElement.classList.add('is-mac', 'emoji-supported');

      if(userAgent.isAppleMobile) {
        document.documentElement.classList.add('is-ios');
      }
    } else if(userAgent.isAndroid) {
      document.documentElement.classList.add('is-android');
    }

    if(!touchSupport.isTouchSupported) {
      document.documentElement.classList.add('no-touch');
    } else {
      document.documentElement.classList.add('is-touch');
      /* document.addEventListener('touchmove', (event: any) => {
        event = event.originalEvent || event;
        if(event.scale && event.scale !== 1) {
          event.preventDefault();
        }
      }, {capture: true, passive: false}); */
    }

    /* if(config.isServiceWorkerSupported) {
      await navigator.serviceWorker.ready;
      navigator.serviceWorker.controller ? true : await new Promise((resolve, reject) => {
        navigator.serviceWorker.addEventListener('controllerchange', resolve);
      });
    } */
  
    //console.time('get storage');

    const perf = performance.now();

    //import('./vendor/dateFormat');

    const langPromise = I18n.default.getCacheLangPack();

    function loadFonts(): Promise<void> {
      // @ts-ignore
      return 'fonts' in document ? Promise.all(['400 1rem Roboto', '500 1rem Roboto'].map(font => document.fonts.load(font))) : Promise.resolve();
    }
  
    const [state, langPack] = await Promise.all([
      appStateManager.default.getState(), 
      langPromise
    ]);
    //I18n.getCacheLangPack();
    //console.log('got auth:', auth);
    //console.timeEnd('get storage');

    rootScope.default.setThemeListener();

    if(langPack.appVersion !== App.langPackVersion) {
      I18n.default.getLangPack(langPack.lang_code);
    }

    /**
     * won't fire if font is loaded too fast
     */
    function fadeInWhenFontsReady(elem: HTMLElement, promise: Promise<void>) {
      elem.style.opacity = '0';

      promise.then(() => {
        window.requestAnimationFrame(() => {
          elem.style.opacity = '';
        });
      });
    }

    console.log('got state, time:', performance.now() - perf);

    const authState = state.authState;
    if(authState._ !== 'authStateSignedIn'/*  || 1 === 1 */) {
      console.log('Will mount auth page:', authState._, Date.now() / 1000);

      const el = document.getElementById('auth-pages');
      let scrollable: HTMLElement;
      if(el) {
        scrollable = el.querySelector('.scrollable') as HTMLElement;
        if((!touchSupport.isTouchSupported || isMobileSafari)) {
          scrollable.classList.add('no-scrollbar');
        }

        // * don't remove this line
        scrollable.style.opacity = '0';

        const placeholder = document.createElement('div');
        placeholder.classList.add('auth-placeholder');

        scrollable.prepend(placeholder);
        scrollable.append(placeholder.cloneNode());
      }

      let pagePromise: Promise<void>;
      //langPromise.then(async() => {
        switch(authState._) {
          case 'authStateSignIn': 
            pagePromise = (await import('./pages/pageSignIn')).default.mount();
            break;
          case 'authStateSignQr': 
            pagePromise = (await import('./pages/pageSignQR')).default.mount();
            break;
          case 'authStateAuthCode':
            pagePromise = (await import('./pages/pageAuthCode')).default.mount(authState.sentCode);
            break;
          case 'authStatePassword':
            pagePromise = (await import('./pages/pagePassword')).default.mount();
            break;
          case 'authStateSignUp':
            pagePromise = (await import('./pages/pageSignUp')).default.mount(authState.authCode);
            break;
        }
      //});

      if(scrollable) {
        // wait for text appear
        if(pagePromise) {
          await pagePromise;
        }

        // @ts-ignore
        const promise = 'fonts' in document ? document.fonts.ready : Promise.resolve();
        fadeInWhenFontsReady(scrollable, promise);
      }

      /* computeCheck(password, {
        current_algo: {
          salt1, 
          salt2,
          p,
          g
        },
        srp_id,
        srp_B,
        secure_random,
      }).then(res => {
        console.log(res);
      }); */

      /* setTimeout(async() => {
        (await import('./pages/pageAuthCode')).default.mount({
          "_": "auth.sentCode",
          "pFlags": {},
          "flags": 6,
          "type": {
            "_": "auth.sentCodeTypeSms",
            "length": 5
          },
          "phone_code_hash": "",	
          "next_type": {
            "_": "auth.codeTypeCall"
          },
          "timeout": 120,
          "phone_number": ""
        });
      }, 500); */
      /* setTimeout(async() => {
        (await import('./pages/pageSignQR')).default.mount();
      }, 500); */
      /* setTimeout(async() => {
        (await import('./pages/pagePassword')).default.mount();
      }, 500); */
      /* setTimeout(async() => {
        (await import('./pages/pageSignUp')).default.mount({
          "phone_code_hash": "",	
          "phone_number": ""
        });
      }, 500); */
    } else {
      console.log('Will mount IM page:', Date.now() / 1000);
      fadeInWhenFontsReady(document.getElementById('main-columns'), loadFonts());
      (await import('./pages/pageIm')).default.mount();
      //getNearestDc();
    }

    const ripple = (await import('./components/ripple')).ripple;
    (Array.from(document.getElementsByClassName('rp')) as HTMLElement[]).forEach(el => ripple(el));
  });
//});



import appSidebarRight, { AppSidebarRight } from "..";
import appMessagesManager from "../../../lib/appManagers/appMessagesManager";
import { AppSelectPeers } from "../../appSelectPeers";
import { putPreloader } from "../../misc";
import { SliderTab } from "../../slider";

export default class AppForwardTab implements SliderTab {
  public container: HTMLElement;
  public closeBtn: HTMLElement;
  private sendBtn: HTMLButtonElement;

  private selector: AppSelectPeers;
  private msgIDs: number[] = [];

  onCloseAfterTimeout() {
    document.body.classList.remove('is-forward-active');
    this.cleanup();
  }

  public cleanup() {
    if(this.selector) {
      this.selector.container.remove();
      this.selector = null;
    }

    this.sendBtn.innerHTML = '';
    this.sendBtn.classList.add('tgico-send');
    this.sendBtn.classList.remove('is-visible');
    this.sendBtn.disabled = false;
  }

  public init() {
    this.container = document.getElementById('forward-container') as HTMLDivElement;
    this.closeBtn = this.container.querySelector('.sidebar-close-button') as HTMLButtonElement;
    this.sendBtn = this.container.querySelector('.btn-circle') as HTMLButtonElement;

    this.sendBtn.addEventListener('click', () => {
      let peerIDs = this.selector.getSelected();
      
      if(this.msgIDs.length && peerIDs.length) {
        this.sendBtn.classList.remove('tgico-send');
        this.sendBtn.disabled = true;
        putPreloader(this.sendBtn);
        this.selector.freezed = true;

        let s = () => {
          let promises = peerIDs.splice(0, 3).map(peerID => {
            return appMessagesManager.forwardMessages(peerID, this.msgIDs);
          });
          
          Promise.all(promises).then(() => {
            if(peerIDs.length) {
              return s();
            } else {
              this.closeBtn.click();
            }
          });
        };
        
        s();
      }
    });
  }

  public open(ids: number[]) {
    if(this.init) {
      this.init();
      this.init = null;
    }

    this.cleanup();
    this.msgIDs = ids;

    this.selector = new AppSelectPeers(this.container, (length) => {
      this.sendBtn.classList.toggle('is-visible', !!length);
    }, ['dialogs', 'contacts'], () => {
      //console.log('forward rendered:', this.container.querySelector('.selector ul').childElementCount);
      appSidebarRight.selectTab(AppSidebarRight.SLIDERITEMSIDS.forward);
      appSidebarRight.toggleSidebar(true).then(() => {
        if(this.selector) {
          this.selector.checkForTriggers();
        }
      });
      document.body.classList.add('is-forward-active');
    }, null, 'send');
  }
}
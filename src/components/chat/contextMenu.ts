/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

import type { AppMessagesManager } from "../../lib/appManagers/appMessagesManager";
import type { AppChatsManager } from "../../lib/appManagers/appChatsManager";
import type { AppPeersManager } from "../../lib/appManagers/appPeersManager";
import type { AppPollsManager, Poll } from "../../lib/appManagers/appPollsManager";
import type Chat from "./chat";
import { isTouchSupported } from "../../helpers/touchSupport";
import ButtonMenu, { ButtonMenuItemOptions } from "../buttonMenu";
import { attachContextMenuListener, openBtnMenu, positionMenu } from "../misc";
import PopupDeleteMessages from "../popups/deleteMessages";
import PopupForward from "../popups/forward";
import PopupPinMessage from "../popups/unpinMessage";
import { copyTextToClipboard } from "../../helpers/clipboard";
import PopupSendNow from "../popups/sendNow";
import { toast } from "../toast";
import I18n, { LangPackKey } from "../../lib/langPack";
import findUpClassName from "../../helpers/dom/findUpClassName";
import { cancelEvent } from "../../helpers/dom/cancelEvent";
import cancelSelection from "../../helpers/dom/cancelSelection";
import { attachClickEvent } from "../../helpers/dom/clickEvent";
import isSelectionEmpty from "../../helpers/dom/isSelectionEmpty";
import appDocsManager, { MyDocument } from "../../lib/appManagers/appDocsManager";

export default class ChatContextMenu {
  private buttons: (ButtonMenuItemOptions & {verify: () => boolean, notDirect?: () => boolean, withSelection?: true})[];
  private element: HTMLElement;

  private isSelectable: boolean;
  private target: HTMLElement;
  private isTargetAGroupedItem: boolean;
  private isTextSelected: boolean;
  private isAnchorTarget: boolean;
  private peerId: number;
  private mid: number;
  private message: any;

  constructor(private attachTo: HTMLElement, private chat: Chat, private appMessagesManager: AppMessagesManager, private appChatsManager: AppChatsManager, private appPeersManager: AppPeersManager, private appPollsManager: AppPollsManager) {
    const onContextMenu = (e: MouseEvent | Touch | TouchEvent) => {
      if(this.init) {
        this.init();
        this.init = null;
      }

      let bubble: HTMLElement, contentWrapper: HTMLElement;

      try {
        contentWrapper = findUpClassName(e.target, 'bubble-content-wrapper');
        bubble = contentWrapper ? contentWrapper.parentElement : findUpClassName(e.target, 'bubble');
      } catch(e) {}

      // ! context menu click by date bubble (there is no pointer-events)
      if(!bubble) return;

      if(e instanceof MouseEvent || e.hasOwnProperty('preventDefault')) (e as any).preventDefault();
      if(this.element.classList.contains('active')) {
        return false;
      }
      if(e instanceof MouseEvent || e.hasOwnProperty('cancelBubble')) (e as any).cancelBubble = true;

      let mid = +bubble.dataset.mid;
      if(!mid) return;

      // * если открыть контекстное меню для альбома не по бабблу, и последний элемент не выбран, чтобы показать остальные пункты
      if(chat.selection.isSelecting && !contentWrapper) {
        const mids = this.chat.getMidsByMid(mid);
        if(mids.length > 1) {
          const selectedMid = chat.selection.selectedMids.has(mid) ? mid : mids.find(mid => chat.selection.selectedMids.has(mid));
          if(selectedMid) {
            mid = selectedMid;
          }
        }
      }

      this.isSelectable = this.chat.selection.canSelectBubble(bubble);
      this.peerId = this.chat.peerId;
      //this.msgID = msgID;
      this.target = e.target as HTMLElement;
      this.isTextSelected = !isSelectionEmpty();
      this.isAnchorTarget = this.target.tagName === 'A' && (this.target as HTMLAnchorElement).target === '_blank';

      const groupedItem = findUpClassName(this.target, 'grouped-item');
      this.isTargetAGroupedItem = !!groupedItem;
      if(groupedItem) {
        this.mid = +groupedItem.dataset.mid;
      } else {
        this.mid = mid;
      }

      this.message = this.chat.getMessage(this.mid);

      this.buttons.forEach(button => {
        let good: boolean;

        //if((appImManager.chatSelection.isSelecting && !button.withSelection) || (button.withSelection && !appImManager.chatSelection.isSelecting)) {
        if(chat.selection.isSelecting && !button.withSelection) {
          good = false;
        } else {
          good = contentWrapper || isTouchSupported ? 
            button.verify() : 
            button.notDirect && button.verify() && button.notDirect();
        }

        button.element.classList.toggle('hide', !good);
      });

      const side: 'left' | 'right' = bubble.classList.contains('is-in') ? 'left' : 'right';
      //bubble.parentElement.append(this.element);
      //appImManager.log('contextmenu', e, bubble, side);
      positionMenu((e as TouchEvent).touches ? (e as TouchEvent).touches[0] : e as MouseEvent, this.element, side);
      openBtnMenu(this.element, () => {
        this.peerId = this.mid = 0;
        this.target = null;
      });
    };

    if(isTouchSupported/*  && false */) {
      attachClickEvent(attachTo, (e) => {
        if(chat.selection.isSelecting) {
          return;
        }

        const className = (e.target as HTMLElement).className;
        if(!className || !className.includes) return;

        chat.log('touchend', e);

        const good = ['bubble', 'bubble-content-wrapper', 'bubble-content', 'message', 'time', 'inner'].find(c => className.match(new RegExp(c + '($|\\s)')));
        if(good) {
          cancelEvent(e);
          //onContextMenu((e as TouchEvent).changedTouches[0]);
          onContextMenu((e as TouchEvent).changedTouches ? (e as TouchEvent).changedTouches[0] : e as MouseEvent);
        }
      }, {listenerSetter: this.chat.bubbles.listenerSetter});

      attachContextMenuListener(attachTo, (e) => {
        if(chat.selection.isSelecting) return;

        // * these two lines will fix instant text selection on iOS Safari
        document.body.classList.add('no-select'); // * need no-select on body because chat-input transforms in channels
        attachTo.addEventListener('touchend', (e) => {
          cancelEvent(e); // ! this one will fix propagation to document loader button, etc
          document.body.classList.remove('no-select');

          //this.chat.bubbles.onBubblesClick(e);
        }, {once: true, capture: true});

        cancelSelection();
        //cancelEvent(e as any);
        const bubble = findUpClassName(e.target, 'grouped-item') || findUpClassName(e.target, 'bubble');
        if(bubble) {
          chat.selection.toggleByBubble(bubble);
        }
      }, this.chat.bubbles.listenerSetter);
    } else attachContextMenuListener(attachTo, onContextMenu, this.chat.bubbles.listenerSetter);
  }

  private init() {
    this.buttons = [{
      icon: 'send2',
      text: 'MessageScheduleSend',
      onClick: this.onSendScheduledClick,
      verify: () => this.chat.type === 'scheduled' && !this.message.pFlags.is_outgoing
    }, {
      icon: 'send2',
      text: 'Message.Context.Selection.SendNow',
      onClick: this.onSendScheduledClick,
      verify: () => this.chat.type === 'scheduled' && this.chat.selection.selectedMids.has(this.mid) && !this.chat.selection.selectionSendNowBtn.hasAttribute('disabled'),
      notDirect: () => true,
      withSelection: true
    }, {
      icon: 'schedule',
      text: 'MessageScheduleEditTime',
      onClick: () => {
        this.chat.input.scheduleSending(() => {
          this.appMessagesManager.editMessage(this.message, this.message.message, {
            scheduleDate: this.chat.input.scheduleDate,
            entities: this.message.entities
          });

          this.chat.input.onMessageSent(false, false);
        }, new Date(this.message.date * 1000));
      },
      verify: () => this.chat.type === 'scheduled'
    }, {
      icon: 'reply',
      text: 'Reply',
      onClick: this.onReplyClick,
      verify: () => this.appMessagesManager.canWriteToPeer(this.peerId, this.chat.threadId) && 
        !this.message.pFlags.is_outgoing && 
        !!this.chat.input.messageInput && 
        this.chat.type !== 'scheduled'/* ,
      cancelEvent: true */
    }, {
      icon: 'edit',
      text: 'Edit',
      onClick: this.onEditClick,
      verify: () => this.appMessagesManager.canEditMessage(this.message, 'text') && !!this.chat.input.messageInput
    }, {
      icon: 'copy',
      text: 'Copy',
      onClick: this.onCopyClick,
      verify: () => !!this.message.message && !this.isTextSelected
    }, {
      icon: 'copy',
      text: 'Chat.CopySelectedText',
      onClick: this.onCopyClick,
      verify: () => !!this.message.message && this.isTextSelected
    }, {
      icon: 'copy',
      text: 'Message.Context.Selection.Copy',
      onClick: this.onCopyClick,
      verify: () => this.chat.selection.selectedMids.has(this.mid) && !![...this.chat.selection.selectedMids].find(mid => !!this.chat.getMessage(mid).message),
      notDirect: () => true,
      withSelection: true
    }, {
      icon: 'copy',
      text: 'CopyLink',
      onClick: this.onCopyAnchorLinkClick,
      verify: () => this.isAnchorTarget,
      withSelection: true
    }, {
      icon: 'link',
      text: 'MessageContext.CopyMessageLink1',
      onClick: this.onCopyLinkClick,
      verify: () => this.appPeersManager.isChannel(this.peerId) && !this.message.pFlags.is_outgoing
    }, {
      icon: 'pin',
      text: 'Message.Context.Pin',
      onClick: this.onPinClick,
      verify: () => !this.message.pFlags.is_outgoing && 
        this.message._ !== 'messageService' && 
        !this.message.pFlags.pinned && 
        this.appPeersManager.canPinMessage(this.peerId) && 
        this.chat.type !== 'scheduled',
    }, {
      icon: 'unpin',
      text: 'Message.Context.Unpin',
      onClick: this.onUnpinClick,
      verify: () => this.message.pFlags.pinned && this.appPeersManager.canPinMessage(this.peerId),
    }, {
      icon: 'download',
      text: 'MediaViewer.Context.Download',
      onClick: () => {
        appDocsManager.saveDocFile(this.message.media.document);
      },
      verify: () => {
        if(this.message.pFlags.is_outgoing) {
          return false;
        }
        
        const doc: MyDocument = this.message.media?.document;
        return doc && doc.type && !(['gif', 'photo', 'video', 'sticker'] as MyDocument['type'][]).includes(doc.type);
      }
    }, {
      icon: 'checkretract',
      text: 'Chat.Poll.Unvote',
      onClick: this.onRetractVote,
      verify: () => {
        const poll = this.message.media?.poll as Poll;
        return poll && poll.chosenIndexes.length && !poll.pFlags.closed && !poll.pFlags.quiz;
      }/* ,
      cancelEvent: true */
    }, {
      icon: 'stop',
      text: 'Chat.Poll.Stop',
      onClick: this.onStopPoll,
      verify: () => {
        const poll = this.message.media?.poll;
        return this.appMessagesManager.canEditMessage(this.message, 'poll') && poll && !poll.pFlags.closed && !this.message.pFlags.is_outgoing;
      }/* ,
      cancelEvent: true */
    }, {
      icon: 'forward',
      text: 'Forward',
      onClick: this.onForwardClick,
      verify: () => this.chat.type !== 'scheduled' && !this.message.pFlags.is_outgoing && this.message._ !== 'messageService'
    }, {
      icon: 'forward',
      text: 'Message.Context.Selection.Forward',
      onClick: this.onForwardClick,
      verify: () => this.chat.selection.selectionForwardBtn && 
        this.chat.selection.selectedMids.has(this.mid) && 
        !this.chat.selection.selectionForwardBtn.hasAttribute('disabled'),
      notDirect: () => true,
      withSelection: true
    }, {
      icon: 'select',
      text: 'Message.Context.Select',
      onClick: this.onSelectClick,
      verify: () => !this.message.action && !this.chat.selection.selectedMids.has(this.mid) && this.isSelectable,
      notDirect: () => true,
      withSelection: true
    }, {
      icon: 'select',
      text: 'Message.Context.Selection.Clear',
      onClick: this.onClearSelectionClick,
      verify: () => this.chat.selection.selectedMids.has(this.mid),
      notDirect: () => true,
      withSelection: true
    }, {
      icon: 'delete danger',
      text: 'Delete',
      onClick: this.onDeleteClick,
      verify: () => this.appMessagesManager.canDeleteMessage(this.message)
    }, {
      icon: 'delete danger',
      text: 'Message.Context.Selection.Delete',
      onClick: this.onDeleteClick,
      verify: () => this.chat.selection.selectedMids.has(this.mid) && !this.chat.selection.selectionDeleteBtn.hasAttribute('disabled'),
      notDirect: () => true,
      withSelection: true
    }];

    this.element = ButtonMenu(this.buttons, this.chat.bubbles.listenerSetter);
    this.element.id = 'bubble-contextmenu';
    this.element.classList.add('contextmenu');
    this.chat.container.append(this.element);
  };

  private onSendScheduledClick = () => {
    if(this.chat.selection.isSelecting) {
      this.chat.selection.selectionSendNowBtn.click();
    } else {
      new PopupSendNow(this.peerId, this.chat.getMidsByMid(this.mid));
    }
  };

  private onReplyClick = () => {
    this.chat.input.initMessageReply(this.mid);
  };

  private onEditClick = () => {
    this.chat.input.initMessageEditing(this.mid);
  };

  private onCopyClick = () => {
    if(isSelectionEmpty()) {
      const mids = this.chat.selection.isSelecting ? [...this.chat.selection.selectedMids].sort((a, b) => a - b) : [this.mid];
      const str = mids.reduce((acc, mid) => {
        const message = this.chat.getMessage(mid);
        return acc + (message?.message ? message.message + '\n' : '');
      }, '').trim();
      copyTextToClipboard(str);
    } else {
      document.execCommand('copy');
      //cancelSelection();
    }
  };

  private onCopyAnchorLinkClick = () => {
    copyTextToClipboard((this.target as HTMLAnchorElement).href);
  };

  private onCopyLinkClick = () => {
    const username = this.appPeersManager.getPeerUsername(this.peerId);
    const msgId = this.appMessagesManager.getServerMessageId(this.mid);
    let url = 'https://t.me/';
    let key: LangPackKey;
    if(username) {
      url += username + '/' + msgId;
      key = 'LinkCopied';
    } else {
      url += 'c/' + Math.abs(this.peerId) + '/' + msgId;
      key = 'LinkCopiedPrivateInfo';
    }

    toast(I18n.format(key, true));

    copyTextToClipboard(url);
  };

  private onPinClick = () => {
    new PopupPinMessage(this.peerId, this.mid);
  };

  private onUnpinClick = () => {
    new PopupPinMessage(this.peerId, this.mid, true);
  };

  private onRetractVote = () => {
    this.appPollsManager.sendVote(this.message, []);
  };

  private onStopPoll = () => {
    this.appPollsManager.stopPoll(this.message);
  };

  private onForwardClick = () => {
    if(this.chat.selection.isSelecting) {
      this.chat.selection.selectionForwardBtn.click();
    } else {
      new PopupForward(this.peerId, this.isTargetAGroupedItem ? [this.mid] : this.chat.getMidsByMid(this.mid));
    }
  };

  private onSelectClick = () => {
    this.chat.selection.toggleByBubble(findUpClassName(this.target, 'grouped-item') || findUpClassName(this.target, 'bubble'));
  };

  private onClearSelectionClick = () => {
    this.chat.selection.cancelSelection();
  };

  private onDeleteClick = () => {
    if(this.chat.selection.isSelecting) {
      this.chat.selection.selectionDeleteBtn.click();
    } else {
      new PopupDeleteMessages(this.peerId, this.isTargetAGroupedItem ? [this.mid] : this.chat.getMidsByMid(this.mid), this.chat.type);
    }
  };
}
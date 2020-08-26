import appMessagesManager from "./appMessagesManager";
import apiManagerProxy from "../mtproto/mtprotoworker";
import appPeersManager from "../appManagers/appPeersManager";
import appMessagesIDsManager from "./appMessagesIDsManager";
import { RichTextProcessor } from "../richtextprocessor";
import { toast } from "../../components/toast";
import appUsersManager, { User } from "./appUsersManager";
import appPhotosManager, { MTPhoto } from "./appPhotosManager";
import { MTDocument } from "../../types";
import appDocsManager from "./appDocsManager";

type botInlineResult = {
  _: 'botInlineResult',
  flags: number,
  id: string,
  type: string,
  title?: string,
  description?: string,
  url?: string,
  thumb: any,
  content: any,
  send_message: any
};
type botInlineMediaResult = {
  _: 'botInlineMediaResult',
  flags: number,
  id: string,
  type: string,
  photo?: MTPhoto,
  document?: MTDocument,
  title?: string,
  description?: string,
  send_message: any
};
type BotInlineResult = (botInlineResult | botInlineMediaResult) & Partial<{
  qID: string,
  botID: number,
  rTitle: string,
  rDescription: string,
  initials: string
}>;

export class AppInlineBotsManager {
  private inlineResults: {[qID: string]: BotInlineResult} = {};

  public getInlineResults(peerID: number, botID: number, query = '', offset = '', geo?: any) {
    return apiManagerProxy.invokeApi('messages.getInlineBotResults', {
      flags: 0 | (geo ? 1 : 0),
      bot: appUsersManager.getUserInput(botID),
      peer: appPeersManager.getInputPeerByID(peerID),
      query: query,
      geo_point: geo && {_: 'inputGeoPoint', lat: geo['lat'], long: geo['long']},
      offset
    }, {timeout: 1, stopTime: -1, noErrorBox: true}).then((botResults: {
      _: 'messages.botResults',
      flags: number,
      pFlags: Partial<{gallery: true}>,
      query_id: string,
      next_offset?: string,
      switch_pm?: any,
      results: BotInlineResult[],
      cache_time: number,
      users: User[]
    }) => {
      const queryID = botResults.query_id;
      /* delete botResults._;
      delete botResults.flags;
      delete botResults.query_id; */
      
      if(botResults.switch_pm) {
        botResults.switch_pm.rText = RichTextProcessor.wrapRichText(botResults.switch_pm.text, {noLinebreaks: true, noLinks: true});
      }
      
      botResults.results.forEach((result: BotInlineResult) => {
        const qID = queryID + '_' + result.id;
        result.qID = qID;
        result.botID = botID;
        
        result.rTitle = RichTextProcessor.wrapRichText(result.title, {noLinebreaks: true, noLinks: true});
        result.rDescription = RichTextProcessor.wrapRichText(result.description, {noLinebreaks: true, noLinks: true});
        result.initials = ((result as botInlineResult).url || result.title || result.type || '').substr(0, 1);

        if(result._ == 'botInlineMediaResult') {
          if(result.document) {
            result.document = appDocsManager.saveDoc(result.document);
          }
          if(result.photo) {
            result.photo = appPhotosManager.savePhoto(result.photo);
          }
        }
        
        this.inlineResults[qID] = result;
      });

      return botResults;
    });
  }
  
  /* function getPopularBots () {
    return Storage.get('inline_bots_popular').then(function (bots) {
      var result = []
      var i, len
      var userID
      if (bots && bots.length) {
        var now = tsNow(true)
        for (i = 0, len = bots.length; i < len; i++) {
          if ((now - bots[i][3]) > 14 * 86400) {
            continue
          }
          userID = bots[i][0]
          if (!AppUsersManager.hasUser(userID)) {
            AppUsersManager.saveApiUser(bots[i][1])
          }
          result.push({id: userID, rate: bots[i][2], date: bots[i][3]})
        }
      }
      return result
    })
  }
  
  function pushPopularBot (id) {
    getPopularBots().then(function (bots) {
      var exists = false
      var count = bots.length
      var result = []
      for (var i = 0; i < count; i++) {
        if (bots[i].id == id) {
          exists = true
          bots[i].rate++
          bots[i].date = tsNow(true)
        }
        var user = AppUsersManager.getUser(bots[i].id)
        result.push([bots[i].id, user, bots[i].rate, bots[i].date])
      }
      if (exists) {
        result.sort(function (a, b) {
          return b[2] - a[2]
        })
      } else {
        if (result.length > 15) {
          result = result.slice(0, 15)
        }
        result.push([id, AppUsersManager.getUser(id), 1, tsNow(true)])
      }
      ConfigStorage.set({inline_bots_popular: result})
      
      $rootScope.$broadcast('inline_bots_popular')
    })
  }
  
  function resolveInlineMention (username) {
    return AppPeersManager.resolveUsername(username).then(function (peerID) {
      if (peerID > 0) {
        var bot = AppUsersManager.getUser(peerID)
        if (bot.pFlags.bot && bot.bot_inline_placeholder !== undefined) {
          var resolvedBot = {
            username: username,
            id: peerID,
            placeholder: bot.bot_inline_placeholder
          }
          if (bot.pFlags.bot_inline_geo &&
            GeoLocationManager.isAvailable()) {
              return checkGeoLocationAccess(peerID).then(function () {
                return GeoLocationManager.getPosition().then(function (coords) {
                  resolvedBot.geo = coords
                  return qSync.when(resolvedBot)
                })
              })['catch'](function () {
                return qSync.when(resolvedBot)
              })
            }
            return qSync.when(resolvedBot)
          }
        }
        return $q.reject()
      }, function (error) {
        error.handled = true
        return $q.reject(error)
      })
    }
    
    function regroupWrappedResults (results, rowW, rowH) {
      if (!results ||
        !results[0] ||
        ['photo', 'gif', 'sticker'].indexOf(results[0].type) == -1) {
          return
        }
        var ratios = []
        angular.forEach(results, function (result) {
          var w
          var h, doc
          var photo
          if (result._ == 'botInlineMediaResult') {
            if (doc = result.document) {
              w = result.document.w
              h = result.document.h
            }
            else if (photo = result.photo) {
              var photoSize = (photo.sizes || [])[0]
              w = photoSize && photoSize.w
              h = photoSize && photoSize.h
            }
          }else {
            w = result.w
            h = result.h
          }
          if (!w || !h) {
            w = h = 1
          }
          ratios.push(w / h)
        })
        
        var rows = []
        var curCnt = 0
        var curW = 0
        angular.forEach(ratios, function (ratio) {
          var w = ratio * rowH
          curW += w
          if (!curCnt || curCnt < 4 && curW < (rowW * 1.1)) {
            curCnt++
          } else {
            rows.push(curCnt)
            curCnt = 1
            curW = w
          }
        })
        if (curCnt) {
          rows.push(curCnt)
        }
        
        var i = 0
        var thumbs = []
        var lastRowI = rows.length - 1
        angular.forEach(rows, function (rowCnt, rowI) {
          var lastRow = rowI == lastRowI
          var curRatios = ratios.slice(i, i + rowCnt)
          var sumRatios = 0
          angular.forEach(curRatios, function (ratio) {
            sumRatios += ratio
          })
          angular.forEach(curRatios, function (ratio, j) {
            var thumbH = rowH
            var thumbW = rowW * ratio / sumRatios
            var realW = thumbH * ratio
            if (lastRow && thumbW > realW) {
              thumbW = realW
            }
            var result = results[i + j]
            result.thumbW = Math.floor(thumbW) - 2
            result.thumbH = Math.floor(thumbH) - 2
          })
          
          i += rowCnt
        })
      }
      
      function switchToPM (fromPeerID, botID, startParam) {
        var peerString = AppPeersManager.getPeerString(fromPeerID)
        var setHash = {}
        setHash['inline_switch_pm' + botID] = {peer: peerString, time: tsNow()}
        Storage.set(setHash)
        $rootScope.$broadcast('history_focus', {peerString: AppPeersManager.getPeerString(botID)})
        AppMessagesManager.startBot(botID, 0, startParam)
      }
      
      function checkSwitchReturn (botID) {
        var bot = AppUsersManager.getUser(botID)
        if (!bot || !bot.pFlags.bot || !bot.bot_inline_placeholder) {
          return qSync.when(false)
        }
        var key = 'inline_switch_pm' + botID
        return Storage.get(key).then(function (peerData) {
          if (peerData) {
            Storage.remove(key)
            if (tsNow() - peerData.time < 3600000) {
              return peerData.peer
            }
          }
          return false
        })
      }
      
      function switchInlineQuery (botID, toPeerString, query) {
        $rootScope.$broadcast('history_focus', {
          peerString: toPeerString,
          attachment: {
            _: 'inline_query',
            mention: '@' + AppUsersManager.getUser(botID).username,
            query: query
          }
        })
      }
      
      function switchInlineButtonClick (id, button) {
        var message = AppMessagesManager.getMessage(id)
        var botID = message.viaBotID || message.fromID
        if (button.pFlags && button.pFlags.same_peer) {
          var peerID = AppMessagesManager.getMessagePeer(message)
          var toPeerString = AppPeersManager.getPeerString(peerID)
          switchInlineQuery(botID, toPeerString, button.query)
          return
        }
        return checkSwitchReturn(botID).then(function (retPeerString) {
          if (retPeerString) {
            return switchInlineQuery(botID, retPeerString, button.query)
          }
          PeersSelectService.selectPeer({
            canSend: true
          }).then(function (toPeerString) {
            return switchInlineQuery(botID, toPeerString, button.query)
          })
        })
      } */
      
  public callbackButtonClick(mid: number, button: any) {
    let message = appMessagesManager.getMessage(mid);
    let peerID = appMessagesManager.getMessagePeer(message);
    
    return apiManagerProxy.invokeApi('messages.getBotCallbackAnswer', {
      flags: 1,
      peer: appPeersManager.getInputPeerByID(peerID),
      msg_id: appMessagesIDsManager.getMessageLocalID(mid),
      data: button.data
    }, {timeout: 1, stopTime: -1, noErrorBox: true}).then((callbackAnswer: any) => {
      if(typeof callbackAnswer.message === 'string' && callbackAnswer.message.length) {
        toast(RichTextProcessor.wrapRichText(callbackAnswer.message, {noLinks: true, noLinebreaks: true}));
      }
      
      console.log('callbackButtonClick callbackAnswer:', callbackAnswer);
    });
  }
      
  /* function gameButtonClick (id) {
    var message = AppMessagesManager.getMessage(id)
    var peerID = AppMessagesManager.getMessagePeer(message)
    
    return MtpApiManager.invokeApi('messages.getBotCallbackAnswer', {
      flags: 2,
      peer: AppPeersManager.getInputPeerByID(peerID),
      msg_id: AppMessagesIDsManager.getMessageLocalID(id)
    }, {timeout: 1, stopTime: -1, noErrorBox: true}).then(function (callbackAnswer) {
      if (typeof callbackAnswer.message === 'string' &&
      callbackAnswer.message.length) {
        showCallbackMessage(callbackAnswer.message, callbackAnswer.pFlags.alert)
      }
      else if (typeof callbackAnswer.url === 'string') {
        AppGamesManager.openGame(message.media.game.id, id, callbackAnswer.url)
      }
    })
  }

  function sendInlineResult (peerID, qID, options) {
    var inlineResult = inlineResults[qID]
    if (inlineResult === undefined) {
      return false
    }
    pushPopularBot(inlineResult.botID)
    var splitted = qID.split('_')
    var queryID = splitted.shift()
    var resultID = splitted.join('_')
    options = options || {}
    options.viaBotID = inlineResult.botID
    options.queryID = queryID
    options.resultID = resultID
    if (inlineResult.send_message.reply_markup) {
      options.reply_markup = inlineResult.send_message.reply_markup
    }
    
    if (inlineResult.send_message._ == 'botInlineMessageText') {
      options.entities = inlineResult.send_message.entities
      AppMessagesManager.sendText(peerID, inlineResult.send_message.message, options)
    } else {
      var caption = ''
      var inputMedia = false
      switch (inlineResult.send_message._) {
        case 'botInlineMessageMediaAuto':
        caption = inlineResult.send_message.caption
        if (inlineResult._ == 'botInlineMediaResult') {
          var doc = inlineResult.document
          var photo = inlineResult.photo
          if (doc) {
            inputMedia = {
              _: 'inputMediaDocument',
              id: {_: 'inputDocument', id: doc.id, access_hash: doc.access_hash},
              caption: caption
            }
          } else {
            inputMedia = {
              _: 'inputMediaPhoto',
              id: {_: 'inputPhoto', id: photo.id, access_hash: photo.access_hash},
              caption: caption
            }
          }
        }
        break
        
        case 'botInlineMessageMediaGeo':
        inputMedia = {
          _: 'inputMediaGeoPoint',
          geo_point: {
            _: 'inputGeoPoint',
            'lat': inlineResult.send_message.geo['lat'],
            'long': inlineResult.send_message.geo['long']
          }
        }
        break
        
        case 'botInlineMessageMediaVenue':
        inputMedia = {
          _: 'inputMediaVenue',
          geo_point: {
            _: 'inputGeoPoint',
            'lat': inlineResult.send_message.geo['lat'],
            'long': inlineResult.send_message.geo['long']
          },
          title: inlineResult.send_message.title,
          address: inlineResult.send_message.address,
          provider: inlineResult.send_message.provider,
          venue_id: inlineResult.send_message.venue_id
        }
        break
        
        case 'botInlineMessageMediaContact':
        inputMedia = {
          _: 'inputMediaContact',
          phone_number: inlineResult.send_message.phone_number,
          first_name: inlineResult.send_message.first_name,
          last_name: inlineResult.send_message.last_name
        }
        break
      }
      if (!inputMedia) {
        inputMedia = {
          _: 'messageMediaPending',
          type: inlineResult.type,
          file_name: inlineResult.title || inlineResult.content_url || inlineResult.url,
          size: 0,
          progress: {percent: 30, total: 0}
        }
      }
      AppMessagesManager.sendOther(peerID, inputMedia, options)
    }
  }
  
  function checkGeoLocationAccess (botID) {
    var key = 'bot_access_geo' + botID
    return Storage.get(key).then(function (geoAccess) {
      if (geoAccess && geoAccess.granted) {
        return true
      }
      return ErrorService.confirm({
        type: 'BOT_ACCESS_GEO_INLINE'
      }).then(function () {
        var setHash = {}
        setHash[key] = {granted: true, time: tsNow()}
        Storage.set(setHash)
        return true
      }, function () {
        var setHash = {}
        setHash[key] = {denied: true, time: tsNow()}
        Storage.set(setHash)
        return $q.reject()
      })
    })
  } */
}

const appInlineBotsManager = new AppInlineBotsManager();
export default appInlineBotsManager;
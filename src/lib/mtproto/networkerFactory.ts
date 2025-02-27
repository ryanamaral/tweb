/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 * 
 * Originally from:
 * https://github.com/zhukov/webogram
 * Copyright (C) 2014 Igor Zhukov <igor.beatle@gmail.com>
 * https://github.com/zhukov/webogram/blob/master/LICENSE
 */

import MTPNetworker from "./networker";
import { ConnectionStatusChange, InvokeApiOptions } from "../../types";
import MTTransport from "./transports/transport";

export class NetworkerFactory {
  private networkers: MTPNetworker[] = [];
  public updatesProcessor: (obj: any) => void = null;
  public onConnectionStatusChange: (info: ConnectionStatusChange) => void = null;
  public akStopped = false;

  public setUpdatesProcessor(callback: (obj: any) => void) {
    this.updatesProcessor = callback;
  }

  public getNetworker(dcId: number, authKey: number[], authKeyID: Uint8Array, serverSalt: number[], transport: MTTransport, options: InvokeApiOptions) {
    //console.log('NetworkerFactory: creating new instance of MTPNetworker:', dcId, options);
    const networker = new MTPNetworker(dcId, authKey, authKeyID, serverSalt, transport, options);
    this.networkers.push(networker);
    return networker;
  }

  public startAll() {
    if(this.akStopped) {
      const stoppedNetworkers = this.networkers.filter(networker => networker.isStopped());

      this.akStopped = false;
      this.updatesProcessor && this.updatesProcessor({_: 'new_session_created'});
      
      for(const networker of stoppedNetworkers) {
        networker.scheduleRequest();
      }
    }
  }

  public stopAll() {
    this.akStopped = true;
  }
}

export default new NetworkerFactory();

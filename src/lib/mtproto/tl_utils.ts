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

import { bytesToHex } from '../../helpers/bytes';
import { isObject, longFromInts } from './bin_utils';
import { MOUNT_CLASS_TO } from '../../config/debug';
import { str2bigInt, dup, divide_, bigInt2str } from '../../vendor/leemon';
import Schema, { MTProtoConstructor } from './schema';

/// #if MTPROTO_WORKER
// @ts-ignore
import { gzipUncompress } from '../crypto/crypto_utils';
/// #endif

const boolFalse = +Schema.API.constructors.find(c => c.predicate === 'boolFalse').id >>> 0;
const boolTrue = +Schema.API.constructors.find(c => c.predicate === 'boolTrue').id >>> 0;
const vector = +Schema.API.constructors.find(c => c.predicate === 'vector').id >>> 0;
const gzipPacked = +Schema.MTProto.constructors.find(c => c.predicate === 'gzip_packed').id >>> 0;

//console.log('boolFalse', boolFalse === 0xbc799737);

class TLSerialization {
  public maxLength = 2048; // 2Kb
  public offset = 0; // in bytes
  public mtproto = false;
  private debug = false;//Modes.debug;

  public buffer: ArrayBuffer;
  public intView: Int32Array;
  public byteView: Uint8Array;

  constructor(options: Partial<{startMaxLength: number, mtproto: true}> = {}) {
    this.maxLength = options.startMaxLength || 2048; // 2Kb
    this.mtproto = options.mtproto || false;
    this.createBuffer();
  }

  public createBuffer() {
    this.buffer = new ArrayBuffer(this.maxLength);
    this.intView = new Int32Array(this.buffer);
    this.byteView = new Uint8Array(this.buffer);
  }

  public getArray() {
    const resultBuffer = new ArrayBuffer(this.offset);

    //let perf = performance.now();
    /* const resultUint8: any = new Uint8Array(resultBuffer);
    resultUint8.set(this.byteView.subarray(0, this.offset)); */
    //console.log('perf uint8', performance.now() - perf);

    //perf = performance.now();
    const resultInt32 = new Int32Array(resultBuffer);
    resultInt32.set(this.intView.subarray(0, this.offset / 4));
    //console.log('perf int32', performance.now() - perf);

    /* if(resultUint8.buffer.byteLength !== resultInt32.buffer.byteLength) {
      console.error(resultUint8, resultInt32);
    } */
  
    return resultInt32;
  }

  public getBuffer() {
    return this.getArray().buffer;
  }

  public getBytes(typed: true): Uint8Array;
  public getBytes(typed?: false): number[];
  public getBytes(typed?: boolean): number[] | Uint8Array {
    if(typed) {
      const resultBuffer = new ArrayBuffer(this.offset);
      const resultArray = new Uint8Array(resultBuffer);
  
      resultArray.set(this.byteView.subarray(0, this.offset));
  
      return resultArray;
    }
  
    const bytes: number[] = [];
    for(let i = 0; i < this.offset; i++) {
      bytes.push(this.byteView[i]);
    }
    return bytes;
  }

  public checkLength(needBytes: number) {
    if(this.offset + needBytes < this.maxLength) {
      return;
    }
  
    //console.log('Increase buffer start', this.offset, needBytes, this.maxLength, this.byteView.slice(0, 32));
    this.maxLength = Math.ceil(Math.max(this.maxLength * 2, this.offset + needBytes + 16) / 4) * 4;
    const previousBuffer = this.buffer;
    //const previousByteView = this.byteView;
    const previousArray = new Int32Array(previousBuffer);
    
    this.createBuffer();
    
    new Int32Array(this.buffer).set(previousArray);
    /* console.log('Increase buffer end', this.offset, needBytes, this.maxLength, this.byteView.slice(0, 32), 
      bytesCmp(previousByteView, this.byteView.slice(0, previousByteView.length))); */
  }

  public writeInt(i: number, field: string) {
    this.debug && console.log('>>>', i.toString(16), i, field);
  
    const offset = this.offset / 4;
    this.checkLength(4);
    this.intView[offset] = i;
    this.offset += 4;

    return offset;
  }
  
  public storeInt(i: number, field?: string) {
    return this.writeInt(i, (field || '') + ':int');
  }
  
  public storeBool(i: boolean, field?: string) {
    if(i) {
      this.writeInt(boolTrue, (field || '') + ':bool');
    } else {
      this.writeInt(boolFalse, (field || '') + ':bool');
    }
  }
  
  public storeLongP(iHigh: number, iLow: number, field?: string) {
    this.writeInt(iLow, (field || '') + ':long[low]');
    this.writeInt(iHigh, (field || '') + ':long[high]');
  }

  public storeLong(sLong: Array<number> | string | number, field?: string) {
    if(Array.isArray(sLong)) {
      if(sLong.length === 2) {
        return this.storeLongP(sLong[0], sLong[1], field);
      } else {
        return this.storeIntBytes(sLong, 64, field);
      }
    }
  
    if(typeof sLong !== 'string') {
      sLong = sLong ? sLong.toString() : '0';
    }

    const R = 0x100000000;
    //const divRem = bigStringInt(sLong).divideAndRemainder(bigint(R));

    const a = str2bigInt(sLong, 10, 64);
    const q = dup(a);
    const r = dup(a);
    divide_(a, str2bigInt((R).toString(16), 16, 64), q, r);
    //divInt_(a, R);

    const high = +bigInt2str(q, 10);
    let low = +bigInt2str(r, 10);

    if(high < low) {
      low -= R; 
    }

    //console.log('storeLong', sLong, divRem[0].intValue(), divRem[1].intValue(), high, low);
  
    //this.writeInt(divRem[1].intValue(), (field || '') + ':long[low]');
    //this.writeInt(divRem[0].intValue(), (field || '') + ':long[high]');
    this.writeInt(low, (field || '') + ':long[low]');
    this.writeInt(high, (field || '') + ':long[high]');
  }
  
  public storeDouble(f: any, field?: string) {
    const buffer = new ArrayBuffer(8);
    const intView = new Int32Array(buffer);
    const doubleView = new Float64Array(buffer);
  
    doubleView[0] = f;
  
    this.writeInt(intView[0], (field || '') + ':double[low]');
    this.writeInt(intView[1], (field || '') + ':double[high]');
  }
  
  public storeString(s: string, field?: string) {
    this.debug && console.log('>>>', s, (field || '') + ':string');
  
    if(s === undefined) {
      s = '';
    }
    const sUTF8 = unescape(encodeURIComponent(s));
  
    this.checkLength(sUTF8.length + 8);
  
    const len = sUTF8.length;
    if(len <= 253) {
      this.byteView[this.offset++] = len;
    } else {
      this.byteView[this.offset++] = 254;
      this.byteView[this.offset++] = len & 0xFF;
      this.byteView[this.offset++] = (len & 0xFF00) >> 8;
      this.byteView[this.offset++] = (len & 0xFF0000) >> 16;
    }
    for(let i = 0; i < len; i++) {
      this.byteView[this.offset++] = sUTF8.charCodeAt(i);
    }
  
    // Padding
    while(this.offset % 4) {
      this.byteView[this.offset++] = 0;
    }
  }
  
  public storeBytes(bytes: ArrayBuffer | Uint8Array | number[], field?: string) {
    if(bytes instanceof ArrayBuffer) {
      bytes = new Uint8Array(bytes);
    } else if(bytes === undefined) {
      bytes = [];
    }
    this.debug && console.log('>>>', bytesToHex(bytes as number[]), (field || '') + ':bytes');
  
    // if uint8array were json.stringified, then will be: {'0': 123, '1': 123}
    const len = (bytes as ArrayBuffer).byteLength || (bytes as Uint8Array).length;
    this.checkLength(len + 8);
    if(len <= 253) {
      this.byteView[this.offset++] = len;
    } else {
      this.byteView[this.offset++] = 254;
      this.byteView[this.offset++] = len & 0xFF;
      this.byteView[this.offset++] = (len & 0xFF00) >> 8;
      this.byteView[this.offset++] = (len & 0xFF0000) >> 16;
    }
  
    this.byteView.set(bytes as Uint8Array, this.offset);
    this.offset += len;
  
    // Padding
    while(this.offset % 4) {
      this.byteView[this.offset++] = 0;
    }
  }
  
  public storeIntBytes(bytes: any, bits: any, field?: string) {
    if(bytes instanceof ArrayBuffer) {
      bytes = new Uint8Array(bytes);
    }

    const len = bytes.length;
    if((bits % 32) || (len * 8) !== bits) {
      const error = new Error('Invalid bits: ' + bits + ', ' + bytes.length);
      console.error(error, bytes, field);
      throw error;
    }
  
    this.debug && console.log('>>>', bytesToHex(bytes), (field || '') + ':int' + bits);
    this.checkLength(len);
  
    this.byteView.set(bytes, this.offset);
    this.offset += len;
  }
  
  public storeRawBytes(bytes: ArrayLike<number>, field?: string) {
    if(bytes instanceof ArrayBuffer) {
      bytes = new Uint8Array(bytes);
    }

    const len = bytes.length;
  
    this.debug && console.log('>>>', bytesToHex(bytes), (field || ''));
    this.checkLength(len);
  
    this.byteView.set(bytes, this.offset);
    this.offset += len;
  }
  
  public storeMethod(methodName: string, params: any) {
    const schema = this.mtproto ? Schema.MTProto : Schema.API;
    const methodData = schema.methods.find(m => m.method === methodName);

    if(!methodData) {
      throw new Error('No method ' + methodName + ' found');
    }
  
    this.storeInt(methodData.id, methodName + '[id]');

    const pFlags = params.pFlags || params; // * support pFlags, though am not expecting it to be there
    const flagsOffsets: {[paramName: string]: number} = {};
    //console.log('storeMethod', len, methodData);
    for(const param of methodData.params) {
      let type = param.type;

      if(type.indexOf('?') !== -1) {
        const condType = type.split('?');
        const fieldBit = condType[0].split('.');

        if(!(params[fieldBit[0]] & (1 << +fieldBit[1]))) {
          if(condType[1] === 'true' ? pFlags[param.name] : params[param.name] !== undefined) {
            //console.log('storeMethod autocompleting', methodName, param.name, params[param.name], type);
            params[fieldBit[0]] |= 1 << +fieldBit[1];
          } else {
            continue;
          }
        }
        
        //console.log('storeMethod', methodName, fieldBit, params[fieldBit[0]], params, param, condType, !!(params[fieldBit[0]] & (1 << +fieldBit[1])));
        type = condType[1];
      }
      
      //console.log('storeMethod', methodName, param.name, params[param.name], type);
      const result = this.storeObject(params[param.name], type, methodName + '[' + param.name + ']');

      if(type === '#') {
        params[param.name] = params[param.name] || 0;
        flagsOffsets[param.name] = result as number;
      }
    }

    for(let paramName in flagsOffsets) {
      this.intView[flagsOffsets[paramName]] = params[paramName];
    }

    return methodData.type;
  }
  
  public storeObject(obj: any, type: string, field?: string) {
    //console.log('storeObject', obj, type, field, this.offset, this.getBytes(true).hex);
    switch(type) {
      case '#':
        obj = obj || 0;
      case 'int':
        return this.storeInt(obj, field);
      case 'long':
        return this.storeLong(obj, field);
      case 'int128':
        return this.storeIntBytes(obj, 128, field);
      case 'int256':
        return this.storeIntBytes(obj, 256, field);
      case 'int512':
        return this.storeIntBytes(obj, 512, field);
      case 'string':
        return this.storeString(obj, field);
      case 'bytes':
        return this.storeBytes(obj, field);
      case 'double':
        return this.storeDouble(obj, field);
      case 'Bool':
        return this.storeBool(obj, field);
      case 'true':
        return
    }
  
    if(Array.isArray(obj)) {
      if(type.substr(0, 6) === 'Vector') {
        this.writeInt(vector, field + '[id]');
      } else if (type.substr(0, 6) !== 'vector') {
        throw new Error('Invalid vector type ' + type);
      }

      const itemType = type.substr(7, type.length - 8); // for "Vector<itemType>"
      this.writeInt(obj.length, field + '[count]');
      for(let i = 0; i < obj.length; i++) {
        this.storeObject(obj[i], itemType, field + '[' + i + ']');
      }

      return true;
    } else if (type.substr(0, 6).toLowerCase() === 'vector') {
      throw new Error('Invalid vector object');
    }
    
    if(!isObject(obj)) {
      throw new Error('Invalid object for type ' + type);
    }
  
    const schema = this.mtproto ? Schema.MTProto : Schema.API;
    const predicate = obj['_'];
    let isBare = false;
    const constructorData: MTProtoConstructor = schema.constructors.find(c => c.predicate === predicate);
  
    if(isBare = (type.charAt(0) === '%')) {
      type = type.substr(1);
    }

    if(!constructorData) {
      throw new Error('No predicate ' + predicate + ' found');
    }
  
    if(predicate === type) {
      isBare = true;
    }
  
    if(!isBare) {
      this.writeInt(constructorData.id, field + '[' + predicate + '][id]');
    }

    const pFlags = obj.pFlags;
    const flagsOffsets: {[paramName: string]: number} = {};
    //console.log('storeObject', len, constructorData);
    for(const param of constructorData.params) {
      let type = param.type;

      //console.log('storeObject', param, type);
      if(type.indexOf('?') !== -1) {
        const condType = type.split('?');
        const fieldBit = condType[0].split('.');

        //console.log('storeObject fieldBit', fieldBit, obj[fieldBit[0]]);

        if(!(obj[fieldBit[0]] & (1 << +fieldBit[1]))) {
          if(condType[1] === 'true' ? pFlags && pFlags[param.name] : obj[param.name] !== undefined) {
            //console.log('storeObject autocompleting', param.name, obj[param.name], type);
            obj[fieldBit[0]] |= 1 << +fieldBit[1];
          } else {
            continue;
          }
        }

        type = condType[1];
      }
      //console.log('storeObject', param, type);
  
      const result = this.storeObject(obj[param.name], type, field + '[' + predicate + '][' + param.name + ']');

      if(type === '#') {
        obj[param.name] = obj[param.name] || 0;
        flagsOffsets[param.name] = result as number;
      }
    }

    for(let paramName in flagsOffsets) {
      this.intView[flagsOffsets[paramName]] = obj[paramName];
    }
  
    return constructorData.type;
  }
}

class TLDeserialization {
  public offset = 0; // in bytes
  public override: {[key: string]: (result: any, field: string) => void};

  public buffer: ArrayBuffer;
  //public intView: Uint32Array;
  public byteView: Uint8Array;

  // this.debug = 
  public mtproto: boolean = false;
  private debug: boolean;

  constructor(buffer: ArrayBuffer | Uint8Array, options: Partial<{override: any, mtproto: true, debug: true}> = {}) {
    //buffer = addPadding(buffer, 4, true); // fix 21.01.2020 for wss
    if(buffer instanceof ArrayBuffer) {
      this.buffer = buffer;
      this.byteView = new Uint8Array(this.buffer);
    } else {
      this.buffer = buffer.buffer;
      this.byteView = buffer;
    }
    
    //console.log("TCL: TLDeserialization -> constructor -> buffer", buffer, this.byteView, this.byteView.hex);
    /* this.buffer = buffer;
    //this.intView = new Uint32Array(this.buffer);
    this.byteView = new Uint8Array(this.buffer); */

    //console.log(this.intView);

    this.override = 'override' in options ? options.override : {};
    this.mtproto = 'mtproto' in options ? options.mtproto : false;
    this.debug = options.debug !== undefined ? options.debug : /* Modes.debug */false;
  }

  public readInt(field: string) {
    //if(this.offset >= this.intView.length * 4) {
    if((this.byteView.length - this.offset) < 4) {
      console.error(this.byteView, this.offset);
      throw new Error('Nothing to fetch: ' + field);
    }
  
    //var i = this.intView[this.offset / 4];
    const i = new Uint32Array(this.byteView.buffer.slice(this.offset, this.offset + 4))[0];
  
    this.debug/*  || field.includes('[dialog][read_outbox_max_id]') */ 
      && console.log('<<<', i.toString(16), i, field, 
      this.byteView.slice(this.offset - 16, this.offset + 16), 
      this.byteView.slice(this.offset - 16, this.offset + 16).hex);
  
    this.offset += 4;
  
    return i;
  }
  
  public fetchInt(field?: string) {
    return this.readInt((field || '') + ':int');
  }
  
  public fetchDouble(field?: string) {
    const buffer = new ArrayBuffer(8);
    const intView = new Int32Array(buffer);
    const doubleView = new Float64Array(buffer);
  
    intView[0] = this.readInt((field || '') + ':double[low]'),
    intView[1] = this.readInt((field || '') + ':double[high]');
  
    return doubleView[0];
  }
  
  public fetchLong(field?: string): string {
    const iLow = this.readInt((field || '') + ':long[low]');
    const iHigh = this.readInt((field || '') + ':long[high]');
  
    //const longDec = bigint(iHigh).shiftLeft(32).add(bigint(iLow)).toString();
    const longDec = longFromInts(iHigh, iLow);
  
    return longDec;
  }
  
  public fetchBool(field?: string): boolean {
    const i = this.readInt((field || '') + ':bool');
    if(i === boolTrue) {
      return true;
    } else if(i === boolFalse) {
      return false;
    }

    this.offset -= 4;
    return this.fetchObject('Object', field);
  }
  
  public fetchString(field?: string): string {
    let len = this.byteView[this.offset++];
  
    if(len === 254) {
      len = this.byteView[this.offset++] |
        (this.byteView[this.offset++] << 8) |
        (this.byteView[this.offset++] << 16);
    }
  
    let sUTF8 = '';
    for(let i = 0; i < len; i++) {
      sUTF8 += String.fromCharCode(this.byteView[this.offset++]);
    }
  
    // Padding
    while(this.offset % 4) {
      this.offset++;
    }
  
    let s: string;
    try {
      s = decodeURIComponent(escape(sUTF8));
    } catch (e) {
      s = sUTF8;
    }
  
    this.debug && console.log('<<<', s, (field || '') + ':string');
  
    return s;
  }
  
  public fetchBytes(field?: string): Uint8Array {
    let len = this.byteView[this.offset++];
  
    if(len === 254) {
      len = this.byteView[this.offset++] |
        (this.byteView[this.offset++] << 8) |
        (this.byteView[this.offset++] << 16);
    }
  
    const bytes = this.byteView.subarray(this.offset, this.offset + len);
    this.offset += len;
  
    // Padding
    while(this.offset % 4) {
      this.offset++;
    }
  
    this.debug && console.log('<<<', bytesToHex(bytes), (field || '') + ':bytes');
  
    return bytes;
  }
  
  public fetchIntBytes(bits: number, typed: true, field?: string): Uint8Array;
  public fetchIntBytes(bits: number, typed?: false, field?: string): number[];
  public fetchIntBytes(bits: number, typed?: boolean, field?: string) {
    if(bits % 32) {
      throw new Error('Invalid bits: ' + bits);
    }
  
    const len = bits / 8;
    if(typed) {
      const result = this.byteView.subarray(this.offset, this.offset + len);
      this.offset += len;
      return result;
    }
  
    const bytes: number[] = [];
    for(let i = 0; i < len; i++) {
      bytes.push(this.byteView[this.offset++]);
    }
  
    this.debug && console.log('<<<', bytesToHex(bytes), (field || '') + ':int' + bits);
  
    return bytes;
  }
  
  public fetchRawBytes(len: any, typed: true, field: string): Uint8Array;
  public fetchRawBytes(len: any, typed: false, field: string): number[];
  public fetchRawBytes(len: any, typed: boolean, field: string) {
    if(len === false) {
      len = this.readInt((field || '') + '_length');
      if(len > this.byteView.byteLength) {
        throw new Error('Invalid raw bytes length: ' + len + ', buffer len: ' + this.byteView.byteLength);
      }
    }
  
    if(typed) {
      const bytes = new Uint8Array(len);
      bytes.set(this.byteView.subarray(this.offset, this.offset + len));
      this.offset += len;
      return bytes;
    }
  
    const bytes: number[] = [];
    for(let i = 0; i < len; i++) {
      bytes.push(this.byteView[this.offset++]);
    }
  
    this.debug && console.log('<<<', bytesToHex(bytes), (field || ''));
  
    return bytes;
  }
  
  public fetchObject(type: any, field?: string): any {
    switch(type) {
      case '#':
      case 'int':
        return this.fetchInt(field);
      case 'long':
        return this.fetchLong(field);
      case 'int128':
        return this.fetchIntBytes(128, false, field);
      case 'int256':
        return this.fetchIntBytes(256, false, field);
      case 'int512':
        return this.fetchIntBytes(512, false, field);
      case 'string':
        return this.fetchString(field);
      case 'bytes':
        return this.fetchBytes(field);
      case 'double':
        return this.fetchDouble(field);
      case 'Bool':
        return this.fetchBool(field);
      case 'true':
        return true;
    }
  
    field = field || type || 'Object';
  
    if(type.substr(0, 6) === 'Vector' || type.substr(0, 6) === 'vector') {
      if(type.charAt(0) === 'V') {
        const constructor = this.readInt(field + '[id]');
        const constructorCmp = constructor;
  
        if(constructorCmp === gzipPacked) { // Gzip packed
          const compressed = this.fetchBytes(field + '[packed_string]');
          const uncompressed = gzipUncompress(compressed);
          const newDeserializer = new TLDeserialization(uncompressed);
  
          return newDeserializer.fetchObject(type, field);
        }

        if(constructorCmp !== vector) {
          throw new Error('Invalid vector constructor ' + constructor);
        }
      }

      const len = this.readInt(field + '[count]');
      const result: any = [];
      if(len > 0) {
        const itemType = type.substr(7, type.length - 8); // for "Vector<itemType>"
        for(let i = 0; i < len; i++) {
          result.push(this.fetchObject(itemType, field + '[' + i + ']'));
        }
      }
  
      return result;
    }
  
    const schema = this.mtproto ? Schema.MTProto : Schema.API;
    let constructorData: MTProtoConstructor = null;
    let fallback = false;
  
    if(type.charAt(0) === '%') {
      const checkType = type.substr(1);
      constructorData = schema.constructors.find(c => c.type === checkType);
      if(!constructorData) {
        throw new Error('Constructor not found for type: ' + type);
      }
    } else if(type.charAt(0) >= 97 && type.charAt(0) <= 122) {
      constructorData = schema.constructors.find(c => c.predicate === type);
      if(!constructorData) {
        throw new Error('Constructor not found for predicate: ' + type);
      }
    } else {
      const constructor = this.readInt(field + '[id]');
      const constructorCmp = constructor;
  
      if(constructorCmp === gzipPacked) { // Gzip packed
        const compressed = this.fetchBytes(field + '[packed_string]');
        const uncompressed = gzipUncompress(compressed);
        const newDeserializer = new TLDeserialization(uncompressed);
  
        return newDeserializer.fetchObject(type, field);
      }
  
      let index = schema.constructorsIndex;
      if(!index) {
        schema.constructorsIndex = index = {};
        for(let i = 0, len = schema.constructors.length; i < len; i++) {
          index[schema.constructors[i].id] = i;
        }
      }

      const i = index[constructorCmp];
      if(i) {
        constructorData = schema.constructors[i];
      }
  
      if(!constructorData && this.mtproto) {
        const schemaFallback = Schema.API;
        for(let i = 0, len = schemaFallback.constructors.length; i < len; i++) {
          if(+schemaFallback.constructors[i].id === constructorCmp) {
            constructorData = schemaFallback.constructors[i];
  
            delete this.mtproto;
            fallback = true;
            break;
          }
        }
      }

      if(!constructorData) {
        console.error('Constructor not found:', constructor);
        
        let int1: number, int2: number;
        try {
          int1 = this.fetchInt(field);
          int2 = this.fetchInt(field);
        } catch(err) {

        }

        throw new Error('Constructor not found: ' + constructor + ' ' + int1 + ' ' + int2 + ' ' + field);
      }
    }
  
    const predicate = constructorData.predicate;
  
    const result: any = {'_': predicate};
    const overrideKey = (this.mtproto ? 'mt_' : '') + predicate;
    if(this.override[overrideKey]) {
      this.override[overrideKey](result, field + '[' + predicate + ']');
    } else {
      for(let i = 0, len = constructorData.params.length; i < len; i++) {
        const param = constructorData.params[i];
        let type = param.type;

        if(type === '#' && result.pFlags === undefined) {
          result.pFlags = {};
        }

        const isCond = (type.indexOf('?') !== -1);
        if(isCond) {
          const condType = type.split('?');
          const fieldBit = condType[0].split('.');

          if(!(result[fieldBit[0]] & (1 << +fieldBit[1]))) {
            //console.log('fetchObject bad', constructorData, result[fieldBit[0]], fieldBit);
            continue;
          }

          //console.log('fetchObject good', constructorData, result[fieldBit[0]], fieldBit);

          type = condType[1];
        }
  
        const value = this.fetchObject(type, field + '[' + predicate + '][' + param.name + ']');
  
        if(isCond && type === 'true') {
          result.pFlags[param.name] = value;
        } else {
          /* if(param.name === 'read_outbox_max_id') {
            console.log(result, param.name, value, field + '[' + predicate + '][' + param.name + ']');
          } */
            
          result[param.name] = value;
        }
      }
    }
  
    if(fallback) {
      this.mtproto = true;
    }
  
    return result;
  }
  
  public getOffset() {
    return this.offset;
  }
  
  public fetchEnd() {
    if(this.offset !== this.byteView.length) {
      throw new Error('Fetch end with non-empty buffer');
    }

    return true;
  }
}

MOUNT_CLASS_TO.TLDeserialization = TLDeserialization;
MOUNT_CLASS_TO.TLSerialization = TLSerialization;
export { TLDeserialization, TLSerialization };

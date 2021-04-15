/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

import { IDBStore } from "../lib/idb";
import Modes from "./modes";

export type DatabaseStoreName = 'session' | 'stickerSets';
export type DatabaseStore = Omit<IDBStore, 'name'> & {name: DatabaseStoreName};
const Database = {
  name: 'tweb' + (Modes.test ? '_test' : ''),
  version: 5,
  stores: [{
    name: 'session'
  }, {
    name: 'stickerSets'
  }] as DatabaseStore[],
};

export default Database;
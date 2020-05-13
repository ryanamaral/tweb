console.log('Services included!');

import AppUsersManager from './appManagers/appUsersManager';
import AppChatsManager from './appManagers/appChatsManager';
import AppMessagesIDsManager from './appManagers/appMessagesIDsManager';
import ApiUpdatesManager from './appManagers/apiUpdatesManager';
import AppPhotosManager from './appManagers/appPhotosManager';
import AppDialogsManager from './appManagers/appDialogsManager';
import AppMessagesManager from './appManagers/appMessagesManager';
import AppProfileManager from './appManagers/appProfileManager';
import AppImManager from './appManagers/appImManager';
import AppPeersManager from './appManagers/appPeersManager';
import AppStickersManager from './appManagers/appStickersManager';
import AppDocsManager from './appManagers/appDocsManager';
import AppSidebarRight from './appManagers/appSidebarRight';
import AppSidebarLeft from './appManagers/appSidebarLeft';
import AppMediaViewer from './appManagers/appMediaViewer';
//import AppSharedMediaManager from './appManagers/appSharedMediaManager';

export const appUsersManager = AppUsersManager;
export const appChatsManager = AppChatsManager;
export const appMessagesIDsManager = AppMessagesIDsManager;
export const apiUpdatesManager = ApiUpdatesManager;
export const appPhotosManager = AppPhotosManager;
export const appMessagesManager = AppMessagesManager;
export const appProfileManager = AppProfileManager;
export const appImManager = AppImManager;
export const appPeersManager = AppPeersManager;
export const appStickersManager = AppStickersManager;
export const appDocsManager = AppDocsManager;
//export const appSharedMediaManager = AppSharedMediaManager;
export const appSidebarRight = AppSidebarRight;
export const appSidebarLeft = AppSidebarLeft;
export const appMediaViewer = AppMediaViewer;
export const appDialogsManager = AppDialogsManager;

(window as any).Services = {
  appUsersManager,
  appChatsManager,
  apiUpdatesManager,
  appMessagesManager,
  appPeersManager,
  appProfileManager,
  appPhotosManager,
  appDocsManager,

  appDialogsManager,
  appImManager,
  appStickersManager,
  appSidebarRight,
  appSidebarLeft,
  appMediaViewer
  //appSharedMediaManager
};
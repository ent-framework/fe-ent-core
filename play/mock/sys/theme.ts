import { MockMethod } from 'vite-plugin-mock';
import { resultError, resultSuccess, getRequestToken, requestParams, deepMerge } from '../_util';

let themeSettings = {
  showSettingButton: true,
  showDarkModeToggle: true,
  settingButtonPosition: 'auto',
  permissionMode: 'ROUTE_MAPPING',
  permissionCacheType: 1,
  sessionTimeoutProcessing: 0,
  themeColor: '#0096c7',
  grayMode: false,
  colorWeak: false,
  fullContent: false,
  contentMode: 'full',
  showLogo: true,
  showFooter: false,
  headerSetting: {
    bgColor: '#5172DC',
    fixed: true,
    show: true,
    theme: 'dark',
    useLockPage: true,
    showFullScreen: true,
    showDoc: true,
    showNotice: true,
    showSearch: true,
  },
  menuSetting: {
    bgColor: '#212121',
    fixed: true,
    collapsed: false,
    collapsedShowTitle: false,
    canDrag: false,
    show: true,
    hidden: false,
    menuWidth: 210,
    mode: 'inline',
    type: 'sidebar',
    theme: 'dark',
    split: false,
    topMenuAlign: 'center',
    trigger: 'HEADER',
    accordion: true,
    closeMixSidebarOnChange: false,
    mixSideTrigger: 'click',
    mixSideFixed: false,
  },
  multiTabsSetting: {
    cache: false,
    show: true,
    canDrag: true,
    showQuick: true,
    showRedo: true,
    showFold: true,
  },
  transitionSetting: {
    enable: true,
    basicTransition: 'fade-slide',
    openPageLoading: true,
    openNProgress: false,
  },
  openKeepAlive: true,
  lockTime: 0,
  showBreadCrumb: true,
  showBreadCrumbIcon: false,
  useErrorHandle: false,
  useOpenBackTop: true,
  canEmbedIFramePage: true,
  closeMessageOnSwitch: true,
  removeAllHttpPending: false,
};

export default [
  // mock user login
  {
    url: '/api/save-theme-setting',
    timeout: 200,
    method: 'post',
    response: ({ body }) => {
      const { settings } = body;
      console.log(settings);
      if (settings && Object.keys(settings).length > 0) {
        themeSettings = deepMerge(settings, themeSettings);
      }
      return resultSuccess(themeSettings);
    },
  },
  {
    url: '/api/get-theme-setting',
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request);
      if (!token) return resultError('Invalid token');
      return resultSuccess(themeSettings);
    },
  },
] as MockMethod[];

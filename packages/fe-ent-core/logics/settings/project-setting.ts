import { CacheTypeEnum } from '@ent-core/logics/enums/cache-enum';
import {
  PermissionModeEnum,
  RouterTransitionEnum,
  SessionTimeoutProcessingEnum,
  ThemeEnum,
} from '@ent-core/logics/enums/app-enum';
import type { ProjectConfig } from '@ent-core/store/types';

// ! You need to clear the browser cache after the change
const setting: ProjectConfig = {
  // Whether to show the theme switch button
  showDarkModeToggle: true,

  // Permission mode
  permissionMode: PermissionModeEnum.ROUTE_MAPPING,

  // Permission-related cache is stored in sessionStorage or localStorage
  permissionCacheType: CacheTypeEnum.LOCAL,

  // Session timeout processing
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum.ROUTE_JUMP,

  themeSetting: {
    theme: ThemeEnum.LIGHT,
    name: 'default',
    token: {
      colorPrimary: '#51b8f1',
      colorSuccess: '#58a732',
      colorWarning: '#f0a818',
      colorError: '#e55c5c',
      colorInfo: '#d9d9d9',
    },
  },

  // Transition Setting
  transitionSetting: {
    //  Whether to open the page switching animation
    // The disabled state will also disable pageLoadinng
    enable: true,

    // Route basic switching animation
    basicTransition: RouterTransitionEnum.FADE_SIDE,

    // Whether to open page switching loading
    // Only open when enable=true
    openPageLoading: true,

    // Whether to open the top progress bar
    openNProgress: true,
  },

  // Whether to delete unclosed messages and notify when switching the interface
  closeMessageOnSwitch: true,

  // Whether to cancel the http request that has been sent but not responded when switching the interface.
  // If it is enabled, I want to overwrite a single interface. Can be set in a separate interface
  removeAllHttpPending: false,

  // Use error-handler-plugin
  useErrorHandle: false,
};

export { setting as defaultProjectSetting };

import type { ErrorTypeEnum } from '../logics/enums/exception-enum';
import type { MenuModeEnum, MenuTypeEnum } from '../logics/enums/menu-enum';
import type {
  PermissionModeEnum,
  RouterTransitionEnum,
  SessionTimeoutProcessingEnum,
  ThemeEnum,
} from '../logics/enums/app-enum';

import type { CacheTypeEnum } from '../logics/enums/cache-enum';
import type { Nullable, Recordable } from '../types';
import type { ColumnOptionsType, SizeType } from '../components/table/interface';
import type { GlobalThemeOverrides } from 'naive-ui/es/config-provider';

// Lock screen information
export interface LockInfo {
  // Password required
  pwd?: string | undefined;
  // Is it locked?
  isLock?: boolean;
}

// Error-log information
export interface ErrorLogInfo {
  // Type of error
  type: ErrorTypeEnum;
  // Error file
  file: string;
  // Error name
  name?: string;
  // Error message
  message: string;
  // Error stack
  stack?: string;
  // Error detail
  detail: string;
  // Error url
  url: string;
  // Error time
  time?: string;
}

export interface BeforeMiniState {
  menuCollapsed?: boolean;
  menuSplit?: boolean;
  menuMode?: MenuModeEnum;
  menuType?: MenuTypeEnum;
}

export type LocaleType = 'zh_CN' | 'en';

export interface LocaleSetting {
  showPicker: boolean;
  // Current language
  locale: LocaleType;
  // default language
  fallback: LocaleType;
  // available Locales
  availableLocales: LocaleType[];
}

export interface ThemeSetting {
  theme: ThemeEnum;
  name: string;
  themeOverrides: GlobalThemeOverrides;
}
export interface TransitionSetting {
  //  Whether to open the page switching animation
  enable: boolean;
  // Route basic switching animation
  basicTransition: RouterTransitionEnum;
  // Whether to open page switching loading
  openPageLoading: boolean;
  // Whether to open the top progress bar
  openNProgress: boolean;
}

/**
 * 项目配置
 */
export interface ProjectConfig {
  // Use error-handler-plugin
  useErrorHandle: boolean;
  // Whether to cancel the http request that has been sent but not responded when switching the interface.
  removeAllHttpPending: boolean;
  // Whether to delete unclosed messages and notify when switching the interface
  closeMessageOnSwitch: boolean;
  // Whether to show the theme switch button
  showDarkModeToggle: boolean;
  // Storage location of permission related information
  permissionCacheType: CacheTypeEnum;
  // Permission mode
  permissionMode: PermissionModeEnum;
  // Session timeout processing
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum;
  themeSetting: ThemeSetting;
  // Animation configuration
  transitionSetting: TransitionSetting;
}

export interface TableSetting {
  size: Nullable<SizeType>;
  showIndexColumn: Recordable<Nullable<boolean>>;
  columns: Recordable<Nullable<Array<ColumnOptionsType>>>;
  showRowSelection: Recordable<Nullable<boolean>>;
}

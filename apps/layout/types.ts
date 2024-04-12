import type {
  MenuModeEnum,
  MenuTypeEnum,
  MixSidebarTriggerEnum,
  TriggerEnum,
} from 'fe-ent-core/es/logics/enums/menu-enum';
import type {
  ContentEnum,
  SettingButtonPositionEnum,
  ThemeEnum,
} from 'fe-ent-core/es/logics/enums/app-enum';

/**
 * 菜单设置
 */
export interface MenuSetting {
  fixed: boolean;
  collapsed: boolean;
  canDrag: boolean;
  show: boolean;
  hidden: boolean;
  split: boolean;
  menuWidth: number;
  mode: MenuModeEnum;
  type: MenuTypeEnum;
  theme: ThemeEnum | 'none';
  topMenuAlign: 'start' | 'center' | 'end';
  trigger: TriggerEnum;
  accordion: boolean;
  closeMixSidebarOnChange: boolean;
  collapsedShowTitle: boolean;
  mixSideTrigger: MixSidebarTriggerEnum;
  mixSideFixed: boolean;
  inverted: boolean;
}

export interface MultiTabsSetting {
  cache: boolean;
  show: boolean;
  showQuick: boolean;
  canDrag: boolean;
  showRedo: boolean;
  showFold: boolean;
}

export interface HeaderSetting {
  fixed: boolean;
  show: boolean;
  theme: ThemeEnum | 'none';
  // Turn on full screen
  showFullScreen: boolean;
  // Whether to show the lock screen
  useLockPage: boolean;
  // Show message center button
  showNotice: boolean;
  // Show document button
  showDoc: boolean;
  showSearch: boolean;
}

export interface LayoutConfig {
  // menuType: MenuTypeEnum;
  headerSetting: HeaderSetting;
  // menuSetting
  menuSetting: MenuSetting;
  // Multi-tab settings
  multiTabsSetting: MultiTabsSetting;
  // pageLayout whether to enable keep-alive
  openKeepAlive: boolean;
  // Lock screen time
  lockTime: number;
  // Show breadcrumbs
  showBreadCrumb: boolean;
  // Show breadcrumb icon
  showBreadCrumbIcon: boolean;
  // Whether to open back to top
  useOpenBackTop: boolean;
  // Is it possible to embed iframe pages
  canEmbedIFramePage: boolean;

  // Whether to show the configuration button
  showSettingButton: boolean;

  // Configure where the button is displayed
  settingButtonPosition: SettingButtonPositionEnum;
  // Website gray mode, open for possible mourning dates
  grayMode: boolean;
  // The main interface is displayed in full screen, the menu is not displayed, and the top
  fullContent: boolean;
  // content width
  contentMode: ContentEnum;
  // Whether to display the logo
  showLogo: boolean;
  // Whether to show the global footer
  showFooter: boolean;
}

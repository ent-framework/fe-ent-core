import {
  ContentEnum,
  MenuModeEnum,
  MenuTypeEnum,
  MixSidebarTriggerEnum,
  RouterTransitionEnum,
  ThemeEnum,
  TopMenuAlignEnum,
  TriggerEnum
} from 'fe-ent-core/es/logics';
import { useI18n } from 'fe-ent-core/es/hooks';

export enum HandlerEnum {
  CHANGE_LAYOUT,
  CHANGE_THEME_TOKEN,
  CHANGE_THEME,
  // menu
  MENU_HAS_DRAG,
  MENU_ACCORDION,
  MENU_TRIGGER,
  MENU_TOP_ALIGN,
  MENU_COLLAPSED,
  MENU_COLLAPSED_SHOW_TITLE,
  MENU_WIDTH,
  MENU_SHOW_SIDEBAR,
  MENU_THEME,
  MENU_INVERTED,
  MENU_SPLIT,
  MENU_FIXED,
  MENU_CLOSE_MIX_SIDEBAR_ON_CHANGE,
  MENU_TRIGGER_MIX_SIDEBAR,
  MENU_FIXED_MIX_SIDEBAR,

  // header
  HEADER_SHOW,
  HEADER_THEME,
  HEADER_FIXED,

  HEADER_SEARCH,

  TABS_SHOW_QUICK,
  TABS_SHOW_REDO,
  TABS_SHOW,
  TABS_SHOW_FOLD,

  LOCK_TIME,
  FULL_CONTENT,
  CONTENT_MODE,
  SHOW_BREADCRUMB,
  SHOW_BREADCRUMB_ICON,
  GRAY_MODE,
  SHOW_LOGO,
  SHOW_FOOTER,

  ROUTER_TRANSITION,
  OPEN_PROGRESS,
  OPEN_PAGE_LOADING,
  OPEN_ROUTE_TRANSITION
}

export const contentModeOptions = () => {
  const { t } = useI18n();
  return [
    {
      value: ContentEnum.FULL,
      label: t('layout.setting.contentModeFull')
    },
    {
      value: ContentEnum.FIXED,
      label: t('layout.setting.contentModeFixed')
    }
  ];
};

export const topMenuAlignOptions = () => {
  const { t } = useI18n();
  return [
    {
      value: TopMenuAlignEnum.CENTER,
      label: t('layout.setting.topMenuAlignRight')
    },
    {
      value: TopMenuAlignEnum.START,
      label: t('layout.setting.topMenuAlignLeft')
    },
    {
      value: TopMenuAlignEnum.END,
      label: t('layout.setting.topMenuAlignCenter')
    }
  ];
};

export const getMenuTriggerOptions = (hideTop: boolean) => {
  const { t } = useI18n();
  return [
    {
      value: TriggerEnum.NONE,
      label: t('layout.setting.menuTriggerNone')
    },
    {
      value: TriggerEnum.MENU_SIDE,
      label: t('layout.setting.menuTriggerSide')
    },
    ...(hideTop
      ? []
      : [
          {
            value: TriggerEnum.HEADER,
            label: t('layout.setting.menuTriggerTop')
          }
        ])
  ];
};

export const routerTransitionOptions = [
  RouterTransitionEnum.ZOOM_FADE,
  RouterTransitionEnum.FADE,
  RouterTransitionEnum.ZOOM_OUT,
  RouterTransitionEnum.FADE_SIDE,
  RouterTransitionEnum.FADE_BOTTOM,
  RouterTransitionEnum.FADE_SCALE
].map((item) => {
  return {
    label: item,
    value: item
  };
});

export interface MenuType {
  title: string;
  mode: MenuModeEnum;
  type: MenuTypeEnum;
}

export const menuTypeList = (): MenuType[] => {
  const { t } = useI18n();
  return [
    {
      title: t('layout.setting.menuTypeSidebar'),
      mode: MenuModeEnum.INLINE,
      type: MenuTypeEnum.SIDEBAR
    },
    {
      title: t('layout.setting.menuTypeMix'),
      mode: MenuModeEnum.INLINE,
      type: MenuTypeEnum.MIX
    },

    {
      title: t('layout.setting.menuTypeTopMenu'),
      mode: MenuModeEnum.HORIZONTAL,
      type: MenuTypeEnum.TOP_MENU
    },
    {
      title: t('layout.setting.menuTypeMixSidebar'),
      mode: MenuModeEnum.INLINE,
      type: MenuTypeEnum.MIX_SIDEBAR
    }
  ];
};

export const mixSidebarTriggerOptions = () => {
  const { t } = useI18n();
  return [
    {
      value: MixSidebarTriggerEnum.HOVER,
      label: t('layout.setting.triggerHover')
    },
    {
      value: MixSidebarTriggerEnum.CLICK,
      label: t('layout.setting.triggerClick')
    }
  ];
};

export const getThemeOptions = () => {
  const { t } = useI18n();
  return [
    {
      value: ThemeEnum.LIGHT,
      label: t('layout.setting.lightTheme')
    },
    {
      value: ThemeEnum.DARK,
      label: t('layout.setting.darkTheme')
    },
    {
      value: 'none',
      label: t('layout.setting.noneTheme')
    }
  ];
};

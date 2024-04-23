import { computed, ref, unref } from 'vue';

import {
  SIDE_BAR_MINI_WIDTH,
  SIDE_BAR_SHOW_TIT_MINI_WIDTH
} from 'fe-ent-core/es/logics/enums/app-enum';
import { MenuModeEnum, MenuTypeEnum, TriggerEnum } from 'fe-ent-core/es/logics/enums/menu-enum';
import { useLayoutStore } from '../store/layout';
import { useFullContent } from './use-full-content';
import type { MenuSetting } from '../types';

const mixSideHasChildren = ref(false);

export function useMenuSetting() {
  const { getFullContent: fullContent } = useFullContent();
  const layoutStore = useLayoutStore();

  const getShowSidebar = computed(() => {
    return (
      unref(getSplit) ||
      (unref(getShowMenu) && unref(getMenuMode) !== MenuModeEnum.HORIZONTAL && !unref(fullContent))
    );
  });

  const getCollapsed = computed(() => layoutStore.getMenuSetting.collapsed);

  const getInverted = computed(() => layoutStore.getMenuSetting.inverted);

  const getMenuType = computed(() => layoutStore.getMenuSetting.type);

  const getMenuMode = computed(() => layoutStore.getMenuSetting.mode);

  const getMenuFixed = computed(() => layoutStore.getMenuSetting.fixed);

  const getShowMenu = computed(() => layoutStore.getMenuSetting.show);

  const getMenuHidden = computed(() => layoutStore.getMenuSetting.hidden);

  const getMenuWidth = computed(() => layoutStore.getMenuSetting.menuWidth);

  const getTrigger = computed(() => layoutStore.getMenuSetting.trigger);

  const getMenuTheme = computed(() => layoutStore.getMenuSetting.theme);

  const getSplit = computed(() => layoutStore.getMenuSetting.split);

  const getMixSideTrigger = computed(() => layoutStore.getMenuSetting.mixSideTrigger);

  const getCanDrag = computed(() => layoutStore.getMenuSetting.canDrag);

  const getAccordion = computed(() => layoutStore.getMenuSetting.accordion);

  const getMixSideFixed = computed(() => layoutStore.getMenuSetting.mixSideFixed);

  const getTopMenuAlign = computed(() => layoutStore.getMenuSetting.topMenuAlign);

  const getCloseMixSidebarOnChange = computed(
    () => layoutStore.getMenuSetting.closeMixSidebarOnChange
  );

  const getIsSidebarType = computed(() => unref(getMenuType) === MenuTypeEnum.SIDEBAR);

  const getIsTopMenu = computed(() => unref(getMenuType) === MenuTypeEnum.TOP_MENU);

  const getCollapsedShowTitle = computed(() => layoutStore.getMenuSetting.collapsedShowTitle);

  const getShowTopMenu = computed(() => {
    return unref(getMenuMode) === MenuModeEnum.HORIZONTAL || unref(getSplit);
  });

  const getShowHeaderTrigger = computed(() => {
    if (
      unref(getMenuType) === MenuTypeEnum.TOP_MENU ||
      !unref(getShowMenu) ||
      unref(getMenuHidden)
    ) {
      return false;
    }

    return unref(getTrigger) === TriggerEnum.HEADER;
  });

  const getIsHorizontal = computed(() => {
    return unref(getMenuMode) === MenuModeEnum.HORIZONTAL;
  });

  const getIsMixSidebar = computed(() => {
    return unref(getMenuType) === MenuTypeEnum.MIX_SIDEBAR;
  });

  const getIsMixMode = computed(() => {
    return unref(getMenuMode) === MenuModeEnum.INLINE && unref(getMenuType) === MenuTypeEnum.MIX;
  });

  const getRealWidth = computed(() => {
    if (unref(getIsMixSidebar)) {
      return unref(getCollapsed) && !unref(getMixSideFixed)
        ? unref(getMiniWidthNumber)
        : unref(getMenuWidth);
    }
    return unref(getCollapsed) ? unref(getMiniWidthNumber) : unref(getMenuWidth);
  });

  const getMiniWidthNumber = computed(() => {
    const { collapsedShowTitle } = layoutStore.getMenuSetting;
    return collapsedShowTitle ? SIDE_BAR_SHOW_TIT_MINI_WIDTH : SIDE_BAR_MINI_WIDTH;
  });

  const getCalcContentWidth = computed(() => {
    const width =
      unref(getIsTopMenu) || !unref(getShowMenu) || (unref(getSplit) && unref(getMenuHidden))
        ? 0
        : unref(getIsMixSidebar)
          ? (unref(getCollapsed) ? SIDE_BAR_MINI_WIDTH : SIDE_BAR_SHOW_TIT_MINI_WIDTH) +
            (unref(getMixSideFixed) && unref(mixSideHasChildren) ? unref(getRealWidth) : 0)
          : unref(getRealWidth);

    return `calc(100% - ${unref(width)}px)`;
  });

  // Set menu configuration
  function setMenuSetting(menuSetting: Partial<MenuSetting>): void {
    layoutStore.setLayoutConfig({ menuSetting });
  }

  function toggleCollapsed() {
    setMenuSetting({
      collapsed: !unref(getCollapsed)
    });
  }
  return {
    setMenuSetting,

    toggleCollapsed,
    getInverted,
    getMenuFixed,
    getRealWidth,
    getMenuType,
    getMenuMode,
    getShowMenu,
    getCollapsed,
    getMiniWidthNumber,
    getCalcContentWidth,
    getMenuWidth,
    getTrigger,
    getSplit,
    getMenuTheme,
    getCanDrag,
    getCollapsedShowTitle,
    getIsHorizontal,
    getIsSidebarType,
    getAccordion,
    getShowTopMenu,
    getShowHeaderTrigger,
    getTopMenuAlign,
    getMenuHidden,
    getIsTopMenu,
    getShowSidebar,
    getIsMixMode,
    getIsMixSidebar,
    getCloseMixSidebarOnChange,
    getMixSideTrigger,
    getMixSideFixed,
    mixSideHasChildren
  };
}

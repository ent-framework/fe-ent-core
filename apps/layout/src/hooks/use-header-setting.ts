import { computed, unref } from 'vue';

import { MenuModeEnum } from 'fe-ent-core/es/logics/enums/menu-enum';
import { useLayoutStore } from '../store/layout';

import { useMenuSetting } from './use-menu-setting';
import { useLayoutThemeSetting } from './use-theme-setting';
import { useFullContent } from './use-full-content';
import type { HeaderSetting } from '../types';

export function useHeaderSetting() {
  const { getFullContent } = useFullContent();
  const layoutStore = useLayoutStore();

  const getShowFullHeaderRef = computed(() => {
    return (
      !unref(getFullContent) &&
      unref(getShowMixHeaderRef) &&
      unref(getShowHeader) &&
      !unref(getIsTopMenu) &&
      !unref(getIsMixSidebar)
    );
  });

  const getUnFixedAndFull = computed(() => !unref(getFixed) && !unref(getShowFullHeaderRef));

  const getShowInsetHeaderRef = computed(() => {
    const need = !unref(getFullContent) && unref(getShowHeader);
    return (
      (need && !unref(getShowMixHeaderRef)) ||
      (need && unref(getIsTopMenu)) ||
      (need && unref(getIsMixSidebar))
    );
  });

  const {
    getMenuMode,
    getSplit,
    getShowHeaderTrigger,
    getIsSidebarType,
    getIsMixSidebar,
    getIsTopMenu
  } = useMenuSetting();
  const { getShowBreadCrumb, getShowLogo } = useLayoutThemeSetting();

  const getShowMixHeaderRef = computed(() => !unref(getIsSidebarType) && unref(getShowHeader));

  const getHeaderTheme = computed(() => layoutStore.getHeaderSetting.theme);

  const getShowHeader = computed(() => layoutStore.getHeaderSetting.show);

  const getFixed = computed(() => layoutStore.getHeaderSetting.fixed);

  const getShowSearch = computed(() => layoutStore.getHeaderSetting.showSearch);

  const getShowFullScreen = computed(() => layoutStore.getHeaderSetting.showFullScreen);

  const getShowNotice = computed(() => layoutStore.getHeaderSetting.showNotice);

  const getShowBread = computed(() => {
    return (
      unref(getMenuMode) !== MenuModeEnum.HORIZONTAL && unref(getShowBreadCrumb) && !unref(getSplit)
    );
  });

  const getShowHeaderLogo = computed(() => {
    return unref(getShowLogo) && !unref(getIsSidebarType) && !unref(getIsMixSidebar);
  });

  const getShowContent = computed(() => {
    return unref(getShowBread) || unref(getShowHeaderTrigger);
  });

  // Set header configuration
  function setHeaderSetting(headerSetting: Partial<HeaderSetting>) {
    layoutStore.setLayoutConfig({ headerSetting });
  }
  return {
    setHeaderSetting,
    getShowSearch,
    getHeaderTheme,
    getShowFullScreen,
    getShowNotice,
    getShowBread,
    getShowContent,
    getShowHeaderLogo,
    getShowHeader,
    getFixed,
    getShowMixHeaderRef,
    getShowFullHeaderRef,
    getShowInsetHeaderRef,
    getUnFixedAndFull
  };
}

import type { HeaderSetting } from '@ent-core/logics/types/config';

import { computed, unref } from 'vue';

import { useAppStore } from '@ent-core/store/modules/app';

import { useMenuSetting } from '@ent-core/hooks/setting/use-menu-setting';
import { useRootSetting } from '@ent-core/hooks/setting/use-root-setting';
import { useFullContent } from '@ent-core/hooks/web/use-full-content';
import { MenuModeEnum } from '@ent-core/logics/enums/menu-enum';

export function useHeaderSetting() {
  const { getFullContent } = useFullContent();
  const appStore = useAppStore();

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
    getIsTopMenu,
  } = useMenuSetting();
  const { getShowBreadCrumb, getShowLogo } = useRootSetting();

  const getShowMixHeaderRef = computed(() => !unref(getIsSidebarType) && unref(getShowHeader));

  const getShowDoc = computed(() => appStore.getHeaderSetting.showDoc);

  const getHeaderTheme = computed(() => appStore.getHeaderSetting.theme);

  const getShowHeader = computed(() => appStore.getHeaderSetting.show);

  const getFixed = computed(() => appStore.getHeaderSetting.fixed);

  const getHeaderBgColor = computed(() => appStore.getHeaderSetting.bgColor);

  const getShowSearch = computed(() => appStore.getHeaderSetting.showSearch);

  const getUseLockPage = computed(() => appStore.getHeaderSetting.useLockPage);

  const getShowFullScreen = computed(() => appStore.getHeaderSetting.showFullScreen);

  const getShowNotice = computed(() => appStore.getHeaderSetting.showNotice);

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
    appStore.setProjectConfig({ headerSetting });
  }
  return {
    setHeaderSetting,

    getShowDoc,
    getShowSearch,
    getHeaderTheme,
    getUseLockPage,
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
    getUnFixedAndFull,
    getHeaderBgColor,
  };
}

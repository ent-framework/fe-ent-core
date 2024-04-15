import { computed } from 'vue';

import { ContentEnum } from 'fe-ent-core/es/logics/enums/app-enum';
import { useLayoutStore } from '../store/layout';

export function useLayoutThemeSetting() {
  const layoutStore = useLayoutStore();

  const getOpenKeepAlive = computed(() => layoutStore.getLayoutConfig.openKeepAlive);

  const getSettingButtonPosition = computed(
    () => layoutStore.getLayoutConfig.settingButtonPosition,
  );

  const getCanEmbedIFramePage = computed(() => layoutStore.getLayoutConfig.canEmbedIFramePage);

  const getShowLogo = computed(() => layoutStore.getLayoutConfig.showLogo);

  const getContentMode = computed(() => layoutStore.getLayoutConfig.contentMode);

  const getUseOpenBackTop = computed(() => layoutStore.getLayoutConfig.useOpenBackTop);

  const getShowSettingButton = computed(() => layoutStore.getLayoutConfig.showSettingButton);

  const getShowFooter = computed(() => layoutStore.getLayoutConfig.showFooter);

  const getShowBreadCrumb = computed(() => layoutStore.getLayoutConfig.showBreadCrumb);

  const getShowBreadCrumbIcon = computed(() => layoutStore.getLayoutConfig.showBreadCrumbIcon);

  const getFullContent = computed(() => layoutStore.getLayoutConfig.fullContent);

  const getGrayMode = computed(() => layoutStore.getLayoutConfig.grayMode);

  const getLockTime = computed(() => layoutStore.getLayoutConfig.lockTime);

  const getLayoutContentMode = computed(() =>
    layoutStore.getLayoutConfig.contentMode === ContentEnum.FULL
      ? ContentEnum.FULL
      : ContentEnum.FIXED,
  );

  return {
    getSettingButtonPosition,
    getFullContent,
    getGrayMode,
    getLayoutContentMode,
    getOpenKeepAlive,
    getCanEmbedIFramePage,
    getShowLogo,
    getShowBreadCrumb,
    getShowBreadCrumbIcon,
    getUseOpenBackTop,
    getShowSettingButton,
    getShowFooter,
    getContentMode,
    getLockTime,
  };
}

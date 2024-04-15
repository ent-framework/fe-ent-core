import { computed } from 'vue';

import { useAppStore } from '@ent-core/store/modules/app';
import type { ProjectConfig } from '@ent-core/store/types';

type RootSetting = Omit<
  ProjectConfig,
  'locale' | 'headerSetting' | 'menuSetting' | 'multiTabsSetting' | 'themeSetting'
>;

export function useRootSetting() {
  const appStore = useAppStore();

  const getPageLoading = computed(() => appStore.getPageLoading);

  const getPermissionMode = computed(() => appStore.getProjectConfig.permissionMode);

  const getUseErrorHandle = computed(() => appStore.getProjectConfig.useErrorHandle);

  const getShowDarkModeToggle = computed(() => appStore.getProjectConfig.showDarkModeToggle);

  const getTheme = computed(() => appStore.getThemeSetting.theme);

  function setRootSetting(setting: Partial<RootSetting>) {
    appStore.setProjectConfig(setting);
  }

  return {
    getTheme,
    setRootSetting,
    getUseErrorHandle,
    getPageLoading,
    getPermissionMode,
    getShowDarkModeToggle,
  };
}

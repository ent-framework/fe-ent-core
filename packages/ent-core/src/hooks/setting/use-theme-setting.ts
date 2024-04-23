import { computed } from 'vue';

import { useAppStore } from '../../store/modules/app';

import type { ThemeEnum } from '../../logics';
import type { ThemeSetting } from '../../store/types';
import type { DeepPartial } from '../../types';

export function useThemeSetting() {
  const appStore = useAppStore();

  const getGlobalTheme = computed(() => appStore.getThemeSetting.theme);
  const getThemeName = computed(() => appStore.getThemeSetting.name);

  // Set header configuration
  function setThemeSetting(themeSetting: DeepPartial<ThemeSetting>) {
    appStore.setProjectConfig({ themeSetting });
  }

  function setGlobalTheme(theme: ThemeEnum) {
    appStore.setProjectConfig({ themeSetting: { theme } });
  }

  const getThemeSetting = computed(() => appStore.getThemeSetting);

  return {
    setThemeSetting,
    getThemeSetting,
    getGlobalTheme,
    setGlobalTheme,
    getThemeName
  };
}

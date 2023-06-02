import { computed } from 'vue';

import { useAppStore } from '@ent-core/store/modules/app';

import type { ThemeEnum } from '@ent-core/logics';
import type { ThemeSetting } from '@ent-core/store/types/store';

export function useThemeSetting() {
  const appStore = useAppStore();

  const getGlobalTheme = computed(() => appStore.getThemeSetting.theme);
  const getThemeName = computed(() => appStore.getThemeSetting.name);

  // Set header configuration
  function setThemeSetting(themeSetting: Partial<ThemeSetting>) {
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
    getThemeName,
  };
}

import { computed, unref } from 'vue';
import { darkTheme, lightTheme } from 'naive-ui';
import { useAppStore } from '@ent-core/store';
import { ThemeEnum } from '@ent-core/logics';
import type { BuiltInGlobalTheme } from 'naive-ui/es/themes/interface';

export function useTheme() {

  const appStore = useAppStore();

  const appTheme = computed(() => {
    const { theme: globalTheme } = appStore.getThemeSetting;
    let themeConfig: BuiltInGlobalTheme;
    if (globalTheme) {
      if (globalTheme == ThemeEnum.DARK) {
        themeConfig = darkTheme;
      } else {
        themeConfig = lightTheme;
      }
    } else {
      themeConfig = lightTheme;
    }
    return themeConfig;
  });

  const themeOverrides = computed(() => {
    return appStore.getThemeSetting.themeOverrides;
  });

  const updateGrayMode = (gray: boolean) => {};

  const getTheme = (theme?: string): BuiltInGlobalTheme => {
    const currTheme = unref(appTheme);
    if (!theme || theme === 'none') {
      return currTheme;
    }
    const { theme: globalTheme } = appStore.getThemeSetting;
    if (globalTheme === theme) {
      return currTheme;
    }
    if (theme === ThemeEnum.DARK) {
      return darkTheme;
    } else {
      return lightTheme;
    }
  };

  return {
    theme: appTheme,
    themeOverrides,
    getTheme,
    updateGrayMode,
  };
}

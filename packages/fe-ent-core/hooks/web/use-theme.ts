import { computed, unref } from 'vue';
import { theme as AntTheme } from 'ant-design-vue';
import { useAppStore } from '@ent-core/store';
import { ThemeEnum } from '@ent-core/logics';
import type { ThemeConfig } from 'ant-design-vue/es/config-provider/context';

export function useTheme() {
  const { useToken } = AntTheme;

  const appStore = useAppStore();

  const appTheme = computed(() => {
    const { theme: globalTheme } = appStore.getThemeSetting;
    let themeConfig: ThemeConfig = {};
    if (globalTheme) {
      if (globalTheme == ThemeEnum.DARK) {
        themeConfig = { algorithm: AntTheme.darkAlgorithm };
      } else {
        themeConfig = { algorithm: AntTheme.defaultAlgorithm };
      }
    }
    const token = appStore.getThemeSetting.token;
    if (token) {
      themeConfig = { ...themeConfig, token };
    }
    return themeConfig;
  });

  const updateGrayMode = (gray: boolean) => {};

  const getTheme = (theme?: string): ThemeConfig => {
    const currTheme = unref(appTheme);
    if (!theme || theme === 'none') {
      return currTheme;
    }
    const { theme: globalTheme } = appStore.getThemeSetting;
    if (globalTheme === theme) {
      return currTheme;
    }
    if (theme === ThemeEnum.DARK) {
      return { ...currTheme, algorithm: AntTheme.darkAlgorithm };
    } else {
      return { ...currTheme, algorithm: AntTheme.defaultAlgorithm };
    }
  };

  return {
    theme: appTheme,
    getTheme,
    updateGrayMode,
    useToken,
  };
}

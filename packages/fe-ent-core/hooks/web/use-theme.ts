import { computed } from 'vue';
import { theme as AntTheme } from 'ant-design-vue';
import { useAppStoreWithOut } from '@ent-core/store';
import { ThemeEnum } from '@ent-core/logics';
import type { ThemeConfig } from 'ant-design-vue/es/config-provider/context';

export function useTheme() {
  const { useToken } = AntTheme;

  const appStore = useAppStoreWithOut();

  const appTheme = computed(() => {
    const { theme: gbloalTheme } = appStore.getThemeSetting;
    let themeConfig: ThemeConfig = {};
    if (gbloalTheme) {
      if (gbloalTheme == ThemeEnum.DARK) {
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
    if (!theme || theme === 'none') {
      return appTheme.value;
    }
    const { theme: gbloalTheme } = appStore.getThemeSetting;
    if (gbloalTheme === theme) {
      return appTheme.value;
    }
    if (theme === ThemeEnum.DARK) {
      return { ...appTheme.value, algorithm: AntTheme.darkAlgorithm };
    } else {
      return { ...appTheme.value, algorithm: AntTheme.defaultAlgorithm };
    }
  };

  const getActualHeaderTheme = computed(() => {
    if (!appStore.getHeaderSetting.theme || appStore.getHeaderSetting.theme === 'none') {
      return appStore.getThemeSetting.theme;
    }
    return appStore.getHeaderSetting.theme;
  });

  const getActualMenuTheme = computed(() => {
    if (!appStore.getMenuSetting.theme || appStore.getMenuSetting.theme === 'none') {
      return appStore.getThemeSetting.theme;
    }
    return appStore.getMenuSetting.theme;
  });

  return {
    theme: appTheme,
    getTheme,
    updateGrayMode,
    getActualHeaderTheme,
    getActualMenuTheme,
    useToken,
  };
}

import { computed, ref, unref, watch } from 'vue';
import { theme as AntTheme } from 'ant-design-vue';
import { generateNeutralColorPalettes as darkColorGenerate } from 'ant-design-vue/es/theme/themes/dark/colors';
import { generateNeutralColorPalettes as lightColorGenerate } from 'ant-design-vue/es/theme/themes/default/colors';
import { useAppStoreWithOut } from '@ent-core/store';
import { ThemeEnum } from '@ent-core/logics';
import type { ThemeConfig } from 'ant-design-vue/es/config-provider/context';

import type { GlobalToken } from 'ant-design-vue/es/theme';

export function useTheme() {
  const { useToken } = AntTheme;

  const appTheme = ref<ThemeConfig>({});

  const appStore = useAppStoreWithOut();

  const loadFromStore = () => {
    const { theme: gbloalTheme } = appStore.getThemeSetting;
    if (gbloalTheme) {
      if (gbloalTheme == ThemeEnum.DARK) {
        appTheme.value = { ...appTheme.value, algorithm: AntTheme.darkAlgorithm };
      } else {
        appTheme.value = { ...appTheme.value, algorithm: AntTheme.defaultAlgorithm };
      }
    }
    const token = appStore.getThemeSetting.token;
    if (token) {
      appTheme.value = { ...appTheme.value, token };
    }
  };

  loadFromStore();

  watch(
    () => appStore.getThemeSetting,
    () => {
      loadFromStore();
    },
    {
      deep: true,
    },
  );

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

import { ref, watch } from 'vue';
import { theme } from 'ant-design-vue';
import { useAppStoreWithOut } from '@ent-core/store';
import { ThemeEnum } from '@ent-core/logics';
import type { ThemeConfig } from 'ant-design-vue/es/config-provider/context';
import type { MapToken, SeedToken } from 'ant-design-vue/es/theme/internal';

export function useTheme() {
  const { useToken } = theme;

  const appTheme = ref<ThemeConfig>({});

  const { token } = useToken();
  const appStore = useAppStoreWithOut();

  const loadFromStore = () => {
    const { theme: gbloalTheme } = appStore.getThemeSetting;
    if (gbloalTheme) {
      if (gbloalTheme == ThemeEnum.DARK) {
        appTheme.value = { ...appTheme.value, algorithm: theme.darkAlgorithm };
      } else {
        appTheme.value = { ...appTheme.value, algorithm: theme.defaultAlgorithm };
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

  const calcToken = (targetTheme: string, token: SeedToken): MapToken => {
    const { theme: gbloalTheme } = appStore.getThemeSetting;
    if (gbloalTheme === targetTheme) {
      return token;
    }
    if (targetTheme === 'light') {
      return theme.defaultAlgorithm(token);
    }
    return theme.darkAlgorithm(token);
  };

  return {
    theme: appTheme,
    token,
    updateGrayMode,
    calcToken,
  };
}

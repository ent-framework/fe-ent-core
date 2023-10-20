import { computed } from 'vue';
import { useAppStore } from 'fe-ent-core/es/store';
import { useLayoutStore } from '../store/layout';

export function useLayoutTheme() {
  const appStore = useAppStore();
  const layoutStore = useLayoutStore();

  const updateGrayMode = (gray: boolean) => {};

  const getActualHeaderTheme = computed(() => {
    if (!layoutStore.getHeaderSetting.theme || layoutStore.getHeaderSetting.theme === 'none') {
      return appStore.getThemeSetting.theme;
    }
    return layoutStore.getHeaderSetting.theme;
  });

  const getActualMenuTheme = computed(() => {
    if (!layoutStore.getMenuSetting.theme || layoutStore.getMenuSetting.theme === 'none') {
      return appStore.getThemeSetting.theme;
    }
    return layoutStore.getMenuSetting.theme;
  });

  return {
    updateGrayMode,
    getActualHeaderTheme,
    getActualMenuTheme,
  };
}

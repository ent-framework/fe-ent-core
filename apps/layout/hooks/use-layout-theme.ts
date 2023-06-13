import { computed } from 'vue';
import { useAppStoreWithOut } from 'fe-ent-core/es/store';
import { useLayoutStoreWithOut } from '../store/layout';

export function useLayoutTheme() {
  const appStore = useAppStoreWithOut();
  const layoutStore = useLayoutStoreWithOut();

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

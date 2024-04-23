import { computed } from 'vue';

import { useLayoutStore } from '../store/layout';
import type { MultiTabsSetting } from '../types';

export function useMultipleTabSetting() {
  const layoutStore = useLayoutStore();

  const getShowMultipleTab = computed(() => layoutStore.getMultiTabsSetting.show);

  const getShowQuick = computed(() => layoutStore.getMultiTabsSetting.showQuick);

  const getShowRedo = computed(() => layoutStore.getMultiTabsSetting.showRedo);

  const getShowFold = computed(() => layoutStore.getMultiTabsSetting.showFold);

  function setMultipleTabSetting(multiTabsSetting: Partial<MultiTabsSetting>) {
    layoutStore.setLayoutConfig({ multiTabsSetting });
  }
  return {
    setMultipleTabSetting,
    getShowMultipleTab,
    getShowQuick,
    getShowRedo,
    getShowFold
  };
}

import { defineStore } from 'pinia';
import { store } from 'fe-ent-core/es/store/pinia';
import { LAYOUT_KEY } from 'fe-ent-core/es/logics/enums/cache-enum';
import { getLayoutCache, setLayoutCache } from 'fe-ent-core/es/utils/layout';
import { deepMerge } from 'fe-ent-core/es/utils';
import type { HeaderSetting, LayoutConfig, MenuSetting, MultiTabsSetting } from '../types';
import type { DeepPartial, Nullable } from 'fe-ent-core/es/types';

export interface LayoutState {
  layoutConfig: Nullable<LayoutConfig>;
}

export const useLayoutStore = defineStore({
  id: 'app-layout',
  state: (): LayoutState => ({
    // user info
    layoutConfig: null,
  }),
  getters: {
    getLayoutConfig(): LayoutConfig {
      return this.layoutConfig || getLayoutCache<LayoutConfig>(LAYOUT_KEY) || {};
    },
    getMultiTabsSetting(): MultiTabsSetting {
      return this.getLayoutConfig.multiTabsSetting;
    },
    getHeaderSetting(): HeaderSetting {
      return this.getLayoutConfig.headerSetting;
    },
    getMenuSetting(): MenuSetting {
      return this.getLayoutConfig.menuSetting;
    },
  },
  actions: {
    setLayoutConfig(config: DeepPartial<LayoutConfig>) {
      this.layoutConfig = deepMerge(this.layoutConfig || {}, config);
      setLayoutCache(LAYOUT_KEY, this.layoutConfig);
    },
  },
});

// Need to be used outside the setup
export function useLayoutStoreWithOut() {
  return useLayoutStore(store);
}

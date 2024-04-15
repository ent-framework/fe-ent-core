import { defineStore } from 'pinia';
import { deepMerge } from 'fe-ent-core/es/utils';
import { defaultLayoutSetting } from './layout-setting';
import type { HeaderSetting, LayoutConfig, MenuSetting, MultiTabsSetting } from '../types';
import type { DeepPartial } from 'fe-ent-core/es/types';

export interface LayoutState {
  layoutConfig: LayoutConfig;
}
export const useLayoutStore = defineStore('app-layout', {
  state: () => ({
    layoutConfig: { ...defaultLayoutSetting } as LayoutConfig,
  }),
  getters: {
    getLayoutConfig(state): LayoutConfig {
      return state.layoutConfig || {};
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
    },
  },
});

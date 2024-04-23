import { defineStore } from 'pinia';

import { defaultProjectSetting } from '../../logics/settings/project-setting';
import { resetRouter } from '../../router/base';
import { deepMerge } from '../../utils/base';
import { Factory, ThemeEnum } from '../../logics';
import type {
  BeforeMiniState,
  ProjectConfig,
  ThemeSetting,
  TransitionSetting
} from '../../store/types';
import type { DeepPartial, TimeoutHandle } from '../../types';

export interface AppState {
  // Page loading status
  pageLoading: boolean;
  // project config
  projectConfig: ProjectConfig | null;
  // When the window shrinks, remember some states, and restore these states when the window is restored
  beforeMiniInfo: BeforeMiniState;
}
let timeId: TimeoutHandle;
export const useAppStore = defineStore('app', {
  state: (): AppState => {
    const defaultThemeSetting = Factory.getLayoutFactory().getDefaultThemeSetting();
    const projCfg = deepMerge(
      {
        ...defaultProjectSetting,
        themeSetting: {
          ...defaultThemeSetting,
          theme: ThemeEnum.LIGHT
        }
      },
      {}
    );
    return {
      pageLoading: false,
      projectConfig: projCfg,
      beforeMiniInfo: {}
    };
  },
  getters: {
    getPageLoading(): boolean {
      return this.pageLoading;
    },
    getBeforeMiniInfo(): BeforeMiniState {
      return this.beforeMiniInfo;
    },
    getProjectConfig(): ProjectConfig {
      return this.projectConfig || ({} as ProjectConfig);
    },
    getThemeSetting(): ThemeSetting {
      return this.getProjectConfig.themeSetting;
    },
    getTransitionSetting(): TransitionSetting {
      return this.getProjectConfig.transitionSetting;
    }
  },
  actions: {
    setPageLoading(loading: boolean): void {
      this.pageLoading = loading;
    },

    setBeforeMiniInfo(state: BeforeMiniState): void {
      this.beforeMiniInfo = state;
    },

    setProjectConfig(config: DeepPartial<ProjectConfig>): void {
      this.projectConfig = deepMerge(this.projectConfig || {}, config);
    },

    async resetAllState() {
      resetRouter();
      // Persistent.clearAll();
    },
    async setPageLoadingAction(loading: boolean): Promise<void> {
      if (loading) {
        clearTimeout(timeId);
        // Prevent flicker
        timeId = setTimeout(() => {
          this.setPageLoading(loading);
        }, 50);
      } else {
        this.setPageLoading(loading);
        clearTimeout(timeId);
      }
    }
  },
  persist: true
});

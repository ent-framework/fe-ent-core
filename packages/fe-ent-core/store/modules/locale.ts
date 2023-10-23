import { defineStore } from 'pinia';

import { localeSetting } from '@ent-core/logics/settings/locale-setting';
import type { LocaleSetting, LocaleType } from '@ent-core/store/types';

export interface LocaleState {
  localInfo: LocaleSetting;
}

export const useLocaleStore = defineStore('app-locale', {
  state: (): LocaleState => ({
    localInfo: localeSetting,
  }),
  getters: {
    getShowPicker(): boolean {
      return !!this.localInfo?.showPicker;
    },
    getLocale(): LocaleType {
      return this.localInfo?.locale ?? 'zh_CN';
    },
  },
  actions: {
    /**
     * Set up multilingual information and cache
     * @param info multilingual info
     */
    setLocaleInfo(info: Partial<LocaleSetting>) {
      this.localInfo = { ...this.localInfo, ...info };
    },
    setShowPicker(show: boolean) {
      this.localInfo = { ...this.localInfo, showPicker: show };
    },
  },
  persist: true,
});

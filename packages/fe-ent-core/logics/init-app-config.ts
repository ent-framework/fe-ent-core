/**
 * Application configuration
 */

import { PROJ_CFG_KEY } from '@ent-core/logics/enums/cache-enum';
import { defaultProjectSetting } from '@ent-core/logics/settings/project-setting';
import { Factory } from '@ent-core/logics/factory';

import { useAppStore } from '@ent-core/store/modules/app';
import { useLocaleStore } from '@ent-core/store/modules/locale';

import { getCommonStoragePrefix, getStorageShortName } from '@ent-core/utils/env';

import { Persistent } from '@ent-core/utils/cache/persistent';
import { deepMerge } from '@ent-core/utils';
import { ThemeEnum } from './enums';
import type { ProjectConfig } from '@ent-core/store/types/store';

// Initial project configuration
export async function initAppConfigStore() {
  const localeStore = useLocaleStore();
  const appStore = useAppStore();
  let projCfg: ProjectConfig = Persistent.getLocal(PROJ_CFG_KEY) as ProjectConfig;
  console.log(projCfg);
  const defaultThemeSetting = Factory.getLayoutFactory().getDefaultThemeSetting();
  projCfg = deepMerge(
    {
      ...defaultProjectSetting,
      themeSetting: {
        ...defaultThemeSetting,
        theme: ThemeEnum.LIGHT,
      },
    },
    projCfg || {},
  );

  appStore.setProjectConfig(projCfg);
  // init store
  localeStore.initLocale();

  setTimeout(() => {
    clearObsoleteStorage();
  }, 16);
}

/**
 * As the version continues to iterate, there will be more and more cache keys stored in localStorage.
 * This method is used to delete useless keys
 */
export function clearObsoleteStorage() {
  const commonPrefix = getCommonStoragePrefix();
  const shortPrefix = getStorageShortName();

  [localStorage, sessionStorage].forEach((item: Storage) => {
    Object.keys(item).forEach((key) => {
      if (key && key.startsWith(commonPrefix) && !key.startsWith(shortPrefix)) {
        item.removeItem(key);
      }
    });
  });
}

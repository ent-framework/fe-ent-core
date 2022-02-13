/**
 * Application configuration
 */
import type { ProjectConfig } from '/#/config';

import { PROJ_CFG_KEY } from 'fe-ent-core/enums/cacheEnum';
import projectSetting from 'fe-ent-core/settings/projectSetting';

import {
  updateHeaderBgColor,
  updateSidebarBgColor,
} from 'fe-ent-core/logics/theme/updateBackground';
import { updateColorWeak } from 'fe-ent-core/logics/theme/updateColorWeak';
import { updateGrayMode } from 'fe-ent-core/logics/theme/updateGrayMode';
import { updateDarkTheme } from 'fe-ent-core/logics/theme/dark';
import { changeTheme } from 'fe-ent-core/logics/theme';

import { useAppStore } from 'fe-ent-core/store/modules/app';
import { useLocaleStore } from 'fe-ent-core/store/modules/locale';

import { getCommonStoragePrefix, getStorageShortName } from 'fe-ent-core/utils/env';

import { primaryColor } from '../utils/themeConfig';
import { Persistent } from 'fe-ent-core/utils/cache/persistent';
import { deepMerge } from 'fe-ent-core/utils';
import { ThemeEnum } from 'fe-ent-core/enums/appEnum';

// Initial project configuration
export function initAppConfigStore() {
  const localeStore = useLocaleStore();
  const appStore = useAppStore();
  let projCfg: ProjectConfig = Persistent.getLocal(PROJ_CFG_KEY) as ProjectConfig;
  projCfg = deepMerge(projectSetting, projCfg || {});
  const darkMode = appStore.getDarkMode;
  const {
    colorWeak,
    grayMode,
    themeColor,

    headerSetting: { bgColor: headerBgColor } = {},
    menuSetting: { bgColor } = {},
  } = projCfg;
  try {
    if (themeColor && themeColor !== primaryColor) {
      changeTheme(themeColor);
    }

    grayMode && updateGrayMode(grayMode);
    colorWeak && updateColorWeak(colorWeak);
  } catch (error) {
    console.log(error);
  }
  appStore.setProjectConfig(projCfg);

  // init dark mode
  updateDarkTheme(darkMode);
  if (darkMode === ThemeEnum.DARK) {
    updateHeaderBgColor();
    updateSidebarBgColor();
  } else {
    headerBgColor && updateHeaderBgColor(headerBgColor);
    bgColor && updateSidebarBgColor(bgColor);
  }
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

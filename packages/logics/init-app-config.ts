/**
 * Application configuration
 */
import type { ProjectConfig } from '@ent-core/logics/types/config';

import { PROJ_CFG_KEY } from '@ent-core/logics/enums/cache-enum';
import projectSetting from '@ent-core/logics/settings/project-setting';

import { updateHeaderBgColor, updateSidebarBgColor } from '@ent-core/logics/theme/update-background';
import { updateColorWeak } from '@ent-core/logics/theme/update-color-weak';
import { updateGrayMode } from '@ent-core/logics/theme/update-gray-mode';
import { updateDarkTheme } from '@ent-core/logics/theme/dark';
import { changeTheme } from '@ent-core/logics/theme';

import { useAppStore } from '@ent-core/store/modules/app';
import { useLocaleStore } from '@ent-core/store/modules/locale';

import { getCommonStoragePrefix, getStorageShortName } from '@ent-core/utils/env';

import { primaryColor } from '../utils/theme-config';
import { Persistent } from '@ent-core/utils/cache/persistent';
import { deepMerge } from '@ent-core/utils';
import { ThemeEnum } from '@ent-core/logics/enums/app-enum';

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

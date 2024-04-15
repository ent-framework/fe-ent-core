/**
 * Multi-language related operations
 */

import { computed, unref } from 'vue';
import { dateEnUS, dateZhCN, enUS, zhCN } from 'naive-ui';
import { useLocaleStore } from '../store/modules/locale';
import { i18n } from './setup-i18n';
import { loadLocalePool, setHtmlPageLang } from './helper';
import type { LocaleType } from '../store/types';
import type { NDateLocale, NLocale } from 'naive-ui';

interface NaiveUILocale {
  locale: LocaleType;
  nLocale: NLocale;
  nDateLocale: NDateLocale;
}

function setI18nLanguage(locale: LocaleType) {
  const localeStore = useLocaleStore();

  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale;
  } else {
    (i18n.global.locale as any).value = locale;
  }
  localeStore.setLocaleInfo({ locale });
  setHtmlPageLang(locale);
}

export function useLocale() {
  const localeStore = useLocaleStore();
  const getLocale = computed(() => localeStore.getLocale);
  const getShowLocalePicker = computed(() => localeStore.getShowPicker);

  const setLocalePicker = (show: boolean) => {
    localeStore.setShowPicker(show);
  };

  const getCombinedLocale = computed((): NaiveUILocale => {
    const localeType = localeStore.getLocale;
    if (localeType === 'zh_CN') {
      return {
        locale: localeType,
        nLocale: zhCN,
        nDateLocale: dateZhCN,
      };
    } else {
      return {
        locale: localeType,
        nLocale: enUS,
        nDateLocale: dateEnUS,
      };
    }
  });

  // Switching the language will change the locale of useI18n
  // And submit to configuration modification
  async function changeLocale(locale: LocaleType) {
    const globalI18n = i18n.global;
    const currentLocale = unref(globalI18n.locale);
    if (currentLocale === locale) {
      return locale;
    }

    if (loadLocalePool.includes(locale)) {
      setI18nLanguage(locale);
      return locale;
    }
    loadLocalePool.push(locale);

    setI18nLanguage(locale);
    return locale;
  }

  function addMessages(locale: LocaleType, messages: Record<string, any>) {
    i18n.global.mergeLocaleMessage(locale, messages);
  }

  return {
    getLocale,
    getCombinedLocale,
    getShowLocalePicker,
    changeLocale,
    setLocalePicker,
    addMessages,
  };
}

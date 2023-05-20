/**
 * Multi-language related operations
 */

import { computed, unref } from 'vue';
import dayjs from 'dayjs';
import { useLocaleStoreWithOut } from '@ent-core/store/modules/locale';
import { i18n } from './setup-i18n';
import { loadLocalePool, setHtmlPageLang } from './helper';
import type { LocaleType } from '@ent-core/store/types/store';

function setI18nLanguage(locale: LocaleType) {
  const localeStore = useLocaleStoreWithOut();

  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale;
  } else {
    (i18n.global.locale as any).value = locale;
  }
  localeStore.setLocaleInfo({ locale });
  setHtmlPageLang(locale);
}

export function useLocale() {
  const localeStore = useLocaleStoreWithOut();
  const getLocale = computed(() => localeStore.getLocale);
  const getShowLocalePicker = computed(() => localeStore.getShowPicker);

  const setLocalePicker = (show: boolean) => {
    localeStore.setShowPicker(show);
  };
  const getAntdLocale = computed((): any => {
    // @ts-ignore
    return i18n.global.getLocaleMessage(unref(getLocale))?.antdLocale ?? {};
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
    // const langModule = ((await import(`./lang/${locale}.ts`)) as any).default as LangModule;
    // if (!langModule) return;
    //const { message, momentLocale, momentLocaleName } = langModule;
    //不需要，因为i1n8是一次载入
    //globalI18n.setLocaleMessage(locale, message);
    //moment.locale()
    //moment.updateLocale(momentLocaleName, momentLocale);
    dayjs.locale(locale);
    loadLocalePool.push(locale);

    setI18nLanguage(locale);
    return locale;
  }

  function addMessages(locale: LocaleType, messages: Record<string, any>) {
    i18n.global.mergeLocaleMessage(locale, messages);
  }

  return {
    getLocale,
    getShowLocalePicker,
    changeLocale,
    setLocalePicker,
    getAntdLocale,
    addMessages,
  };
}

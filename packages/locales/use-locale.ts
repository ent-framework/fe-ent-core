/**
 * Multi-language related operations
 */
import type { LocaleType } from '@ent-core/logics/types/config';

import { i18n } from './setup-i18n';
import { useLocaleStoreWithOut } from '@ent-core/store/modules/locale';
import { unref, computed } from 'vue';
import { loadLocalePool, setHtmlPageLang } from './helper';
import dayjs from 'dayjs';

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

  const getAntdLocale = computed((): any => {
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

  return {
    getLocale,
    getShowLocalePicker,
    changeLocale,
    getAntdLocale,
  };
}

import { createI18n } from 'vue-i18n';
import dayjs from 'dayjs';
import { localeSetting } from '@ent-core/logics/settings/locale-setting';
import { useLocaleStoreWithOut } from '@ent-core/store/modules/locale';
import zhCN from './lang/zh-CN';
import en from './lang/en';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/en';

import { setHtmlPageLang, setLoadLocalePool } from './helper';
import type { App } from 'vue';
import type { I18n, I18nOptions } from 'vue-i18n';

const { fallback, availableLocales } = localeSetting;

export let i18n: I18n;

async function createI18nOptions(): Promise<I18nOptions> {
  const localeStore = useLocaleStoreWithOut();
  //default locale
  const locale = localeStore.getLocale;
  if (locale) {
    dayjs.locale(locale);
  }
  setHtmlPageLang(locale);
  setLoadLocalePool((loadLocalePool) => {
    loadLocalePool.push(locale);
  });
  return {
    legacy: false,
    locale,
    fallbackLocale: fallback,
    messages: {
      //TODO 修复类型不正确的问题
      //@ts-ignore
      zh_CN: zhCN.message,
      //@ts-ignore
      en: en.message,
    },
    availableLocales,
    sync: true, //If you don’t want to inherit locale from global scope, you need to set sync of i18n component option to false.
    silentTranslationWarn: true, // true - warning off
    missingWarn: true,
    silentFallbackWarn: true,
  };
}

// setup i18n instance with glob
export async function setupI18n(app: App) {
  const options = await createI18nOptions();
  i18n = createI18n(options) as I18n;
  app.use(i18n);
}

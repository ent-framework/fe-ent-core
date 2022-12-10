import type { App } from 'vue';
import type { I18n, I18nOptions } from 'vue-i18n';

import { createI18n } from 'vue-i18n';
import { setHtmlPageLang, setLoadLocalePool } from './helper';
import { localeSetting } from '@ent-core/logics/settings/locale-setting';
import { useLocaleStoreWithOut } from '@ent-core/store/modules/locale';
import zhCN from './lang/zh-cn';
import en from './lang/en';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/en';

const { fallback, availableLocales } = localeSetting;

export let i18n: ReturnType<typeof createI18n>;

async function createI18nOptions(): Promise<I18nOptions> {
  const localeStore = useLocaleStoreWithOut();
  //default locale
  const locale = localeStore.getLocale;
  setHtmlPageLang(locale);
  setLoadLocalePool((loadLocalePool) => {
    loadLocalePool.push(locale);
  });
  return {
    legacy: false,
    locale,
    fallbackLocale: fallback,
    messages: {
      zh_CN: zhCN.message,
      en: en.message,
    },
    globalInjection: true,
    availableLocales: availableLocales,
    sync: true, //If you don’t want to inherit locale from global scope, you need to set sync of i18n component option to false.
    silentTranslationWarn: true, // true - warning off
    missingWarn: false,
    silentFallbackWarn: true,
  };
}

// setup i18n instance with glob
export async function setupI18n(app: App) {
  const options = await createI18nOptions();
  i18n = createI18n(options) as I18n;
  app.use(i18n);
}

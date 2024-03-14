import { useLocale } from 'fe-ent-core/es/locales';
import Login from './components/login.vue';
import './components/index.less';
import localeEn from './locales/en';
import localeZh from './locales/zh-CN';
import type { App } from 'vue/dist/vue';
import type { AppRouteRecordRaw, EntRouter } from 'fe-ent-core/es/router';

const LoginRoute: AppRouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: Login,
  meta: {
    title: 'routes.basic.login',
  },
};

const initLogin = function (app: App, entRouter?: EntRouter) {
  const { addMessages } = useLocale();
  addMessages('en', localeEn);
  addMessages('zh_CN', localeZh);
  if (entRouter) {
    entRouter.addPublicRoutes([LoginRoute]);
  }
};

export { initLogin };

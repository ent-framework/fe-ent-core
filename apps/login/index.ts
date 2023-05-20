import { t } from 'fe-ent-core/lib/hooks';
import Login from './components/login/login.vue';
import type { AppRouteRecordRaw } from 'fe-ent-core/lib/router';

import './components/index.less';

export const LoginRoute: AppRouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: Login,
  meta: {
    title: t('routes.basic.login'),
  },
};

export { Login };

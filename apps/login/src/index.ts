import type { AppRouteRecordRaw } from 'fe-ent-core/lib/router';
import Login from './login.vue';

import { t } from 'fe-ent-core/lib/hooks';

import './index.less';

export const LoginRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Login',
  component: Login,
  meta: {
    title: t('routes.basic.login'),
  },
};

export { Login };

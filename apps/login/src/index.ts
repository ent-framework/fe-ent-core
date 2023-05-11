import { t } from 'fe-ent-core/lib/hooks';
import Login from './login.vue';
import type { AppRouteRecordRaw } from 'fe-ent-core/lib/router';

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

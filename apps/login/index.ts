import Login from './components/login.vue';
import type { AppRouteRecordRaw } from 'fe-ent-core';

export const LoginRoute: AppRouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: Login,
  meta: {
    title: 'routes.basic.login',
  },
};

export { Login };

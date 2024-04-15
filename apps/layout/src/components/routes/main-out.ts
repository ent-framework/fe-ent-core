/**
The routing of this file will not show the layout.
It is an independent new page.
the contents of the file still need to log in to access
 */
import MainOut from '../views/main-out/index.vue';
import type { AppRouteRecordRaw } from 'fe-ent-core/es/router';

// test
// http:ip:port/main-out
export const mainOutRoute: AppRouteRecordRaw = {
  path: '/main-out',
  name: 'MainOut',
  component: MainOut,
  meta: {
    title: 'MainOut',
    ignoreAuth: true,
  },
};

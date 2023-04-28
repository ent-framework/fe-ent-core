/**
The routing of this file will not show the layout.
It is an independent new page.
the contents of the file still need to log in to access
 */
import type { AppRouteModule } from '@ent-core/router/types';
import MainOut from '@ent-core/views/sys/main-out/index.vue';
// test
// http:ip:port/main-out
export const mainOutRoutes: AppRouteModule[] = [
  {
    path: '/main-out',
    name: 'MainOut',
    component: MainOut,
    meta: {
      title: 'MainOut',
      ignoreAuth: true,
    },
  },
];

export const mainOutRouteNames = mainOutRoutes.map((item) => item.name);

import type { AppRouteModule } from '@ent-core/router/types';

import { t } from '@ent-core/hooks/web/use-i18n';

const dashboard: AppRouteModule = {
  path: '/about',
  name: 'About',
  component: 'LAYOUT',
  redirect: '/about/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'simple-icons:about-dot-me',
    title: t('routes.dashboard.about'),
    orderNo: 100000,
  },
  children: [
    {
      path: 'index',
      name: 'AboutPage',
      component: () => import('/@/views/sys/about/index.vue'),
      meta: {
        title: t('routes.dashboard.about'),
        icon: 'simple-icons:about-dot-me',
        hideMenu: true,
      },
    },
  ],
};

export default dashboard;

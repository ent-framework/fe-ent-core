import { t } from 'fe-ent-core/es/hooks';
import type { AppRouteRecordRaw } from 'fe-ent-core/es/router';

const setup: AppRouteRecordRaw = {
  path: '/ui-config',
  name: 'UISetup',
  component: 'LAYOUT',
  redirect: '/ui-config/index',
  meta: {
    orderNo: 90000,
    hideChildrenInMenu: true,
    icon: 'whh:paintroll',
    title: t('routes.demo.ui_config.page'),
  },
  children: [
    {
      path: 'index',
      name: 'UISetupPage',
      component: () => import('/@/views/demo/ui-config/index.vue'),
      meta: {
        title: t('routes.demo.ui_config.page'),
        icon: 'whh:paintroll',
        hideMenu: true,
      },
    },
  ],
};

export default setup;

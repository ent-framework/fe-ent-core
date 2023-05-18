import type { AppRouteModule } from '@ent-core/router/types';

import { t } from '@ent-core/hooks/web/use-i18n';

const charts: AppRouteModule = {
  path: '/flow',
  name: 'FlowDemo',
  component: 'LAYOUT',
  redirect: '/flow/flowChart',
  meta: {
    orderNo: 5000,
    icon: 'tabler:chart-dots',
    title: t('routes.demo.flow.name'),
  },
  children: [
    {
      path: 'flowChart',
      name: 'flowChartDemo',
      component: () => import('/@/views/demo/comp/flow-chart/index.vue'),
      meta: {
        title: t('routes.demo.flow.flowChart'),
      },
    },
  ],
};

export default charts;

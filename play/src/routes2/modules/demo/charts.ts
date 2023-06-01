import { getParentLayout } from 'fe-ent-core/es/router';
import { t } from 'fe-ent-core/es/hooks';
import type { AppRouteRecordRaw } from 'fe-ent-core/es/router';

const charts: AppRouteRecordRaw = {
  path: '/charts',
  name: 'Charts',
  component: 'LAYOUT',
  redirect: '/charts/echarts/map',
  meta: {
    orderNo: 500,
    icon: 'ion:bar-chart-outline',
    title: t('routes.demo.charts.charts'),
  },
  children: [
    {
      path: 'baiduMap',
      name: 'BaiduMap',
      meta: {
        title: t('routes.demo.charts.baiduMap'),
      },
      component: () => import('/@/views/bank.vue'),
    },
    {
      path: 'aMap',
      name: 'AMap',
      meta: {
        title: t('routes.demo.charts.aMap'),
      },
      component: () => import('/@/views/bank.vue'),
    },
    {
      path: 'googleMap',
      name: 'GoogleMap',
      meta: {
        title: t('routes.demo.charts.googleMap'),
      },
      component: () => import('/@/views/bank.vue'),
    },

    {
      path: 'echarts',
      name: 'Echarts',
      component: getParentLayout('Echarts'),
      meta: {
        title: 'Echarts',
      },
      redirect: '/charts/echarts/map',
      children: [
        {
          path: 'map',
          name: 'Map',
          component: () => import('/@/views/bank.vue'),
          meta: {
            title: t('routes.demo.charts.map'),
          },
        },
        {
          path: 'line',
          name: 'Line',
          component: () => import('/@/views/bank.vue'),
          meta: {
            title: t('routes.demo.charts.line'),
          },
        },
        {
          path: 'pie',
          name: 'Pie',
          component: () => import('/@/views/bank.vue'),
          meta: {
            title: t('routes.demo.charts.pie'),
          },
        },
      ],
    },
  ],
};

export default charts;

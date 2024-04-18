import { t } from 'fe-ent-core/es/hooks';
import type { AppRouteRecordRaw } from 'fe-ent-core/es/router';

const iframe: AppRouteRecordRaw = {
  path: '/frame',
  name: 'Frame',
  component: 'LAYOUT',
  redirect: '/frame/doc',
  meta: {
    orderNo: 1000,
    icon: 'ion:tv-outline',
    title: t('routes.demo.iframe.frame'),
  },

  children: [
    {
      path: 'doc',
      name: 'Doc',
      component: 'IFrame',
      meta: {
        frameSrc: 'https://docs.ent-framework.tech/',
        title: t('routes.demo.iframe.doc'),
      },
    },
    {
      path: 'antv',
      name: 'Antv',
      component: 'IFrame',
      meta: {
        frameSrc: 'https://next.antdv.com/docs/vue/introduce-cn/',
        title: t('routes.demo.iframe.antv'),
      },
    },
    {
      path: 'https://docs.ent-framework.tech/',
      name: 'DocExternal',
      component: 'IFrame',
      meta: {
        title: t('routes.demo.iframe.docExternal'),
      },
    },
  ],
};

export default iframe;

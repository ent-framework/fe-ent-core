import { getParentLayout } from 'fe-ent-core/es/router';
import { t } from 'fe-ent-core/es/hooks';
import type { AppRouteRecordRaw } from 'fe-ent-core/es/router';

const feat: AppRouteRecordRaw = {
  path: '/feat',
  name: 'FeatDemo',
  component: 'LAYOUT',
  redirect: '/feat/icon',
  meta: {
    orderNo: 19,
    icon: 'ion:git-compare-outline',
    title: t('routes.demo.feat.feat'),
  },

  children: [
    {
      path: 'icon',
      name: 'IconDemo',
      component: () => import('/@/views/bank.vue'),
      meta: {
        title: t('routes.demo.feat.icon'),
      },
    },
    {
      path: 'ws',
      name: 'WebSocket',
      component: () => import('/@/views/bank.vue'),
      meta: {
        title: t('routes.demo.feat.ws'),
      },
    },
    {
      path: 'session-timeout',
      name: 'SessionTimeout',
      component: () => import('/@/views/bank.vue'),
      meta: {
        title: t('routes.demo.feat.sessionTimeout'),
      },
    },
    {
      path: 'print',
      name: 'Print',
      component: () => import('/@/views/bank.vue'),
      meta: {
        title: t('routes.demo.feat.print'),
      },
    },
    {
      path: 'tabs',
      name: 'TabsDemo',
      component: () => import('/@/views/bank.vue'),
      meta: {
        title: t('routes.demo.feat.tabs'),
        hideChildrenInMenu: true,
      },
      children: [
        {
          path: 'detail/:id',
          name: 'TabDetail',
          component: () => import('/@/views/bank.vue'),
          meta: {
            currentActiveMenu: '/feat/tabs',
            title: t('routes.demo.feat.tabDetail'),
            hideMenu: true,
            dynamicLevel: 3,
            realPath: '/feat/tabs/detail',
          },
        },
      ],
    },
    {
      path: 'breadcrumb',
      name: 'BreadcrumbDemo',
      redirect: '/feat/breadcrumb/flat',
      component: getParentLayout('BreadcrumbDemo'),
      meta: {
        title: t('routes.demo.feat.breadcrumb'),
      },

      children: [
        {
          path: 'flat',
          name: 'BreadcrumbFlatDemo',
          component: () => import('/@/views/bank.vue'),
          meta: {
            title: t('routes.demo.feat.breadcrumbFlat'),
          },
        },
        {
          path: 'flatDetail',
          name: 'BreadcrumbFlatDetailDemo',
          component: () => import('/@/views/bank.vue'),
          meta: {
            title: t('routes.demo.feat.breadcrumbFlatDetail'),
            hideMenu: true,
            hideTab: true,
            currentActiveMenu: '/feat/breadcrumb/flat',
          },
        },
        {
          path: 'children',
          name: 'BreadcrumbChildrenDemo',
          component: () => import('/@/views/bank.vue'),
          meta: {
            title: t('routes.demo.feat.breadcrumbChildren'),
          },
          children: [
            {
              path: 'childrenDetail',
              name: 'BreadcrumbChildrenDetailDemo',
              component: () => import('/@/views/bank.vue'),
              meta: {
                currentActiveMenu: '/feat/breadcrumb/children',
                title: t('routes.demo.feat.breadcrumbChildrenDetail'),
                //hideTab: true,
                // hideMenu: true,
              },
            },
          ],
        },
      ],
    },

    {
      path: 'context-menu',
      name: 'ContextMenuDemo',
      component: () => import('/@/views/bank.vue'),
      meta: {
        title: t('routes.demo.feat.contextMenu'),
      },
    },
    {
      path: 'download',
      name: 'DownLoadDemo',
      component: () => import('/@/views/bank.vue'),
      meta: {
        title: t('routes.demo.feat.download'),
      },
    },
    {
      path: 'click-out-side',
      name: 'ClickOutSideDemo',
      component: () => import('/@/views/bank.vue'),
      meta: {
        title: t('routes.demo.feat.clickOutSide'),
      },
    },
    {
      path: 'img-preview',
      name: 'ImgPreview',
      component: () => import('/@/views/bank.vue'),
      meta: {
        title: t('routes.demo.feat.imgPreview'),
      },
    },
    {
      path: 'copy',
      name: 'CopyDemo',
      component: () => import('/@/views/bank.vue'),
      meta: {
        title: t('routes.demo.feat.copy'),
      },
    },
    {
      path: 'msg',
      name: 'MsgDemo',
      component: () => import('/@/views/bank.vue'),
      meta: {
        title: t('routes.demo.feat.msg'),
      },
    },
    {
      path: 'watermark',
      name: 'WatermarkDemo',
      component: () => import('/@/views/bank.vue'),
      meta: {
        title: t('routes.demo.feat.watermark'),
      },
    },
    {
      path: 'ripple',
      name: 'RippleDemo',
      component: () => import('/@/views/bank.vue'),
      meta: {
        title: t('routes.demo.feat.ripple'),
      },
    },
    {
      path: 'full-screen',
      name: 'FullScreenDemo',
      component: () => import('/@/views/bank.vue'),
      meta: {
        title: t('routes.demo.feat.fullScreen'),
      },
    },
    {
      path: 'excel',
      name: 'Excel',
      redirect: '/feat/excel/customExport',
      component: getParentLayout('Excel'),
      meta: {
        // icon: 'mdi:microsoft-excel',
        title: t('routes.demo.excel.excel'),
      },

      children: [
        {
          path: 'customExport',
          name: 'CustomExport',
          component: () => import('/@/views/bank.vue'),
          meta: {
            title: t('routes.demo.excel.customExport'),
          },
        },
        {
          path: 'jsonExport',
          name: 'JsonExport',
          component: () => import('/@/views/bank.vue'),
          meta: {
            title: t('routes.demo.excel.jsonExport'),
          },
        },
        {
          path: 'arrayExport',
          name: 'ArrayExport',
          component: () => import('/@/views/bank.vue'),
          meta: {
            title: t('routes.demo.excel.arrayExport'),
          },
        },
        {
          path: 'importExcel',
          name: 'ImportExcel',
          component: () => import('/@/views/bank.vue'),
          meta: {
            title: t('routes.demo.excel.importExcel'),
          },
        },
      ],
    },
    {
      path: 'testTab/:id',
      name: 'TestTab',
      component: () => import('/@/views/bank.vue'),
      meta: {
        title: t('routes.demo.feat.tab'),
        carryParam: true,
        hidePathForChildren: true,
      },
      children: [
        {
          path: 'testTab/id1',
          name: 'TestTab1',
          component: () => import('/@/views/bank.vue'),
          meta: {
            title: t('routes.demo.feat.tab1'),
            carryParam: true,
            ignoreRoute: true,
          },
        },
        {
          path: 'testTab/id2',
          name: 'TestTab2',
          component: () => import('/@/views/bank.vue'),
          meta: {
            title: t('routes.demo.feat.tab2'),
            carryParam: true,
            ignoreRoute: true,
          },
        },
      ],
    },
    {
      path: 'testParam/:id',
      name: 'TestParam',
      component: getParentLayout('TestParam'),
      meta: {
        title: t('routes.demo.feat.menu'),
        ignoreKeepAlive: true,
      },
      children: [
        {
          path: 'sub1',
          name: 'TestParam_1',
          component: () => import('/@/views/bank.vue'),
          meta: {
            title: t('routes.demo.feat.menu1'),
            ignoreKeepAlive: true,
          },
        },
        {
          path: 'sub2',
          name: 'TestParam_2',
          component: () => import('/@/views/bank.vue'),
          meta: {
            title: t('routes.demo.feat.menu2'),
            ignoreKeepAlive: true,
          },
        },
      ],
    },
  ],
};

export default feat;

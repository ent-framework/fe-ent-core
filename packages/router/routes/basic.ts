import type { AppRouteRecordRaw } from '@ent-core/router/types';
import { t } from '@ent-core/hooks/web/useI18n';
import { REDIRECT_NAME, EXCEPTION_COMPONENT, PAGE_NOT_FOUND_NAME } from '@ent-core/router/constant';
import redirect from '@ent-core/views/sys/redirect/index.vue';
import errorLog from '@ent-core/views/sys/error-log/index.vue';
import { useLayout } from '../helper/layoutHelper';

// 404 on a page
export function registerPageNotFoundRoute(): AppRouteRecordRaw {
  const layoutMgt = useLayout();
  return {
    path: '/:path(.*)*',
    name: PAGE_NOT_FOUND_NAME,
    component: layoutMgt.getLayout('LAYOUT'),
    meta: {
      title: 'ErrorPage',
      hideBreadcrumb: true,
      hideMenu: true,
    },
    children: [
      {
        path: '/:path(.*)*',
        name: PAGE_NOT_FOUND_NAME,
        component: EXCEPTION_COMPONENT,
        meta: {
          title: 'ErrorPage',
          hideBreadcrumb: true,
          hideMenu: true,
        },
      },
    ],
  };
}

export function registerRedirectRoute(): AppRouteRecordRaw {
  const layoutMgt = useLayout();
  return {
    path: '/redirect',
    component: layoutMgt.getLayout('LAYOUT'),
    name: 'RedirectTo',
    meta: {
      title: REDIRECT_NAME,
      hideBreadcrumb: true,
      hideMenu: true,
    },
    children: [
      {
        path: '/redirect/:path(.*)',
        name: REDIRECT_NAME,
        component: redirect,
        meta: {
          title: REDIRECT_NAME,
          hideBreadcrumb: true,
        },
      },
    ],
  };
}

export function registerErrorLogRoute(): AppRouteRecordRaw {
  const layoutMgt = useLayout();
  return {
    path: '/error-log',
    name: 'ErrorLog',
    component: layoutMgt.getLayout('LAYOUT'),
    redirect: '/error-log/list',
    meta: {
      title: 'ErrorLog',
      hideBreadcrumb: true,
      hideChildrenInMenu: true,
    },
    children: [
      {
        path: 'list',
        name: 'ErrorLogList',
        component: errorLog,
        meta: {
          title: t('routes.basic.errorLogList'),
          hideBreadcrumb: true,
          currentActiveMenu: '/error-log',
        },
      },
    ],
  };
}

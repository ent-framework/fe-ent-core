import type { AppRouteRecordRaw } from 'fe-ent-core/lib/router';
import { t } from 'fe-ent-core/lib/hooks';
import { REDIRECT_NAME, PAGE_NOT_FOUND_NAME } from 'fe-ent-core/lib/router';
import redirect from '../views/redirect/index.vue';
import errorLog from '../views/error-log/index.vue';
import exceptionView from '../views/exception/exception.vue';
import { useLayout } from 'fe-ent-core/lib/router';
import { PageEnum } from 'fe-ent-core/lib/logics';

// 404 on a page
export function getPageNotFoundRoute(): AppRouteRecordRaw {
  const layoutMgt = useLayout();
  return {
    path: '/:path(.*)*',
    name: PAGE_NOT_FOUND_NAME,
    component: layoutMgt.getLayout(''),
    meta: {
      title: 'ErrorPage',
      hideBreadcrumb: true,
      hideMenu: true,
    },
    children: [
      {
        path: '/:path(.*)*',
        name: PAGE_NOT_FOUND_NAME,
        component: exceptionView,
        meta: {
          title: 'ErrorPage',
          hideBreadcrumb: true,
          hideMenu: true,
        },
      },
    ],
  };
}

export function getRedirectRoute(): AppRouteRecordRaw {
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

export function getErrorLogRoute(): AppRouteRecordRaw {
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

export function getRootRoute(): AppRouteRecordRaw {
  return {
    path: '/',
    name: 'Root',
    redirect: PageEnum.BASE_HOME,
    meta: {
      title: 'Root',
    },
  };
}

import { t } from 'fe-ent-core/lib/hooks';
import { COMPONENT_LAYOUT_NAME, PAGE_NOT_FOUND_NAME, REDIRECT_NAME } from 'fe-ent-core/lib/router';
import redirect from '../views/redirect/index.vue';
import errorLog from '../views/error-log/index.vue';
import exceptionView from '../views/exception/exception.vue';
import type { AppRouteRecordRaw } from 'fe-ent-core/lib/router';

// 404 on a page
export function getPageNotFoundRoute(): AppRouteRecordRaw {
  return {
    path: '/:path(.*)*',
    name: PAGE_NOT_FOUND_NAME,
    component: COMPONENT_LAYOUT_NAME,
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
  return {
    path: '/redirect',
    component: COMPONENT_LAYOUT_NAME,
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
  return {
    path: '/error-log',
    name: 'ErrorLog',
    component: COMPONENT_LAYOUT_NAME,
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

export function getRootRoute(rootPathRedirect?: string): AppRouteRecordRaw {
  return {
    path: '/',
    name: 'Root',
    redirect: `${rootPathRedirect || '/dashboard'}`,
    meta: {
      title: 'Root',
    },
  };
}

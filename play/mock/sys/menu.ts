import { resultSuccess, resultError, getRequestToken, requestParams } from '../_util';
import { MockMethod } from 'vite-plugin-mock';
import { createFakeUserList } from './user';

// single
const dashboardRoute = {
  path: '/dashboard',
  name: 'Dashboard',
  redirect: '/dashboard/analysis',
  meta: {
    orderNo: 5000,
    title: 'routes.dashboard.dashboard',
    hideChildrenInMenu: false,
    icon: 'bx:bx-home',
  },
  children: [
    {
      path: 'analysis',
      name: 'Analysis',
      meta: {
        hideMenu: false,
        hideBreadcrumb: true,
        title: 'routes.dashboard.analysis',
        currentActiveMenu: '/dashboard',
        icon: 'bx:bx-home',
      },
    },
  ],
};

const backRoute = {
  path: 'back',
  name: 'PermissionBackDemo',
  meta: {
    title: 'routes.demo.permission.back',
  },
  children: [
    {
      path: '/dashboard/workbench',
      name: 'Workbench',
      meta: {
        hideMenu: false,
        hideBreadcrumb: true,
        title: 'routes.dashboard.workbench',
        icon: 'bx:bx-home',
      },
    },
    {
      path: 'page',
      name: 'BackAuthPage',
      meta: {
        title: 'routes.demo.permission.backPage',
      },
    },
    {
      path: 'btn',
      name: 'BackAuthBtn',
      meta: {
        title: 'routes.demo.permission.backBtn',
      },
    },
  ],
};

const authRoute = {
  path: '/permission',
  name: 'Permission',
  redirect: '/permission/front/page',
  meta: {
    orderNo: 1000,
    icon: 'carbon:user-role',
    title: 'routes.demo.permission.permission',
  },
  children: [backRoute],
};

const levelRoute = {
  path: '/level',
  name: 'Level',
  redirect: '/level/menu1/menu1-1',
  meta: {
    icon: 'carbon:user-role',
    title: 'routes.demo.level.level',
  },

  children: [
    {
      path: 'menu1',
      name: 'Menu1Demo',
      meta: {
        title: 'Menu1',
      },
      children: [
        {
          path: 'menu1-1',
          name: 'Menu11Demo',
          meta: {
            title: 'Menu1-1',
          },
          children: [
            {
              path: 'menu1-1-1',
              name: 'Menu111Demo',
              meta: {
                title: 'Menu111',
              },
            },
          ],
        },
        {
          path: 'menu1-2',
          name: 'Menu12Demo',
          meta: {
            title: 'Menu1-2',
          },
        },
      ],
    },
    {
      path: 'menu2',
      name: 'Menu2Demo',
      meta: {
        title: 'Menu2',
      },
    },
  ],
};

const sysRoute = {
  path: '/system',
  name: 'System',
  redirect: '/system/account',
  meta: {
    orderNo: 2000,
    icon: 'ion:settings-outline',
    title: 'routes.demo.system.moduleName',
  },
  children: [
    {
      path: 'account',
      name: 'AccountManagement',
      meta: {
        title: 'routes.demo.system.account',
        ignoreKeepAlive: true,
      },
    },
    {
      path: 'account_detail/:id',
      name: 'AccountDetail',
      meta: {
        hideMenu: true,
        title: 'routes.demo.system.account_detail',
        ignoreKeepAlive: true,
        showMenu: false,
        currentActiveMenu: '/system/account',
      },
    },
    {
      path: 'role',
      name: 'RoleManagement',
      meta: {
        title: 'routes.demo.system.role',
        ignoreKeepAlive: true,
      },
    },

    {
      path: 'menu',
      name: 'MenuManagement',
      meta: {
        title: 'routes.demo.system.menu',
        ignoreKeepAlive: true,
      },
    },
    {
      path: 'dept',
      name: 'DeptManagement',
      meta: {
        //title: 'routes.demo.system.dept',
        ignoreKeepAlive: true,
      },
    },
    // {
    //   path: 'changePassword',
    //   name: 'ChangePassword',
    //   meta: {
    //     title: 'routes.demo.system.password',
    //     ignoreKeepAlive: true,
    //   },
    // },
  ],
};

const linkRoute = {
  path: '/link',
  name: 'Link',
  meta: {
    icon: 'ion:tv-outline',
    title: 'routes.demo.iframe.frame',
  },
  children: [
    {
      path: 'doc',
      name: 'Doc',
      meta: {
        title: 'routes.demo.iframe.doc',
        frameSrc: 'https://vvbin.cn/doc-next/',
      },
    },
    {
      path: 'https://vvbin.cn/doc-next/',
      name: 'DocExternal',
      meta: {
        title: 'routes.demo.iframe.docExternal',
      },
    },
  ],
};

const appRoutes = [
  {
    path: '/link',
    name: 'Link',
    meta: {
      icon: 'ion:tv-outline',
      title: 'routes.demo.iframe.frame',
    },
    children: [
      {
        path: 'doc',
        name: 'Doc',
        meta: {
          title: 'routes.demo.iframe.doc',
          frameSrc: 'https://vvbin.cn/doc-next/',
        },
      },
      {
        path: 'https://vvbin.cn/doc-next/',
        name: 'DocExternal',
        meta: {
          title: 'routes.demo.iframe.docExternal',
        },
      },
    ],
  },
  {
    path: '/link',
    name: 'Link',
    meta: {
      icon: 'ion:tv-outline',
      title: 'routes.demo.iframe.frame',
    },
    children: [
      {
        path: 'doc',
        name: 'Doc',
        meta: {
          title: 'routes.demo.iframe.doc',
          frameSrc: 'https://vvbin.cn/doc-next/',
        },
      },
      {
        path: 'https://vvbin.cn/doc-next/',
        name: 'DocExternal',
        meta: {
          title: 'routes.demo.iframe.docExternal',
        },
      },
    ],
  },
];

export default [
  {
    url: '/api/menu-list',
    timeout: 1000,
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request);
      if (!token) {
        return resultError('Invalid token!');
      }
      const checkUser = createFakeUserList().find((item) => item.token === token);
      if (!checkUser) {
        return resultError('Invalid user token!');
      }
      const id = checkUser.userId;
      let menu: Object[];
      switch (id) {
        case '1':
          dashboardRoute.redirect = dashboardRoute.path + '/' + dashboardRoute.children[0].path;
          menu = [dashboardRoute, authRoute, levelRoute, sysRoute, linkRoute];
          break;
        case '2':
          dashboardRoute.redirect = dashboardRoute.path + '/' + dashboardRoute.children[1].path;
          menu = [dashboardRoute, authRoute, levelRoute, linkRoute];
          break;
        default:
          menu = [];
      }

      return resultSuccess(menu);
    },
  },
  {
    url: '/api/app-list',
    timeout: 1000,
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request);
      if (!token) {
        return resultError('Invalid token!');
      }
      const checkUser = createFakeUserList().find((item) => item.token === token);
      if (!checkUser) {
        return resultError('Invalid user token!');
      }
      const id = checkUser.userId;
      let menu: Object[];
      switch (id) {
        case '1':
          dashboardRoute.redirect = dashboardRoute.path + '/' + dashboardRoute.children[0].path;
          menu = [dashboardRoute, authRoute, levelRoute, sysRoute, linkRoute];
          break;
        case '2':
          dashboardRoute.redirect = dashboardRoute.path + '/' + dashboardRoute.children[1].path;
          menu = [dashboardRoute, authRoute, levelRoute, linkRoute];
          break;
        default:
          menu = [];
      }

      return resultSuccess(menu);
    },
  },
] as MockMethod[];

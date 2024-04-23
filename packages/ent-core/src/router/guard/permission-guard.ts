import { usePermissionStore, useSessionStore, useUserStore } from '../../store';
import { useGlobSetting } from '../../hooks';
import { PAGE_NOT_FOUND_NAME } from '../constant';
import { entRouter } from '../base';
import type { RouteRecordRaw, Router } from 'vue-router';
import type { Recordable } from '../../types';

export function createPermissionGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const globSetting = useGlobSetting();
    const userStore = useUserStore();
    const permissionStore = usePermissionStore();
    const sessionStore = useSessionStore();
    const loginPath = globSetting.loginUrl;
    const baseHome = globSetting.homePath;
    if (
      from.path === '/' &&
      to.path === baseHome &&
      userStore.getUserInfo?.homePath &&
      userStore.getUserInfo?.homePath !== baseHome
    ) {
      next(userStore.getUserInfo?.homePath);
      return;
    }

    const redirect = (to.query?.redirect as string) || undefined;

    const token = sessionStore.getToken;
    const whitePathList = entRouter.getPublicRoutePathList();
    // Whitelist can be directly entered
    if (whitePathList.includes(to.path)) {
      //已登录
      if (to.path === loginPath && token) {
        const isSessionTimeout = userStore.getSessionTimeout;
        try {
          await userStore.afterLoginAction();
          if (!isSessionTimeout) {
            next((to.query?.redirect as string) || '/');
            return;
          }
        } catch {
          //
        }
      }
      next();
      return;
    }

    // token does not exist
    if (!token) {
      // You can access without permission. You need to set the routing meta.ignoreAuth to true
      if (to.meta.ignoreAuth) {
        next();
        return;
      }

      if (loginPath.indexOf('.html') > 0) {
        let loinPage = loginPath;
        let currentPath = window.location.pathname;
        if (currentPath.endsWith('/') && !currentPath.includes('.html')) {
          currentPath += 'index.html';
        }
        if (to.path) {
          currentPath += `#${to.path}`;
          loinPage += `#/?redirect=${encodeURIComponent(`${currentPath}`)}`;
        }
        window.location.href = loinPage;
        return;
      } else if (to.path !== loginPath) {
        // redirect login page
        const redirectData: { path: string; replace: boolean; query?: Recordable<string> } = {
          path: loginPath,
          replace: true
        };
        if (to.path) {
          if (redirect) {
            redirectData.query = {
              ...redirectData.query,
              redirect: `${encodeURIComponent(redirect)}`
            };
          } else {
            redirectData.query = {
              ...redirectData.query,
              redirect: to.path
            };
          }
        }
        next(redirectData);
      }
    }

    // Jump to the 404 page after processing the login
    if (
      from.path === loginPath &&
      to.name === PAGE_NOT_FOUND_NAME &&
      to.fullPath !== (userStore.getUserInfo?.homePath || baseHome)
    ) {
      next(userStore.getUserInfo?.homePath || baseHome);
      return;
    }

    // get userinfo while last fetch time is empty
    if (userStore.getLastUpdateTime === 0) {
      //if from login path, won't load current inf again;
      if (from.path !== loginPath) {
        try {
          await userStore.getUserInfoAction();
        } catch {
          if (from.path !== loginPath) {
            next(loginPath);
          } else {
            next();
          }
          return;
        }
      }
    }

    if (permissionStore.getIsDynamicAddedRoute) {
      next();
      return;
    }
    const routes = await permissionStore.buildRoutesAction();
    routes.forEach((route) => {
      router.addRoute(route as unknown as RouteRecordRaw);
    });
    permissionStore.setDynamicAddedRoute(true);

    if (to.name === PAGE_NOT_FOUND_NAME) {
      // 动态添加路由后，此处应当重定向到fullPath，否则会加载404页面内容
      next({ path: to.fullPath, replace: true, query: to.query });
    } else {
      const redirectPath = (from.query.redirect || to.path) as string;
      const redirect = decodeURIComponent(redirectPath);
      const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect };
      next(nextData);
    }
  });
}

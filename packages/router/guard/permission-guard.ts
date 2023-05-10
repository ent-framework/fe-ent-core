import type { Router, RouteRecordRaw } from 'vue-router';

import { usePermissionStoreWithOut } from '@ent-core/store/modules/permission';

import { PageEnum } from '@ent-core/logics/enums/page-enum';
import { useUserStoreWithOut } from '@ent-core/store/modules/user';

import { PAGE_NOT_FOUND_NAME } from '@ent-core/router/constant';
import { routeBridge } from '@ent-core/router/bridge';

const LOGIN_PATH = PageEnum.BASE_LOGIN_PAGE as string;

export function createPermissionGuard(router: Router) {
  const ROOT_PATH = routeBridge.getRootRoute().path;
  const userStore = useUserStoreWithOut();
  const permissionStore = usePermissionStoreWithOut();
  router.beforeEach(async (to, from, next) => {
    if (
      from.path === ROOT_PATH &&
      to.path === PageEnum.BASE_HOME &&
      userStore.getUserInfo.homePath &&
      userStore.getUserInfo.homePath !== PageEnum.BASE_HOME
    ) {
      next(userStore.getUserInfo.homePath);
      return;
    }

    const token = userStore.getToken;

    // token does not exist
    if (!token) {
      // You can access without permission. You need to set the routing meta.ignoreAuth to true
      if (to.meta.ignoreAuth) {
        next();
        return;
      }

      // redirect login page
      let loinPage = LOGIN_PATH;
      let currentPath = window.location.pathname;
      if (to.path) {
        currentPath += '#' + to.path;
        loinPage += '#/?redirect=' + encodeURIComponent(`${currentPath}`);
      }
      window.location.href = loinPage;
      return;
    }

    // Jump to the 404 page after processing the login
    if (
      from.path === LOGIN_PATH &&
      to.name === PAGE_NOT_FOUND_NAME &&
      to.fullPath !== (userStore.getUserInfo.homePath || PageEnum.BASE_HOME)
    ) {
      next(userStore.getUserInfo.homePath || PageEnum.BASE_HOME);
      return;
    }

    // get userinfo while last fetch time is empty
    if (userStore.getLastUpdateTime === 0) {
      //if from login path, won't load current inf again;
      if (from.path !== LOGIN_PATH) {
        try {
          await userStore.getUserInfoAction();
        } catch (err) {
          if (from.path !== LOGIN_PATH) {
            //next(LOGIN_PATH);
            window.location.href = LOGIN_PATH as string;
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
    //console.log(router.getRoutes());
    routes.forEach((route) => {
      router.addRoute(route as unknown as RouteRecordRaw);
    });
    //console.log(router.getRoutes());
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

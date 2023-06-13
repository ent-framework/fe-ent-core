import { useAppStore } from '@ent-core/store/modules/app';
import { useUserStore } from '@ent-core/store/modules/user';
import { usePermissionStore } from '@ent-core/store/modules/permission';
import { removeTabChangeListener } from '@ent-core/logics/mitt/route-change';
import { useGlobalStoreWithOut } from '@ent-core/store/modules/global';
import type { Router } from 'vue-router';

export function createStateGuard(router: Router) {
  const globalStore = useGlobalStoreWithOut();
  router.afterEach((to) => {
    // Just enter the login page and clear the authentication information
    if (to.path === globalStore.getBaseLoginPath) {
      const userStore = useUserStore();
      const appStore = useAppStore();
      const permissionStore = usePermissionStore();
      appStore.resetAllState();
      permissionStore.resetState();
      userStore.resetState();
      removeTabChangeListener();
    }
  });
}

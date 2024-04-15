import { useAppStore } from '@ent-core/store/modules/app';
import { useUserStore } from '@ent-core/store/modules/user';
import { usePermissionStore } from '@ent-core/store/modules/permission';
import { useGlobSetting } from '@ent-core/hooks/setting/use-glob-setting';
import { useSessionStore } from '@ent-core/store/modules/session';
import type { Router } from 'vue-router';

export function createStateGuard(router: Router) {
  router.afterEach((to) => {
    const globSetting = useGlobSetting();
    // Just enter the login page and clear the authentication information
    if (to.path === globSetting.loginUrl) {
      const userStore = useUserStore();
      const appStore = useAppStore();
      const permissionStore = usePermissionStore();
      const sessionStore = useSessionStore();
      appStore.resetAllState();
      permissionStore.resetState();
      userStore.resetState();
      sessionStore.resetState();
    }
  });
}

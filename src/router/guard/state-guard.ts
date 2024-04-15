import { useAppStore } from '../../store/modules/app';
import { useUserStore } from '../../store/modules/user';
import { usePermissionStore } from '../../store/modules/permission';
import { useGlobSetting } from '../../hooks/setting/use-glob-setting';
import { useSessionStore } from '../../store/modules/session';
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

import type { Router } from 'vue-router';
import { useAppStore } from 'fe-ent-core/lib/store/modules/app';
import { useMultipleTabStore } from 'fe-ent-core/lib/store/modules/multiple-tab';
import { useUserStore } from 'fe-ent-core/lib/store/modules/user';
import { usePermissionStore } from 'fe-ent-core/lib/store/modules/permission';
import { PageEnum } from 'fe-ent-core/lib/enums/page-enum';
import { removeTabChangeListener } from 'fe-ent-core/lib/logics/mitt/route-change';

export function createStateGuard(router: Router) {
  router.afterEach((to) => {
    // Just enter the login page and clear the authentication information
    if (to.path === PageEnum.BASE_LOGIN) {
      const tabStore = useMultipleTabStore();
      const userStore = useUserStore();
      const appStore = useAppStore();
      const permissionStore = usePermissionStore();
      appStore.resetAllState();
      permissionStore.resetState();
      tabStore.resetState();
      userStore.resetState();
      removeTabChangeListener();
    }
  });
}

import type { Router } from 'vue-router';
import { useAppStore } from '@ent-core/store/modules/app';
import { useMultipleTabStore } from '@ent-core/store/modules/multiple-tab';
import { useUserStore } from '@ent-core/store/modules/user';
import { usePermissionStore } from '@ent-core/store/modules/permission';
import { PageEnum } from '@ent-core/enums/page-enum';
import { removeTabChangeListener } from '@ent-core/logics/mitt/route-change';

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

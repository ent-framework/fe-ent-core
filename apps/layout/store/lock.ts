import { defineStore } from 'pinia';
import { LOCK_INFO_KEY } from 'fe-ent-core/es/logics/enums/cache-enum';
import { Persistent } from 'fe-ent-core/es/utils/cache/persistent';
import { useUserStore } from 'fe-ent-core/es/store/modules/user';
import type { LockInfo } from 'fe-ent-core/es/store/types';
import type { Nullable } from 'fe-ent-core/es/types';

export interface LockState {
  lockInfo: Nullable<LockInfo>;
}

export const useLockStore = defineStore({
  id: 'app-lock',
  state: (): LockState => ({
    lockInfo: Persistent.getLocal(LOCK_INFO_KEY),
  }),
  getters: {
    getLockInfo(): Nullable<LockInfo> {
      return this.lockInfo;
    },
  },
  actions: {
    setLockInfo(info: LockInfo) {
      this.lockInfo = Object.assign({}, this.lockInfo, info);
      Persistent.setLocal(LOCK_INFO_KEY, this.lockInfo, true);
    },
    resetLockInfo() {
      Persistent.removeLocal(LOCK_INFO_KEY, true);
      this.lockInfo = null;
    },
    // Unlock
    async unLock(password?: string) {
      const userStore = useUserStore();
      if (this.lockInfo?.pwd === password) {
        this.resetLockInfo();
        return true;
      }
      const tryLogin = async () => {
        try {
          const username = userStore.getUserInfo?.username;
          const res = await userStore.login({
            username,
            password: password!,
            goHome: false,
            mode: 'none',
          });
          if (res) {
            this.resetLockInfo();
          }
          return res;
        } catch {
          return false;
        }
      };
      return tryLogin();
    },
  },
});

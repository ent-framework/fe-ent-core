import { defineStore } from 'pinia';
import { useUserStore } from 'fe-ent-core/es/store/modules/user';
import type { LockInfo } from 'fe-ent-core/es/store/types';
import type { Nullable } from 'fe-ent-core/es/types';

export interface LockState {
  lockInfo: Nullable<LockInfo>;
}

export const useLockStore = defineStore('app-lock', {
  state: (): LockState => ({
    lockInfo: { pwd: undefined, isLock: false },
  }),
  getters: {
    getLockInfo(): Nullable<LockInfo> {
      return this.lockInfo;
    },
  },
  actions: {
    setLockInfo(info: LockInfo) {
      this.lockInfo = Object.assign({}, this.lockInfo, info);
    },
    resetLockInfo() {
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
            username: username!,
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

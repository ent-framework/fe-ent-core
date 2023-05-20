import { h } from 'vue';
import { defineStore } from 'pinia';
import { store } from '@ent-core/store/pinia';
import { ROLES_KEY, TOKEN_KEY, USER_INFO_KEY } from '@ent-core/logics/enums/cache-enum';
import { getAuthCache, setAuthCache } from '@ent-core/utils/auth';
import { userBridge } from '@ent-core/logics/bridge';
import { useI18n } from '@ent-core/hooks/web/use-i18n';
import { useMessage } from '@ent-core/hooks/web/use-message';
import { isArray } from '@ent-core/utils/is';
import { useGlobalStore } from '@ent-core/store/modules/global';
import { entRouter } from '@ent-core/router/base';
import type { GetUserInfoModel, LoginParams } from '@ent-core/logics/model/user-model';
import type { RoleEnum } from '@ent-core/logics/enums/role-enum';
import type { ErrorMessageMode } from '@ent-core/logics/types/axios';
import type { UserInfo } from '@ent-core/store/types/store';
import type { Nullable } from '@ent-core/types';

export interface UserState {
  userInfo: Nullable<UserInfo>;
  token?: string;
  roleList: RoleEnum[];
  sessionTimeout?: boolean;
  lastUpdateTime: number;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    // user info
    userInfo: null,
    // token
    token: undefined,
    // roleList
    roleList: [],
    // Whether the login expired
    sessionTimeout: false,
    // Last fetch time
    lastUpdateTime: 0,
  }),
  getters: {
    getUserInfo(): UserInfo {
      return this.userInfo || getAuthCache<UserInfo>(USER_INFO_KEY) || {};
    },
    getToken(): string {
      return this.token || getAuthCache<string>(TOKEN_KEY);
    },
    getRoleList(): RoleEnum[] {
      return this.roleList.length > 0 ? this.roleList : getAuthCache<RoleEnum[]>(ROLES_KEY);
    },
    getSessionTimeout(): boolean {
      return !!this.sessionTimeout;
    },
    getLastUpdateTime(): number {
      return this.lastUpdateTime;
    },
  },
  actions: {
    setToken(info: string | undefined) {
      this.token = info ? info : ''; // for null or undefined value
      setAuthCache(TOKEN_KEY, info);
    },
    setRoleList(roleList: RoleEnum[]) {
      this.roleList = roleList;
      setAuthCache(ROLES_KEY, roleList);
    },
    setUserInfo(info: UserInfo | null) {
      this.userInfo = info;
      this.lastUpdateTime = Date.now();
      setAuthCache(USER_INFO_KEY, info);
    },
    setSessionTimeout(flag: boolean) {
      this.sessionTimeout = flag;
    },
    resetState() {
      this.userInfo = null;
      this.token = '';
      this.roleList = [];
      this.sessionTimeout = false;
    },
    /**
     * @description: login
     */
    async login(
      params: LoginParams & {
        goHome?: boolean;
        mode?: ErrorMessageMode;
        redirect?: string | undefined;
      },
    ): Promise<GetUserInfoModel | null> {
      try {
        const { goHome = true, mode, redirect, ...loginParams } = params;
        const data = await userBridge.loginApi(loginParams, mode);
        const { token } = data;

        // save token
        this.setToken(token);
        return this.afterLoginAction(goHome, redirect);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async afterLoginAction(goHome?: boolean, redirect?: string): Promise<GetUserInfoModel | null> {
      if (!this.getToken) return null;
      // get user info
      const userInfo = await this.getUserInfoAction();

      const sessionTimeout = this.sessionTimeout;
      if (sessionTimeout) {
        this.setSessionTimeout(false);
      } else {
        if (goHome) {
          if (redirect && redirect.length > 0) {
            await entRouter.replace(redirect);
          } else {
            const globalStore = useGlobalStore();
            await entRouter.replace(userInfo?.homePath || globalStore.baseHomePath);
          }
        }
      }
      return userInfo;
    },
    async getUserInfoAction(): Promise<UserInfo | null> {
      if (!this.getToken) return null;
      const userInfo = await userBridge.getUserInfo();
      const { roles = [] } = userInfo;
      if (isArray(roles)) {
        const roleList = roles.map((item) => item.value) as RoleEnum[];
        this.setRoleList(roleList);
      } else {
        userInfo.roles = [];
        this.setRoleList([]);
      }
      this.setUserInfo(userInfo);
      return userInfo;
    },
    /**
     * @description: logout
     */
    async logout(goLogin = false) {
      if (this.getToken) {
        try {
          await userBridge.doLogout();
        } catch {
          console.error('注销Token失败');
        }
      }
      this.setToken(undefined);
      this.setSessionTimeout(false);
      this.setUserInfo(null);
      if (goLogin) {
        const globalStore = useGlobalStore();
        await entRouter.push(globalStore.baseLoginPath);
      }
    },

    /**
     * @description: Confirm before logging out
     */
    confirmLoginOut() {
      const { createConfirm } = useMessage();
      const { t } = useI18n();
      createConfirm({
        iconType: 'warning',
        title: () => h('span', t('sys.app.logoutTip')),
        content: () => h('span', t('sys.app.logoutMessage')),
        onOk: async () => {
          await this.logout(true);
        },
      });
    },
  },
});

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store);
}

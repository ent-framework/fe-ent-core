import { h } from 'vue';
import { defineStore } from 'pinia';
import { Factory } from '@ent-core/logics/factory';
import { useI18n } from '@ent-core/hooks/web/use-i18n';
import { useMessage } from '@ent-core/hooks/web/use-message';
import { isArray } from '@ent-core/utils/is';
import { useGlobalStore } from '@ent-core/store/modules/global';
import { entRouter } from '@ent-core/router/base';
import type { GetUserInfoModel, LoginParams } from '@ent-core/logics/types/user';
import type { ErrorMessageMode } from '@ent-core/logics/types/axios';
import type { UserInfo } from '@ent-core/store/types';
import type { Nullable } from '@ent-core/types';

export interface UserState {
  userInfo: Nullable<UserInfo>;
  token?: string;
  roleList: string[];
  sessionTimeout?: boolean;
  lastUpdateTime: number;
}

export const useUserStore = defineStore('app-user', {
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
    getUserInfo(): Nullable<UserInfo> {
      return this.userInfo;
    },
    getToken(): string | undefined {
      return this.token;
    },
    getRoleList(): string[] {
      return this.roleList.length > 0 ? this.roleList : [];
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
    },
    setRoleList(roleList: string[]) {
      this.roleList = roleList;
    },
    setUserInfo(info: UserInfo | null) {
      this.userInfo = info;
      this.lastUpdateTime = Date.now();
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
        const data = await Factory.getUserFactory().loginApi(loginParams, mode);
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
      const userInfo = await Factory.getUserFactory().getUserInfo();
      const { roles = [] } = userInfo;
      if (isArray(roles)) {
        const roleList = roles.map((item) => item.value);
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
          await Factory.getUserFactory().doLogout();
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
  persist: true,
});

import { h } from 'vue';
import { defineStore } from 'pinia';
import { Factory } from '@ent-core/logics/factory';
import { useI18n } from '@ent-core/hooks/web/use-i18n';
import { useMessage } from '@ent-core/hooks/web/use-message';
import { isArray } from '@ent-core/utils/is';
import { useGlobalStore } from '@ent-core/store/modules/global';
import { entRouter } from '@ent-core/router/base';
import type { LoginParams, UserInfoModel, LoginResultModel } from '@ent-core/logics/types/user';
import type { ErrorMessageMode } from '@ent-core/logics/types/axios';
import type { Nullable } from '@ent-core/types';
import type { Session } from '@ent-core/logics/types';

export interface UserState {
  session?: Session;
  sessionLoaded?: boolean;
  userInfo: Nullable<UserInfoModel>;
  tokenInfo: Nullable<LoginResultModel>;
  token?: string;
  roleList: string[];
  sessionTimeout?: boolean;
  lastUpdateTime: number;
}

export const useUserStore = defineStore('app-user', {
  state: (): UserState => ({
    session: {},
    sessionLoaded: false,
    // user info
    userInfo: null,
    tokenInfo: null,
    // token
    token: undefined,
    // roleList
    roleList: [],
    // Whether the login expired
    sessionTimeout: true,
    // Last fetch time
    lastUpdateTime: 0,
  }),
  getters: {
    getUserInfo(): Nullable<UserInfoModel> {
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
    getSession(): Session {
      return this.session || {};
    },
    isSessionLoaded(): boolean {
      return this.sessionLoaded || false;
    },
  },
  actions: {
    setToken(info: string | undefined) {
      this.token = info ? info : ''; // for null or undefined value
    },
    setRoleList(roleList: string[]) {
      this.roleList = roleList;
    },
    setUserInfo(info: UserInfoModel | null) {
      this.userInfo = info;
      this.lastUpdateTime = Date.now();
    },
    setSessionTimeout(flag: boolean) {
      this.sessionTimeout = flag;
    },
    setTokenInfo(loginResult: LoginResultModel | null) {
      this.tokenInfo = loginResult;
    },
    setSession(session: Session) {
      this.session = session;
    },
    setSessionLoaded(loaded: boolean) {
      this.sessionLoaded = loaded;
    },
    resetState() {
      this.userInfo = null;
      this.tokenInfo = null;
      this.token = '';
      this.roleList = [];
      this.sessionTimeout = false;
    },
    async receiveSession(rememberMeJwt?: string) {
      try {
        this.setSession(await Factory.getUserFactory().getSession(rememberMeJwt));
        this.setSessionLoaded(true);
        // save token
      } catch (error) {
        return Promise.reject(error);
      }
    },
    /**
     * @description: login
     */
    async login(
      params: LoginParams & {
        mode?: ErrorMessageMode;
      },
    ) {
      try {
        const { mode, ...loginParams } = params;
        loginParams.state = this.getSession.state || '';
        const data = await Factory.getUserFactory().loginApi(loginParams, mode);
        const { token } = data;
        // save token
        this.setToken(token);
        this.setTokenInfo(data);
        this.setSessionTimeout(false);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async afterLoginAction(goHome?: boolean, redirect?: string) {
      if (!this.getToken || !this.userInfo) {
        this.setSessionTimeout(true);
        return;
      }
      if (redirect && redirect.length > 0) {
        if (redirect.indexOf('.html') > 0) {
          window.location.href = redirect;
        } else {
          await entRouter.replace(redirect);
        }
      } else if (goHome) {
        const globalStore = useGlobalStore();
        await entRouter.replace(this.userInfo?.homePath || globalStore.baseHomePath);
      }
    },
    /**
     * 获取当前用户身份信息
     */
    async getUserInfoAction(): Promise<UserInfoModel | null> {
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
      this.setSessionTimeout(true);
      this.setUserInfo(null);
      if (goLogin) {
        const globalStore = useGlobalStore();
        if (globalStore.baseLoginPath.indexOf('.html') > 0) {
          window.location.href = globalStore.baseLoginPath;
        } else {
          await entRouter.push(globalStore.baseLoginPath);
        }
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

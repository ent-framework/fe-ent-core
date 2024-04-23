import { h } from 'vue';
import { defineStore } from 'pinia';
import { Factory } from '../../logics/factory';
import { useI18n } from '../../hooks/web/use-i18n';
import { useMessage } from '../../hooks/web/use-message';
import { isArray } from '../../utils/is';
import { useGlobSetting } from '../../hooks/setting/use-glob-setting';
import { entRouter } from '../../router/base';
import { useSessionStore } from '../../store/modules/session';
import type { LoginParams, UserInfoModel } from '../../logics/types/user';
import type { ErrorMessageMode } from '../../logics/types/axios';
import type { Nullable } from '../../types';

export interface UserState {
  userInfo: Nullable<UserInfoModel>;
  roleList: string[];
  sessionTimeout?: boolean;
  lastUpdateTime: number;
}

export const useUserStore = defineStore('app-user', {
  state: (): UserState => ({
    // user info
    userInfo: null,
    // roleList
    roleList: [],
    // Whether the login expired
    sessionTimeout: false,
    // Last fetch time
    lastUpdateTime: 0
  }),
  getters: {
    getUserInfo(): Nullable<UserInfoModel> {
      return this.userInfo;
    },
    getRoleList(): string[] {
      return this.roleList.length > 0 ? this.roleList : [];
    },
    getSessionTimeout(): boolean {
      return !!this.sessionTimeout;
    },
    getLastUpdateTime(): number {
      return this.lastUpdateTime;
    }
  },
  actions: {
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
    resetState() {
      this.userInfo = null;
      this.roleList = [];
      this.sessionTimeout = false;
    },
    /**
     * @description: login
     */
    async login(
      params: LoginParams & {
        mode?: ErrorMessageMode;
      }
    ) {
      try {
        const session = useSessionStore();
        const { mode, ...loginParams } = params;
        loginParams.state = session.getSession.state || '';
        const data = await Factory.getUserFactory().loginApi(loginParams, mode);
        // save token
        if (data.rememberMe) {
          session.setRememberMeJwt(data.rememberMe);
        }
        if (data.rememberMeExpiresIn) {
          session.setRememberMeExpiresIn(Date.now() + data.rememberMeExpiresIn);
        }
        session.setStoredToken(data);
        this.setSessionTimeout(false);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async afterLoginAction(goHome?: boolean, redirect?: string) {
      const session = useSessionStore();
      if (!session.getToken || !this.userInfo) {
        this.setSessionTimeout(false);
        return;
      }
      if (redirect && redirect.length > 0) {
        if (redirect.indexOf('.html') > 0) {
          window.location.href = redirect;
        } else {
          await entRouter.replace(redirect);
        }
      } else if (goHome) {
        const globSetting = useGlobSetting();
        await entRouter.replace(this.userInfo?.homePath || globSetting.homePath);
      }
    },
    /**
     * 获取当前用户身份信息
     */
    async getUserInfoAction(): Promise<UserInfoModel | null> {
      const session = useSessionStore();
      if (!session.getToken) return null;
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
      const session = useSessionStore();
      if (session.getToken) {
        try {
          await Factory.getUserFactory().doLogout();
        } catch {
          console.error('注销Token失败');
        }
      }
      session.resetState();
      this.setSessionTimeout(false);
      this.setUserInfo(null);
      if (goLogin) {
        const globSetting = useGlobSetting();
        if (globSetting.loginUrl.indexOf('.html') > 0) {
          window.location.href = globSetting.loginUrl;
        } else {
          await entRouter.replace(globSetting.loginUrl);
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
        onPositiveClick: async () => {
          await this.logout(true);
        }
      });
    }
  }
});

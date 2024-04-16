import { defineStore } from 'pinia';
import { Factory } from '../../logics/factory';
import type { Nullable } from '../../types';
import type { LoginResultModel, Session } from '../../logics/types';

export interface SessionState {
  session: Nullable<Session>;
  sessionLoaded?: boolean;
  lastUpdateTime: number;
  rememberMeJwt?: string;
  rememberMeExpiresIn?: number;
  storedToken?: LoginResultModel;
}

export const useSessionStore = defineStore('app-session', {
  state: (): SessionState => ({
    session: {},
    sessionLoaded: false,
    rememberMeJwt: '',
    rememberMeExpiresIn: 0,
    // Last fetch time
    lastUpdateTime: 0,
    storedToken: undefined,
  }),
  getters: {
    getLastUpdateTime(): number {
      return this.lastUpdateTime;
    },
    getSession(): Session {
      return this.session || {};
    },
    isSessionLoaded(): boolean {
      return this.sessionLoaded || false;
    },
    getToken(): string | undefined {
      return this.storedToken?.token;
    },
    getStoredToken(): LoginResultModel | undefined {
      return this.storedToken || undefined;
    },
  },
  actions: {
    setSession(session: Session) {
      this.session = session;
      this.sessionLoaded = true;
      this.lastUpdateTime = Date.now();
    },
    setSessionLoaded(loaded: boolean) {
      this.sessionLoaded = loaded;
    },
    setStoredToken(token: LoginResultModel | undefined) {
      this.storedToken = token;
    },
    setRememberMeJwt(rememberMe: string) {
      this.rememberMeJwt = rememberMe;
    },
    setRememberMeExpiresIn(expiresIn: number) {
      this.rememberMeExpiresIn = expiresIn;
    },
    //登录出清理状态
    resetState() {
      this.lastUpdateTime = 0;
      this.rememberMeJwt = undefined;
      this.rememberMeExpiresIn = undefined;
      this.storedToken = undefined;
    },
    async receiveSession() {
      try {
        const jwt = Date.now() > (this.rememberMeExpiresIn || 0) ? '' : this.rememberMeJwt;
        const session = await Factory.getUserFactory().getSession(jwt);
        const { auth, ...others } = session;
        if (auth) {
          this.setStoredToken(auth);
        }
        this.setSession(others);
        // save token
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
  persist: [
    {
      paths: ['rememberMeJwt', 'rememberMeExpiresIn'],
      storage: localStorage,
    },
    {
      paths: ['session', 'lastUpdateTime', 'storedToken'],
      storage: sessionStorage,
    },
  ],
});

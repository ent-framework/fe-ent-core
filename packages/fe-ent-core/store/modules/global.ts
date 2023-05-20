import { defineStore } from 'pinia';
import { store } from '@ent-core/store/pinia';
export interface GlobalState {
  // basic login path
  baseLoginPath: string;
  // basic home path
  baseHomePath: string;
  // error page path
  errorPagePath: string;
  // error log page path
  errorLogPagePath: string;
}
export const useGlobalStore = defineStore({
  id: 'global',
  state: (): GlobalState => ({
    baseLoginPath: '/login',
    baseHomePath: '/dashboard',
    errorPagePath: '/exception',
    errorLogPagePath: '/error-log/list',
  }),
  getters: {
    getBaseLoginPath(): string {
      return this.baseLoginPath;
    },
    getBaseHomePath(): string {
      return this.baseHomePath;
    },
    getErrorPagePath(): string {
      return this.errorPagePath;
    },
    getErrorLogPagePath(): string {
      return this.errorLogPagePath;
    },
  },
  actions: {
    setBaseLoginPath(baseLogin: string): void {
      this.baseLoginPath = baseLogin;
    },
    setBaseHomePath(baseHome: string): void {
      this.baseHomePath = baseHome;
    },
    setErrorPagePath(errorPage: string): void {
      this.errorPagePath = errorPage;
    },
    setErrorLogPagePath(errorLogPage: string): void {
      this.errorLogPagePath = errorLogPage;
    },
  },
});

export function useGlobalStoreWithOut() {
  return useGlobalStore(store);
}

import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';
import { getCommonStoragePrefix } from '../utils';
import { persistGlobalConfig } from './persist';
import type { App } from 'vue';

export const PERSIST_KEY_PREFIX = getCommonStoragePrefix();

const store = createPinia();
store.use(createPersistedState(persistGlobalConfig(PERSIST_KEY_PREFIX)));
export function setupStore(app: App<Element>) {
  app.use(store);
}

export { store };

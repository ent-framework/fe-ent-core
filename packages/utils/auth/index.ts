import { Persistent, BasicKeys } from '@ent-core/utils/cache/persistent';
import { CacheTypeEnum } from '@ent-core/logics/enums/cache-enum';
import { defaultProjectSetting } from '@ent-core/logics/settings/project-setting';
import { TOKEN_KEY } from '@ent-core/logics/enums/cache-enum';

const { permissionCacheType } = defaultProjectSetting;
const isLocal = permissionCacheType === CacheTypeEnum.LOCAL;

export function getToken() {
  return getAuthCache(TOKEN_KEY);
}

export function getAuthCache<T>(key: BasicKeys) {
  const fn = isLocal ? Persistent.getLocal : Persistent.getSession;
  return fn(key) as T;
}

export function setAuthCache(key: BasicKeys, value) {
  const fn = isLocal ? Persistent.setLocal : Persistent.setSession;
  return fn(key, value, true);
}

export function clearAuthCache(immediate = true) {
  const fn = isLocal ? Persistent.clearLocal : Persistent.clearSession;
  return fn(immediate);
}

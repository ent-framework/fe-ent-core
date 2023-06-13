import { Persistent } from '@ent-core/utils/cache/persistent';
import { CacheTypeEnum, LAYOUT_KEY } from '@ent-core/logics/enums/cache-enum';
import { defaultProjectSetting } from '@ent-core/logics/settings/project-setting';
import type { BasicKeys } from '@ent-core/utils/cache/persistent';

const { permissionCacheType } = defaultProjectSetting;
const isLocal = permissionCacheType === CacheTypeEnum.LOCAL;

export function getToken() {
  return getLayoutCache(LAYOUT_KEY);
}

export function getLayoutCache<T>(key: BasicKeys) {
  const fn = isLocal ? Persistent.getLocal : Persistent.getSession;
  return fn(key) as T;
}

export function setLayoutCache(key: BasicKeys, value) {
  const fn = isLocal ? Persistent.setLocal : Persistent.setSession;
  return fn(key, value, true);
}

export function clearLayoutCache(immediate = true) {
  const fn = isLocal ? Persistent.clearLocal : Persistent.clearSession;
  return fn(immediate);
}

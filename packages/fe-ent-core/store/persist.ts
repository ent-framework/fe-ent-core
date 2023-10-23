/**
 * @link https://prazdevs.github.io/pinia-plugin-persistedstate/zh/guide/
 */

import { cacheCipher, enableStorageEncryption } from '@ent-core/logics/settings/encryption-setting';
import { AesEncryption } from '@ent-core/utils';
import type { StateTree } from 'pinia';
import type { PersistedStateFactoryOptions, Serializer } from 'pinia-plugin-persistedstate';

const encryption = new AesEncryption({ key: cacheCipher.key, iv: cacheCipher.iv });
const serializer: Serializer = {
  /**
   * Serializes state into string before storing
   * @default JSON.stringify
   */
  serialize: (value: StateTree) => {
    const stringData = JSON.stringify(value);
    const stringifyValue = enableStorageEncryption
      ? encryption.encryptByAES(stringData)
      : stringData;
    return stringifyValue;
  },
  /**
   * Deserializes string into state before hydrating
   * @default JSON.parse
   */
  deserialize: (value: string) => {
    const decVal = enableStorageEncryption ? encryption.decryptByAES(value) : value;
    return JSON.parse(decVal);
  },
};

export function persistGlobalConfig(keyPrefix: string): PersistedStateFactoryOptions {
  return {
    storage: localStorage,
    key: (id) => `${keyPrefix}__${id}`,
    serializer,
  };
}

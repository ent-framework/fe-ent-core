import { cacheCipher } from '@ent-core/logics/settings/encryption-setting';
import { AesEncryption } from '@ent-core/utils/cipher';
import { isNullOrUnDef } from '@ent-core/utils/is';
import type { EncryptionParams } from '@ent-core/utils/cipher';
import type { Nullable } from '@ent-core/types';

export interface CreateStorageParams extends EncryptionParams {
  prefixKey: string;
  storage: Storage;
  hasEncrypt: boolean;
  timeout?: Nullable<number>;
}
// @ts-ignore
export const createStorage = ({
  prefixKey = '',
  storage = sessionStorage,
  key = cacheCipher.key,
  iv = cacheCipher.iv,
  timeout = null,
  hasEncrypt = true,
}: Partial<CreateStorageParams> = {}) => {
  if (hasEncrypt && [key.length, iv.length].some((item) => item !== 16)) {
    throw new Error('When hasEncrypt is true, the key or iv must be 16 bits!');
  }

  const encryption = new AesEncryption({ key, iv });

  /**
   *Cache class
   *Construction parameters can be passed into sessionStorage, localStorage,
   * @class Cache
   * @example
   */
  const WebStorage = class WebStorage {
    public storage: Storage;
    public prefixKey?: string;
    public encryption: AesEncryption;
    public hasEncrypt: boolean;
    constructor() {
      this.storage = storage;
      this.prefixKey = prefixKey;
      this.encryption = encryption;
      this.hasEncrypt = hasEncrypt;
    }

    public getKey(key: string) {
      return `${this.prefixKey}${key}`.toUpperCase();
    }

    /**
     *
     *  Set cache
     * @param {string} key
     * @param {*} value
     * @param expire
     * @expire Expiration time in seconds
     * @memberof Cache
     */
    set(key: string, value: any, expire: number | null = timeout) {
      const stringData = JSON.stringify({
        value,
        time: Date.now(),
        expire: !isNullOrUnDef(expire) ? Date.now() + expire * 1000 : null,
      });
      const stringifyValue = this.hasEncrypt
        ? this.encryption.encryptByAES(stringData)
        : stringData;
      this.storage.setItem(this.getKey(key), stringifyValue);
    }

    /**
     *Read cache
     * @param {string} key
     * @param def
     * @memberof Cache
     */
    get(key: string, def: any = null): any {
      const val = this.storage.getItem(this.getKey(key));
      if (!val) return def;

      try {
        const decVal = this.hasEncrypt ? this.encryption.decryptByAES(val) : val;
        const data = JSON.parse(decVal);
        const { value, expire } = data;
        if (isNullOrUnDef(expire) || expire >= Date.now()) {
          return value;
        }
        this.remove(key);
      } catch {
        return def;
      }
    }

    /**
     * Delete cache based on key
     * @param {string} key
     * @memberof Cache
     */
    remove(key: string) {
      this.storage.removeItem(this.getKey(key));
    }

    /**
     * Delete all caches of this instance
     */
    clear(): void {
      this.storage.clear();
    }
  };
  return new WebStorage();
};

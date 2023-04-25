import CryptoES from 'crypto-es';

export interface EncryptionParams {
  key: string;
  iv: string;
}

export class AesEncryption {
  private key;
  private readonly iv;

  constructor(opt: Partial<EncryptionParams> = {}) {
    const { key, iv } = opt;
    if (key) {
      this.key = CryptoES.enc.Utf8.parse(key);
    }
    if (iv) {
      this.iv = CryptoES.enc.Utf8.parse(iv);
    }
  }

  private get _getOptions() {
    return {
      mode: CryptoES.mode.ECB,
      padding: CryptoES.pad.Pkcs7,
      iv: this.iv,
    };
  }

  encryptByAES(cipherText: string) {
    return CryptoES.AES.encrypt(cipherText, this.key, this._getOptions).toString();
  }

  decryptByAES(cipherText: string) {
    return CryptoES.AES.decrypt(cipherText, this.key, this._getOptions).toString(CryptoES.enc.Utf8);
  }
}

export function encryptByBase64(cipherText: string) {
  return CryptoES.enc.Base64.stringify(CryptoES.enc.Utf8.parse(cipherText));
}

export function decodeByBase64(cipherText: string) {
  return CryptoES.enc.Base64.parse(cipherText);
}

export function encryptByMd5(password: string) {
  return CryptoES.MD5(password).toString();
}

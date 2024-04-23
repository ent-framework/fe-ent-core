import CryptoJS from 'crypto-js';

export interface EncryptionParams {
  key: string;
  iv: string;
}

export class AesEncryption {
  private key;
  private iv;

  constructor(opt: Partial<EncryptionParams> = {}) {
    const { key, iv } = opt;
    if (key) {
      this.key = CryptoJS.enc.Utf8.parse(key);
    }
    if (iv) {
      this.iv = CryptoJS.enc.Utf8.parse(iv);
    }
  }

  private get getOptions() {
    return {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
      iv: this.iv
    };
  }

  encryptByAES(cipherText: string) {
    const source = CryptoJS.enc.Utf8.parse(cipherText);
    return CryptoJS.AES.encrypt(source, this.key, this.getOptions).toString();
  }

  decryptByAES(cipherText: string) {
    return CryptoJS.AES.decrypt(cipherText, this.key, this.getOptions).toString(CryptoJS.enc.Utf8);
  }
}

export function encryptByBase64(cipherText: string) {
  return CryptoJS.enc.Utf8.parse(cipherText).toString(CryptoJS.enc.Base64);
}

export function decodeByBase64(cipherText: string) {
  return CryptoJS.enc.Base64.parse(cipherText).toString(CryptoJS.enc.Utf8);
}

export function encryptByMd5(password: string) {
  return CryptoJS.MD5(password).toString();
}

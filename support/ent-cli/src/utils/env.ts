import { join } from 'node:path';

import dotenv from 'dotenv';
import fs from 'fs-extra';

/**
 * 获取当前环境下生效的配置文件名
 */
function getConfFiles() {
  const script = process.env.npm_lifecycle_script as string;
  const reg = new RegExp('--mode ([a-z_\\d]+)');
  const result = reg.exec(script);
  if (result) {
    const mode = result[1];
    return ['.env', `.env.${mode}`];
  }
  return ['.env', '.env.production'];
}

/**
 * Get the environment variables starting with the specified prefix
 * @param match prefix
 * @param confFiles ext
 */
export async function getEnvConfig(match = 'VITE_', confFiles = getConfFiles()) {
  let envConfig = {};

  for (const confFile of confFiles) {
    try {
      const envPath = await fs.readFile(join(process.cwd(), confFile), { encoding: 'utf8' });
      const env = dotenv.parse(envPath);
      envConfig = { ...envConfig, ...env };
    } catch (e) {
      console.error(`Error in parsing ${confFile}`, e);
    }
  }
  const reg = new RegExp(`^(${match})`);
  const buildReg = new RegExp('^VITE_BUILD_');
  Object.keys(envConfig).forEach((key) => {
    if (!reg.test(key) || buildReg.test(key)) {
      Reflect.deleteProperty(envConfig, key);
    }
  });
  return envConfig;
}

export function wrapperEnv(envConf: Record<any, any>, mode: string): ViteEnv {
  const ret: any = {};

  for (const envName of Object.keys(envConf)) {
    let realValue = envConf[envName].replace(/\\n/g, '\n');
    realValue = realValue === 'true' ? true : realValue === 'false' ? false : realValue;

    if (envName === 'VITE_PORT') {
      realValue = Number(realValue);
    }

    ret[envName] = realValue;
    if (typeof realValue === 'string') {
      process.env[envName] = realValue;
    } else if (typeof realValue === 'object') {
      process.env[envName] = JSON.stringify(realValue);
    }
  }
  ret['NODE_ENV'] = mode;
  return ret;
}

export interface ViteEnv {
  VITE_GLOB_APP_TITLE: string;
  VITE_GLOB_APP_SHORT_NAME: string;
  VITE_PUBLIC_PATH: string;
  VITE_BUILD_USE_MOCK: boolean;
  VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none';
  VITE_BUILD_USE_IMAGEMIN: boolean;
  VITE_BUILD_USE_HTTPS: boolean;
  VITE_BUILD_ENABLE_ANALYZE: boolean;
  VITE_BUILD_ENABLE_INSPECT: boolean;
  VITE_BUILD_ENABLE_CERT: boolean;
}

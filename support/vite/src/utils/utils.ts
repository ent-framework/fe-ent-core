import path from 'path';
import { Recordable, ViteEnv } from '../type';
import { searchForWorkspaceRoot } from 'vite';

export function isDevFn(mode: string): boolean {
  return mode === 'development';
}

export function isProdFn(mode: string): boolean {
  return mode === 'production';
}

/**
 * Whether to generate package preview
 */
export function isReportMode(): boolean {
  return process.env.REPORT === 'true';
}

// Read all environment variable configuration files to process.env
export function wrapperEnv(envConf: Recordable, mode: string): ViteEnv {
  const ret: any = {};

  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, '\n');
    realName = realName === 'true' ? true : realName === 'false' ? false : realName;

    if (envName === 'VITE_PORT') {
      realName = Number(realName);
    }
    if (envName === 'VITE_PROXY' && realName) {
      try {
        realName = JSON.parse(realName.replace(/'/g, '"'));
      } catch (error) {
        realName = '';
      }
    }
    ret[envName] = realName;
    if (typeof realName === 'string') {
      process.env[envName] = realName;
    } else if (typeof realName === 'object') {
      process.env[envName] = JSON.stringify(realName);
    }
  }
  ret['NODE_ENV'] = mode;
  return ret;
}

/**
 * Get the environment variables starting with the specified prefix
 * @param match prefix
 * @param env ext
 */
export function getEnvConfig(match = 'VITE_GLOB_', env: Record<string, any>) {
  const envConfig = { ...env };
  const reg = new RegExp(`^(${match})`);
  Object.keys(env).forEach((key) => {
    if (!reg.test(key)) {
      Reflect.deleteProperty(envConfig, key);
    }
  });
  return envConfig;
}

/**
 * 获取当前运行目录下的文件路径
 * @param dir file path
 */
export function getCurrExecPath(...dir: string[]) {
  return path.resolve(process.cwd(), ...dir);
}

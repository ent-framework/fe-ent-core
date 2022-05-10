import type { GlobEnvConfig } from '@ent-core/logics/types/config';

const _ViteEnv = process.env;

interface AppEnv extends GlobEnvConfig, ViteEnv {}

export function getCommonStoragePrefix() {
  const { VITE_GLOB_APP_SHORT_NAME } = getAppEnvConfig();
  return `${VITE_GLOB_APP_SHORT_NAME}__${getEnv()}`.toUpperCase();
}

// Generate cache key according to version
export function getStorageShortName() {
  const appConfig = getAppEnvConfig();
  const { VITE_GLOB_APP_SHORT_NAME, VITE_GLOB_VBEN_VERSION } = appConfig;
  return `${VITE_GLOB_APP_SHORT_NAME}__${getEnv()}${`__${VITE_GLOB_VBEN_VERSION}`}__`.toUpperCase();
}

export function getAppEnvConfig(): AppEnv {
  const getConfigFileName = (env: Record<string, any>) => {
    return `__PRODUCTION__${env.VITE_GLOB_APP_SHORT_NAME || '__APP'}__CONF__`
      .toUpperCase()
      .replace(/\s/g, '');
  };

  const ENV_NAME = getConfigFileName(_ViteEnv);

  const ENV = (process.env.NODE_ENV !== 'production'
    ? // Get the global configuration (the configuration will be extracted independently when packaging)
      (_ViteEnv as unknown as AppEnv)
    : window[ENV_NAME as any]) as unknown as AppEnv;

  const {
    VITE_GLOB_APP_TITLE,
    VITE_GLOB_API_URL,
    VITE_GLOB_APP_SHORT_NAME,
    VITE_GLOB_API_URL_PREFIX,
    VITE_GLOB_API_USER_PREFIX,
    VITE_GLOB_API_REQUEST_TIMEOUT,
    VITE_GLOB_UPLOAD_URL,
    VITE_GLOB_LAYOUT_NAME,
    VITE_GLOB_VBEN_VERSION,
    ...REST
  } = ENV;

  if (!/^[a-zA-Z\_]*$/.test(VITE_GLOB_APP_SHORT_NAME)) {
    console &&
      console.warn(
        `VITE_GLOB_APP_SHORT_NAME Variables can only be characters/underscores, please modify in the environment variables and re-running.`,
      );
  }

  return {
    VITE_GLOB_APP_TITLE,
    VITE_GLOB_API_URL,
    VITE_GLOB_APP_SHORT_NAME,
    VITE_GLOB_API_URL_PREFIX,
    VITE_GLOB_API_USER_PREFIX,
    VITE_GLOB_API_REQUEST_TIMEOUT,
    VITE_GLOB_UPLOAD_URL,
    VITE_GLOB_LAYOUT_NAME,
    VITE_GLOB_VBEN_VERSION,
    ...REST,
  };
}

/**
 * @description: Development mode
 */
export const devMode = 'development';

/**
 * @description: Production mode
 */
export const prodMode = 'production';

/**
 * @description: Get environment variables
 * @returns:
 * @example:
 */
export function getEnv(): string {
  return process.env.NODE_ENV || 'production';
}

/**
 * @description: Is it a development mode
 * @returns:
 * @example:
 */
export function isDevMode(): boolean {
  return process.env.NODE_ENV !== 'production';
}

/**
 * @description: Is it a production mode
 * @returns:
 * @example:
 */
export function isProdMode(): boolean {
  return process.env.NODE_ENV === 'production';
}

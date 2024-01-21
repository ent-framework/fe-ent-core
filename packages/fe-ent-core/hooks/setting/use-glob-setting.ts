import { warn } from '@ent-core/utils/log';
import { getAppEnvConfig } from '@ent-core/utils/env';
import type { GlobConfig } from '@ent-core/logics/types/config';

export const useGlobSetting = (): Readonly<GlobConfig> => {
  const {
    VITE_GLOB_APP_TITLE,
    VITE_GLOB_API_URL,
    VITE_GLOB_APP_SHORT_NAME,
    VITE_GLOB_API_URL_PREFIX,
    VITE_GLOB_API_USER_PREFIX,
    VITE_GLOB_API_REQUEST_TIMEOUT,
    VITE_GLOB_UPLOAD_URL,
    VITE_GLOB_LAYOUT_NAME,
    VITE_GLOB_LOGO_URL,
    VITE_GLOB_LOGIN_URL,
    VITE_GLOB_HOME_PATH,
    VITE_GLOB_ERROR_PATH,
    VITE_GLOB_ERROR_LOG_PATH,
  } = getAppEnvConfig();

  if (!/[a-zA-Z_]*/.test(VITE_GLOB_APP_SHORT_NAME)) {
    warn(
      `VITE_GLOB_APP_SHORT_NAME Variables can only be characters/underscores, please modify in the environment variables and re-running.`,
    );
  }

  // Take global configuration
  const glob: Readonly<GlobConfig> = {
    shortName: VITE_GLOB_APP_SHORT_NAME,
    title: VITE_GLOB_APP_TITLE,
    logoUrl: VITE_GLOB_LOGO_URL,
    apiUrl: VITE_GLOB_API_URL,
    userApiPrefix: VITE_GLOB_API_USER_PREFIX,
    apiGlobalPrefix: VITE_GLOB_API_URL_PREFIX,
    uploadUrl: VITE_GLOB_UPLOAD_URL,
    requestTimeout: VITE_GLOB_API_REQUEST_TIMEOUT,
    layoutName: VITE_GLOB_LAYOUT_NAME || 'DefaultLayout',
    loginUrl: VITE_GLOB_LOGIN_URL || '/login',
    homePath: VITE_GLOB_HOME_PATH || '/dashboard',
    errorPath: VITE_GLOB_ERROR_PATH || '/exception',
    errorLogPath: VITE_GLOB_ERROR_LOG_PATH || '/error-log/list',
  };
  return glob as Readonly<GlobConfig>;
};

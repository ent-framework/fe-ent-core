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
  };
  return glob as Readonly<GlobConfig>;
};

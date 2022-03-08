import { getAppEnvConfig } from './env';

const appEnv = getAppEnvConfig();
const { VITE_GLOB_APP_TITLE: projectName } = appEnv;

export function warn(message: string) {
  console.warn(`[${projectName} warn]:${message}`);
}

export function error(message: string) {
  throw new Error(`[${projectName} error]:${message}`);
}

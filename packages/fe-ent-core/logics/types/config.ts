export interface GlobConfig {
  // Site title
  title: string;
  // Service interface url
  apiUrl: string;
  // Upload url
  uploadUrl?: string;
  logoUrl?: string;
  userApiPrefix?: string;
  //  Service interface url prefix
  apiGlobalPrefix?: string;

  requestTimeout?: number;
  // Project abbreviation
  shortName: string;
  // layout name
  layoutName: string;
}
export interface GlobEnvConfig {
  // Site title
  VITE_GLOB_APP_TITLE: string;
  // Project abbreviation
  VITE_GLOB_APP_SHORT_NAME: string;
  // global log image url
  VITE_GLOB_LOGO_URL: string;
  // Service interface url
  VITE_GLOB_API_URL: string;
  // Service interface url global prefix
  VITE_GLOB_API_URL_PREFIX?: string;
  // Core user api prefix
  VITE_GLOB_API_USER_PREFIX?: string;
  // API request timeout
  VITE_GLOB_API_REQUEST_TIMEOUT?: number;
  // Upload url
  VITE_GLOB_UPLOAD_URL?: string;
  // Layout name
  VITE_GLOB_LAYOUT_NAME?: string;
  // VBen version
  VITE_GLOB_VERSION?: string;
}

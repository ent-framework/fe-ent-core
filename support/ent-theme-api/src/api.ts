export const globalField = '__VITE_THEME__';

export interface Options {
  colorVariables: string[];
  wrapperCssSelector?: string;
  resolveSelector?: (selector: string) => string;
  fileName?: string;
  inline?: boolean;
  injectTo?: InjectTo;
}

export interface GlobalConfig {
  replaceStyleVariables: ({
    colorVariables,
    customCssHandler,
  }: {
    colorVariables: string[];
    customCssHandler?: (css: string) => string;
  }) => void;
  darkCssIsReady: boolean | null;
  loadDarkThemeCss: () => void;
  colorVariables: string[];
  defaultOptions: Options;
  appended?: boolean;
  styleIdMap?: Map<string, string>;
  styleRenderQueueMap?: Map<string, string>;
}

export type InjectTo = 'head' | 'body' | 'body-prepend';

declare global {
  interface Window {
    [globalField]: GlobalConfig;
  }
}
/***
 *
 * @param colorVariables
 * @param customCssHandler
 */
export async function replaceStyleVariables({
  colorVariables,
  customCssHandler,
}: {
  colorVariables: string[];
  customCssHandler?: (css: string) => string;
}) {
  const replaceStyleVariablesFn = getGlobalOptions('replaceStyleVariables');
  if (replaceStyleVariablesFn) {
    await replaceStyleVariablesFn({ colorVariables, customCssHandler });
  }
}

export function darkCssIsReady() {
  const darkCssIsReady = getGlobalOptions('darkCssIsReady');
  return !!darkCssIsReady;
}

export async function loadDarkThemeCss() {
  const loadDarkThemeCssFn = getGlobalOptions('loadDarkThemeCss');
  if (loadDarkThemeCssFn) {
    await loadDarkThemeCssFn();
  }
}

export function getGlobalOptions<T extends keyof GlobalConfig = any>(key: T): GlobalConfig[T] {
  return window[globalField][key];
}

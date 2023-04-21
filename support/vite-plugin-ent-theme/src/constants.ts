import { normalizePath } from 'vite';
import path from 'path';

export const VITE_CLIENT_ENTRY = '/@vite/client';

export const VITE_PLUGIN_THEME_CLIENT_ENTRY = normalizePath(
  path.resolve(process.cwd(), 'node_modules/fe-vite-plugin-ent-theme/es/client'),
);

export const CLIENT_PUBLIC_ABSOLUTE_PATH = normalizePath(
  VITE_PLUGIN_THEME_CLIENT_ENTRY + '/index.mjs',
);

export const CLIENT_PUBLIC_CJS_PATH = `/${VITE_PLUGIN_THEME_CLIENT_ENTRY}/index.js`;
export const CLIENT_PUBLIC_ESM_PATH = `/${VITE_PLUGIN_THEME_CLIENT_ENTRY}/index.mjs`;

export const commentRE = /\\\\?n|\n|\\\\?r|\/\*[\s\S]+?\*\//g;

const cssLangs = `\\.(css|less|sass|scss|styl|stylus|postcss)($|\\?)`;

export const colorRE =
  /#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})|rgba?\((.*),\s*(.*),\s*(.*)(?:,\s*(.*(?:.*)?))?\)/gi;

export const cssVariableString = `const css = "`;

export const cssBlockRE = /[^}]*\{[^{]*\}/g;

export const cssLangRE = new RegExp(cssLangs);
export const ruleRE = /(\w+-)*\w+:/;
export const cssValueRE = /(\s?[a-z0-9]+\s)*/;
export const safeEmptyRE = /\s?/;
export const importSafeRE = /(\s*!important)?/;

export const linkID = '__VITE_PLUGIN_THEME-ANTD_DARK_THEME_LINK__';

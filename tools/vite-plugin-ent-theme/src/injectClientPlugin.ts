import { ResolvedConfig, normalizePath, Plugin } from 'vite';
import { ViteThemeOptions } from '.';
import {
  CLIENT_PUBLIC_ABSOLUTE_PATH,
  VITE_PLUGIN_THEME_CLIENT_ENTRY,
  CLIENT_PUBLIC_CJS_PATH,
  CLIENT_PUBLIC_ESM_PATH,
} from './constants';
import { debug as Debug } from 'debug';
import { readFileSync } from 'fs-extra';

const debug = Debug('vite:inject-vite-plugin-ent-theme-client');

type PluginType = 'colorPlugin' | 'antdDarkPlugin';

export function injectClientPlugin(
  type: PluginType,
  {
    colorPluginOptions,
    colorPluginCssOutputName,
    antdDarkCssOutputName,
    antdDarkExtractCss,
    antdDarkLoadLink,
  }: {
    colorPluginOptions?: ViteThemeOptions;
    antdDarkCssOutputName?: string;
    colorPluginCssOutputName?: string;
    antdDarkExtractCss?: boolean;
    antdDarkLoadLink?: boolean;
  }
): Plugin {
  let config: ResolvedConfig;
  let isServer: boolean;
  let needSourcemap = false;
  const needProcessId = (id: string) => {
    const nid = normalizePath(id);
    const path = normalizePath('vite-plugin-ent-theme/es/client');
    return (
      nid === CLIENT_PUBLIC_ABSOLUTE_PATH ||
      nid.indexOf(path) >= 0 ||
      nid.endsWith(path) ||
      // support .vite cache
      nid.includes(path.replace(/\//gi, '_'))
    );
  };
  return {
    name: `vite:inject-vite-plugin-ent-theme-client-${type}`,
    enforce: 'pre',
    configResolved(resolvedConfig) {
      config = resolvedConfig;
      isServer = resolvedConfig.command === 'serve';
      needSourcemap = !!resolvedConfig.build.sourcemap;
    },

    transformIndexHtml: {
      enforce: 'pre',
      async transform(html) {
        const clientPublicPath = VITE_PLUGIN_THEME_CLIENT_ENTRY;
        if (html.includes(clientPublicPath)) {
          return html;
        }
        return {
          html,
          tags: [
            {
              tag: 'script',
              attrs: {
                type: 'module',
                src: clientPublicPath,
              },
              injectTo: 'head-prepend',
            },
          ],
        };
      },
    },

    resolveId(id, importer, resolveOpts) {
      if (id === 'vite-plugin-ent-theme/es/client') {
        // this is passed by @rollup/plugin-commonjs
        const isRequire: boolean = resolveOpts?.custom?.['node-resolve']?.isRequire ?? false;
        if (isRequire) {
          return CLIENT_PUBLIC_CJS_PATH;
        } else {
          return CLIENT_PUBLIC_ESM_PATH;
        }
      }
      return null;
    },

    async transform(code, id) {
      const getMap = () => (needSourcemap ? this.getCombinedSourcemap() : null);
      if (needProcessId(id)) {
        debug('transform client file:', id, code);
        return {
          code: code,
          map: getMap(),
        };
      }
    },

    async load(id) {
      const nid = normalizePath(id);
      if (needProcessId(id)) {
        debug('load client file:', id);
        let code = readFileSync(nid).toString();
        const {
          build: { assetsDir },
        } = config;

        const getOutputFile = (name?: string) => {
          return JSON.stringify(`${config.base}${assetsDir}/${name}`);
        };

        if (code == null) return null;

        if (type === 'colorPlugin') {
          code = code
            .replace('__COLOR_PLUGIN_OUTPUT_FILE_NAME__', getOutputFile(colorPluginCssOutputName))
            .replace('__COLOR_PLUGIN_OPTIONS__', JSON.stringify(colorPluginOptions));
        }

        if (type === 'antdDarkPlugin') {
          code = code.replace(
            '__ANTD_DARK_PLUGIN_OUTPUT_FILE_NAME__',
            getOutputFile(antdDarkCssOutputName)
          );
          if (typeof antdDarkExtractCss === 'boolean') {
            code = code.replace(
              '__ANTD_DARK_PLUGIN_EXTRACT_CSS__',
              JSON.stringify(antdDarkExtractCss)
            );
          }
          if (typeof antdDarkLoadLink === 'boolean') {
            code = code.replace(
              '__ANTD_DARK_PLUGIN_LOAD_LINK__',
              JSON.stringify(antdDarkExtractCss)
            );
          }
        }
        code = code.replace('__PROD__', JSON.stringify(!isServer));
        debug(`load client file: ${id}, ${type} \n ${nid}`, code);
        return code;
      }
      return null;
    },
  };
}

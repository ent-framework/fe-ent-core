import path from 'path';
import { ResolvedConfig, normalizePath, Plugin } from 'vite';
import { ViteThemeOptions } from '.';
import { CLIENT_PUBLIC_ABSOLUTE_PATH, VITE_PLUGIN_THEME_CLIENT_ENTRY } from './constants';
import { debug as Debug } from 'debug';

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
                src: path.posix.join(clientPublicPath),
              },
              injectTo: 'head-prepend',
            },
          ],
        };
      },
    },
    async transform(code, id) {
      let nid = normalizePath(id);
      const path = normalizePath('vite-plugin-ent-theme/es/client.js');
      const getMap = () => (needSourcemap ? this.getCombinedSourcemap() : null);
      // 防止vite 对JS 文件做hash
      if (nid.indexOf('?v=') > 0) {
        nid = nid.substring(0, nid.indexOf('?v='));
      }
      if (
        nid === CLIENT_PUBLIC_ABSOLUTE_PATH ||
        nid.endsWith(path) ||
        // support .vite cache
        nid.includes(path.replace(/\//gi, '_'))
      ) {
        const {
          build: { assetsDir },
        } = config;

        const getOutputFile = (name?: string) => {
          return JSON.stringify(`${config.base}${assetsDir}/${name}`);
        };

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
        debug(`transform client file: ${id}, ${type} \n ${nid}`, code);
        return {
          code: code.replace('__PROD__', JSON.stringify(!isServer)),
          map: getMap(),
        };
      }
    },
  };
}

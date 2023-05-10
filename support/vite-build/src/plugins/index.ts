import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import DefineOptions from 'unplugin-vue-define-options/vite';
import { type PluginOption } from 'vite';
import purgeIcons from 'vite-plugin-purge-icons';
import { createAppConfigPlugin } from './appConfig';
import { configCompressPlugin } from './compress';
import { configHtmlPlugin } from './html';
import { configMockPlugin } from './mock';
import { configSvgIconsPlugin } from './svgSprite';
import { configVisualizerConfig } from './visualizer';
import { presetTypography, presetUno } from 'unocss';
import UnoCSS from 'unocss/vite';
import type { Theme } from 'unocss/preset-uno';
import Inspect from 'vite-plugin-inspect';
import mkcert from 'vite-plugin-mkcert';

interface Options {
  isBuild: boolean;
  mode: 'build' | 'lib' | 'dev';
  root: string;
  compress: string;
  enableMock?: boolean;
  enableAnalyze?: boolean;
  enableInspect?: boolean;
  enableCert?: boolean;
}

async function createPlugins({
  isBuild,
  mode,
  root,
  enableMock,
  compress,
  enableAnalyze,
  enableInspect,
  enableCert,
}: Options) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [vue(), vueJsx(), DefineOptions()];

  const appConfigPlugin = await createAppConfigPlugin({ root, isBuild });
  if (mode !== 'lib') {
    vitePlugins.push(appConfigPlugin);
  }

  if (mode !== 'lib') {
    // vite-plugin-html
    vitePlugins.push(configHtmlPlugin({ isBuild }));
  }

  // vite-plugin-svg-icons
  vitePlugins.push(configSvgIconsPlugin({ isBuild }));

  // vite-plugin-purge-icons
  vitePlugins.push(purgeIcons());

  const theme = {
    breakpoints: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      '2xl': '1600px',
    },
  };

  if (mode === 'lib') {
    vitePlugins.push(
      UnoCSS<Theme>({
        mode: 'dist-chunk',
        presets: [presetUno({ preflight: false }), presetTypography()],
        postcss: true,
        theme,
      }),
    );
  } else {
    vitePlugins.push(
      UnoCSS<Theme>({
        presets: [presetUno(), presetTypography()],
        theme,
      }),
    );
  }

  // The following plugins only work in the production environment
  if (isBuild) {
    // rollup-plugin-gzip
    vitePlugins.push(
      configCompressPlugin({
        compress,
      }),
    );
  }

  if (!isBuild && enableInspect) {
    vitePlugins.push(Inspect());
  }

  if (!isBuild && enableCert) {
    vitePlugins.push(mkcert());
  }

  // rollup-plugin-visualizer
  if (mode !== 'lib' && enableAnalyze) {
    vitePlugins.push(configVisualizerConfig());
  }

  // vite-plugin-mock
  if (mode !== 'lib' && enableMock) {
    vitePlugins.push(configMockPlugin({ isBuild }));
  }

  return vitePlugins;
}

export { createPlugins };

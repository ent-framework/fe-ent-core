import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { type PluginOption } from 'vite';
import Inspect from 'vite-plugin-inspect';
import mkcert from 'vite-plugin-mkcert';
import consola from 'consola';
import { createAppConfigPlugin } from './vite-plugin-app-config/index.js';
import { configCompressPlugin } from './compress.js';
import { configHtmlPlugin } from './html.js';
import { configMockPlugin } from './mock.js';
import { configVisualizerConfig } from './visualizer.js';
import { configUnoCSSPlugin } from './unocss.js';

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
  enableCert
}: Options) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [vue(), vueJsx()];

  const appConfigPlugin = await createAppConfigPlugin({ root, isBuild });
  if (mode !== 'lib') {
    vitePlugins.push(appConfigPlugin);
  }

  if (mode !== 'lib') {
    // vite-plugin-html
    vitePlugins.push(configHtmlPlugin({ isBuild }));
  }

  vitePlugins.push(configUnoCSSPlugin(mode === 'lib'));

  // The following plugins only work in the production environment
  if (isBuild) {
    // rollup-plugin-gzip
    vitePlugins.push(
      configCompressPlugin({
        compress
      })
    );
  }

  if (!isBuild && enableInspect) {
    consola.log('enable inspect');
    vitePlugins.push(Inspect());
  }

  if (!isBuild && enableCert) {
    consola.log('enable cert');
    vitePlugins.push(mkcert());
  }

  // rollup-plugin-visualizer
  if (mode !== 'lib' && enableAnalyze) {
    consola.log('enable analyze');
    vitePlugins.push(configVisualizerConfig());
  }

  // vite-plugin-mock
  if (mode !== 'lib' && enableMock) {
    consola.log('enable mock');
    vitePlugins.push(configMockPlugin({ isBuild }));
  }

  return vitePlugins;
}

export { createPlugins };

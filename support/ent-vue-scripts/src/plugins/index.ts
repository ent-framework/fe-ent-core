import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { type PluginOption } from 'vite';
import purgeIcons from 'vite-plugin-purge-icons';
import Inspect from 'vite-plugin-inspect';
import mkcert from 'vite-plugin-mkcert';
import { createAppConfigPlugin } from './vite-plugin-app-config';
import { configCompressPlugin } from './compress';
import { configHtmlPlugin } from './html';
import { configMockPlugin } from './mock';
import { configSvgIconsPlugin } from './svgSprite';
import { configVisualizerConfig } from './visualizer';
import { configUnoCSSPlugin } from './unocss';

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
  const vitePlugins: (PluginOption | PluginOption[])[] = [vue(), vueJsx()];

  const appConfigPlugin = await createAppConfigPlugin({ root, isBuild });
  if (mode !== 'lib') {
    vitePlugins.push(appConfigPlugin);
  }

  if (mode !== 'lib') {
    // vite-plugin-html
    vitePlugins.push(configHtmlPlugin({ isBuild }));
  }

  // vite-plugin-svg-icons
  vitePlugins.push(
    configSvgIconsPlugin({ isBuild }),
    purgeIcons(),
    configUnoCSSPlugin(mode === 'lib'),
  );

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

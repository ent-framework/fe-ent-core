import type { Plugin } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';
import purgeIcons from 'vite-plugin-purge-icons';
import windiCSS from 'vite-plugin-windicss';
import vueSetupExtend from 'vite-plugin-vue-setup-extend';
import { configHtmlPlugin } from './html';
import { configPwaConfig } from './pwa';
import { configMockPlugin } from './mock';
import { configCompressPlugin } from './compress';
import { configStyleImportPlugin } from './styleImport';
import { configVisualizerConfig } from './visualizer';
import { configThemePlugin } from './theme';
import { configImageminPlugin } from './imagemin';
import { configSvgIconsPlugin } from './svgSprite';
import { configHmrPlugin } from './hmr';
import { getCurrExecPath, OUTPUT_DIR, findWorkspaceRoot } from '../../utils';
import type { BuildOptions } from 'vite';
// import dts from './dts';

export function createVitePlugins(viteEnv: ViteEnv, runMode: string) {
  const {
    VITE_USE_IMAGEMIN,
    VITE_USE_MOCK,
    VITE_LEGACY,
    VITE_BUILD_COMPRESS,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
  } = viteEnv;

  const defaultPlugins: Plugin[] = [
    // have to
    vue(),
    // have to
    vueJsx(),
    // support name
    vueSetupExtend(),
  ];

  const vitePlugins: (Plugin | Plugin[])[] = [];

/*  if (runMode == 'lib') {
    vitePlugins.push(dts());
  }*/

  vitePlugins.push(defaultPlugins);

  // vite-plugin-windicss
  vitePlugins.push(windiCSS());

  const isBuild = runMode == 'package' || runMode == 'lib';
  // TODO
  !isBuild && vitePlugins.push(configHmrPlugin());

  // @vitejs/plugin-legacy
  VITE_LEGACY && isBuild && vitePlugins.push(legacy());

  // vite-plugin-html
  runMode != 'lib' && vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));

  // vite-plugin-svg-icons
  vitePlugins.push(configSvgIconsPlugin(isBuild));

  // vite-plugin-mock
  VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild));

  // vite-plugin-purge-icons
  vitePlugins.push(purgeIcons());

  // vite-plugin-style-import
  vitePlugins.push(configStyleImportPlugin(isBuild));

  // rollup-plugin-visualizer
  vitePlugins.push(configVisualizerConfig());

  //vite-plugin-theme
  vitePlugins.push(configThemePlugin(runMode));

  // The following plugins only work in the production environment
  if (isBuild) {
    //vite-plugin-imagemin
    VITE_USE_IMAGEMIN && vitePlugins.push(configImageminPlugin());

    // rollup-plugin-gzip
    vitePlugins.push(
      configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE),
    );
  }

  // vite-plugin-pwa
  vitePlugins.push(configPwaConfig(viteEnv));

  return vitePlugins;
}

export function createBuildTarget(viteEnv: ViteEnv, runMode: string): BuildOptions {
  const { VITE_DROP_CONSOLE } = viteEnv;
  //库模式
  if (runMode == 'serve' || runMode == 'package') {
    return {
      target: 'es2015',
      outDir: OUTPUT_DIR,
      terserOptions: {
        compress: {
          keep_infinity: true,
          // Used to delete console in production environment
          drop_console: VITE_DROP_CONSOLE,
        },
      },
      // Turning off brotliSize display can slightly reduce packaging time
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
    } as BuildOptions;
  } else {
    const workspaceRoot = findWorkspaceRoot();
    const outDir = `${workspaceRoot}/dist/fe-ent-core`;
    //检查库模式下输出目录styles是否存在，否则vite-plugin-theme会报错
    //vite-plugin-theme 默认输出到dist目录的assets目录，库模式更改为dist目录
    const buildLibTarget: BuildOptions = {
      //target: 'es2015',
      outDir,
      sourcemap: false,
      emptyOutDir: true,
      assetsDir: '',
      lib: {
        entry: getCurrExecPath('index.ts'),
        name: 'MyEnt',
        fileName: (format) => `my-ent.${format}.js`,
      },
      rollupOptions: {
        // 确保外部化处理那些你不想打包进库的依赖
        //external: ['vue', 'vue-router', 'vue-i18n', 'ant-design-vue'],
        external: ['vue'],
        input: getCurrExecPath('index.ts'),
        output: {
          inlineDynamicImports: true,
          // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
          globals: {
            vue: 'Vue',
          },
        },
      },
    };
    return buildLibTarget;
  }
}

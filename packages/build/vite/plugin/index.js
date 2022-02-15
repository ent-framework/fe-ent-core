const dts = require('vite-plugin-dts');
const { OUTPUT_DIR } = require('../../constant');
const { getRootPath } = require('../../utils');

const vue = require('@vitejs/plugin-vue');
const vueJsx = require('@vitejs/plugin-vue-jsx');
const legacy = require('@vitejs/plugin-legacy');
const purgeIcons = require('vite-plugin-purge-icons').default;
const windiCSS = require('vite-plugin-windicss').default;
const vueSetupExtend = require('vite-plugin-vue-setup-extend').default;
const configHtmlPlugin = require('./html');
const configPwaConfig = require('./pwa');
const configMockPlugin = require('./mock');
const configCompressPlugin = require('./compress');
const configStyleImportPlugin = require('./styleImport');
const configVisualizerConfig = require('./visualizer');
const configThemePlugin = require('./theme');
const configImageminPlugin = require('./imagemin');
const configSvgIconsPlugin = require('./svgSprite');
const configHmrPlugin = require('./hmr');
const postBuild = require('../../script/postBuild');
const { projRoot } = require('../../paths');
const createVitePlugins = function (viteEnv, isBuild, isBuildLib) {
  console.log(`isBuild: ${isBuild}, isBuildLib: ${isBuildLib}`);
  console.log(`viteEnv: ${JSON.stringify(viteEnv)}`);

  const {
    VITE_USE_IMAGEMIN,
    VITE_USE_MOCK,
    VITE_LEGACY,
    VITE_BUILD_COMPRESS,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
  } = viteEnv;

  const vitePlugins = [
    // have to
    vue(),
    // have to
    vueJsx(),
    // support name
    vueSetupExtend(),
  ];

  // vite-plugin-windicss
  vitePlugins.push(windiCSS());

  // TODO
  !isBuild && vitePlugins.push(configHmrPlugin());

  // @vitejs/plugin-legacy
  VITE_LEGACY && isBuild && vitePlugins.push(legacy());

  // vite-plugin-html
  !isBuildLib && vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));

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
  !isBuildLib && vitePlugins.push(configThemePlugin(isBuild));

  // The following plugins only work in the production environment
  if (isBuild) {
    //vite-plugin-imagemin
    VITE_USE_IMAGEMIN && vitePlugins.push(configImageminPlugin());

    // rollup-plugin-gzip
    vitePlugins.push(
      configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE),
    );

    // vite-plugin-pwa
    vitePlugins.push(configPwaConfig(viteEnv));

    if (!isBuildLib) {
      vitePlugins.push(postBuild(viteEnv));
    }
  }

  if (isBuildLib) {
    // dts plugin
    vitePlugins.push(dts());
  }

  return vitePlugins;
};

const createBuildTarget = function (viteEnv, isBuild, isBuildLib) {
  const { VITE_DROP_CONSOLE } = viteEnv;
  if (isBuildLib) {
    return {
      //target: 'es2015',
      outDir: projRoot + '/dist/fe-ent-core',
      sourcemap: false,
      emptyOutDir: true,
      formats: ['es'],
      lib: {
        entry: getRootPath('index.ts'),
        name: 'MyEnt',
        fileName: (format) => `my-ent.${format}.js`,
      },
      rollupOptions: {
        // 确保外部化处理那些你不想打包进库的依赖
        external: ['vue', 'vue-router', 'vue-i18n', 'ant-design-vue'],
        output: {
          format: ['es'],
          inlineDynamicImports: true,
          // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
          globals: {
            vue: 'Vue',
          },
        },
      },
    };
  } else if (isBuild) {
    //开发模式或者Web发布模式
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
    };
  }
};
module.exports = { createVitePlugins, createBuildTarget };

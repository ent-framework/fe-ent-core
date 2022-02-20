import { rollup } from 'rollup';
import vue from '@vitejs/plugin-vue';
import moment from 'moment';
import PostCSS from 'rollup-plugin-postcss';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import esbuild from 'rollup-plugin-esbuild';
import filesize from 'rollup-plugin-filesize';
import glob from 'fast-glob';
import { epRoot, pkgRoot } from './utils';
import { ElementPlusAlias } from './plugins/element-plus-alias';
import { generateExternal, writeBundles } from './utils/rollup';
import { excludeFiles } from './utils';
import { reporter } from './plugins/size-reporter';
import { buildConfigEntries, target } from './build-info';
import type { OutputOptions } from 'rollup';
import { generateModifyVars } from './theme/generateModifyVars';
import url from '@rollup/plugin-url';
// 使rollup可以使用postCss处理样式文件less、css等
// PostCSS plugins
// 处理css定义的变量
import simplevars from 'postcss-simple-vars';
// 处理less嵌套样式写法
// 替代cssnext
import postcssPresetEnv from 'postcss-preset-env';
import json from '@rollup/plugin-json';
import nested from 'postcss-nested';
import cssImport from 'postcss-import';
import path from 'path';
import postcssUrl from 'postcss-url';
import postcssImport from 'postcss-import';
import autoprefixer from 'autoprefixer';
import pkg from '../packages/fe-ent-core/package.json';
import PurgeIcons from 'rollup-plugin-purge-icons';

const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: moment().format('YYYY-MM-DD HH:mm:ss'),
};
const postcssPluginList = [
  postcssImport({
    resolve(id, basedir) {
      // resolve alias @css, @import '@css/style.css'
      // because @css/ has 5 chars
      if (id.startsWith('@css')) {
        return path.resolve('./src/assets/styles/css', id.slice(5));
      }

      // resolve node_modules, @import '~normalize.css/normalize.css'
      // similar to how css-loader's handling of node_modules
      if (id.startsWith('~')) {
        return path.resolve('./node_modules', id.slice(1));
      }

      // resolve relative path, @import './components/style.css'
      return path.resolve(basedir, id);
    },
  }),
  simplevars({
    variables: generateModifyVars(true),
  }),
  nested,
  cssImport(),
  postcssUrl({ url: 'inline' }),
  autoprefixer({
    overrideBrowserslist: '> 1%, IE 6, Explorer >= 10, Safari >= 7',
  }),
];

const postVueConfig = [
  // Process all `<style>` blocks except `<style module>`.
  PostCSS({
    use: {
      sass: null,
      stylus: null,
      less: {
        modifyVars: generateModifyVars(true),
        javascriptEnabled: true,
      },
    },
    plugins: [...postcssPluginList],
    // 处理.css和.less文件
    extensions: ['.css', 'less'],
  }),
  url({
    include: ['**/*.svg', '**/*.png', '**/*.gif', '**/*.jpg', '**/*.jpeg'],
  }),
];

const baseConfig = {
  plugins: {
    replace: {
      'process.env.NODE_ENV': JSON.stringify('production'),
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
    vue: {
      target: 'browser',
      preprocessStyles: true,
      postcssPlugins: [...postcssPluginList],
    },
    postVue: [...postVueConfig],
  },
};

export const buildModules = async () => {
  const input = excludeFiles(
    await glob('**/*.{js,ts,tsx,vue}', {
      cwd: pkgRoot,
      absolute: true,
      onlyFiles: true,
    }),
  );
  const bundle = await rollup({
    input,
    plugins: [
      ElementPlusAlias(),
      PurgeIcons({}),
      ...baseConfig.plugins.postVue,
      json(),
      vue({
        ...baseConfig.plugins.vue,
        isProduction: false,
      }),
      nodeResolve({
        extensions: ['.mjs', '.js', '.json', '.ts'],
      }),
      commonjs(),
      esbuild({
        sourceMap: true,
        target,
        loaders: {
          '.vue': 'ts',
        },
      }),
      filesize({ reporter }),
    ],
    external: await generateExternal({ full: false }),
    treeshake: false,
  });
  await writeBundles(
    bundle,
    buildConfigEntries.map(([module, config]): OutputOptions => {
      return {
        format: config.format,
        dir: config.output.path,
        exports: module === 'cjs' ? 'named' : undefined,
        preserveModules: true,
        preserveModulesRoot: epRoot,
        sourcemap: true,
        entryFileNames: `[name].${config.ext}`,
      };
    }),
  );
};

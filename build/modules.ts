import { rollup } from 'rollup';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueSetupExtend from 'vite-plugin-vue-setup-extend';
import moment from 'moment';
import PostCSS from 'rollup-plugin-postcss';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import esbuild from 'rollup-plugin-esbuild';
import filesize from 'rollup-plugin-filesize';
import glob from 'fast-glob';
import { epRoot, pkgRoot, projRoot } from './utils';
import { ElementPlusAlias } from './plugins/element-plus-alias';
import { rollupPluginInjectProcessViteEnv } from './plugins/vite-env';
import { generateExternal, writeBundles } from './utils/rollup';
import { excludeFiles } from './utils';
import { reporter } from './plugins/size-reporter';
import { buildConfigEntries, target } from './build-info';
import type { OutputOptions } from 'rollup';
import { generateModifyVars } from './theme/generateModifyVars';
import autoprefixer from 'autoprefixer';
import pkg from '../packages/fe-ent-core/package.json';
import PurgeIcons from 'rollup-plugin-purge-icons';
import image from '@rollup/plugin-image';
import path from 'path';

const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: moment().format('YYYY-MM-DD HH:mm:ss'),
};

const lessModifyVars = generateModifyVars(false);

const postcssPluginList = [
  autoprefixer({
    overrideBrowserslist: '> 1%, IE 6, Explorer >= 10, Safari >= 7',
  }),
];
const TSCONFIG_PATH = path.resolve(projRoot, 'tsconfig.json');

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
      image(),
      rollupPluginInjectProcessViteEnv({
        baseDir: `${pkgRoot}`,
        exclude: ['**/*.css', '**/*.less', '**/*.svg', '**/*.jpg', '**/*.jpeg', '**/*.png'],
        verbose: false,
      }),
      nodeResolve({
        extensions: ['.mjs', '.js', '.ts', '.tsx'],
      }),
      vue({
        isProduction: false,
        reactivityTransform: true,
      }),
      vueJsx(),
      vueSetupExtend(),
      commonjs(),
      esbuild({
        sourceMap: true,
        target,
        loaders: {
          '.vue': 'ts',
          '.tsx': 'tsx',
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

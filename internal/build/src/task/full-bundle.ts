import path from 'path';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { rollup } from 'rollup';
import commonjs from '@rollup/plugin-commonjs';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import esbuild from 'rollup-plugin-esbuild';
import filesize from 'rollup-plugin-filesize';
import { parallel } from 'gulp';
import glob from 'fast-glob';
import { camelCase, upperFirst } from 'lodash-es';
import { version } from '../../../../packages/core/version';
import { reporter } from '../plugins/size-reporter';
import { EntCoreAlias } from '../plugins/ent-core-alias';
import { epRoot, epOutput, localeRoot, pkgRoot } from '@ent-core/build-utils';
import { formatBundleFilename, generateExternal, writeBundles } from '../utils';
import { withTaskName } from '../utils';
import { EP_BRAND_NAME } from '@ent-core/build-constants';
import { target } from '../build-info';
import type { Plugin } from 'rollup';
import json from '@rollup/plugin-json';
import image from '@rollup/plugin-image';
import PurgeIcons from 'rollup-plugin-purge-icons';
import { rollupPluginInjectProcessViteEnv } from '../plugins/vite-env';

const banner = `/*! ${EP_BRAND_NAME} v${version} */\n`;

async function buildFullEntry(minify: boolean) {
  const bundle = await rollup({
    input: path.resolve(epRoot, 'index.ts'),
    plugins: [
      EntCoreAlias(),
      PurgeIcons({}),
      json(),
      image({ dom: false }),
      vue({
        isProduction: true,
        reactivityTransform: true,
      }) as Plugin,
      vueJsx(),
      rollupPluginInjectProcessViteEnv({
        baseDir: `${pkgRoot}`,
        exclude: ['**/*.css', '**/*.less', '**/*.svg', '**/*.jpg', '**/*.jpeg', '**/*.png'],
        verbose: false,
      }),
      nodeResolve({
        extensions: ['.mjs', '.js', '.ts', '.tsx'],
      }),
      commonjs(),
      esbuild({
        minify,
        sourceMap: minify,
        target,
        loaders: {
          '.vue': 'ts',
        },
        optimizeDeps: {
          // @iconify/iconify: The dependency is dynamically and virtually loaded by @purge-icons/generated, so it needs to be specified explicitly
          include: [
            //'@iconify/iconify',
            'ant-design-vue/es/locale/zh_CN',
            'ant-design-vue/es/locale/en_US',
          ],
          exclude: ['vue-demi'],
        },
        treeShaking: true,
        legalComments: 'eof',
      }),
      filesize(),
    ],
    external: await generateExternal({ full: true }),
  });
  await writeBundles(bundle, [
    {
      format: 'umd',
      file: path.resolve(epOutput, 'dist', formatBundleFilename('index.full', minify, 'js')),
      exports: 'named',
      name: 'EntCore',
      globals: {
        vue: 'Vue',
      },
      sourcemap: minify,
      inlineDynamicImports: true,
      banner,
    },
    {
      format: 'esm',
      file: path.resolve(epOutput, 'dist', formatBundleFilename('index.full', minify, 'mjs')),
      sourcemap: minify,
      banner,
      inlineDynamicImports: true,
    },
  ]);
}

async function buildFullLocale(minify: boolean) {
  const files = await glob(`${path.resolve(localeRoot, 'lang')}/*.ts`, {
    absolute: true,
  });
  return Promise.all(
    files.map(async (file) => {
      const filename = path.basename(file, '.ts');
      const name = upperFirst(camelCase(filename));

      const bundle = await rollup({
        input: file,
        plugins: [
          esbuild({
            minify,
            sourceMap: minify,
            target,
          }),
          filesize({ reporter }),
        ],
      });
      await writeBundles(bundle, [
        {
          format: 'umd',
          file: path.resolve(epOutput, 'dist/locale', formatBundleFilename(filename, minify, 'js')),
          exports: 'default',
          name: `EntCoreLocale${name}`,
          sourcemap: minify,
          banner,
        },
        {
          format: 'esm',
          file: path.resolve(
            epOutput,
            'dist/locale',
            formatBundleFilename(filename, minify, 'mjs'),
          ),
          sourcemap: minify,
          banner,
        },
      ]);
    }),
  );
}

export const buildFull = (minify: boolean) => async () =>
  Promise.all([buildFullEntry(minify), buildFullLocale(minify)]);

export const buildFullBundle = parallel(
  withTaskName('buildFullMinified', buildFull(true)),
  withTaskName('buildFull', buildFull(false)),
);

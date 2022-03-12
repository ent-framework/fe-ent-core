import path from 'path';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import type { Plugin } from 'rollup';
import { rollup } from 'rollup';
import commonjs from '@rollup/plugin-commonjs';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueSetupExtend from 'vite-plugin-vue-setup-extend';
import esbuild from 'rollup-plugin-esbuild';
import filesize from 'rollup-plugin-filesize';
import { parallel } from 'gulp';
import glob from 'fast-glob';
import { version } from '../packages/fe-ent-core/version';
import { EntExtAlias } from './plugins/ent-ext-alias';
import { buildOutput, EP_BRAND_NAME, excludeFiles, extRoot, pkgRoot } from './utils';
import { formatBundleFilename, generateExtensionExternal, writeBundles } from './utils/rollup';
import { withTaskName } from './utils/gulp';
import { target } from './build-info';
import json from '@rollup/plugin-json';
import image from '@rollup/plugin-image';
import PurgeIcons from 'rollup-plugin-purge-icons';
import { rollupPluginInjectProcessViteEnv } from './plugins/vite-env';

const banner = `/*! ${EP_BRAND_NAME} v${version} */\n`;

async function buildExtensions(minify: boolean) {
  const buildExt = async (ext: string) => {
    const bundle = await rollup({
      input: path.resolve(extRoot, ext, 'index.ts'),
      plugins: [
        EntExtAlias(),
        PurgeIcons({}),
        json(),
        image(),
        vue({
          isProduction: true,
        }) as Plugin,
        vueJsx(),
        vueSetupExtend(),
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
        }),
        filesize(),
      ],
      external: await generateExtensionExternal({
        extRoot: path.resolve(extRoot, ext),
        full: true,
      }),
    });

    await writeBundles(bundle, [
      {
        format: 'umd',
        file: path.resolve(
          buildOutput,
          ext,
          'dist',
          formatBundleFilename('index.full', minify, 'js'),
        ),
        exports: 'named',
        name: ext,
        globals: {
          vue: 'Vue',
        },
        sourcemap: minify,
        inlineDynamicImports: true,
        banner,
      },
      {
        format: 'esm',
        file: path.resolve(
          buildOutput,
          ext,
          'dist',
          formatBundleFilename('index.full', minify, 'mjs'),
        ),
        sourcemap: minify,
        banner,
        inlineDynamicImports: true,
      },
    ]);
  };

  const extensions = excludeFiles(
    await glob('*', {
      cwd: extRoot,
      absolute: false,
      onlyDirectories: true,
    }),
  );

  console.log(extensions);

  return Promise.all(extensions.map((ext) => buildExt(ext)));
}

const buildFull = (minify: boolean) => async () => Promise.all([buildExtensions(minify)]);

export const buildFullExtensions = parallel(
  withTaskName('buildFullExtensionsMinified', buildFull(true)),
  withTaskName('buildFullExtensions', buildFull(false)),
);

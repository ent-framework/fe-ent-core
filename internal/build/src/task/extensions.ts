import path from 'path';
import fs from 'fs-extra';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import type { Plugin } from 'rollup';
import { rollup } from 'rollup';
import commonjs from '@rollup/plugin-commonjs';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueSetupExtend from 'vite-plugin-vue-setup-extend';
import esbuild from 'rollup-plugin-esbuild';
import filesize from 'rollup-plugin-filesize';
import { series } from 'gulp';
import { version } from '../../../../packages/core/version';
import { EntExtAlias } from '../plugins/ent-ext-alias';
import { extRoot, pkgRoot } from '@ent-core/build-utils';
import { EP_BRAND_NAME } from '@ent-core/build-constants';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import {
  formatBundleFilename,
  generateExtensionExternal,
  writeBundles,
  withTaskName,
} from '../utils';
import { target } from '../build-info';
import image from '@rollup/plugin-image';
import PurgeIcons from 'rollup-plugin-purge-icons';
import { rollupPluginInjectProcessViteEnv } from '../plugins/vite-env';
import { compileLess } from './theme';
import { resolveConfig } from 'vite';

const banner = `/*! ${EP_BRAND_NAME} v${version} */\n`;

async function buildExtensions(ext: string, minify: boolean) {
  const buildExt = async (ext: string) => {
    const bundle = await rollup({
      input: path.resolve(extRoot, ext, 'index.ts'),
      plugins: [
        EntExtAlias(),
        PurgeIcons({}),
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
        nodePolyfills(),
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
        extRoot: path.resolve(extRoot, ext, 'package.json'),
        full: true,
      }),
    });

    await writeBundles(bundle, [
      {
        format: 'umd',
        file: path.resolve(extRoot, ext, 'dist', formatBundleFilename('index', minify, 'js')),
        exports: 'named',
        name: ext,
        globals: {
          vue: 'Vue',
          'fe-ent-core': 'EntCore',
        },
        sourcemap: minify,
        inlineDynamicImports: true,
        banner,
      },
      {
        format: 'esm',
        file: path.resolve(extRoot, ext, 'dist', formatBundleFilename('index', minify, 'mjs')),
        sourcemap: minify,
        banner,
        inlineDynamicImports: true,
      },
    ]);
  };

  const resolvedConfig = await resolveConfig(
    {
      configFile: path.resolve(process.cwd(), 'vite.theme.config.ts'),
    },
    'build',
    'production',
  );
  const buildStyle = (ext: string) =>
    compileLess({
      cwd: `${path.resolve(extRoot, ext)}`,
      src: `index.less`,
      out: `index${minify ? '.min' : ''}`,
      dest: `${path.resolve(extRoot, ext)}/dist`,
      dark: false,
      resolvedConfig,
    });
  if (fs.existsSync(path.resolve(extRoot, ext, 'index.less'))) {
    return Promise.all([buildExt(ext), buildStyle(ext)]);
  }
  return Promise.all([buildExt(ext)]);
}

const extensions = ['code-editor', 'flow-chart', 'tinymce', 'markdown', 'qrcode', 'echarts'];

const buildFull = (ext: string) => async () =>
  Promise.all([buildExtensions(ext, true), buildExtensions(ext, false)]);

export const buildFullExtensions = series(
  extensions.map((ext) => withTaskName(`buildFullExtension:${ext}`, buildFull(ext))),
);

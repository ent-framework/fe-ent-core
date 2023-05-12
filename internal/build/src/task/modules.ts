import { rollup } from 'rollup';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import DefineOptions from 'unplugin-vue-define-options/rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import esbuild from 'rollup-plugin-esbuild';
import filesize from 'rollup-plugin-filesize';
import glob from 'fast-glob';
import { epRoot, pkgRoot } from '@ent-build/build-utils';
import image from '@rollup/plugin-image';
import { EntCoreAlias } from '../plugins/ent-core-alias';
import { excludeFiles, generateExternal, writeBundles } from '../utils';
import { reporter } from '../plugins/size-reporter';
import { buildConfigEntries, target } from '../build-info';
import type { OutputOptions, Plugin } from 'rollup';

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
      EntCoreAlias(),
      image({ dom: false }),
      DefineOptions(),
      vue({
        isProduction: true,
        reactivityTransform: true,
      }) as Plugin,
      vueJsx(),
      nodeResolve({
        extensions: ['.mjs', '.js', '.ts', '.tsx'],
      }),
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
        interop: module === 'cjs' ? 'auto' : 'default',
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

import { readPackageJSON } from 'pkg-types';
import { mergeConfig } from 'vite';
import terser from '@rollup/plugin-terser';
import { createPlugins } from '../plugins';
import { generateModifyVars } from '../utils/modify-vars';
import external from '../plugins/vite-plugin-external';
import { commonConfig } from './common';
import type { InlineConfig, UserConfig } from 'vite';
import type { ModuleFormat, OutputPlugin } from 'rollup';

/***
 * Library 模式
 */
async function defineUmdLibraryConfig(source: boolean, base: string) {
  const root = process.cwd();
  const packageJson = await readPackageJSON(root);
  const { name } = packageJson;
  const plugins = await createPlugins({
    isBuild: true,
    mode: 'lib',
    root,
    enableAnalyze: false,
    enableMock: false,
    compress: 'none',
  });
  const { dependencies = {}, peerDependencies = {} } = await readPackageJSON(root);
  const deps = [...Object.keys(dependencies), ...Object.keys(peerDependencies)];
  const packageConfig: UserConfig = {
    base,
    build: {
      target: 'modules',
      outDir: 'dist',
      emptyOutDir: false,
      sourcemap: true,
      minify: false,
      cssMinify: true,
      rollupOptions: {
        input: ['index.ts'],
        output: [
          {
            format: 'umd',
            entryFileNames: `index.full.js`,
            exports: 'named',
            name,
          },
          {
            format: 'umd',
            entryFileNames: `index.full.min.js`,
            exports: 'named',
            name,
            plugins: [terser() as OutputPlugin],
          },
        ],
        external: [...deps],
      },
      lib: {
        entry: 'index.ts',
        formats: ['umd'],
        fileName: (format: ModuleFormat, entryName: string) => {
          return `${entryName}.${format === 'cjs' ? 'js' : 'mjs'}`;
        },
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: generateModifyVars(),
          javascriptEnabled: true,
        },
      },
    },
    plugins: [external(source), ...plugins],
  };
  const mergedConfig = mergeConfig(
    commonConfig({ command: 'build', mode: 'production' }),
    packageConfig,
  );

  return mergedConfig as InlineConfig;
}

export { defineUmdLibraryConfig };

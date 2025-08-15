import { readPackageJSON } from 'pkg-types';
import { mergeConfig } from 'vite';
import terser from '@rollup/plugin-terser';
import { createPlugins } from '../plugins/index.js';
import { generateModifyVars } from '../utils/modify-vars.js';
import external from '../plugins/vite-plugin-external/index.js';
import { commonConfig } from './common.js';
import type { InlineConfig, UserConfig } from 'vite';
import type { OutputPlugin } from 'rollup';

/***
 * Library 模式
 */
async function defineUmdLibraryConfig() {
  const root = process.cwd();
  const packageJson = await readPackageJSON(root);
  const { name } = packageJson;
  const plugins = await createPlugins({
    isBuild: true,
    mode: 'lib',
    root,
    enableAnalyze: false,
    enableMock: false,
    compress: 'none'
  });
  const { dependencies = {}, peerDependencies = {} } = await readPackageJSON(root);
  const deps = [...Object.keys(dependencies), ...Object.keys(peerDependencies)];
  const packageConfig: UserConfig = {
    build: {
      target: 'modules',
      outDir: 'dist',
      emptyOutDir: false,
      sourcemap: false,
      minify: false,
      cssMinify: true,
      rollupOptions: {
        input: ['src/index.ts'],
        treeshake: 'smallest',
        output: [
          {
            format: 'umd',
            entryFileNames: `index.min.js`,
            exports: 'named',
            name,
            plugins: [terser() as OutputPlugin]
          }
        ],
        external: [...deps]
      },
      lib: {
        entry: 'src/index.ts',
        formats: ['umd']
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: generateModifyVars(),
          javascriptEnabled: true
        }
      }
    },
    plugins: [external(deps), ...plugins]
  };
  const mergedConfig = mergeConfig(
    commonConfig({ command: 'build', mode: 'production' }),
    packageConfig
  );

  return mergedConfig as InlineConfig;
}

export { defineUmdLibraryConfig };

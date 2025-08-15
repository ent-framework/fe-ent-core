import { readPackageJSON } from 'pkg-types';
import { mergeConfig } from 'vite';
import glob from 'fast-glob';
import { createPlugins } from '../plugins/index.js';
import { generateModifyVars } from '../utils/modify-vars.js';
import vueExportHelper from '../plugins/vite-plugin-vue-export-helper/index.js';
import external from '../plugins/vite-plugin-external/index.js';
import { excludeFiles } from '../utils/exclude-files.js';
import { commonConfig } from './common.js';
import type { InlineConfig, UserConfig } from 'vite';

/***
 * Library 模式
 */
async function defineLibraryConfig(source: boolean) {
  const root = process.cwd();
  const base = `${root}/src`;
  //const workspace = searchForWorkspaceRoot(root);
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
  const input = excludeFiles(
    glob.sync('**/*.{ts,tsx,vue}', {
      cwd: base,
      absolute: false,
      onlyFiles: true
    })
  ).map((file) => `${base}/${file}`);
  const packageConfig: UserConfig = {
    build: {
      target: 'modules',
      outDir: 'es',
      emptyOutDir: false,
      minify: false,
      sourcemap: false,
      lib: {
        entry: `${base}/index.ts`
      },
      rollupOptions: {
        input,
        output: [
          {
            interop: 'default',
            format: 'es',
            dir: 'es',
            entryFileNames: '[name].mjs',
            preserveModules: true,
            exports: 'named',
            preserveModulesRoot: `${process.cwd()}/src/`
          },
          {
            interop: 'auto',
            format: 'commonjs',
            dir: 'lib',
            entryFileNames: '[name].js',
            preserveModules: true,
            exports: 'named',
            preserveModulesRoot: `${process.cwd()}/src/`
          }
        ],
        external: [...deps]
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
    plugins: [external(deps), ...plugins, vueExportHelper()]
  };
  const mergedConfig = mergeConfig(
    commonConfig({ command: 'build', mode: 'production' }),
    packageConfig
  );

  return mergedConfig as InlineConfig;
}

export { defineLibraryConfig };

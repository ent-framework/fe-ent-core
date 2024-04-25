import { readPackageJSON } from 'pkg-types';
import { mergeConfig } from 'vite';
import glob from 'fast-glob';
import { createPlugins } from '../plugins';
import { generateModifyVars } from '../utils/modify-vars';
import vueExportHelper from '../plugins/vite-plugin-vue-export-helper';
import external from '../plugins/vite-plugin-external';
import { excludeFiles } from '../utils/exclude-files';
import { commonConfig } from './common';
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
            preserveModulesRoot: 'src'
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
    plugins: [external(source), ...plugins, vueExportHelper()]
  };
  const mergedConfig = mergeConfig(
    commonConfig({ command: 'build', mode: 'production' }),
    packageConfig
  );

  return mergedConfig as InlineConfig;
}

export { defineLibraryConfig };

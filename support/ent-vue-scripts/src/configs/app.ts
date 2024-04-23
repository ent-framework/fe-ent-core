import { readPackageJSON } from 'pkg-types';
import { type UserConfig, mergeConfig } from 'vite';
import { createPlugins } from '../plugins';
import { generateModifyVars } from '../utils/modify-vars';
import { commonConfig } from './common';
import type { DefineOptions } from './type';
import type { ModuleFormat } from 'rollup';

/***
 * app 模式 - 打包到 es/lib
 */
async function defineAppConfig(defineOptions: DefineOptions) {
  const { overrides = {} } = defineOptions;
  const { command, mode } = defineOptions;
  const root = process.cwd();
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
  let entDeps: string[] = [];
  if (deps.includes('fe-ent-core')) {
    const { dependencies: entDependencies = {}, peerDependencies: entPeerDependencies = {} } =
      await readPackageJSON(`${root}/node_modules/fe-ent-core`);
    entDeps = [...Object.keys(entDependencies), ...Object.keys(entPeerDependencies)];
  }
  const packageConfig: UserConfig = {
    build: {
      lib: {
        entry: 'index.ts',
        formats: ['es', 'cjs'],
        fileName: (format: ModuleFormat, entryName: string) => {
          return `${entryName}.${format === 'cjs' ? 'js' : 'mjs'}`;
        }
      },
      rollupOptions: {
        external: [...deps, ...entDeps]
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
    plugins
  };
  const mergedConfig = mergeConfig(commonConfig({ command, mode }), packageConfig);

  return mergeConfig(mergedConfig, overrides);
}

export { defineAppConfig };

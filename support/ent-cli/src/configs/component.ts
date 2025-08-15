import glob from 'fast-glob';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { readPackageJSON } from 'pkg-types';
import external from '../plugins/vite-plugin-external/index.js';
import vueExportHelper from '../plugins/vite-plugin-vue-export-helper/index.js';
import { excludeFiles } from '../utils/exclude-files.js';
import { generateModifyVars } from '../utils/modify-vars.js';
import type { UserConfig } from 'vite';
/**
 * 构建组件库 ent-core 生成es, lib
 */
export default async function defineComponentConfig() {
  const root = process.cwd();
  const input = excludeFiles(
    glob.sync('**/*.{ts,tsx,vue}', {
      cwd: `${process.cwd()}/src`,
      absolute: false,
      onlyFiles: true
    })
  ).map((file) => `${process.cwd()}/src/${file}`);
  const { dependencies = {}, peerDependencies = {} } = await readPackageJSON(root);
  const deps = [...Object.keys(dependencies), ...Object.keys(peerDependencies)];
  const packageConfig: UserConfig = {
    mode: 'production',
    build: {
      target: 'modules',
      outDir: 'es',
      emptyOutDir: false,
      minify: false,
      sourcemap: false,
      //brotliSize: false,
      rollupOptions: {
        input: [...input],
        treeshake: false,
        output: [
          {
            interop: 'auto',
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
        ]
      },
      // 开启lib模式，但不使用下面配置
      lib: {
        entry: ''
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
    plugins: [
      external(deps),
      vue({
        isProduction: true
      }),
      vueJsx(),
      vueExportHelper()
    ]
  };
  return packageConfig;
}

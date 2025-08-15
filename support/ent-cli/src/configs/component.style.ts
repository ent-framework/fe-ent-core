import path from 'path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import fs from 'fs-extra';
import consola from 'consola';
import { readPackageJSON } from 'pkg-types';
import { generateModifyVars } from '../utils/modify-vars.js';
import cssOnlyPlugin from '../plugins/rollup-plugin-css-only/index.js';
import { configUnoCSSPlugin } from '../plugins/unocss.js';
import external from '../plugins/vite-plugin-external/index.js';
import type { UserConfig } from 'vite';

export default async function defineStyleConfig() {
  const root = process.cwd();
  const entry: string[] = ['src/index.ts'];
  if (fs.existsSync(path.resolve(process.cwd(), 'src/style.ts'))) {
    entry.push('src/style.ts');
  }
  consola.info(`build style with entry : ${entry.join(',')}`);
  const { dependencies = {}, peerDependencies = {} } = await readPackageJSON(root);
  const deps = [...Object.keys(dependencies), ...Object.keys(peerDependencies)];
  const packageConfig: UserConfig = {
    mode: 'production',
    logLevel: 'info',
    build: {
      target: 'modules',
      outDir: 'dist',
      emptyOutDir: false,
      minify: false,
      cssMinify: true,
      write: false,
      //brotliSize: false,
      rollupOptions: {
        treeshake: false,
        plugins: [cssOnlyPlugin()],
        external: [...deps]
      },
      // 开启lib模式，但不使用下面配置
      lib: {
        entry: ['src/style.ts', 'src/index.ts'],
        formats: ['es']
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
    plugins: [vue(), vueJsx(), external(deps), configUnoCSSPlugin(true)]
  };
  return packageConfig;
}

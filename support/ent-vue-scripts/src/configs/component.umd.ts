import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import terser from '@rollup/plugin-terser';
import { mergeConfig } from 'vite';
import { generateModifyVars } from '../utils/modify-vars';
import { configUnoCSSPlugin } from '../plugins/unocss';
import { commonConfig } from './common';
import type { InlineConfig, UserConfig } from 'vite';
import type { OutputPlugin } from 'rollup';

export default (): InlineConfig => {
  const entry = `src/index.ts`;
  console.log(111111111);
  const packageConfig: UserConfig = {
    mode: 'production',
    build: {
      target: 'modules',
      outDir: 'dist',
      emptyOutDir: false,
      sourcemap: true,
      minify: false,
      cssMinify: true,
      rollupOptions: {
        input: entry,
        treeshake: 'smallest',
        output: [
          {
            format: 'umd',
            entryFileNames: `index.full.js`,
            globals: {
              vue: 'Vue'
            },
            name: 'Ent',
            exports: 'named'
          },
          {
            format: 'umd',
            entryFileNames: `index.full.min.js`,
            globals: {
              vue: 'Vue'
            },
            name: 'Ent',
            exports: 'named',
            plugins: [terser() as OutputPlugin]
          }
        ]
      },
      // 开启lib模式
      lib: {
        entry,
        formats: ['umd'],
        name: 'Ent'
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
    plugins: [vue(), vueJsx()]
  };
  const mergedConfig = mergeConfig(
    commonConfig({ command: 'build', mode: 'production' }),
    packageConfig
  );

  return mergedConfig as InlineConfig;
};

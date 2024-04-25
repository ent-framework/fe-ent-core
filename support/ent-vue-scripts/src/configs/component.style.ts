import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { generateModifyVars } from '../utils/modify-vars';
import cssOnlyPlugin from '../plugins/rollup-plugin-css-only';
import { configUnoCSSPlugin } from '../plugins/unocss';
import type { InlineConfig } from 'vite';

const config: InlineConfig = {
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
      plugins: [cssOnlyPlugin()]
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
  plugins: [vue(), vueJsx(), configUnoCSSPlugin(true)]
};

export default config;

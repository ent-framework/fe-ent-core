import terser from '@rollup/plugin-terser';
import { generateModifyVars } from '../utils/modify-vars';
import cssOnlyPlugin from '../plugins/rollup-plugin-css-only';
import { configUnoCSSPlugin } from '../plugins/unocss';
import type { InlineConfig } from 'vite';
import type { OutputPlugin } from 'rollup';

const config: InlineConfig = {
  mode: 'production',
  build: {
    target: 'modules',
    outDir: 'dist',
    emptyOutDir: false,
    minify: false,
    cssMinify: true,
    write: false,
    //brotliSize: false,
    rollupOptions: {
      input: 'src/style.ts',
      output: [
        {
          format: 'es',
          dir: 'dist',
          exports: 'named',
          entryFileNames: '[name].js',
          plugins: [terser() as OutputPlugin],
        },
      ],
      plugins: [cssOnlyPlugin()],
    },
    // 开启lib模式，但不使用下面配置
    lib: {
      entry: '',
      formats: ['es'],
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
  plugins: [configUnoCSSPlugin(true)],
};

export default config;

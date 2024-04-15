import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import external from '../plugins/vite-plugin-external';
import type { InlineConfig } from 'vite';

export default defineConfig({
  mode: 'development',
  build: {
    target: 'modules',
    outDir: 'es',
    emptyOutDir: true,
    minify: false,
    //brotliSize: false,
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
        preserveModules: true,
        preserveModulesRoot: 'components',
      },
    },
    lib: {
      entry: 'src/components/index.ts',
      formats: ['es'],
    },
    watch: {},
  },

  plugins: [external(), vue(), vueJsx()],
}) as InlineConfig;

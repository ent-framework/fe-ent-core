import glob from 'fast-glob';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import DefineOptions from 'unplugin-vue-define-options/vite';
import external from '../plugins/vite-plugin-external';
import vueExportHelper from '../plugins/vite-plugin-vue-export-helper';
import { excludeFiles } from '../utils/exclude-files';
import type { InlineConfig } from 'vite';

const input = excludeFiles(
  glob.sync('**/*.{js,ts,tsx,vue}', {
    cwd: process.cwd(),
    absolute: true,
    onlyFiles: true,
  }),
);

const config: InlineConfig = {
  mode: 'production',
  build: {
    target: 'modules',
    outDir: 'es',
    emptyOutDir: false,
    minify: false,
    sourcemap: true,
    //brotliSize: false,
    rollupOptions: {
      input,
      output: [
        {
          interop: 'default',
          format: 'es',
          dir: 'es',
          entryFileNames: '[name].mjs',
          preserveModules: true,
          //preserveModulesRoot: 'components',
        },
        {
          interop: 'auto',
          format: 'commonjs',
          dir: 'lib',
          entryFileNames: '[name].js',
          preserveModules: true,
          //preserveModulesRoot: 'components',
        },
      ],
    },
    // 开启lib模式，但不使用下面配置
    lib: {
      entry: 'components/index.ts',
      formats: ['es', 'cjs'],
    },
  },
  resolve: {
    alias: [
      {
        find: /^@ent-core\/(.*)$/,
        replacement: `${process.cwd()}/$1`,
      },
    ],
  },
  // @ts-ignore vite内部类型错误
  plugins: [external(), DefineOptions(), vue(), vueJsx(), vueExportHelper()],
};

export default config;

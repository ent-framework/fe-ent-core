import glob from 'fast-glob';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import external from '../plugins/vite-plugin-external';
import vueExportHelper from '../plugins/vite-plugin-vue-export-helper';
import { excludeFiles } from '../utils/exclude-files';
import { generateModifyVars } from '../utils/modify-vars';
import type { InlineConfig } from 'vite';

const input = excludeFiles(
  glob.sync('*/**/index.ts', {
    cwd: process.cwd(),
    absolute: false,
    onlyFiles: true,
  }),
).map((file) => `${process.cwd()}/${file}`);
const config: InlineConfig = {
  mode: 'production',
  build: {
    target: 'modules',
    outDir: 'es',
    emptyOutDir: false,
    minify: false,
    sourcemap: false,
    //brotliSize: false,
    rollupOptions: {
      input: 'index.ts',
      treeshake: false,
      output: [
        {
          interop: 'auto',
          format: 'es',
          dir: 'es',
          entryFileNames: '[name].mjs',
          preserveModules: true,
          exports: 'named',
          preserveModulesRoot: `${process.cwd()}`,
        },
        {
          interop: 'auto',
          format: 'commonjs',
          dir: 'lib',
          entryFileNames: '[name].js',
          preserveModules: true,
          exports: 'named',
          preserveModulesRoot: `${process.cwd()}`,
        },
      ],
    },
    // 开启lib模式，但不使用下面配置
    lib: {
      entry: 'components/index.ts',
      formats: ['es', 'cjs'],
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
  resolve: {
    alias: [
      {
        find: /^@ent-core\/(.*)$/,
        replacement: `${process.cwd()}/$1`,
      },
    ],
  },
  // @ts-ignore vite内部类型错误
  plugins: [
    external(),
    vue({
      isProduction: true,
      reactivityTransform: true,
    }),
    vueJsx(),
    vueExportHelper(),
  ],
};

export default config;

import glob from 'fast-glob';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import external from '../plugins/vite-plugin-external';
import vueExportHelper from '../plugins/vite-plugin-vue-export-helper';
import { excludeFiles } from '../utils/exclude-files';
import { generateModifyVars } from '../utils/modify-vars';
import type { InlineConfig } from 'vite';

const input = excludeFiles(
  glob.sync('**/*.{ts,tsx,vue}', {
    cwd: `${process.cwd()}/src`,
    absolute: false,
    onlyFiles: true,
  }),
).map((file) => `${process.cwd()}/src/${file}`);
const config: InlineConfig = {
  mode: 'production',
  //base: `${process.cwd()}/src`,
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
          preserveModulesRoot: `${process.cwd()}/src/`,
        },
      ],
    },
    // 开启lib模式，但不使用下面配置
    lib: {
      entry: 'src/components/index.ts',
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
        replacement: `${process.cwd()}/src/$1`,
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

import glob from 'fast-glob';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import external from '../plugins/vite-plugin-external';
import vueExportHelper from '../plugins/vite-plugin-vue-export-helper';
import type { InlineConfig } from 'vite';

export const excludeFiles = (files: string[]) => {
  const excludes = [
    '/node_modules',
    '/test',
    '/mock',
    '/gulpfile',
    '/dist',
    '/es',
    '/lib',
  ];
  return files.filter(
    (path) => !excludes.some((exclude) => path.includes(exclude))
  );
};

const input = excludeFiles(
  glob.sync('**/*.{js,ts,tsx,vue}', {
    cwd: process.cwd(),
    absolute: true,
    onlyFiles: true,
  })
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
          format: 'es',
          dir: 'es',
          entryFileNames: '[name].mjs',
          preserveModules: true,
          //preserveModulesRoot: 'components',
        },
        {
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
  plugins: [external(), vue(), vueJsx(), vueExportHelper()],
};

export default config;

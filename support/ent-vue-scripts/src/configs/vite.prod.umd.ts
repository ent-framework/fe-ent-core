import { InlineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
//import { terser } from 'rollup-plugin-terser';
import terser from '@rollup/plugin-terser';
import type { OutputPlugin } from 'rollup';
export default (): InlineConfig => {
  const entry = 'index.ts';

  return {
    mode: 'production',
    build: {
      target: 'modules',
      outDir: 'dist',
      emptyOutDir: false,
      sourcemap: true,
      minify: false,
      //brotliSize: false,
      rollupOptions: {
        external: 'vue',
        output: [
          {
            format: 'umd',
            entryFileNames: `index.full.js`,
            globals: {
              vue: 'Vue',
            },
            name: 'Ent',
            exports: 'named',
          },
          {
            format: 'umd',
            entryFileNames: `index.full.min.js`,
            globals: {
              vue: 'Vue',
            },
            name: 'Ent',
            exports: 'named',
            plugins: [terser() as OutputPlugin],
          },
        ],
      },
      // 开启lib模式
      lib: {
        entry,
        formats: ['umd'],
        name: 'Ent',
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
    plugins: [vue(), vueJsx()],
  };
};

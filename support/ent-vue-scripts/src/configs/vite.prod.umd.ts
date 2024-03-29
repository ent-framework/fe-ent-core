import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import terser from '@rollup/plugin-terser';
import { generateModifyVars } from '../utils/modify-vars';
import type { InlineConfig } from 'vite';
import type { OutputPlugin } from 'rollup';

export default (): InlineConfig => {
  const entry = 'index.ts';

  return {
    mode: 'production',
    build: {
      target: 'modules',
      outDir: 'dist',
      emptyOutDir: false,
      sourcemap: false,
      minify: false,
      cssMinify: true,
      //brotliSize: false,
      rollupOptions: {
        //external: 'vue',
        treeshake: 'smallest',
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
        name: 'Ent',
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
    // define: {
    //   'process.env': JSON.stringify({ NODE_ENV: 'production' }),
    // },
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

import type { UserConfig } from 'vite';
import Components from 'unplugin-vue-components/vite';
import { searchForWorkspaceRoot } from 'vite';
import vue from '@vitejs/plugin-vue';

export default (): UserConfig => {
  const workspace = searchForWorkspaceRoot(process.cwd());

  function EntVueResolver(name: string) {
    console.log(name);
    const importName = name.slice(1);
    const path = `ant-design-vue/`;
    return {
      name,
      importName,
      path,
    };
  }

  return {
    base: '/',
    root: `${process.cwd()}`,
    resolve: {
      alias: [
        {
          find: /^fe-ent-core$/,
          replacement: `${workspace}/packages/fe-ent-core/index.ts`,
        },
        {
          find: /^fe-ent-core\/lib\/(.*)$/,
          replacement: `${workspace}/packages/$1`,
        },
        // 别名，转发 fe-ent-extension 文件请求
        {
          find: /^@fe-ent-extension\/(.*\.less)$/,
          replacement: `${workspace}/extensions/$1`,
        },
        {
          find: /^@fe-ent-extension\/(.*)$/,
          replacement: `${workspace}/extensions/$1/index.ts`,
        },
        {
          find: /^@ent-core\/(.*)$/,
          replacement: `${workspace}/packages/$1`,
        },
      ],
    },
    plugins: [
      vue(),
      Components({
        // 指定组件位置，默认是src/components
        dirs: [`${workspace}/packages/components`],
        // ui库解析器
        // resolvers: [ElementPlusResolver()],
        //extensions: ['vue'],
        // 配置文件生成位置
        dts: `${workspace}/dist/components.d.ts`,
        deep: true,
        resolvers: [EntVueResolver],
      }),
    ],
    build: {
      target: 'es2015',
      outDir: 'dist',
      terserOptions: {
        compress: {
          keep_infinity: true,
        },
      },
      // Turning off brotliSize display can slightly reduce packaging time
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
    },
  };

  //return config;
};

import { defineApplicationConfig } from 'fe-ent-build';
import { searchForWorkspaceRoot } from 'vite';
const workspace = searchForWorkspaceRoot(process.cwd());

export default defineApplicationConfig({
  overrides: {
    optimizeDeps: {
      include: [
        'echarts/core',
        'echarts/charts',
        'echarts/components',
        'echarts/renderers',
        'qrcode',
        '@iconify/iconify',
        'ant-design-vue/es/locale/zh_CN',
        'ant-design-vue/es/locale/en_US',
      ],
    },
    resolve: {
      alias: [
        // 别名，转发 fe-ent-core 文件请求
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
        {
          find: /^fe-ent-code-editor$/,
          replacement: `${workspace}/extensions/code-editor/index.ts`,
        },
      ],
    },
    server: {
      proxy: {
        '/basic-api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(new RegExp(`^/basic-api`), ''),
          // only https
          // secure: false
        },
        '/upload': {
          target: 'http://localhost:3300/upload',
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(new RegExp(`^/upload`), ''),
        },
      },
    },
  },
});

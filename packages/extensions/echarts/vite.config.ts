import { definePackageConfig } from 'fe-ent-build';
import { searchForWorkspaceRoot } from 'vite';
const workspace = searchForWorkspaceRoot(process.cwd());

export default definePackageConfig({
  overrides: {
    build: {
      lib: {
        entry: 'index.ts',
      },
    },
    optimizeDeps: {
      include: [
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
      ],
    },
  },
});

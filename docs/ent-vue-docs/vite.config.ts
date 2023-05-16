import { defineApplicationConfig } from 'fe-ent-build';
import vueDocs from 'fe-ent-vite-plugin-docs';
import { searchForWorkspaceRoot } from 'vite';
const workspace = searchForWorkspaceRoot(process.cwd());

export default defineApplicationConfig({
  options: {
    cssModify: {
      primaryColor: '#1f883d',
    },
  },
  overrides: {
    build: {
      minify: false,
      cssCodeSplit: true,
    },
    plugins: [vueDocs()],
    resolve: {
      alias: [
        // 别名，转发 fe-ent-core 文件请求
        {
          find: /^fe-ent-core$/,
          replacement: `${workspace}/packages/fe-ent-core/index.ts`,
        },
        {
          find: /^fe-ent-core\/lib\/(.*)$/,
          replacement: `${workspace}/packages/fe-ent-core/$1`,
        },
        // 别名，转发 fe-ent-extension 文件请求
        {
          find: /^@fe-ent-extension\/(.*)$/,
          replacement: `${workspace}/extensions/$1/src/index.ts`,
        },
        {
          find: /^@fe-ent-app\/(.*)$/,
          replacement: `${workspace}/apps/$1/src/index.ts`,
        },
        {
          find: /^fe-ent-qrcode$/,
          replacement: `${workspace}/extensions/qrcode/src/index.ts`,
        },
        {
          find: /^@ent-core\/(.*)$/,
          replacement: `${workspace}/packages/fe-ent-core/$1`,
        },
      ],
    },
    server: {
      port: 3000,
    },
  },
});

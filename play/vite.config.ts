import { getPlayViteConfig } from 'fe-ent-vue-scripts';
import { defineConfig, searchForWorkspaceRoot } from 'vite';
const workspace = searchForWorkspaceRoot(process.cwd());

export default defineConfig(({ command, mode }) => {
  return getPlayViteConfig({
    command,
    mode,
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
            replacement: `${workspace}/extensions/$1/index.ts`,
          },
          {
            find: /^@fe-ent-app\/(.*)$/,
            replacement: `${workspace}/apps/$1/index.ts`,
          },
          {
            find: /^fe-ent-code-editor$/,
            replacement: `${workspace}/extensions/code-editor/index.ts`,
          },
          {
            find: /^fe-ent-qrcode$/,
            replacement: `${workspace}/extensions/qrcode/index.ts`,
          },
          {
            find: /^@ent-core\/(.*)$/,
            replacement: `${workspace}/packages/fe-ent-core/$1`,
          },
        ],
      },
      server: {
        port: 3000,
        proxy: {
          '/api': {
            target: 'http://localhost:3000',
            changeOrigin: true,
            ws: true,
            // rewrite: (path) => path.replace(new RegExp(`^/api`), ''),
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
});

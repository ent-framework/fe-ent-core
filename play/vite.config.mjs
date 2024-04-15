import { defineProjectConfig } from 'fe-ent-vue-scripts';
import { defineConfig, searchForWorkspaceRoot } from 'vite';
const workspace = searchForWorkspaceRoot(process.cwd());

export default defineConfig(({ command, mode }) => {
  return defineProjectConfig({
    command,
    mode,
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
            replacement: `${workspace}/src/index.ts`,
          },
          {
            find: /^fe-ent-core\/es\/(.*)$/,
            replacement: `${workspace}/src/$1`,
          },
          // 别名，转发 fe-ent-extension 文件请求
          {
            find: /^fe-ent-code-editor$/,
            replacement: `${workspace}/extensions/code-editor/src/index.ts`,
          },
          {
            find: /^fe-ent-echarts$/,
            replacement: `${workspace}/extensions/echarts/src/index.ts`,
          },
          {
            find: /^fe-ent-flow-chart$/,
            replacement: `${workspace}/extensions/flow-chart/src/index.ts`,
          },
          {
            find: /^fe-ent-markdown$/,
            replacement: `${workspace}/extensions/markdown/src/index.ts`,
          },
          {
            find: /^fe-ent-tinymce$/,
            replacement: `${workspace}/extensions/tinymce/src/index.ts`,
          },
          {
            find: /^fe-ent-excel$/,
            replacement: `${workspace}/extensions/excel/src/index.ts`,
          },
          {
            find: /^fe-ent-tiptap$/,
            replacement: `${workspace}/extensions/tiptap/src/index.ts`,
          },
          {
            find: /^fe-ent-login$/,
            replacement: `${workspace}/apps/login/src/index.ts`,
          },
          {
            find: /^fe-ent-layout$/,
            replacement: `${workspace}/apps/layout/src/index.ts`,
          },
          {
            find: /^fe-ent-layout\/es\/(.*)$/,
            replacement: `${workspace}/apps/layout/src/$1`,
          },
          {
            find: /^@ent-core\/(.*)$/,
            replacement: `${workspace}/src/$1`,
          },
        ],
      },
      server: {
        port: 3000,
        proxy: {
          // '/api': {
          //   target: 'http://localhost:3000',
          //   changeOrigin: true,
          //   ws: true,
          // },
          // 配合 Ent-framework 测试
          // '/api': {
          //   target: 'http://127.0.0.1:8000',
          //   changeOrigin: true,
          //   ws: true,
          //   rewrite: (path) => path.replace(new RegExp(`^/api`), ''),
          // },
          '/api': {
            target: 'https://aitag.kaytune.com',
            changeOrigin: true,
            ws: true,
            timeout: 20000,
            //rewrite: (path) => path.replace(new RegExp(`^/api`), ''),
            // only https
            // secure: false
          },
        },
      },
    },
  });
});

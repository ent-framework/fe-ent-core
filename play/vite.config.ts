import { defineProjectConfig } from 'fe-ent-vue-scripts';
import { defineConfig, searchForWorkspaceRoot } from 'vite';
const workspace = searchForWorkspaceRoot(process.cwd());

export default defineConfig(({ command, mode }) => {
  return defineProjectConfig({
    command,
    mode,
    overrides: {
      build: {
        rollupOptions: {
          input: {
            index: 'index.html',
            login: 'login.html',
          },
        },
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
            find: /^fe-ent-core\/es\/(.*)$/,
            replacement: `${workspace}/packages/fe-ent-core/$1`,
          },
          // 别名，转发 fe-ent-extension 文件请求
          {
            find: /^fe-ent-code-editor$/,
            replacement: `${workspace}/extensions/code-editor/index.ts`,
          },
          {
            find: /^fe-ent-echarts$/,
            replacement: `${workspace}/extensions/echarts/index.ts`,
          },
          {
            find: /^fe-ent-flow-chart$/,
            replacement: `${workspace}/extensions/flow-chart/index.ts`,
          },
          {
            find: /^fe-ent-markdown$/,
            replacement: `${workspace}/extensions/markdown/index.ts`,
          },
          {
            find: /^fe-ent-tinymce$/,
            replacement: `${workspace}/extensions/tinymce/index.ts`,
          },
          {
            find: /^fe-ent-excel$/,
            replacement: `${workspace}/extensions/excel/index.ts`,
          },
          {
            find: /^fe-ent-tiptap$/,
            replacement: `${workspace}/extensions/tiptap/index.ts`,
          },
          {
            find: /^fe-ent-login$/,
            replacement: `${workspace}/apps/login/index.ts`,
          },
          {
            find: /^fe-ent-layout$/,
            replacement: `${workspace}/apps/layout/index.ts`,
          },
          {
            find: /^fe-ent-layout\/es\/(.*)$/,
            replacement: `${workspace}/apps/layout/$1`,
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
        },
      },
    },
  });
});

import { defineApplicationConfig } from 'fe-ent-build';
import { searchForWorkspaceRoot } from 'vite';
const workspace = searchForWorkspaceRoot(process.cwd());

export default defineApplicationConfig({
  overrides: {
    build: {
      rollupOptions: {
        input: {
          index: 'index.html',
          login: 'login.html',
        },
      },
      minify: true,
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
          replacement: `${workspace}/packages/$1`,
        },
        // 别名，转发 fe-ent-extension 文件请求
        {
          find: /^@fe-ent-extension\/(.*)$/,
          replacement: `${workspace}/extensions/$1/src/index.ts`,
        },
        {
          find: /^@ent-core\/(.*)$/,
          replacement: `${workspace}/packages/$1`,
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

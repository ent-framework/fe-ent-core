import { getDocSiteConfig } from 'fe-ent-vue-scripts';
import { defineConfig, searchForWorkspaceRoot } from 'vite';

const root = searchForWorkspaceRoot(process.cwd());
export default defineConfig(({ command, mode }) => {
  return getDocSiteConfig({
    command,
    mode,
    overrides: {
      build: {
        minify: false,
        cssCodeSplit: true,
        emptyOutDir: true,
        outDir: `${root}/dist`,
      },
      server: {
        port: 5400,
      },
      resolve: {
        alias: [
          // 别名，转发 fe-ent-core 文件请求
          {
            find: /^fe-ent-core$/,
            replacement: `${root}/src/index.ts`,
          },
          {
            find: /^fe-ent-core\/es\/(.*)$/,
            replacement: `${root}/src/$1`,
          },
          {
            find: /^fe-ent-layout$/,
            replacement: `${root}/apps/layout/src/index.ts`,
          },
        ],
      },
    },
  });
});

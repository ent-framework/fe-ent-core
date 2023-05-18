import { getDocSiteConfig } from 'fe-ent-vue-scripts';
import { defineConfig, searchForWorkspaceRoot } from 'vite';

const root = searchForWorkspaceRoot(process.cwd());
export default defineConfig(({ command, mode }) => {
  return getDocSiteConfig({
    command,
    mode,
    overrides: {
      build: {
        minify: true,
        cssCodeSplit: true,
        emptyOutDir: true,
        outDir: `${root}/docs`,
      },
      base: '/fe-ent-core',
      server: {
        port: 5400,
      },
      resolve: {
        alias: [
          // 别名，转发 fe-ent-core 文件请求
          {
            find: /^fe-ent-page$/,
            replacement: `${root}/apps/page/index.ts`,
          },
          {
            find: /^fe-ent-page\/(.*)$/,
            replacement: `${root}/apps/page/$1`,
          },
        ],
      },
    },
  });
});

import { getDocSiteConfig } from 'fe-ent-vue-scripts';
import { defineConfig } from 'vite';

export default defineConfig(({ command, mode }) => {
  return getDocSiteConfig({
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
        emptyOutDir: true
      },
      server: {
        port: 3000,
      },
    },
  })

});

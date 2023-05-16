import path from 'path';
import { defineConfig, searchForWorkspaceRoot } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDocs from 'fe-ent-vite-plugin-docs';
import svgLoader from 'vite-svg-loader';
import { presetTypography, presetUno } from 'unocss';
import UnoCSS from 'unocss/vite';
import paths from '../utils/paths';
import type { InlineConfig } from 'vite';
import type { Theme } from 'unocss/preset-uno';

const cwd = process.cwd();
const root = searchForWorkspaceRoot(cwd);
const theme = {
  breakpoints: {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    '2xl': '1600px',
  },
};

export default defineConfig({
  mode: 'development',
  server: {
    open: true,
    host: '0.0.0.0',
    port: 2233,
    fs: {
      strict: true,
      allow: ['..'],
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        paths: [paths.resolvePath('../web-vue')],
      },
    },
  },
  resolve: {
    alias: [
      {
        find: /^@ent-core\/(.*)/,
        replacement: path.resolve(root, 'packages/fe-ent-core/$1'),
      },
    ],
  },
  plugins: [
    vueDocs(),
    UnoCSS<Theme>({
      presets: [presetUno(), presetTypography()],
      theme,
    }),
    vue(),
    vueJsx(),
    svgLoader({ svgoConfig: {} }),
  ],
}) as InlineConfig;

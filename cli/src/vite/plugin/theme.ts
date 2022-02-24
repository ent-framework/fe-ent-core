/**
 * Vite plugin for website theme color switching
 * https://github.com/anncwb/vite-plugin-theme
 */
import type { Plugin } from 'vite';
import path from 'path';
import fs from 'fs';
import {
  viteThemePlugin,
  antdDarkThemePlugin,
  mixLighten,
  mixDarken,
  tinycolor,
} from 'vite-plugin-theme';
import { getThemeColors, generateColors } from '../../config/themeConfig';
import { generateModifyVars } from '../../generate/generateModifyVars';
import { FE_PKG, findWorkspaceRoot } from '../../utils';

export function configThemePlugin(runMode: string, preview: boolean): Plugin[] {
  const colors = generateColors({
    mixDarken,
    mixLighten,
    tinycolor,
  });

  let preLoadFile = '';
  const workspace = findWorkspaceRoot();
  if (preview) {
    preLoadFile = path.resolve(workspace, `packages/theme/index.less`);
  } else if (runMode == 'package' || runMode == 'serve') {
    if (fs.existsSync(process.cwd() + 'src/theme/index.less')) {
      preLoadFile = path.resolve(process.cwd(), 'src/theme/index.less');
    } else {
      preLoadFile = path.resolve(workspace, `node_modules/${FE_PKG}/theme/index.less`);
    }
  } else {
    preLoadFile = path.resolve(process.cwd(), 'theme/index.less');
  }

  const plugin = [
    viteThemePlugin({
      resolveSelector: (s) => {
        s = s.trim();
        switch (s) {
          case '.ant-steps-item-process .ant-steps-item-icon > .ant-steps-icon':
            return '.ant-steps-item-icon > .ant-steps-icon';
          case '.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled)':
          case '.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):hover':
          case '.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):active':
            return s;
          case '.ant-steps-item-icon > .ant-steps-icon':
            return s;
          case '.ant-select-item-option-selected:not(.ant-select-item-option-disabled)':
            return s;
          default:
            if (s.indexOf('.ant-btn') >= -1) {
              // 按钮被重新定制过，需要过滤掉class防止覆盖
              return s;
            }
        }
        return s.startsWith('[data-theme') ? s : `[data-theme] ${s}`;
      },
      colorVariables: [...getThemeColors(), ...colors],
    }),
    antdDarkThemePlugin({
      preloadFiles: [
        path.resolve(process.cwd(), 'node_modules/ant-design-vue/dist/antd.less'),
        //path.resolve(process.cwd(), 'node_modules/ant-design-vue/dist/antd.dark.less'),
        preLoadFile,
      ],
      filter: (id) =>
        runMode == 'package' || runMode == 'serve' || preview ? !id.endsWith('antd.less') : true,
      //extractCss: true,
      darkModifyVars: {
        ...generateModifyVars(true, runMode, preview),
        'text-color': '#c9d1d9',
        'primary-1': 'rgb(255 255 255 / 8%)',
        'text-color-base': '#c9d1d9',
        'component-background': '#151515',
        'heading-color': 'rgb(255 255 255 / 65%)',
        // black: '#0e1117',
        // #8b949e
        'text-color-secondary': '#8b949e',
        'border-color-base': '#303030',
        // 'border-color-split': '#30363d',
        'item-active-bg': '#111b26',
        'app-content-background': '#1e1e1e',
        'tree-node-selected-bg': '#11263c',

        'alert-success-border-color': '#274916',
        'alert-success-bg-color': '#162312',
        'alert-success-icon-color': '#49aa19',
        'alert-info-border-color': '#153450',
        'alert-info-bg-color': '#111b26',
        'alert-info-icon-color': '#177ddc',
        'alert-warning-border-color': '#594214',
        'alert-warning-bg-color': '#2b2111',
        'alert-warning-icon-color': '#d89614',
        'alert-error-border-color': '#58181c',
        'alert-error-bg-color': '#2a1215',
        'alert-error-icon-color': '#a61d24',
      },
    }),
  ];

  return plugin as unknown as Plugin[];
}

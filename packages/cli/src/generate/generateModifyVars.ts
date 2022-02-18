import { generateAntColors, primaryColor } from '../config/themeConfig';
const { getThemeVariables } = require('ant-design-vue/dist/theme');
import path from 'path';
import { FE_PKG, findWorkspaceRoot } from '../utils';
import fs from 'fs';
/**
 * less global variable
 */
export function generateModifyVars(dark = false, runMode: string) {
  const palettes = generateAntColors(primaryColor);
  const primary = palettes[5];

  const primaryColorObj: Record<string, string> = {};

  for (let index = 0; index < 10; index++) {
    primaryColorObj[`primary-${index + 1}`] = palettes[index];
  }

  const modifyVars = getThemeVariables({ dark });
  const workspace = findWorkspaceRoot();
  let preLoadFile = '';

  if (runMode == 'package' || runMode == 'serve') {
    if (fs.existsSync(process.cwd() + 'src/styles/config.less')) {
      preLoadFile = path.resolve(process.cwd(), 'src/styles/config.less');
    } else {
      preLoadFile = path.resolve(workspace, `node_modules/${FE_PKG}/styles/config.less`);
    }
  } else {
    preLoadFile = path.resolve(process.cwd(), 'styles/config.less');
  }

  console.log(`${preLoadFile}`);

  return {
    ...modifyVars,
    // Used for global import to avoid the need to import each style file separately
    // reference:  Avoid repeated references
    hack: `${modifyVars.hack} @import (reference) "${preLoadFile}";`,
    'primary-color': primary,
    ...primaryColorObj,
    'info-color': primary,
    'processing-color': primary,
    'success-color': '#55D187', //  Success color
    'error-color': '#ED6F6F', //  False color
    'warning-color': '#EFBD47', //   Warning color
    //'border-color-base': '#EEEEEE',
    'font-size-base': '14px', //  Main font size
    'border-radius-base': '2px', //  Component/float fillet
    'link-color': primary, //   Link color
    'app-content-background': '#fafafa', //   Link color
  };
}

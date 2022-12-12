import path from 'path';
import fs from 'fs';
import { FE_PKG } from './constants';
import { CustomConfigEnv } from '../vite';
import { searchForWorkspaceRoot } from 'vite';

export const getVitePreLoadFile = (env: CustomConfigEnv) => {
  // 是否构建库模式
  const workspace = searchForWorkspaceRoot(process.cwd());
  const cwd = process.cwd();
  let preLoadFile = '';

  if (env.libDev) {
    preLoadFile = path.resolve(workspace, `packages/theme/config.less`);
  } else if (env.runMode == 'package' || env.runMode == 'serve') {
    if (fs.existsSync(process.cwd() + 'src/theme/config.less')) {
      preLoadFile = path.resolve(process.cwd(), 'src/theme/config.less');
    } else {
      if (fs.existsSync(`${cwd}/node_modules/${FE_PKG}/theme/config.less`)) {
        preLoadFile = path.resolve(cwd, `node_modules/${FE_PKG}/theme/config.less`);
      } else {
        preLoadFile = path.resolve(workspace, `node_modules/${FE_PKG}/theme/config.less`);
      }
    }
  } else {
    preLoadFile = path.resolve(process.cwd(), 'theme/config.less');
  }
  return preLoadFile;
};

export const getThemePluginPreLoadFile = (env: CustomConfigEnv) => {
  // 是否构建库模式
  const workspace = searchForWorkspaceRoot(process.cwd());
  const cwd = process.cwd();
  let preLoadFile = '';

  if (env.libDev) {
    preLoadFile = path.resolve(workspace, `packages/theme/index.less`);
  } else if (env.runMode == 'package' || env.runMode == 'serve') {
    if (fs.existsSync(process.cwd() + 'src/theme/index.less')) {
      preLoadFile = path.resolve(process.cwd(), 'src/theme/index.less');
    } else {
      if (fs.existsSync(`${cwd}/node_modules/${FE_PKG}/theme/index.less`)) {
        preLoadFile = path.resolve(cwd, `node_modules/${FE_PKG}/theme/index.less`);
      } else {
        preLoadFile = path.resolve(workspace, `node_modules/${FE_PKG}/theme/index.less`);
      }
    }
  } else {
    preLoadFile = path.resolve(process.cwd(), 'theme/index.less');
  }
  return preLoadFile;
};

export const getAntdPreLoadFile = () => {
  // 是否构建库模式
  const workspace = searchForWorkspaceRoot(process.cwd());
  const cwd = process.cwd();
  let preLoadFile = '';
  if (fs.existsSync(`${cwd}/node_modules/ant-design-vue/dist/antd.less`)) {
    preLoadFile = path.resolve(cwd, `node_modules/ant-design-vue/dist/antd.less`);
  } else {
    preLoadFile = path.resolve(workspace, `node_modules/ant-design-vue/dist/antd.less`);
  }
  return preLoadFile;
};

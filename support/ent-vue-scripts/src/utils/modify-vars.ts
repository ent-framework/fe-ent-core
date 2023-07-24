import path from 'path';
import fs from 'fs';
import { searchForWorkspaceRoot } from 'vite';

export interface ModifyVarOptions {
  cssModifyVars?: Record<string, string>;
}

/**
 * less global variable
 */
export function generateModifyVars(cssModifyOptions?: ModifyVarOptions) {
  const cwd = process.cwd();
  let preLoadFile = '';
  preLoadFile = path.resolve(cwd, `theme/config.less`);
  if (!fs.existsSync(preLoadFile)) {
    preLoadFile = path.resolve(cwd, `node_modules/fe-ent-core/lib/theme/config.less`);
  }
  if (!fs.existsSync(preLoadFile)) {
    const root = searchForWorkspaceRoot(cwd);
    preLoadFile = path.resolve(root, `packages/fe-ent-core/theme/config.less`);
  }

  //const modifyVars = getThemeVariables();
  const cssModifyVars = cssModifyOptions?.cssModifyVars || {};
  return {
    hack: `true;@import (reference) "${preLoadFile}";`,
    ...cssModifyVars,
  };
}

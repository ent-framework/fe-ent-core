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
  preLoadFile = path.resolve(cwd, `src/theme/config.less`);
  if (!fs.existsSync(preLoadFile)) {
    preLoadFile = path.resolve(cwd, `node_modules/fe-ent-core/es/theme/config.less`);
  }
  if (!fs.existsSync(preLoadFile)) {
    const root = searchForWorkspaceRoot(cwd);
    preLoadFile = path.resolve(root, `packages/ent-core/src/theme/config.less`);
  }

  //const modifyVars = getThemeVariables();
  const cssModifyVars = cssModifyOptions?.cssModifyVars || {};
  return {
    hack: `true;@import (reference) "${preLoadFile}";`,
    ...cssModifyVars
  };
}

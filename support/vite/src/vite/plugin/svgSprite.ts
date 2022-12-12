/**
 *  Vite Plugin for fast creating SVG sprites.
 * https://github.com/anncwb/vite-plugin-svg-icons
 */
import { searchForWorkspaceRoot } from 'vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';
import fs from 'fs';

export function configSvgIconsPlugin(isBuild: boolean, libDev: boolean) {
  const workspace = searchForWorkspaceRoot(process.cwd());
  const cwd = process.cwd();
  const iconDirs: string[] = [];
  if (libDev) {
    iconDirs.push(path.resolve(workspace, 'packages/assets/icons'));
  } else {
    if (fs.existsSync(cwd + '/src/assets/icons')) {
      iconDirs.push(path.resolve(cwd, 'src/assets/icons'));
    }

    if (fs.existsSync(workspace + '/node_modules/fe-ent-core/assets/icons')) {
      iconDirs.push(path.resolve(workspace, 'node_modules/fe-ent-core/assets/icons'));
    }
  }

  const svgIconsPlugin = createSvgIconsPlugin({
    iconDirs,
    svgoOptions: isBuild,
    // default
    symbolId: 'icon-[dir]-[name]',
  });
  return svgIconsPlugin;
}

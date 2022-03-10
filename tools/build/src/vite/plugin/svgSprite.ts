/**
 *  Vite Plugin for fast creating SVG sprites.
 * https://github.com/anncwb/vite-plugin-svg-icons
 */

import SvgIconsPlugin from 'vite-plugin-svg-icons';
import path from 'path';
import { findWorkspaceRoot } from '../../utils';

export function configSvgIconsPlugin(isBuild: boolean, preview: boolean) {
  const svgIconsPlugin = SvgIconsPlugin({
    iconDirs: [
      preview
        ? path.resolve(findWorkspaceRoot(), 'packages/assets/icons')
        : path.resolve(process.cwd(), 'src/assets/icons'),
    ],
    svgoOptions: isBuild,
    // default
    symbolId: 'icon-[dir]-[name]',
  });
  return svgIconsPlugin;
}

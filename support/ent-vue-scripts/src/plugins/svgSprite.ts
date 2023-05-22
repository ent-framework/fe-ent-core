/**
 *  Vite Plugin for fast creating SVG sprites.
 * https://github.com/anncwb/vite-plugin-svg-icons
 */

import path from 'path';
import fs from 'fs';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import type { PluginOption } from 'vite';

export function configSvgIconsPlugin({ isBuild }: { isBuild: boolean }) {
  const cwd = process.cwd();
  const iconDirs: string[] = [];

  if (fs.existsSync(cwd + '/src/assets/icons')) {
    iconDirs.push(path.resolve(cwd, 'src/assets/icons'));
  }
  const svgIconsPlugin = createSvgIconsPlugin({
    iconDirs,
    svgoOptions: isBuild,
  });
  return svgIconsPlugin as PluginOption;
}

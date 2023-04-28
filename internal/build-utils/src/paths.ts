import { resolve } from 'path';

export const projRoot = resolve(__dirname, '..', '..', '..');
export const pkgRoot = resolve(projRoot, 'packages');
export const epRoot = resolve(pkgRoot, 'fe-ent-core');
export const extRoot = resolve(projRoot, 'extensions');
export const compRoot = resolve(epRoot, 'components');
export const themeRoot = resolve(pkgRoot, 'theme');
export const hookRoot = resolve(pkgRoot, 'hooks');
export const localeRoot = resolve(pkgRoot, 'locales');
export const directiveRoot = resolve(pkgRoot, 'directives');
export const utilRoot = resolve(pkgRoot, 'utils');
export const docRoot = resolve(projRoot, 'docs');
export const buildRoot = resolve(projRoot, 'internal', 'build');
/** dist */
export const buildOutput = resolve(projRoot, 'dist');
/** dist/element-plus */
export const epOutput = resolve(buildOutput, 'fe-ent-core');

export const projPackage = resolve(projRoot, 'package.json');
export const compPackage = resolve(compRoot, 'package.json');
export const themePackage = resolve(themeRoot, 'package.json');
export const hookPackage = resolve(hookRoot, 'package.json');
export const localePackage = resolve(localeRoot, 'package.json');
export const directivePackage = resolve(directiveRoot, 'package.json');
export const epPackage = resolve(epRoot, 'package.json');
export const utilPackage = resolve(utilRoot, 'package.json');
export const docPackage = resolve(docRoot, 'package.json');

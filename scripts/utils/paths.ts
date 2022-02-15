import { resolve } from 'path';

export const projRoot = resolve(__dirname, '..', '..');
export const pkgRoot = resolve(projRoot, 'packages');
export const compRoot = resolve(pkgRoot, 'components');
export const themeRoot = resolve(pkgRoot, 'theme-chalk');
export const hookRoot = resolve(pkgRoot, 'hooks');
export const localeRoot = resolve(pkgRoot, 'locale');
export const directiveRoot = resolve(pkgRoot, 'directives');
export const epRoot = resolve(pkgRoot, 'core');
export const buildRoot = resolve(pkgRoot, 'build');
export const docRoot = resolve(projRoot, 'docs');

/** dist */
export const buildOutput = resolve(projRoot, 'dist');
/** dist/fe-ent-core */
export const epOutput = resolve(buildOutput, 'fe-ent-core');
export const epOutputPackage = resolve(epOutput, 'package.json');

export const projPackage = resolve(projRoot, 'package.json');
export const compPackage = resolve(compRoot, 'package.json');
export const themePackage = resolve(themeRoot, 'package.json');
export const hookPackage = resolve(hookRoot, 'package.json');
export const localePackage = resolve(localeRoot, 'package.json');
export const directivePackage = resolve(directiveRoot, 'package.json');
export const epPackage = resolve(epRoot, 'package.json');
export const buildPackage = resolve(buildRoot, 'package.json');
export const docPackage = resolve(docRoot, 'package.json');

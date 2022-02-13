const { resolve } = require('path');

const projRoot = resolve(__dirname, '..', '..');
const pkgRoot = resolve(projRoot, 'packages');
const coreRoot = resolve(pkgRoot, 'core');
const themeRoot = resolve(pkgRoot, 'theme-chalk');
const hookRoot = resolve(pkgRoot, 'hooks');
const localeRoot = resolve(pkgRoot, 'locale');
const directiveRoot = resolve(pkgRoot, 'directives');
const epRoot = resolve(pkgRoot, 'element-plus');
const utilRoot = resolve(pkgRoot, 'utils');
const docRoot = resolve(projRoot, 'docs');

/** dist */
const buildOutput = resolve(projRoot, 'dist');
/** dist/element-plus */
const epOutput = resolve(buildOutput, 'element-plus');

const projPackage = resolve(projRoot, 'package.json');
const corePackage = resolve(coreRoot, 'package.json');
const themePackage = resolve(themeRoot, 'package.json');
const hookPackage = resolve(hookRoot, 'package.json');
const localePackage = resolve(localeRoot, 'package.json');
const directivePackage = resolve(directiveRoot, 'package.json');
const epPackage = resolve(epRoot, 'package.json');
const utilPackage = resolve(utilRoot, 'package.json');
const docPackage = resolve(docRoot, 'package.json');

module.exports = { projRoot, coreRoot };

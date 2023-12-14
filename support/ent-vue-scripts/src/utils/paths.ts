import path from 'path';

const root = process.cwd();

function resolvePath(...relativePath: any[]) {
  return path.resolve(root, ...relativePath);
}

const components = resolvePath('./components');
const directives = resolvePath('./directives');
const theme = resolvePath('./theme');

// icon相关
const icon = resolvePath('./components/icons');
const iconSvgs = resolvePath('./icons');
const iconComponents = resolvePath('./components/icons');

export default {
  resolvePath,
  root,
  icon,
  iconSvgs,
  iconComponents,
  components,
  directives,
  theme,
};

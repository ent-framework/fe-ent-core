import { buildConfig } from '../build-info';
import { EP_PREFIX } from '@ent-build/build-constants';
import type { Module } from '../build-info';
/** used for type generator */
export const pathRewriter = (module: Module) => {
  const config = buildConfig[module];

  return (id: string) => {
    id = id.replaceAll(`${EP_PREFIX}/theme`, 'fe-ent-core/theme');
    id = id.replaceAll(`${EP_PREFIX}/`, `${config.bundle.path}/`);
    return id;
  };
};

export const excludeFiles = (files: string[]) => {
  const excludes = ['node_modules', 'test', 'mock', 'gulpfile', 'dist'];
  return files.filter((path) => !excludes.some((exclude) => path.includes(exclude)));
};

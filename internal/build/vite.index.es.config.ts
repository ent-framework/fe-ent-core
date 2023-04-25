import { readPackageJSON } from 'pkg-types';
import { defineConfig, searchForWorkspaceRoot, UserConfig } from 'vite';
import { ModuleFormat } from 'rollup';
import { createPlugins } from 'fe-ent-build';
import { excludeFiles } from './src/utils';
import glob from 'fast-glob';
import { epRoot } from '@ent-core/build-utils';
import { defineModulesConfig } from './vite.modules.config';

export default defineConfig(async () => {
  const input = excludeFiles(
    await glob('**/*.{js,ts,tsx,vue}', {
      cwd: epRoot,
      absolute: true,
      onlyFiles: true,
    }),
  );
  console.log(input.length);
  return defineModulesConfig({
    formats: ['es'],
    input,
    root: epRoot,
  });
});

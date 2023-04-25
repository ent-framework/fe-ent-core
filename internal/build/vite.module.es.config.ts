import { readPackageJSON } from 'pkg-types';
import { defineConfig, searchForWorkspaceRoot, UserConfig } from 'vite';
import { ModuleFormat } from 'rollup';
import { createPlugins } from 'fe-ent-build';
import { excludeFiles } from './src/utils';
import glob from 'fast-glob';
import { pkgRoot, epRoot } from '@ent-core/build-utils';
import { defineModulesConfig } from './vite.modules.config';

export default defineConfig(async () => {
  const all = excludeFiles(
    await glob('**/*.{js,ts,tsx,vue}', {
      cwd: pkgRoot,
      absolute: true,
      onlyFiles: true,
    }),
  );
  console.log(all);
  console.log(all.length);
  const input = all.filter(
    (value) => !value.endsWith('fe-ent-core/index.ts') && !value.endsWith('fe-ent-core/version.ts'),
  );
  console.log(input.length);
  return defineModulesConfig({
    formats: ['es'],
    input: all,
    root: pkgRoot,
  });
});

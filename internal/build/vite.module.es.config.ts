import { defineConfig } from 'vite';
import { excludeFiles } from './src/utils';
import glob from 'fast-glob';
import { epRoot } from '@ent-build/build-utils';
import { defineModulesConfig } from './vite.modules.config';

export default defineConfig(async () => {
  const input = excludeFiles(
    await glob('**/*.{js,ts,tsx,vue}', {
      cwd: epRoot,
      absolute: true,
      onlyFiles: true,
    }),
  );
  return defineModulesConfig({
    formats: ['es'],
    input,
    root: epRoot,
    output: 'es',
  });
});

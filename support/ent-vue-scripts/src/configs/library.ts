import { readPackageJSON } from 'pkg-types';
import { mergeConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { createPlugins } from '../plugins';
import { generateModifyVars } from '../utils/modify-vars';
import vueExportHelper from '../plugins/vite-plugin-vue-export-helper';
import external from '../plugins/vite-plugin-external';
import { commonConfig } from './common';
import type { ModuleFormat } from 'rollup';
import type { InlineConfig, UserConfig } from 'vite';

async function definePackageConfig() {
  const root = process.cwd();
  const plugins = await createPlugins({
    isBuild: true,
    mode: 'lib',
    root,
    enableAnalyze: false,
    enableMock: false,
    compress: 'none',
  });
  const { dependencies = {}, peerDependencies = {} } = await readPackageJSON(root);
  const deps = [...Object.keys(dependencies), ...Object.keys(peerDependencies)];
  let entDeps: string[] = [];
  if (deps.includes('fe-ent-core')) {
    const { dependencies: entDependencies = {}, peerDependencies: entPeerDependencies = {} } =
      await readPackageJSON(`${root}/node_modules/fe-ent-core`);
    entDeps = [...Object.keys(entDependencies), ...Object.keys(entPeerDependencies)];
  }
  entDeps.push(
    ...[
      'fe-ent-core/lib/components',
      'fe-ent-core/lib/directives',
      'fe-ent-core/lib/hooks',
      'fe-ent-core/lib/locales',
      'fe-ent-core/lib/logics',
      'fe-ent-core/lib/router',
      'fe-ent-core/lib/store',
      'fe-ent-core/lib/utils',
    ],
  );
  const packageConfig: UserConfig = {
    build: {
      lib: {
        entry: 'index.ts',
        formats: ['es', 'cjs'],
        fileName: (format: ModuleFormat, entryName: string) => {
          return `${entryName}.${format === 'cjs' ? 'js' : 'mjs'}`;
        },
      },
      rollupOptions: {
        external: [...deps, ...entDeps],
        output: {
          exports: 'named',
        },
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: generateModifyVars(),
          javascriptEnabled: true,
        },
      },
    },
    plugins: [
      external(),
      ...plugins,
      dts({
        entryRoot: `${root}`,
        include: ['index.ts', 'components/**/*.{ts,tsx,vue}'],
        outputDir: `${root}/dist/types`,
        logLevel: 'error',
      }),
      vueExportHelper(),
    ],
  };
  const mergedConfig = mergeConfig(
    commonConfig({ command: 'build', mode: 'production' }),
    packageConfig,
  );

  return mergedConfig as InlineConfig;
}

export { definePackageConfig };

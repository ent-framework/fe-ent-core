import { readPackageJSON } from 'pkg-types';
import { defineConfig, mergeConfig, type UserConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { commonConfig } from './common';
import { createPlugins } from '../plugins';
import { ModuleFormat } from 'rollup';
import { generateModifyVars } from '../utils/modifyVars';

interface DefineOptions {
  overrides?: UserConfig;
  options?: {
    dtsEntryRoot?: string;
    dtsOutput?: string;
  };
}

function definePackageConfig(defineOptions: DefineOptions = {}) {
  const { overrides = {} } = defineOptions;

  return defineConfig(async ({ command, mode }) => {
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
    const packageConfig: UserConfig = {
      build: {
        lib: {
          entry: 'src/index.ts',
          formats: ['es', 'cjs'],
          fileName: (format: ModuleFormat, entryName: string) => {
            return `${entryName}.${format === 'cjs' ? 'js' : 'mjs'}`;
          },
        },
        rollupOptions: {
          external: [...deps, ...entDeps],
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
        ...plugins,
        dts({
          entryRoot: `${defineOptions?.options?.dtsEntryRoot || root}`,
          outputDir: `${defineOptions?.options?.dtsOutput || 'dist'}`,
          logLevel: 'error',
        }),
      ],
    };
    const mergedConfig = mergeConfig(commonConfig({ command, mode }), packageConfig);

    return mergeConfig(mergedConfig, overrides);
  });
}

export { definePackageConfig };

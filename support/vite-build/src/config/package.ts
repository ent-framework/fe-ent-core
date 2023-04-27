import { readPackageJSON } from 'pkg-types';
import { defineConfig, mergeConfig, type UserConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { commonConfig } from './common';
import { createPlugins } from '../plugins';
import { ModuleFormat } from 'rollup';

interface DefineOptions {
  overrides?: UserConfig;
  options?: {
    //
  };
}

function definePackageConfig(defineOptions: DefineOptions = {}) {
  const { overrides = {} } = defineOptions;

  return defineConfig(async ({ command }) => {
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
          external: [...Object.keys(dependencies), ...Object.keys(peerDependencies)],
        },
      },
      plugins: [
        ...plugins,
        dts({
          entryRoot: `${root}`,
          logLevel: 'error',
        }),
      ],
    };
    const mergedConfig = mergeConfig(commonConfig, packageConfig);

    return mergeConfig(mergedConfig, overrides);
  });
}

export { definePackageConfig };

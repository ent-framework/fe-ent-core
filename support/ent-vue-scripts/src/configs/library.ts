import { readPackageJSON } from 'pkg-types';
import { mergeConfig } from 'vite';
import dts from 'vite-plugin-dts';
import glob from 'fast-glob';
import { createPlugins } from '../plugins';
import { generateModifyVars } from '../utils/modify-vars';
import vueExportHelper from '../plugins/vite-plugin-vue-export-helper';
import external from '../plugins/vite-plugin-external';
import { excludeFiles } from '../utils/exclude-files';
import { commonConfig } from './common';
import type { ModuleFormat } from 'rollup';
import type { InlineConfig, UserConfig } from 'vite';

/***
 * Library 模式
 */
async function defineLibraryConfig() {
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
  const input = excludeFiles(
    glob.sync('components/*.{js,ts,tsx,vue}', {
      cwd: process.cwd(),
      absolute: false,
      onlyFiles: true,
    }),
  ).map((file) => `${process.cwd()}/${file}`);
  const packageConfig: UserConfig = {
    build: {
      target: 'modules',
      outDir: 'es',
      emptyOutDir: false,
      minify: false,
      sourcemap: true,
      lib: {
        entry: 'index.ts',
        formats: ['es', 'cjs'],
        fileName: (format: ModuleFormat, entryName: string) => {
          return `${entryName}.${format === 'cjs' ? 'js' : 'mjs'}`;
        },
      },
      rollupOptions: {
        input: ['index.ts', ...input],
        output: [
          {
            interop: 'default',
            format: 'es',
            dir: 'es',
            entryFileNames: '[name].mjs',
            preserveModules: true,
            exports: 'named',
            //preserveModulesRoot: 'components',
          },
          {
            interop: 'auto',
            format: 'commonjs',
            dir: 'lib',
            entryFileNames: '[name].js',
            preserveModules: true,
            exports: 'named',
            //preserveModulesRoot: 'components',
          },
        ],
        external: [...deps, ...entDeps],
        // output: {
        //   exports: 'named',
        // },
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
        outputDir: [`${root}/es/`, `${root}/lib/`],
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

export { defineLibraryConfig };

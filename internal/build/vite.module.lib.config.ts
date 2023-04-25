import { readPackageJSON } from 'pkg-types';
import { defineConfig, searchForWorkspaceRoot, UserConfig } from 'vite';
import { ModuleFormat } from 'rollup';
import dts from 'vite-plugin-dts';
import { createPlugins } from 'fe-ent-build';
import { excludeFiles } from './src/utils';
import glob from 'fast-glob';
import { epRoot, pkgRoot } from '@ent-core/build-utils';

export default defineConfig(async () => {
  const workspace = searchForWorkspaceRoot(process.cwd());

  const input = excludeFiles(
    await glob('**/*.{js,ts,tsx,vue}', {
      cwd: pkgRoot,
      absolute: true,
      onlyFiles: true,
    }),
  );

  console.log(input);

  const plugins = await createPlugins({
    isBuild: true,
    mode: 'lib',
    root: workspace,
    enableAnalyze: false,
    enableMock: false,
    compress: 'none',
  });

  const { dependencies = {}, peerDependencies = {} } = await readPackageJSON(
    `${workspace}/packages/fe-ent-core`,
  );
  const packageConfig: UserConfig = {
    root: `${workspace}/`,
    resolve: {
      alias: [
        {
          find: /^@ent-core\/(.*)$/,
          replacement: `${workspace}/packages/$1`,
        },
      ],
    },
    build: {
      outDir: `${workspace}/dist/fe-ent-core`,
      lib: {
        entry: input,
        formats: ['es', 'cjs'],
        fileName: (format: ModuleFormat, entryName: string) => {
          console.log(entryName);
          return `${entryName}.${format === 'cjs' ? 'js' : 'mjs'}`;
        },
      },
      reportCompressedSize: false,
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        maxParallelFileOps: 3,
        external: [...Object.keys(dependencies), ...Object.keys(peerDependencies)],
        output: {
          preserveModules: true,
          preserveModulesRoot: pkgRoot,
          sourcemap: true,
        },
      },
      emptyOutDir: true,
    },
    esbuild: {
      drop: ['console', 'debugger'],
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
    optimizeDeps: {
      // @iconify/iconify: The dependency is dynamically and virtually loaded by @purge-icons/generated, so it needs to be specified explicitly
      include: [
        '@iconify/iconify',
        'ant-design-vue/es/locale/zh_CN',
        'ant-design-vue/es/locale/en_US',
      ],
      exclude: ['vue-demi'],
    },
    plugins: [
      ...plugins,
      dts({
        tsConfigFilePath: `${workspace}/tsconfig.tds.json`,
        entryRoot: `${workspace}/packages`,
        exclude: 'fe-ent-core/index.ts',
        logLevel: 'error',
        outputDir: [`${workspace}/dist/fe-ent-core/lib`, `${workspace}/dist/fe-ent-core/es`],
      }),
    ],
  };

  return packageConfig;
});

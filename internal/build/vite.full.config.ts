import { readPackageJSON } from 'pkg-types';
import { defineConfig, searchForWorkspaceRoot, UserConfig } from 'vite';
import { ModuleFormat } from 'rollup';
import { createPlugins } from 'fe-ent-build';

export default defineConfig(async () => {
  const workspace = searchForWorkspaceRoot(process.cwd());

  const plugins = await createPlugins({
    isBuild: true,
    mode: 'lib',
    root: workspace,
    enableAnalyze: false,
    enableMock: false,
    compress: 'none',
  });

  const { dependencies = {}, peerDependencies = {} } = await readPackageJSON(
    `${workspace}/packages/core`,
  );
  const packageConfig: UserConfig = {
    root: `${workspace}/`,
    resolve: {
      alias: [
        {
          find: /^@ent-core\/(.*)$/,
          replacement: `${workspace}/packages/core/$1`,
        },
      ],
    },
    build: {
      outDir: `${workspace}/dist/fe-ent-core/dist`,
      lib: {
        entry: `${workspace}/packages/core/index.ts`,
        formats: ['es', 'cjs'],
        fileName: (format: ModuleFormat, entryName: string) => {
          return `${entryName}.${format === 'cjs' ? 'js' : 'mjs'}`;
        },
      },
      reportCompressedSize: false,
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        maxParallelFileOps: 3,
        external: [...Object.keys(dependencies), ...Object.keys(peerDependencies)],
        output: {
          exports: 'named',
        },
      },
      minify: false,
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
      // dts({
      //   tsConfigFilePath: `${workspace}/tsconfig.tds.json`,
      //   entryRoot: `${workspace}/packages/core`,
      //   logLevel: 'error',
      //   afterDiagnostic: (diagnostics) => {
      //     diagnostics.forEach((diagnostic) => {
      //       console.log(diagnostic);
      //     });
      //   },
      //   outputDir: [`${workspace}/dist/fe-ent-core/lib`, `${workspace}/dist/fe-ent-core/es`],
      // }),
    ],
  };

  return packageConfig;
});

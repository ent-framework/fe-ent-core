import { defineConfig, searchForWorkspaceRoot, UserConfig } from 'vite';
import { excludeFiles } from './src/utils';
import glob from 'fast-glob';
import { pkgRoot, epRoot } from '@ent-build/build-utils';
import { createPlugins } from 'fe-ent-build';
import { readPackageJSON } from 'pkg-types';
import { ModuleFormat } from 'rollup';

export default defineConfig(async () => {
  const input = excludeFiles(
    await glob('**/*.{js,ts,tsx,vue}', {
      cwd: pkgRoot,
      absolute: true,
      onlyFiles: true,
    }),
  );
  const cwd = process.cwd();
  const workspace = searchForWorkspaceRoot(cwd);

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
  // console.log([...Object.keys(dependencies), ...Object.keys(peerDependencies)]);
  const packageConfig: UserConfig = {
    root: `${workspace}`,
    resolve: {
      alias: [
        {
          find: /^@ent-core\/(.*)$/,
          replacement: `${workspace}/packages/$1`,
        },
      ],
    },
    build: {
      outDir: `${workspace}/dist/unocss/`,
      lib: {
        entry: input,
        formats: ['es'],
        fileName: (format: ModuleFormat, entryName: string) => {
          return `${entryName}.${format === 'cjs' ? 'js' : 'mjs'}`;
        },
      },
      reportCompressedSize: false,
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        //input: options.input,
        maxParallelFileOps: 3,
        external: [
          ...Object.keys(dependencies),
          ...Object.keys(peerDependencies),
          'ant-design-vue/es/locale/zh_CN',
          'ant-design-vue/es/locale/en_US',
          'dayjs/locale/zh-cn',
          'dayjs/locale/en',
          'dayjs/plugin/weekday',
        ],
        output: {
          dir: `${workspace}/dist/unocss/`,
          preserveModules: true,
          preserveModulesRoot: epRoot,
          sourcemap: false,
          exports: 'named',
        },
        //plugins: [commonjs()],
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
        'ant-design-vue',
        'ant-design-vue/es/locale/zh_CN',
        'ant-design-vue/es/locale/en_US',
        'dayjs',
        'dayjs/locale/zh-cn',
        'dayjs/locale/en',
        'dayjs/plugin/weekday',
      ],
      exclude: ['vue-demi'],
    },
    plugins: [...plugins],
  };

  return packageConfig;
});

import { readPackageJSON } from 'pkg-types';
import { LibraryFormats, searchForWorkspaceRoot, UserConfig } from 'vite';
import { InputOption, ModuleFormat } from 'rollup';
import { createPlugins } from 'fe-ent-build';
interface DefineOptions {
  formats: LibraryFormats[];
  input: InputOption;
  root?: string;
  output?: string;
}

async function defineModulesConfig(options: DefineOptions) {
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
  // console.log([...Object.keys(dependencies), ...Object.keys(peerDependencies)]);
  const packageConfig: UserConfig = {
    root: `${workspace}`,
    resolve: {
      alias: [
        {
          find: /^@ent-core\/(.*)$/,
          replacement: `${workspace}/packages/core/$1`,
        },
      ],
    },
    build: {
      outDir: `${workspace}/dist/fe-ent-core/${options.output}`,
      lib: {
        entry: options.input,
        formats: options.formats,
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
          dir: `${workspace}/dist/fe-ent-core/${options.output}`,
          preserveModules: true,
          preserveModulesRoot: options.root,
          sourcemap: true,
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
}

export { defineModulesConfig };

import { readPackageJSON } from 'pkg-types';
import { defineConfig, LibraryFormats, searchForWorkspaceRoot, UserConfig } from 'vite';
import { InputOption, ModuleFormat } from 'rollup';
import { createPlugins } from 'fe-ent-build';
import { excludeFiles } from './src/utils';
import glob from 'fast-glob';
import { pkgRoot } from '@ent-core/build-utils';

interface DefineOptions {
  formats: LibraryFormats[];
  input: InputOption;
  root?: string;
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
      outDir: `${workspace}/dist/fe-ent-core/es`,
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
        external: [...Object.keys(dependencies), ...Object.keys(peerDependencies)],
        output: {
          dir: `${workspace}/dist/fe-ent-core/es`,
          preserveModules: true,
          preserveModulesRoot: options.root,
          sourcemap: false,
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
    plugins: [...plugins],
  };

  return packageConfig;
}

export { defineModulesConfig };

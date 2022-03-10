// @ts-check
import path from 'path';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

/**
 * @type { import('rollup').RollupOptions }
 */
const sharedNodeOptions = {
  treeshake: {
    moduleSideEffects: 'no-external',
    propertyReadSideEffects: false,
    tryCatchDeoptimization: false,
  },
  output: {
    dir: path.resolve(__dirname, 'dist'),
    entryFileNames: `[name].js`,
    chunkFileNames: 'chunks/dep-[hash].js',
    exports: 'named',
    format: 'cjs',
    externalLiveBindings: false,
    freeze: false,
  },
  onwarn(warning, warn) {
    // node-resolve complains a lot about this but seems to still work?
    if (warning.message.includes('Package subpath')) {
      return;
    }
    // we use the eval('require') trick to deal with optional deps
    if (warning.message.includes('Use of eval')) {
      return;
    }
    if (warning.message.includes('Circular dependency')) {
      return;
    }
    warn(warning);
  },
};

/**
 *
 * @param {boolean} isProduction
 * @returns {import('rollup').RollupOptions}
 */
const createNodeConfig = (isProduction) => {
  /**
   * @type {*[]}
   */
  const dependencies = [
    ...Object.keys(require('./package.json').dependencies),
    ...(isProduction ? [] : Object.keys(require('./package.json').devDependencies)),
  ];

  const peerDependencies = [...Object.keys(require('./package.json').peerDependencies)];

  const external = dependencies.filter((s) => !peerDependencies.includes(s));
  const nodeConfig = {
    ...sharedNodeOptions,
    input: {
      index: path.resolve(__dirname, 'src/index.ts'),
      cli: path.resolve(__dirname, 'src/cli.ts'),
    },
    output: {
      ...sharedNodeOptions.output,
      sourcemap: !isProduction,
    },
    external: ['rollup', 'vite', 'ant-design-vue', 'vite-plugin-ent-theme', ...external],
    plugins: [
      nodeResolve({ preferBuiltins: true }),
      typescript({
        tsconfig: './tsconfig.json',
        module: 'esnext',
        target: 'es2019',
        include: ['src/**/*.ts', './types/**'],
        exclude: ['src/**/__tests__/**'],
        esModuleInterop: true,
        // in production we use api-extractor for dts generation
        // in development we need to rely on the rollup ts plugin
        ...(isProduction
          ? {
              declaration: false,
              sourceMap: false,
            }
          : {
              declaration: true,
              declarationDir: path.resolve(__dirname, 'dist/'),
            }),
      }),
      commonjs({
        extensions: ['.js'],
        ignoreDynamicRequires: true,
        // Optional peer deps of ws. Native deps that are mostly for performance.
        // Since ws is not that perf critical for us, just ignore these deps.
        ignore: ['bufferutil', 'utf-8-validate'],
      }),
      json(),
    ],
  };

  return nodeConfig;
};

/**
 * Terser needs to be run inside a worker, so it cannot be part of the main
 * bundle. We produce a separate bundle for it and shims plugin/terser.ts to
 * use the production path during build.
 *
 * @type { import('rollup').RollupOptions }
 */
const terserConfig = {
  ...sharedNodeOptions,
  output: {
    ...sharedNodeOptions.output,
    exports: 'default',
    sourcemap: false,
  },
  input: {
    terser: require.resolve('terser'),
  },
  plugins: [nodeResolve(), commonjs()],
};

export default (commandLineArgs) => {
  const isDev = commandLineArgs.watch;
  const isProduction = !isDev;

  console.log(`Build tools/cli in production mode:  ${isProduction}`);

  return [createNodeConfig(isProduction), ...(isProduction ? [terserConfig] : [])];
};

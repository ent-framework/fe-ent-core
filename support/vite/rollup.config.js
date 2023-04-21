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
    externalLiveBindings: true,
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
    },
    output: {
      ...sharedNodeOptions.output,
      sourcemap: !isProduction,
    },
    external: [
      'rollup',
      'vite',
      'ant-design-vue',
      'fe-vite-plugin-ent-theme',
      'fsevents',
    ],
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
      commonjs(),
      json(),
    ],
  };

  return nodeConfig;
};


export default (commandLineArgs) => {
  const isDev = commandLineArgs.watch;
  const isProduction = !isDev;

  console.log(`Build tools/build in production mode:  ${isProduction}`);

  return [createNodeConfig(isProduction)];
};

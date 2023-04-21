import path from 'path';
import typescript from '@rollup/plugin-typescript';

const clientInput = {
  input: path.resolve(__dirname, './src/index.ts'),
  plugins: [
    typescript({
      target: 'es2018',
      include: ['./src/*.ts'],
      baseUrl: path.resolve(__dirname, 'src'),
    }),
  ],
};

const clientConfigs = [
  {
    ...clientInput,
    output: {
      format: 'esm',
      file: path.resolve(__dirname, 'dist', 'index.mjs'),
      sourcemap: true,
    },
  },
  {
    ...clientInput,
    output: {
      format: 'cjs',
      file: path.resolve(__dirname, 'dist', 'index.js'),
      sourcemap: true,
    },
  },
];

export default () => {
  return [...clientConfigs];
};

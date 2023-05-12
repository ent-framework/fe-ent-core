import { definePackageConfig } from 'fe-ent-build';

export default definePackageConfig({
  overrides: {
    build: {
      lib: {
        entry: 'src/index.ts',
      },
      rollupOptions: {
        external: [
          'fe-ent-core/lib/components',
          'fe-ent-core/lib/hooks',
          'fe-ent-core/lib/logics',
          'fe-ent-core/lib/store',
          'fe-ent-core/lib/utils',
          'fe-ent-core/lib/router',
          'fe-ent-core/lib/locales',
          'fe-ent-core/lib/directives',
          'echarts/core',
          'echarts/charts',
          'echarts/components',
          'echarts/renderers',
        ],
      },
      minify: false,
    },
  },
  options: {
    dtsEntryRoot: `${process.cwd()}/src`,
    dtsOutput: `${process.cwd()}/dist/types`,
  },
});

import { definePackageConfig } from 'fe-ent-build';

export default definePackageConfig({
  overrides: {
    build: {
      lib: {
        entry: 'src/index.ts',
      },
      sourcemap: true,
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
        ],
      },
      minify: false,
    },
    optimizeDeps: {
      include: [
        '@iconify/iconify',
        'ant-design-vue/es/locale/zh_CN',
        'ant-design-vue/es/locale/en_US',
      ],
    },
  },
  options: {
    dtsEntryRoot: `${process.cwd()}/src`,
    dtsOutput: `${process.cwd()}/dist/types`,
  },
});

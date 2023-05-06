import { definePackageConfig, generateModifyVars } from 'fe-ent-build';

export default definePackageConfig({
  overrides: {
    build: {
      lib: {
        entry: 'src/index.ts',
      },
      sourcemap: true,
    },
    optimizeDeps: {
      include: [
        '@iconify/iconify',
        'ant-design-vue/es/locale/zh_CN',
        'ant-design-vue/es/locale/en_US',
      ],
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: generateModifyVars(),
          javascriptEnabled: true,
        },
      },
    },
  },
  options: {
    dtsEntryRoot: `${process.cwd()}/src`,
    dtsOutput: `${process.cwd()}/dist/types`,
  },
});

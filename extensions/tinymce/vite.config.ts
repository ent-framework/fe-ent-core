import { definePackageConfig, generateModifyVars } from 'fe-ent-build';
export default definePackageConfig({
  overrides: {
    build: {
      lib: {
        entry: 'src/index.ts',
      },
    },
    optimizeDeps: {
      include: ['fe-ent-core'],
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
});

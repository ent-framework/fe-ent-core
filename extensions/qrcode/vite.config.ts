import { definePackageConfig } from 'fe-ent-build';
export default definePackageConfig({
  overrides: {
    build: {
      lib: {
        entry: 'src/index.ts',
      },
    },
    optimizeDeps: {
      include: ['qrcode'],
    },
  },
});

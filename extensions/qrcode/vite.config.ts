import { definePackageConfig } from 'fe-ent-build';
export default definePackageConfig({
  overrides: {
    build: {
      lib: {
        entry: 'src/index.ts',
      },
      sourcemap: true,
    },
    optimizeDeps: {
      include: ['qrcode'],
    },
  },
});

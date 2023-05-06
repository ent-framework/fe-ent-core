import { definePackageConfig } from 'fe-ent-build';
export default definePackageConfig({
  overrides: {
    build: {
      lib: {
        entry: 'src/index.ts',
      },
      sourcemap: true,
      rollupOptions: {
        external: ['fe-ent-core/lib/utils'],
      },
    },
    optimizeDeps: {
      include: ['qrcode'],
    },
  },
  options: {
    dtsEntryRoot: `${process.cwd()}/src`,
    dtsOutput: `${process.cwd()}/dist/types`,
  },
});

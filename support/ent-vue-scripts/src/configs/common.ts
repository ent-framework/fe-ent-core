import { mergeConfig } from 'vite';
import type { ConfigEnv, UserConfig } from 'vite';

export const theme = {
  breakpoints: {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    '2xl': '1600px',
  },
};

function commonConfig({ command, mode }: ConfigEnv): UserConfig {
  const userConfig = {
    server: {
      host: true,
    },
    build: {
      reportCompressedSize: false,
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        // TODO: Prevent memory overflow
        maxParallelFileOps: 3,
      },
    },
  };

  if (command === 'build') {
    return mergeConfig(userConfig, {
      esbuild: {
        drop: ['console', 'debugger'],
      },
    });
  }

  return userConfig;
}

export { commonConfig };

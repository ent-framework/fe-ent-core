import { mergeConfig } from 'vite';
import type { ConfigEnv, UserConfig } from 'vite';

function commonConfig({ command }: ConfigEnv): UserConfig {
  const userConfig = {
    server: {
      host: true
    },
    build: {
      reportCompressedSize: false,
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        // TODO: Prevent memory overflow
        maxParallelFileOps: 3
      }
    }
  };

  if (command === 'build') {
    return mergeConfig(userConfig, {
      esbuild: {
        drop: ['console', 'debugger']
      }
    });
  }

  return userConfig;
}

export { commonConfig };

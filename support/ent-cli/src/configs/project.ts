import { resolve } from 'node:path';
import { loadEnv, mergeConfig } from 'vite';
import { createPlugins } from '../plugins/index.js';
import { generateModifyVars } from '../utils/modify-vars.js';
import { wrapperEnv } from '../utils/env.js';
import { commonConfig } from './common.js';
import type { Alias, InlineConfig, UserConfig } from 'vite';
import type { ViteEnv } from '../utils/env.js';
import type { DefineOptions } from './type.js';

async function defineProjectConfig(defineOptions: DefineOptions) {
  const { overrides = {} } = defineOptions;
  const { command, mode } = defineOptions;
  const root = process.cwd();
  const isBuild = command === 'build';
  const env: Record<string, string> = loadEnv(mode, root);
  const {
    VITE_BUILD_USE_MOCK,
    VITE_BUILD_COMPRESS,
    VITE_BUILD_ENABLE_ANALYZE,
    VITE_BUILD_ENABLE_INSPECT,
    VITE_BUILD_ENABLE_CERT
  } = env;
  const viteEnv = wrapperEnv(env, mode);
  const defineData = await createDefineData(root, viteEnv);
  const plugins = await createPlugins({
    isBuild,
    mode: isBuild ? 'build' : 'dev',
    root,
    enableAnalyze: VITE_BUILD_ENABLE_ANALYZE === 'true',
    enableMock: VITE_BUILD_USE_MOCK === 'true',
    enableInspect: VITE_BUILD_ENABLE_INSPECT === 'true',
    enableCert: VITE_BUILD_ENABLE_CERT === 'true',
    compress: VITE_BUILD_COMPRESS
  });
  const pathResolve = (pathname: string) => resolve(root, '.', pathname);

  const alias: Alias[] = [];
  alias.push(
    ...[
      {
        find: /\/@\//,
        replacement: `${pathResolve('src')}/`
      },
      // @/xxxx => src/xxxx
      {
        find: /@\//,
        replacement: `${pathResolve('src')}/`
      }
    ]
  );
  const hashed = defineOptions.options?.hash ?? true;
  const applicationConfig: UserConfig = {
    resolve: {
      alias
    },
    define: defineData,
    build: {
      target: ['es2015', 'edge88', 'firefox78', 'chrome61', 'safari11'],
      cssTarget: 'chrome80',
      rollupOptions: {
        output: {
          entryFileNames: hashed ? `assets/[name]-[hash].js` : `assets/[name].js`,
          chunkFileNames: hashed ? `assets/[name]-[hash].js` : `assets/[name].js`,
          assetFileNames: hashed ? `assets/[name]-[hash].[ext]` : `assets/[name].[ext]`,
          manualChunks: {
            vue: ['vue', 'pinia', 'vue-router'],
            naive: ['naive-ui'],
            icons: ['@vicons/ionicons5', '@vicons/antd']
          }
        }
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: generateModifyVars(defineOptions.options?.cssModify),
          javascriptEnabled: true
        }
      }
    },
    plugins
  };

  const mergedConfig = mergeConfig(commonConfig({ command, mode }), applicationConfig);

  return mergeConfig(mergedConfig, overrides) as InlineConfig;
}

async function createDefineData(root: string, viteEnv: ViteEnv) {
  try {
    return {
      'process.env': viteEnv
    };
  } catch {
    return {};
  }
}

export { defineProjectConfig };

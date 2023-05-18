import { resolve } from 'node:path';
import path from 'path';
import dayjs from 'dayjs';
import { readPackageJSON } from 'pkg-types';
import { loadEnv, mergeConfig, searchForWorkspaceRoot } from 'vite';
import glob from 'fast-glob';
import { createPlugins } from '../plugins';
import { generateModifyVars } from '../utils/modify-vars';
import { wrapperEnv } from '../utils/env';
import { commonConfig } from './common';
import type { Alias, InlineConfig, UserConfig } from 'vite';
import type { ViteEnv } from '../utils/env';
import type { DefineOptions } from './type';

async function defineApplicationConfig(defineOptions: DefineOptions) {
  const { overrides = {} } = defineOptions;
  const { command, mode } = defineOptions;
  const root = process.cwd();
  const isBuild = command === 'build';
  const env: Record<string, string> = loadEnv(mode, root);
  const {
    VITE_BUILD_USE_MOCK,
    VITE_BUILD_COMPRESS,
    VITE_ENABLE_ANALYZE,
    VITE_BUILD_ENABLE_INSPECT,
    VITE_ENABLE_CERT,
  } = env;
  const viteEnv = wrapperEnv(env, mode);
  const defineData = await createDefineData(root, viteEnv);
  const plugins = await createPlugins({
    isBuild,
    mode: isBuild ? 'build' : 'dev',
    root,
    enableAnalyze: VITE_ENABLE_ANALYZE === 'true',
    enableMock: VITE_BUILD_USE_MOCK === 'true',
    enableInspect: VITE_BUILD_ENABLE_INSPECT === 'true',
    enableCert: VITE_ENABLE_CERT === 'true',
    compress: VITE_BUILD_COMPRESS,
  });
  const workspace = searchForWorkspaceRoot(root);
  const optimizeDeps = (
    await glob(['dayjs/(locale|plugin)/*.js'], {
      cwd: path.resolve(workspace, 'node_modules'),
    })
  ).map((dep) => dep.replace(/\.js$/, ''));

  const pathResolve = (pathname: string) => resolve(root, '.', pathname);

  const alias: Alias[] = [];
  alias.push(
    ...[
      {
        find: 'vue-i18n',
        replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
      },
      { find: 'pinia', replacement: 'pinia/dist/pinia.cjs' },
      // /@/xxxx => src/xxxx
      {
        find: /\/@\//,
        replacement: `${pathResolve('src')}/`,
      },
      // @/xxxx => src/xxxx
      {
        find: /@\//,
        replacement: `${pathResolve('src')}/`,
      },
    ],
  );
  if (isBuild) {
    alias.push({ find: 'vue-router', replacement: 'vue-router/dist/vue-router.prod.cjs' });
  } else {
    alias.push({ find: 'vue-router', replacement: 'vue-router/dist/vue-router.cjs' });
  }
  const applicationConfig: UserConfig = {
    resolve: {
      alias,
    },
    define: defineData,
    build: {
      target: 'es2015',
      cssTarget: 'chrome80',
      rollupOptions: {
        output: {
          manualChunks: {
            vue: ['vue', 'pinia', 'vue-router'],
            antv: ['ant-design-vue'],
            antd: ['@ant-design/icons-vue'],
          },
        },
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: generateModifyVars(defineOptions.options?.cssModify),
          javascriptEnabled: true,
        },
      },
    },
    optimizeDeps: {
      include: [...optimizeDeps],
    },
    plugins,
  };

  const mergedConfig = mergeConfig(commonConfig({ command, mode }), applicationConfig);

  return mergeConfig(mergedConfig, overrides) as InlineConfig;
}

async function createDefineData(root: string, viteEnv: ViteEnv) {
  try {
    const pkgJson = await readPackageJSON(root);
    const { dependencies, devDependencies, name, version } = pkgJson;

    const __APP_INFO__ = {
      pkg: { dependencies, devDependencies, name, version },
      lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    };
    return {
      'process.env': viteEnv,
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    };
  } catch {
    return {};
  }
}

export { defineApplicationConfig };

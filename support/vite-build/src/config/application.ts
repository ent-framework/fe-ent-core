import { resolve } from 'node:path';
import dayjs from 'dayjs';
import { readPackageJSON } from 'pkg-types';
import { Alias, defineConfig, loadEnv, mergeConfig, type UserConfig } from 'vite';
import { createPlugins } from '../plugins';
import { generateModifyVars, ModifyVarOptions } from '../utils/modifyVars';
import { commonConfig } from './common';
import { ViteEnv, wrapperEnv } from '../utils/env';
import glob from 'fast-glob';
import path from 'path';
import { searchForWorkspaceRoot } from 'vite';

interface DefineOptions {
  overrides?: UserConfig;
  options?: {
    cssModify?: ModifyVarOptions;
  };
}

function defineApplicationConfig(defineOptions: DefineOptions = {}) {
  const { overrides = {} } = defineOptions;

  return defineConfig(async ({ command, mode }) => {
    const root = process.cwd();
    const isBuild = command === 'build';
    const env: Record<string, string> = loadEnv(mode, root);
    const {
      VITE_USE_MOCK,
      VITE_BUILD_COMPRESS,
      VITE_ENABLE_ANALYZE,
      VITE_ENABLE_INSPECT,
      VITE_ENABLE_CERT,
    } = env;
    const viteEnv = wrapperEnv(env, mode);
    const defineData = await createDefineData(root, viteEnv);
    const plugins = await createPlugins({
      isBuild,
      mode: isBuild ? 'build' : 'dev',
      root,
      enableAnalyze: VITE_ENABLE_ANALYZE === 'true',
      enableMock: VITE_USE_MOCK === 'true',
      enableInspect: VITE_ENABLE_INSPECT === 'true',
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
          replacement: pathResolve('src') + '/',
        },
        // @/xxxx => src/xxxx
        {
          find: /@\//,
          replacement: pathResolve('src') + '/',
        },
      ],
    );
    if (isBuild) {
      alias.push({ find: 'vue-router', replacement: 'vue-router/dist/vue-router.prod.cjs' });
      // alias.push({
      //   find: '@iconify/iconify',
      //   replacement: '@iconify/iconify/dist/iconify.without-api.cjs',
      // });
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

    return mergeConfig(mergedConfig, overrides);
  });
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
  } catch (error) {
    return {};
  }
}

export { defineApplicationConfig };

import type { ConfigEnv, UserConfig, Alias } from 'vite';
import { loadEnv } from 'vite';
import { resolve } from 'path';
import moment from 'moment';
import { generateModifyVars } from '../generate/generateModifyVars';
import { createProxy } from './proxy';
import { wrapperEnv, getPackageManifest, green } from '../utils';
import { createBuildTarget, createVitePlugins } from './plugin';

function pathResolve(dir) {
  return resolve(process.cwd(), '.', dir);
}
const { dependencies, devDependencies, name, version } = getPackageManifest(
  pathResolve('package.json'),
);
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: moment().format('YYYY-MM-DD HH:mm:ss'),
};

export function createViteConfig(
  { command, mode }: ConfigEnv,
  alias: Alias[],
  preview?,
): UserConfig {
  // 是否构建库模式

  const isBuildLib = mode === 'lib';
  const root = process.cwd();

  const env = loadEnv(mode, root);

  // The boolean type read by loadEnv is a string. This function can be converted to boolean type
  const viteEnv = wrapperEnv(env);

  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY } = viteEnv;
  //运行模式识别
  //serve 在线运行, lib 库打包模式, package Html打包模式
  const runMode = command === 'serve' ? 'serve' : isBuildLib ? 'lib' : 'package';

  green(`Run in folder: ${root}, mode: ${runMode}`);

  const resolveAlias: Alias[] = [
    ...alias,
    {
      find: 'vue-i18n',
      replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
    },
    {
      find: /\/@\//,
      replacement: pathResolve('src') + '/',
    },
  ];

  let config: UserConfig = {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias: resolveAlias,
    },
    build: createBuildTarget(viteEnv, runMode),
    define: {
      // setting vue-i18-next
      // Suppress warning
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },

    css: {
      preprocessorOptions: {
        less: {
          modifyVars: generateModifyVars(false, runMode, preview),
          javascriptEnabled: true,
        },
      },
    },

    // The vite plugin used by the project. The quantity is large, so it is separately extracted and managed
    plugins: createVitePlugins(viteEnv, runMode, preview),

    optimizeDeps: {
      // @iconify/iconify: The dependency is dynamically and virtually loaded by @purge-icons/generated, so it needs to be specified explicitly
      include: [
        '@iconify/iconify',
        'ant-design-vue/es/locale/zh_CN',
        'moment/dist/locale/zh-cn',
        'ant-design-vue/es/locale/en_US',
        'moment/dist/locale/eu',
      ],
      exclude: ['vue-demi'],
    },
  };
  if (runMode === 'serve') {
    config = {
      ...config,
      server: {
        // Listening on all local IPs
        host: true,
        port: VITE_PORT,
        // Load proxy configuration from .env
        proxy: createProxy(VITE_PROXY),
      },
    };
  }
  return config;
}

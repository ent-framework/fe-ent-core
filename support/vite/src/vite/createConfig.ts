import type { ConfigEnv, UserConfig, Alias } from 'vite';
import vite, { loadEnv } from 'vite';
import { resolve } from 'path';
import moment from 'moment';
import { generateModifyVars } from 'fe-ent-theme-util';
import { createProxy } from './proxy';
import { wrapperEnv, getPackageManifest, green } from '../utils';
import { createBuildTarget, createVitePlugins } from './plugin';
import url from 'postcss-url';
import type { AcceptedPlugin } from 'postcss';
import { getVitePreLoadFile } from '../utils/less';
import { default as _ } from 'lodash';

export type CustomConfigEnv = {
  alias: Alias[];
  customTheme?: boolean;
  libDev?: boolean; // 是否库开发模式, 默认false
  runMode?: string;
};

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
  configEnv: CustomConfigEnv,
): UserConfig {
  // 是否构建库模式
  const isBuildLib = mode === 'lib';
  //运行模式识别
  //serve 在线运行, lib 库打包模式, package Html打包模式
  const runMode = command === 'serve' ? 'serve' : isBuildLib ? 'lib' : 'package';
  const cwd = process.cwd();
  _.defaults(configEnv, { customTheme: false, libDev: false, runMode });

  let env: Record<string, string> = loadEnv(mode, cwd);
  if (env == null || Object.keys(env).length == 0) {
    console.log(`当前目录 ${cwd} 未找到Env文件, 请配置.env/.env.${mode} 文件`);
    const root = vite.searchForWorkspaceRoot(cwd);
    env = vite.loadEnv(mode, root);
    if (env == null || Object.keys(env).length == 0) {
      console.log(`根目录 ${root} 未找到Env文件, 请配置.env/.env.${mode} 文件`);
      process.exit(1);
    } else {
      console.log(`使用根目录 ${root} 的Env文件`);
    }
  } else {
    console.log(`使用根目录 ${cwd} 的Env文件`);
  }
  // The boolean type read by loadEnv is a string. This function can be converted to boolean type
  const viteEnv = wrapperEnv(env, mode);

  const { VITE_PORT = 3100, VITE_PUBLIC_PATH = '/', VITE_PROXY, VITE_USE_HTTPS } = viteEnv;

  green(`Run in folder: ${cwd}, run mode: ${runMode}, public path: ${VITE_PUBLIC_PATH}`);

  const resolveAlias: Alias[] = [
    ...configEnv.alias,
    {
      find: 'vue-i18n',
      replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
    },
    {
      find: /\/@\//,
      replacement: pathResolve('src') + '/',
    },
  ];

  const vitePreLoadFile = getVitePreLoadFile(configEnv);

  const postCssPlugins: AcceptedPlugin[] = [];

  if (configEnv.libDev) {
    postCssPlugins.push(
      url({
        url: 'copy',
        // base path to search assets from
        basePath: pathResolve('../packages'),
        // dir to copy assets
        assetsPath: 'img',
        // using hash names for assets (generates from asset content)
        useHash: true,
      }),
    );
  }

  let config: UserConfig = {
    base: VITE_PUBLIC_PATH,
    root: cwd,
    resolve: {
      alias: resolveAlias,
    },
    build: createBuildTarget(viteEnv, runMode),
    define: {
      // setting vue-i18-next
      // Suppress warning
      'process.env': viteEnv,
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },

    css: {
      preprocessorOptions: {
        less: {
          modifyVars: configEnv.customTheme ? generateModifyVars(false, vitePreLoadFile) : {},
          javascriptEnabled: true,
        },
      },
      postcss: {
        plugins: [...postCssPlugins],
      },
    },

    // The vite plugin used by the project. The quantity is large, so it is separately extracted and managed
    plugins: createVitePlugins(viteEnv, configEnv),

    optimizeDeps: {
      // @iconify/iconify: The dependency is dynamically and virtually loaded by @purge-icons/generated, so it needs to be specified explicitly
      include: [
        'vue',
        'vue-router',
        'vue-i18n',
        'axios',
        'ant-design-vue',
        'dayjs',
        '@iconify/iconify',
        'ant-design-vue/es/locale/zh_CN',
        'ant-design-vue/es/locale/en_US',
      ],
      exclude: ['vue-demi'],
    },
  };
  if (!configEnv.libDev) {
    config = {
      ...config,
      esbuild: {
        include: /\.(tsx?|jsx?)$/,
      },
    };
  }
  if (runMode === 'serve') {
    config = {
      ...config,
      server: {
        // Listening on all local IPs
        https: VITE_USE_HTTPS,
        host: true,
        port: VITE_PORT,
        // Load proxy configuration from .env
        proxy: !VITE_USE_HTTPS ? createProxy(VITE_PROXY) : undefined,
      },
    };
  }
  return config;
}

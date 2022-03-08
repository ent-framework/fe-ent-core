/***
 * Vite 的import.meta.env, 在开发共用库时不是好的解决方案
 * 用process.env，并使用默认值的方式替换
 */
import { Plugin } from 'rollup';
import MagicString from 'magic-string';
import { createFilter } from '@rollup/pluginutils';
import { loadEnv } from 'vite';

const name = 'vite-env-process';

// The virtual id for our shared "process" mock.
// We prefix it with \0 so that other plugins ignore it
const VIRTUAL_MODULE_ID = `\0${name}`;

type Options = {
  include?: string | string[];
  exclude?: string | string[];
  verbose?: boolean;
  baseDir?: string;
};

function wrapperEnv(envConf: Recordable): ImportMetaEnv {
  const ret: any = {};

  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, '\n');
    realName = realName === 'true' ? true : realName === 'false' ? false : realName;

    if (envName === 'VITE_PORT') {
      realName = Number(realName);
    }
    if (envName === 'VITE_PROXY' && realName) {
      try {
        realName = JSON.parse(realName.replace(/'/g, '"'));
      } catch (error) {
        realName = '';
      }
    }
    ret[envName] = realName;
  }
  ret['NODE_ENV'] = 'production';
  ret['VITE_VBEN_VERSION'] = '1.0.4'; // 从package.json读取
  return ret;
}

export function rollupPluginInjectProcessViteEnv(options: Options = {}): Plugin {
  const { include, exclude, baseDir = process.cwd(), verbose = false } = options;
  const filter = createFilter(include, exclude);

  const root = process.cwd();

  //只装载VITE_开发头的变量定义
  const viteEnv = loadEnv('production', root);
  const env = wrapperEnv(viteEnv);
  console.log(env);

  return {
    name,
    transform(code: string, id: string) {
      if (!id.startsWith(baseDir)) {
        return null;
      }
      if (filter(id)) {
        if (verbose) {
          console.log(`[${name}] Include ${id}`);
        }
      } else {
        if (verbose) {
          console.log(`[${name}] Exclude ${id}`);
        }
        return null;
      }
      // Each non-filtered module except our virtual module gets the process mock injected.
      if (id !== VIRTUAL_MODULE_ID) {
        const magicString = new MagicString(code);
        magicString.prepend(`import '${VIRTUAL_MODULE_ID}';\n`);
        return {
          code: magicString.toString(),
          map: magicString.generateMap({ hires: true }),
        };
      }
    },
    resolveId(id: string) {
      // this tells Rollup not to try to resolve imports from our virtual id
      if (id === VIRTUAL_MODULE_ID) {
        return VIRTUAL_MODULE_ID;
      }
    },
    load(id: string) {
      if (id === VIRTUAL_MODULE_ID) {
        return `(function() {
    const env = ${JSON.stringify(env)}
    try {
        if (process) {
            process.env = Object.assign({}, process.env);
            Object.assign(process.env, env);
            return;
        }
    } catch (e) {} // avoid ReferenceError: process is not defined
    globalThis.process = { env:env }
})();
`;
      }
      return null;
    },
  };
}

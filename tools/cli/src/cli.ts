import { cac } from 'cac';
import type { LogLevel } from './logger';
import { createLogger } from './logger';
import { copyTemplates } from './template';

const cli = cac('ent-cli');

// global options
interface GlobalCLIOptions {
  '--'?: string[];
  c?: boolean | string;
  l?: LogLevel;
  logLevel?: LogLevel;
  clearScreen?: boolean;
  d?: boolean | string;
  debug?: boolean | string;
}

/**
 * removing global flags before passing as command specific sub-configs
 */
function cleanOptions<Options extends GlobalCLIOptions>(
  options: Options,
): Omit<Options, keyof GlobalCLIOptions> {
  const ret = { ...options };
  delete ret['--'];
  delete ret.c;
  delete ret.l;
  delete ret.logLevel;
  delete ret.clearScreen;
  delete ret.d;
  delete ret.debug;
  return ret;
}

cli
  .option('-l, --logLevel <level>', `[string] info | warn | error | silent`)
  .option('--clearScreen', `[boolean] allow/disable clear screen when logging`)
  .option('-d, --debug [feat]', `[boolean] show debug logs`);

// dev
cli
  .command('[root]', '开启本地服务') // default command
  .alias('serve') // the command is called 'serve' in Vite's API
  .alias('dev') // alias to align with the script name
  .option('--host [host]', `[string] specify hostname`)
  .option('--port <port>', `[number] specify port`)
  .option('--https', `[boolean] use TLS + HTTP/2`)
  .option('--open [path]', `[boolean | string] open browser on startup`)
  .option('--cors', `[boolean] enable CORS`)
  .option('--strictPort', `[boolean] exit if specified port is already in use`)
  .option('--force', `[boolean] force the optimizer to ignore the cache and re-bundle`)
  .action(async (root: string, options: GlobalCLIOptions) => {
    // output structure is preserved even after bundling so require()
    // is ok here
  });

// build
cli
  .command('build [root]', '构建发布版本')
  .option('--target <target>', `[string] transpile target (default: 'modules')`)
  .option('--outDir <dir>', `[string] output directory (default: dist)`)
  .option(
    '--assetsDir <dir>',
    `[string] directory under outDir to place assets in (default: _assets)`,
  )
  .option(
    '--assetsInlineLimit <number>',
    `[number] static asset base64 inline threshold in bytes (default: 4096)`,
  )
  .option('--ssr [entry]', `[string] build specified entry for server-side rendering`)
  .option('--sourcemap', `[boolean] output source maps for build (default: false)`)
  .option(
    '--minify [minifier]',
    `[boolean | "terser" | "esbuild"] enable/disable minification, ` +
      `or specify minifier to use (default: esbuild)`,
  )
  .option('--manifest [name]', `[boolean | string] emit build manifest json`)
  .option('--ssrManifest [name]', `[boolean | string] emit ssr manifest json`)
  .option('--emptyOutDir', `[boolean] force empty outDir when it's outside of root`)
  .option('-w, --watch', `[boolean] rebuilds when modules have changed on disk`)
  .action(async (root: string, options: GlobalCLIOptions) => {});

cli
  .command('app [name]', '创建一个应用')
  .option('--overwrite', `[boolean] 是否覆盖已存在文件`)
  .option('--host [host]', `[string] specify hostname`)
  .option('--port <port>', `[number] specify port`)
  .option('--strictPort', `[boolean] exit if specified port is already in use`)
  .option('--open [path]', `[boolean | string] open browser on startup`)
  .action(
    async (
      name: string,
      options: {
        host?: string | boolean;
        port?: number;
        overwrite?: boolean;
        open?: boolean | string;
        strictPort?: boolean;
      } & GlobalCLIOptions,
    ) => {
      const log = createLogger(options.logLevel || 'info', {
        allowClearScreen: options.clearScreen || false,
      });
      const context = { name };
      await copyTemplates('app', process.cwd(), context, log);
    },
  );

cli
  .command('module [name]', '创建一个模块')
  .option('--host [host]', `[string] specify hostname`)
  .option('--port <port>', `[number] specify port`)
  .option('--strictPort', `[boolean] exit if specified port is already in use`)
  .option('--https', `[boolean] use TLS + HTTP/2`)
  .option('--open [path]', `[boolean | string] open browser on startup`)
  .action(
    async (
      name: string,
      options: {
        host?: string | boolean;
        port?: number;
        https?: boolean;
        open?: boolean | string;
        strictPort?: boolean;
      } & GlobalCLIOptions,
    ) => {},
  );

cli.help();
cli.version(require('../package.json').version);

cli.parse();

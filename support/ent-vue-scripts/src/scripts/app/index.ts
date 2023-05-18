import { build, createServer } from 'vite';
import { defineApplicationConfig } from '../../configs/application';
import type { ConfigEnv } from 'vite';

async function run(config: ConfigEnv, port: number) {
  const { command, mode } = config;
  const appConfig = await defineApplicationConfig({
    command,
    mode,
    ...(command === 'serve' && {
      overrides: {
        server: {
          port,
        },
      },
    }),
  });
  //不重文件加载配置
  appConfig.configFile = false;
  if (command === 'build') {
    await build(appConfig);
  } else {
    const server = await createServer(appConfig);
    await server.listen();
    server.printUrls();
  }
}

export default run;

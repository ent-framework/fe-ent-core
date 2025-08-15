import { build } from 'vite';
import { defineAppConfig } from '../../configs/app.js';
import { defineAppUmdConfig } from '../../configs/app.umd.js';

async function run() {
  const appConfig = await defineAppConfig({
    command: 'build',
    mode: 'production'
  });
  //不重文件加载配置
  appConfig.configFile = false;
  await build(appConfig);
  const appUmdConfig = await defineAppUmdConfig({
    command: 'build',
    mode: 'production'
  });
  appUmdConfig.configFile = false;
  await build(appUmdConfig);
}

export default run;

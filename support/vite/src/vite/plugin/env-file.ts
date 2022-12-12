import type { Plugin, ResolvedConfig } from 'vite';
import path from 'path';
import fs, { writeFileSync } from 'fs-extra';
import chalk from 'chalk';
import { getEnvConfig, getConfigFileName, GLOB_CONFIG_FILE_NAME } from '../../utils';

interface CreateConfigParams {
  configName: string;
  config: any;
  configFileName?: string;
}

export function generateEnvFilePlugin(): Plugin {
  let config: ResolvedConfig;
  let outputPath: string;

  function createConfig(params: CreateConfigParams) {
    const { configName, config, configFileName } = params;
    try {
      const windowConf = `window.${configName}`;
      // Ensure that the variable will not be modified
      const configStr = `${windowConf}=${JSON.stringify(config)};
      Object.freeze(${windowConf});
      Object.defineProperty(window, "${configName}", {
        configurable: false,
        writable: false,
      });
    `.replace(/\s/g, '');
      fs.mkdirp(outputPath);
      writeFileSync(`${outputPath}/${configFileName}`, configStr);

      console.log(chalk.cyan(`✨ - configuration file is build successfully:`));
      console.log(chalk.gray(outputPath + '/' + chalk.green(configFileName)) + '\n');
    } catch (error) {
      console.log(chalk.red('configuration file configuration file failed to package:\n' + error));
    }
  }

  function runBuildConfig(env: Record<string, any>) {
    const config = getEnvConfig('VITE_GLOB_', env);
    const configFileName = getConfigFileName(config);
    createConfig({ config, configName: configFileName, configFileName: GLOB_CONFIG_FILE_NAME });
  }

  return {
    name: 'vite:generate-env-file',
    apply: 'build',
    enforce: 'post',
    configResolved(resolvedConfig: ResolvedConfig) {
      // 存储最终解析的配置
      config = resolvedConfig;
      outputPath = path.isAbsolute(config.build.outDir)
        ? config.build.outDir
        : path.join(config.root, config.build.outDir);
    },
    closeBundle() {
      runBuildConfig(config.env);
    },
  };
}

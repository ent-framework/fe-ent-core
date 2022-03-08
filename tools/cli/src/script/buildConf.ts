/**
 * Generate additional configuration files when used for packaging. The file can be configured with some global variables, so that it can be changed directly externally without repackaging
 */
import {
  GLOB_CONFIG_FILE_NAME,
  OUTPUT_DIR,
  getPackageManifest,
  findWorkspaceRoot,
  getCurrExecPath,
} from '../utils';
import fs, { writeFileSync } from 'fs-extra';
import chalk from 'chalk';

import { getEnvConfig, getConfigFileName } from '../utils';

const pkg = getPackageManifest(findWorkspaceRoot());

interface CreateConfigParams {
  configName: string;
  config: any;
  configFileName?: string;
}

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
    fs.mkdirp(getCurrExecPath(OUTPUT_DIR));
    writeFileSync(getCurrExecPath(`${OUTPUT_DIR}/${configFileName}`), configStr);

    console.log(chalk.cyan(`✨ [${pkg.name}]`) + ` - configuration file is build successfully:`);
    console.log(chalk.gray(OUTPUT_DIR + '/' + chalk.green(configFileName)) + '\n');
  } catch (error) {
    console.log(chalk.red('configuration file configuration file failed to package:\n' + error));
  }
}

export function runBuildConfig() {
  const config = getEnvConfig();
  const configFileName = getConfigFileName(config);
  createConfig({ config, configName: configFileName, configFileName: GLOB_CONFIG_FILE_NAME });
}

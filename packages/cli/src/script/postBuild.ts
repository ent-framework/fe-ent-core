// #!/usr/bin/env node

import { runBuildConfig } from './buildConf';
import chalk from 'chalk';
import { epPackage, getPackageManifest } from '../utils';

const pkg = getPackageManifest(epPackage);

export const runBuild = async () => {
  try {
    const argvList = process.argv.splice(2);

    // Generate configuration file
    if (!argvList.includes('disabled-config')) {
      runBuildConfig();
    }

    console.log(`✨ ${chalk.cyan(`[${pkg.name}]`)}` + ' - build successfully!');
  } catch (error) {
    console.log(chalk.red('vite build error:\n' + error));
    process.exit(1);
  }
};
runBuild();

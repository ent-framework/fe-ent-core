const { runBuildConfig } = require('./buildConf');
const chalk = require('chalk');

const { pkg } = require('../utils');

const runBuild = async (viteEnv) => {
  try {
    const argvList = process.argv.splice(2);

    // Generate configuration file
    if (!argvList.includes('disabled-config')) {
      runBuildConfig(viteEnv);
    }

    console.log(`✨ ${chalk.cyan(`[${pkg.name}]`)}` + ' - build successfully!');
  } catch (error) {
    console.log(chalk.red('vite build error:\n' + error));
    process.exit(1);
  }
};

module.exports = function (viteEnv) {
  return {
    enforce: 'post',
    name: 'ent-post-build',
    buildEnd(error) {
      if (!error) {
        console.log(chalk.green('ent post build end.\n'));
        runBuild(viteEnv);
      }
    },
  };
};

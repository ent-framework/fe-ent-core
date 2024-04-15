import { getPackageManifest, projRoot, run } from '@ent-build/build/utils';
import glob from 'fast-glob';
import consola from 'consola';
import chalk from 'chalk';

const publish = async () => {
  const publishFolders = await glob('{support,extensions,apps}/*', {
    cwd: projRoot,
    absolute: true,
    onlyDirectories: true,
  });

  const publishDir = [`${projRoot}`, ...publishFolders];

  console.log(publishDir);
  publishDir.forEach((pkg) => {
    const json: Record<string, any> = getPackageManifest(`${pkg}/package.json`);
    if (json.private && json.private === true) {
      consola.log(chalk.yellow(`Ignore private package ${pkg}`));
    } else {
      run('npm publish', pkg);
    }
  });
};

publish();

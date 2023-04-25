import fs from 'fs';
import consola from 'consola';
import chalk from 'chalk';
import { epPackage, projRoot, pkgRoot } from '@ent-core/build-utils';
import { getPackageManifest } from '@ent-core/build-utils';
import glob from 'fast-glob';
import path from 'path';

const tagVersion = process.env.TAG_VERSION;
if (!tagVersion) {
  consola.log(
    chalk.red(
      'No tag version or git head were found, make sure that you set the environment variable $TAG_VERSION \n',
    ),
  );
  process.exit(1);
}

consola.log(chalk.cyan('Start updating version'));

consola.log(chalk.cyan(['NOTICE:', `$TAG_VERSION: ${tagVersion}`].join('\n')));
(async () => {
  if (!(process.argv.includes('-d') || process.argv.includes('--dry-run'))) {
    try {
      const packages = await glob('{dist,support}/*/package.json', {
        cwd: projRoot,
        absolute: true,
        onlyFiles: true,
      });

      const extensions = await glob('extensions/*/package.json', {
        cwd: pkgRoot,
        absolute: true,
        onlyFiles: true,
      });

      const allPackages = [epPackage, ...packages, ...extensions];

      allPackages.map(async (pkg) => {
        const json: Record<string, any> = getPackageManifest(pkg);
        json.version = tagVersion;
        await fs.promises.writeFile(pkg, JSON.stringify(json, null, 2), {
          encoding: 'utf-8',
        });
        consola.log(chalk.yellow(`Updating ${pkg} version to ${tagVersion}`));
      });

      fs.writeFileSync(
        path.resolve(__dirname, '../packages/core/version.ts'),
        `export const version = '${tagVersion}';
`,
      );
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  }

  consola.log(chalk.green(`Version updated to ${tagVersion}`));
})();

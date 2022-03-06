import fs from 'fs';
import { epPackage, epOutput } from './utils';
import { cyan, red, yellow, green } from './utils';
import { getPackageManifest } from './utils';

const tagVersion = process.env.TAG_VERSION;
if (!tagVersion) {
  red(
    'No tag version or git head were found, make sure that you set the environment variable $TAG_VERSION \n',
  );
  process.exit(1);
}

cyan('Start updating version');

cyan(['NOTICE:', `$TAG_VERSION: ${tagVersion}`].join('\n'));
(async () => {
  yellow(`Updating package.json for fe-ent-core`);

  const json: Record<string, any> = getPackageManifest(epPackage);

  json.version = tagVersion;

  if (!(process.argv.includes('-d') || process.argv.includes('--dry-run'))) {
    try {
      await fs.promises.writeFile(epOutput + '/package.json', JSON.stringify(json, null, 2), {
        encoding: 'utf-8',
      });
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  } else {
    console.log(json);
  }

  green(`Version updated to ${tagVersion}`);
})();

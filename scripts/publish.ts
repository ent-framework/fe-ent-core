import { run, projRoot } from '@ent-build/build/utils';
import glob from 'fast-glob';

const publish = async () => {
  const publishFolders = await glob('{support,extensions,apps}/*', {
    cwd: projRoot,
    absolute: true,
    onlyDirectories: true,
  });

  const publishDir = [`${projRoot}/packages/fe-ent-core`, ...publishFolders];

  console.log(publishDir);
  publishDir.map((pkg) => run('npm publish --access public', pkg));
};

publish();

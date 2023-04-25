import { run } from '@ent-core/build-utils';
import { epOutput, pkgRoot, projRoot } from '@ent-core/build-utils';
import glob from 'fast-glob';

const publish = async () => {
  const extensions = await glob('extensions/*', {
    cwd: pkgRoot,
    absolute: true,
    onlyDirectories: true,
  });
  const support = await glob('support/*', {
    cwd: projRoot,
    absolute: true,
    onlyDirectories: true,
  });
  const publishDir = [...extensions, ...support, epOutput];

  console.log(publishDir);
  publishDir.map((pkg) => run('npm publish --access public', pkg));
};

publish();

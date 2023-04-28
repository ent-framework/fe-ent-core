import { run } from '@ent-build/build-utils';
import { epOutput, projRoot } from '@ent-build/build-utils';
import glob from 'fast-glob';

const publish = async () => {
  const extensions = await glob('extensions/*', {
    cwd: projRoot,
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

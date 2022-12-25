import { run } from '@ent-core/build-utils';
import { epOutput, projRoot } from '@ent-core/build-utils';
import glob from 'fast-glob';

const publish = async () => {
  const packages = await glob('{extensions,support}/*', {
    cwd: projRoot,
    absolute: true,
    onlyDirectories: true,
  });
  packages.push(epOutput);
  console.log(packages);
  packages.map((pkg) => run('npm publish --access public', pkg));
};

publish();

import { run } from './utils/process';
import { epOutput, projRoot } from './utils';
import glob from 'fast-glob';

const publish = async () => {
  const packages = await glob('{extensions,tools}/*', {
    cwd: projRoot,
    absolute: true,
    onlyDirectories: true,
  });
  packages.push(epOutput);
  console.log(packages);
  packages.map((pkg) =>
    run(
      'npm publish --access public -registry http://npm.36cpc.com/repository/npm-snapshots/',
      pkg,
    ),
  );
};

publish();

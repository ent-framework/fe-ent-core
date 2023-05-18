import { run, projRoot } from '@ent-build/build/utils';
import glob from 'fast-glob';

const link = async () => {
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

  const apps = await glob('apps/*', {
    cwd: projRoot,
    absolute: true,
    onlyDirectories: true,
  });

  const publishDir = [...extensions, ...support, ...apps, `${projRoot}/packages/fe-ent-core`];

  publishDir.map((pkg) => run(`pnpm link --global --dir ${pkg}`, process.cwd()));
};

link();

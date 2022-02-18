import type { UserConfig, ConfigEnv } from 'vite';
import { createViteConfig, findWorkspaceRoot } from 'fe-ent-cli';

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const workspace = findWorkspaceRoot();
  console.log(workspace);
  const alias = [
    {
      find: /^fe-ent-core$/,
      replacement: `${workspace}/packages/core/index.ts`,
    },
    {
      find: /^fe-ent-core\/(.*)$/,
      replacement: `${workspace}/packages/core/$1`,
    },
  ];
  return createViteConfig({ command, mode }, alias);
};

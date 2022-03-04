import type { UserConfig, ConfigEnv } from 'vite';
import { createViteConfig, findWorkspaceRoot } from 'fe-ent-cli';

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const workspace = findWorkspaceRoot();
  const alias = [
    {
      find: /^fe-ent-core$/,
      replacement: `${workspace}/packages/fe-ent-core/index.ts`,
    },
    {
      find: /^fe-ent-core\/(.*)$/,
      replacement: `${workspace}/packages/$1`,
    },
    {
      find: /^@ent-core\/(.*)$/,
      replacement: `${workspace}/packages/$1`,
    },
  ];
  return createViteConfig({ command, mode }, alias, true);
};

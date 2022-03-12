import type { UserConfig, ConfigEnv } from 'vite';
import { searchForWorkspaceRoot } from 'vite';
import { createViteConfig } from 'fe-ent-build';

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const workspace = searchForWorkspaceRoot(process.cwd());
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
      find: /^@fe-ent-extension\/(.*)$/,
      replacement: `${workspace}/extensions/$1`,
    },
    {
      find: /^@ent-core\/(.*)$/,
      replacement: `${workspace}/packages/$1`,
    },
  ];
  return createViteConfig({ command, mode }, { alias, customTheme: true });
};

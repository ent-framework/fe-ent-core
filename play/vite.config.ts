import type { UserConfig, ConfigEnv } from 'vite';
import { searchForWorkspaceRoot } from 'vite';
import { createViteConfig } from 'fe-ent-build';

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const workspace = searchForWorkspaceRoot(process.cwd());
  // 别名设置，同样在tsconfig.json中也要配置，否则ide识别不到
  const alias = [
    // 别名，转发 fe-ent-core 文件请求
    {
      find: /^fe-ent-core$/,
      replacement: `${workspace}/packages/fe-ent-core/index.ts`,
    },
    {
      find: /^fe-ent-core\/(.*)$/,
      replacement: `${workspace}/packages/$1`,
    },
    // 别名，转发 fe-ent-extension 文件请求
    {
      find: /^@fe-ent-extension\/(.*\.less)$/,
      replacement: `${workspace}/extensions/$1`,
    },
    {
      find: /^@fe-ent-extension\/(.*)$/,
      replacement: `${workspace}/extensions/$1/index.ts`,
    },
    {
      find: /^@ent-core\/(.*)$/,
      replacement: `${workspace}/packages/$1`,
    },
  ];
  return createViteConfig({ command, mode }, { alias, customTheme: true });
};

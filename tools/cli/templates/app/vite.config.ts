import type { UserConfig, ConfigEnv } from 'vite';
import { createViteConfig } from 'fe-ent-cli';

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const alias = [
    {
      find: '@vueuse/shared',
      replacement: '@vueuse/shared/index.mjs',
    },
    {
      find: '@vueuse/core',
      replacement: '@vueuse/core/index.mjs',
    },
  ];
  return createViteConfig({ command, mode }, { alias, customTheme: true });
};

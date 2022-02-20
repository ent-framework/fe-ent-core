import type { UserConfig, ConfigEnv } from 'vite';
import { createViteConfig } from 'fe-ent-cli';

export default ({ command, mode }: ConfigEnv): UserConfig => {
  return createViteConfig({ command, mode });
};

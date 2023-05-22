import { mergeConfig, searchForWorkspaceRoot } from 'vite';
import { defineProjectConfig } from './project';
import type { DefineOptions } from './type';
import type { InlineConfig } from 'vite';

export default async function getPlaySiteConfig(options: DefineOptions) {
  const workspace = searchForWorkspaceRoot(process.cwd());
  const config = await defineProjectConfig(options);
  return mergeConfig(config, {
    resolve: {
      alias: [
        {
          find: /^@ent-core\/(.*)$/,
          replacement: `${workspace}/packages/fe-ent-core/$1`,
        },
        {
          find: /^fe-ent-core\/lib\/(.*)$/,
          replacement: `${workspace}/packages/fe-ent-core/$1`,
        },
      ],
    },
  } as InlineConfig);
}

import { mergeConfig, searchForWorkspaceRoot } from 'vite';
import { defineApplicationConfig } from './application';
import type { DefineOptions } from './type';
import type { InlineConfig } from 'vite';

export default async function getPlaySiteConfig(options: DefineOptions) {
  const workspace = searchForWorkspaceRoot(process.cwd());
  const config = await defineApplicationConfig(options);
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

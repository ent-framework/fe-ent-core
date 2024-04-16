import { mergeConfig } from 'vite';
import vueDocs from '../plugins/vite-plugin-ent-vue-docs';
import { defineProjectConfig } from './project';
import type { DefineOptions } from './type';
import type { InlineConfig } from 'vite';

export default async function getDocSiteConfig(options: DefineOptions) {
  const config = await defineProjectConfig(options);
  return mergeConfig(config, {
    plugins: [vueDocs()],
  } as InlineConfig);
}

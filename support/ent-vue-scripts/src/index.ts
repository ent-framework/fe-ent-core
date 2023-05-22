import { defineAppConfig } from './configs/app';
import { defineProjectConfig } from './configs/project';
import { defineLibraryConfig } from './configs/library';

import getDocSiteConfig from './configs/vite.site';
import getPlayViteConfig from './configs/vite.play';

export {
  defineAppConfig,
  defineProjectConfig,
  defineLibraryConfig,
  getDocSiteConfig,
  getPlayViteConfig,
};

export type { DefineOptions } from './configs/type';

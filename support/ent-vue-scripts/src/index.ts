import { defineAppConfig } from './configs/app';
import { defineProjectConfig } from './configs/project';
import { defineLibraryConfig } from './configs/library';

import getDocSiteConfig from './configs/vite.site';

export { defineAppConfig, defineProjectConfig, defineLibraryConfig, getDocSiteConfig };

export type { DefineOptions } from './configs/type';

import { defineApplicationConfig } from './configs/application';

import getDocSiteConfig from './configs/vite.site';
import getPlayViteConfig from './configs/vite.play';

export { defineApplicationConfig, getDocSiteConfig, getPlayViteConfig };

export type { DefineOptions } from './configs/type';

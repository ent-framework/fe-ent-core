import { defineAppConfig } from './configs/app.js';
import { defineProjectConfig } from './configs/project.js';
import { defineLibraryConfig } from './configs/library.js';

import getDocSiteConfig from './configs/vite.site.js';

export { defineAppConfig, defineProjectConfig, defineLibraryConfig, getDocSiteConfig };

export type { DefineOptions } from './configs/type.js';

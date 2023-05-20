import { withInstall } from '@ent-core/utils';

import appLocalePicker from './src/app-locale-picker.vue';
import appDarkModeToggle from './src/app-dark-mode-toggle.vue';

export const EntAppLocalePicker = withInstall(appLocalePicker);
export const EntAppDarkModeToggle = withInstall(appDarkModeToggle);

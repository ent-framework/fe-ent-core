import { withInstall } from '@ent-core/utils';

//import appLogo from './src/AppLogo.vue';
import appProvider from './src/app-provider.vue';
import appLocalePicker from './src/app-locale-picker.vue';
import appDarkModeToggle from './src/app-dark-mode-toggle.vue';

export { useAppProviderContext } from './src/use-app-context';

export const EntAppProvider = withInstall(appProvider);
export const EntAppLocalePicker = withInstall(appLocalePicker, 'EntAppLocalePicker');
export const EntAppDarkModeToggle = withInstall(appDarkModeToggle);

export default EntAppProvider;

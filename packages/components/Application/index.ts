import { withInstall } from '@ent-core/utils';

//import appLogo from './src/AppLogo.vue';
import appProvider from './src/AppProvider.vue';
import appLocalePicker from './src/AppLocalePicker.vue';
import appDarkModeToggle from './src/AppDarkModeToggle.vue';

export { useAppProviderContext } from './src/useAppContext';

export const EntAppProvider = withInstall(appProvider);
export const EntAppLocalePicker = withInstall(appLocalePicker, 'EntAppLocalePicker');
export const EntAppDarkModeToggle = withInstall(appDarkModeToggle);

export default EntAppProvider;

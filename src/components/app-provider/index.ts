import { withInstall } from '../../utils';

import appProvider from './src/index.vue';

export { useAppProviderContext } from './src/use-app-context';
export const EntAppProvider = withInstall(appProvider);
export default appProvider;

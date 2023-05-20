import { withInstall } from '@ent-core/utils';

import appProvider from './src/app-provider.vue';

export { useAppProviderContext } from './src/use-app-context';
export const EntAppProvider = withInstall(appProvider);
export default EntAppProvider;

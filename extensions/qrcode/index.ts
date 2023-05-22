import { withInstall } from 'fe-ent-core/lib/utils';
import qrCode from './components/qr-code.vue';
import type { App } from 'vue';

export const QrCode = withInstall(qrCode);
export * from './components/typing';

export const install = function (app: App) {
  app.use(QrCode);
  return app;
};

export default install;

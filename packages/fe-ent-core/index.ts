import * as components from './components';
import { registerAntGlobComp } from './components/register-glob-comp';
import type { App } from 'vue';

export * from './components';

export { registerAntGlobComp };
export {} from './global';

export const install = function (app: App) {
  Object.keys(components).forEach((key) => {
    const component = components[key];
    if (component.install) {
      app.use(component);
    }
  });
  return app;
};

export default install;

import * as components from './components';
import type { App } from 'vue';

import './theme/index.less';

export * from './components';

export const install = function (app: App) {
  Object.keys(components).forEach((key) => {
    const component = components[key];
    const compName = component.name || component.displayName;
    const registered = app.component(compName);
    if (!registered) {
      app.component(compName, component);
    }
  });
  return app;
};

export default install;

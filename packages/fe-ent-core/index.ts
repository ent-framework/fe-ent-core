import type { App } from 'vue';
export * from './components';
export * from './enums';

import * as components from './components';

export const install = function (app: App) {
  console.log(Object.keys(components));

  Object.keys(components).forEach((key) => {
    const component = components[key];
    if (component.install) {
      app.use(component);
    }
  });
  return app;
};

export default install;

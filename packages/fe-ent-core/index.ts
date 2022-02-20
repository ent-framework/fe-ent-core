import type { App } from 'vue';
export * from '@ent-core/components';
export * from '@ent-core/enums';

import * as components from '@ent-core/components';

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

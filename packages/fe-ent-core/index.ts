import type { App } from 'vue';
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

export * from '@ent-core/components';
export * from '@ent-core/directives';
export * from '@ent-core/enums';
export * from '@ent-core/hooks';
export * from '@ent-core/logics';

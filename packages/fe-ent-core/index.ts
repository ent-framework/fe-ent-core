import * as components from '@ent-core/components';
import type { App } from 'vue';

export * from '@ent-core/components';
export * from '@ent-core/directives';
export * from '@ent-core/hooks';
export * from '@ent-core/locales';
export * from '@ent-core/logics';
export * from '@ent-core/router';
export * from '@ent-core/store';
export * from '@ent-core/utils';

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

import * as components from './components';
import { registerAntGlobComp } from './components/register-glob-comp';
import type { App } from 'vue';
import './theme/index.less';

export * from './components';
export * from './directives';
export * from './hooks';
export * from './locales';
export * from './logics';
export * from './router';
export * from './store';
export * from './types';
export * from './utils';

export { registerAntGlobComp };
export {} from './global';

export const install = function (app: App) {
  Object.keys(components).forEach((key) => {
    console.log(key);
    const component = components[key];
    if (component.install) {
      app.use(component);
    }
  });
  return app;
};

export default install;


import type { App } from 'vue';
import {
  // Need
  Button as AntButton,
  Input,
  Layout,
} from 'ant-design-vue';

const compList = [AntButton.Group];

export function registerGlobComp(app: App) {
  compList.forEach((comp) => {
    app.component(comp.name || comp.displayName, comp);
  });

  app.use(Input).use(Layout).use(AntButton);
}

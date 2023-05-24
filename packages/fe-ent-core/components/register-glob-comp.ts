import { Input, Layout } from 'ant-design-vue';
import type { App } from 'vue';

export function registerAntGlobComp(app: App) {
  app.use(Input).use(Layout);
}

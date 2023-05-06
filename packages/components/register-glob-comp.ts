import type { App } from 'vue';
import { EntButton as AButton } from './button';
import { Input, Layout } from 'ant-design-vue';

export function registerGlobComp(app: App) {
  app.use(Input).use(Layout).use(AButton);
}

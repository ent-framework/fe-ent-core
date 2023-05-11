import { Input, Layout } from 'ant-design-vue';
import { EntButton as AButton } from './button';
import type { App } from 'vue';

export function registerGlobComp(app: App) {
  app.use(Input).use(Layout).use(AButton);
}

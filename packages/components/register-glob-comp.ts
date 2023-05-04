import type { App } from 'vue';
import { EntButton } from './button';
import { Input, Layout, Button as AButton } from 'ant-design-vue';

export function registerGlobComp(app: App) {
  app.use(Input).use(Layout).use(EntButton).use(AButton);
}

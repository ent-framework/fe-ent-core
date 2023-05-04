import type { App } from 'vue';
import { EntButton } from './button';
import Input from 'ant-design-vue/lib/input';
import Layout from 'ant-design-vue/lib/layout';
import Button from 'ant-design-vue/lib/button';

const AButton = Button;

export function registerGlobComp(app: App) {
  app.use(Input).use(Layout).use(EntButton).use(AButton);
}

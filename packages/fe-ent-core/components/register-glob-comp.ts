import { EntButton } from './button';
import type { App } from 'vue';

export function registerAntGlobComp(app: App) {
  app.use(EntButton);
}

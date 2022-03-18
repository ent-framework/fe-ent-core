/**
 * Configure and register global directives
 */
import type { App } from 'vue';
import { setupPermissionDirective } from './permission';
import { setupLoadingDirective } from './loading';
import { setClickOutsideDirective } from './click-out-side';

export function setupGlobDirectives(app: App) {
  setupPermissionDirective(app);
  setupLoadingDirective(app);
  setClickOutsideDirective(app);
}

export * from './click-out-side';
export * from './ripple';
export * from './loading';
export * from './permission';
export * from './repeat-click';

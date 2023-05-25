/**
 * Configure and register global directives
 */
import { setupPermissionDirective } from './permission';
import { setupLoadingDirective } from './loading';
import { setClickOutsideDirective } from './click-out-side';
import type { App } from 'vue';

export function setupGlobDirectives(app: App) {
  setupPermissionDirective(app);
  setupLoadingDirective(app);
  setClickOutsideDirective(app);
}

export { default as vClickOutside } from './click-out-side';
export { default as vRipple } from './ripple';
export { default as vLoading } from './loading';
export { default as vAuth } from './permission';
export { default as vRepeatClick } from './repeat-click';

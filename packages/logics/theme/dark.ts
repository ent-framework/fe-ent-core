import { darkCssIsReady, loadDarkThemeCss } from 'fe-ent-theme-api';
import { addClass, hasClass, removeClass } from '@ent-core/utils/dom-utils';
import { isProdMode } from '@ent-core/utils/env';

export async function updateDarkTheme(mode: string | null = 'light') {
  const htmlRoot = document.getElementById('htmlRoot');
  if (!htmlRoot) {
    return;
  }
  const hasDarkClass = hasClass(htmlRoot, 'dark');
  if (mode === 'dark') {
    if (isProdMode() && !darkCssIsReady()) {
      await loadDarkThemeCss();
    }
    htmlRoot.setAttribute('data-theme', 'dark');
    if (!hasDarkClass) {
      addClass(htmlRoot, 'dark');
    }
  } else {
    htmlRoot.setAttribute('data-theme', 'light');
    if (hasDarkClass) {
      removeClass(htmlRoot, 'dark');
    }
  }
}

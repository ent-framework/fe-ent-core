import { withInstall } from '@ent-core/utils';
import defaultLayout from './default/index.vue';
import frameLayout from './iframe/index.vue';
import pageLayout from './page/index.vue';
import { App } from 'vue';

const DefaultLayout = withInstall(defaultLayout);
const FrameLayout = withInstall(frameLayout);
const PageLayout = withInstall(pageLayout);

export { DefaultLayout, FrameLayout, PageLayout };

export function setupLayouts(app: App<Element>) {
  app.use(DefaultLayout).use(FrameLayout).use(PageLayout);
}

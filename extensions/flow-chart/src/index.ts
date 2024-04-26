import { withInstall } from 'fe-ent-core/es/utils';
import flowChart from './components/index.vue';
import './index.less';

import type { App } from 'vue';
export const FlowChart = withInstall(flowChart);

export const install = function (app: App) {
  app.use(FlowChart);
  return app;
};

export default install;

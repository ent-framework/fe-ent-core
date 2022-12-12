import antdLocale from 'ant-design-vue/es/locale/zh_CN';

import sys from './zh-CN/sys';
import layout from './zh-CN/layout';
import component from './zh-CN/component';
import common from './zh-CN/common';
import basic from './zh-CN/routes/basic';
import dashboard from './zh-CN/routes/dashboard';
import demo from './zh-CN/routes/demo';

const modules = {
  sys,
  layout,
  component,
  common,
  routes: {
    basic,
    dashboard,
    demo,
  },
};
export default {
  message: {
    ...modules,
    antdLocale,
  },
  momentLocaleName: 'zh-cn',
};

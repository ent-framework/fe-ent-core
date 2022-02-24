import antdLocale from 'ant-design-vue/es/locale/en_US';
// import momentLocale from 'moment/dist/locale/en-us';
import sys from './en/sys';
import layout from './en/layout';
import component from './en/component';
import common from './en/common';
import basic from './en/routes/basic';
import dashboard from './en/routes/dashboard';
import demo from './en/routes/demo';

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
  momentLocale: null,
  momentLocaleName: 'en',
};

import antdLocale from 'ant-design-vue/es/locale/en_US';
//import momentLocale from 'moment/dist/locale/en-us';
import component from './en/component';
import common from './en/common';
import sys from './en/sys';

const modules = {
  component,
  common,
  sys
};
export default {
  message: {
    ...modules,
    antdLocale
  }
};

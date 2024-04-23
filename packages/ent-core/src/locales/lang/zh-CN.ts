import antdLocale from 'ant-design-vue/es/locale/zh_CN';

import component from './zh-CN/component';
import common from './zh-CN/common';
import sys from './zh-CN/sys';

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

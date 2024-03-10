import antdLocale from 'ant-design-vue/es/locale/zh_CN';

import component from './zh-CN/component';
import common from './zh-CN/common';

const modules = {
  component,
  common,
};
export default {
  message: {
    ...modules,
    antdLocale,
  },
};

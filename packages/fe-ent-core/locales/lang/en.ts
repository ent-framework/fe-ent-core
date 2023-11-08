import antdLocale from 'ant-design-vue/es/locale/en_US';
//import momentLocale from 'moment/dist/locale/en-us';
import component from './en/component';
import common from './en/common';

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

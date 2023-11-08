import sys from './sys';
import layout from './layout';
import basic from './routes/basic';
import dashboard from './routes/dashboard';
import demo from './routes/demo';

const modules = {
  sys,
  layout,
  routes: {
    basic,
    dashboard,
    demo,
  },
};
export default modules;

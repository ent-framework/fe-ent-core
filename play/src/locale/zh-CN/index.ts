import basic from './routes/basic';
import dashboard from './routes/dashboard';
import demo from './routes/demo';
import layout from './layout';

const modules = {
  routes: {
    basic,
    dashboard,
    demo,
  },
  layout
};
export default modules;

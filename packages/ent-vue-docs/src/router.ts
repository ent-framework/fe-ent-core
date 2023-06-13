import type { AppRouteRecordRaw } from '@ent-core/router';

const Index = () => import('./home.vue');

const Start = () => import('./docs/start.zh-CN.md');
const StartEn = () => import('./docs/start.en-US.md');
const Dark = () => import('./docs/dark.zh-CN.md');
const DarkEn = () => import('./docs/dark.en-US.md');
const Theme = () => import('./docs/theme.zh-CN.md');
const ThemeEn = () => import('./docs/theme.en-US.md');
const I18n = () => import('./docs/i18n.zh-CN.md');
const I18nEn = () => import('./docs/i18n.en-US.md');
const Changelog = () => import('./pages/changelog/changelog.vue');

const AppProvider = () => import('@ent-core/components/app-provider/README.zh-CN.md');
const AppProviderEn = () => import('@ent-core/components/app-provider/README.en-US.md');

const Authority = () => import('@ent-core/components/authority/README.zh-CN.md');
const AuthorityEn = () => import('@ent-core/components/authority/README.en-US.md');

const Basic = () => import('@ent-core/components/basic/README.zh-CN.md');
const BasicEn = () => import('@ent-core/components/basic/README.en-US.md');

const Button = () => import('@ent-core/components/button/README.zh-CN.md');
const ButtonEn = () => import('@ent-core/components/button/README.en-US.md');

const ClickOutSide = () => import('@ent-core/components/click-out-side/README.zh-CN.md');
const ClickOutSideEn = () => import('@ent-core/components/click-out-side/README.en-US.md');

const Container = () => import('@ent-core/components/container/README.zh-CN.md');
const ContainerEn = () => import('@ent-core/components/container/README.en-US.md');

const CountDown = () => import('@ent-core/components/count-down/README.zh-CN.md');
const CountDownEn = () => import('@ent-core/components/count-down/README.en-US.md');

const CountTo = () => import('@ent-core/components/count-to/README.zh-CN.md');
const CountToEn = () => import('@ent-core/components/count-to/README.en-US.md');

const Cropper = () => import('@ent-core/components/cropper/README.zh-CN.md');
const CropperEn = () => import('@ent-core/components/cropper/README.en-US.md');

const DarkModeToggle = () => import('@ent-core/components/dark-mode-toggle/README.zh-CN.md');
const DarkModeToggleEn = () => import('@ent-core/components/dark-mode-toggle/README.en-US.md');

const Description = () => import('@ent-core/components/description/README.zh-CN.md');
const DescriptionEn = () => import('@ent-core/components/description/README.en-US.md');

const Drawer = () => import('@ent-core/components/drawer/README.zh-CN.md');
const DrawerEn = () => import('@ent-core/components/drawer/README.en-US.md');

const Dropdown = () => import('@ent-core/components/dropdown/README.zh-CN.md');
const DropdownEn = () => import('@ent-core/components/dropdown/README.en-US.md');

const Form = () => import('@ent-core/components/form/README.zh-CN.md');
const FormEn = () => import('@ent-core/components/form/README.en-US.md');

const Icon = () => import('@ent-core/components/icon/README.zh-CN.md');
const IconEn = () => import('@ent-core/components/icon/README.en-US.md');

const Loading = () => import('@ent-core/components/loading/README.zh-CN.md');
const LoadingEn = () => import('@ent-core/components/loading/README.en-US.md');

const LocalePicker = () => import('@ent-core/components/locale-picker/README.zh-CN.md');
const LocalePickerEn = () => import('@ent-core/components/locale-picker/README.en-US.md');

const Modal = () => import('@ent-core/components/modal/README.zh-CN.md');
const ModalEn = () => import('@ent-core/components/modal/README.en-US.md');

const Page = () => import('@ent-core/components/page/README.zh-CN.md');
const PageEn = () => import('@ent-core/components/page/README.en-US.md');

const Table = () => import('@ent-core/components/table/README.zh-CN.md');
const TableEn = () => import('@ent-core/components/table/README.en-US.md');

const Time = () => import('@ent-core/components/time/README.zh-CN.md');
const TimeEn = () => import('@ent-core/components/time/README.en-US.md');

const Transition = () => import('@ent-core/components/transition/README.zh-CN.md');
const TransitionEn = () => import('@ent-core/components/transition/README.en-US.md');

const Tree = () => import('@ent-core/components/tree/README.zh-CN.md');
const TreeEn = () => import('@ent-core/components/tree/README.en-US.md');

const Router = () => import('@ent-core/router/README.zh-CN.md');
const RouterEn = () => import('@ent-core/router/README.en-US.md');

const Store = () => import('@ent-core/store/README.zh-CN.md');
const StoreEn = () => import('@ent-core/store/README.en-US.md');

const docs = [
  {
    name: 'start',
    component: Start,
    componentEn: StartEn,
  },
  {
    name: 'dark',
    component: Dark,
    componentEn: DarkEn,
  },
  {
    name: 'theme',
    component: Theme,
    componentEn: ThemeEn,
  },
  {
    name: 'i18n',
    component: I18n,
    componentEn: I18nEn,
  },
  // {
  //   name: 'faq',
  //   component: () => import('./docs/faq.zh-CN.md'),
  //   componentEn: () => import('./docs/faq.en-US.md'),
  // },
  {
    name: 'changelog',
    component: Changelog,
  },
];

const practicesDocs = [
  {
    name: 'start',
    component: () => import('./practices/start.zh-CN.md'),
    componentEn: () => import('./practices/start.en-US.md'),
  },
  {
    name: 'npmScripts',
    component: () => import('./practices/npm-scripts.zh-CN.md'),
    componentEn: () => import('./practices/npm-scripts.en-US.md'),
  },
  {
    name: 'directory',
    component: () => import('./practices/directory.zh-CN.md'),
    componentEn: () => import('./practices/directory.en-US.md'),
  },
  {
    name: 'layout',
    component: () => import('./practices/layout.zh-CN.md'),
    componentEn: () => import('./practices/layout.en-US.md'),
  },
  {
    name: 'routesAndMenu',
    component: () => import('./practices/routes-and-menu.zh-CN.md'),
    componentEn: () => import('./practices/routes-and-menu.en-US.md'),
  },
  {
    name: 'permission',
    component: () => import('./practices/permission.zh-CN.md'),
    componentEn: () => import('./practices/permission.en-US.md'),
  },
  {
    name: 'stateManagement',
    component: () => import('./practices/state-management.zh-CN.md'),
    componentEn: () => import('./practices/state-management.en-US.md'),
  },
  {
    name: 'i18n',
    component: () => import('./practices/i18n.zh-CN.md'),
    componentEn: () => import('./practices/i18n.en-US.md'),
  },
  {
    name: 'mock',
    component: () => import('./practices/mock.zh-CN.md'),
    componentEn: () => import('./practices/mock.en-US.md'),
  },
  {
    name: 'build',
    component: () => import('./practices/build.zh-CN.md'),
    componentEn: () => import('./practices/build.en-US.md'),
  },
  {
    name: 'faq',
    component: () => import('./practices/faq.zh-CN.md'),
    componentEn: () => import('./practices/faq.en-US.md'),
  },
];

const components = [
  {
    name: 'common',
    list: [
      {
        name: 'button',
        component: Button,
        componentEn: ButtonEn,
      },
      {
        name: 'basic',
        component: Basic,
        componentEn: BasicEn,
      },
      {
        name: 'count-down',
        component: CountDown,
        componentEn: CountDownEn,
      },
      {
        name: 'count-to',
        component: CountTo,
        componentEn: CountToEn,
      },
      {
        name: 'cropper',
        component: Cropper,
        componentEn: CropperEn,
      },
      {
        name: 'description',
        component: Description,
        componentEn: DescriptionEn,
      },
      {
        name: 'dropdown',
        component: Dropdown,
        componentEn: DropdownEn,
      },
      {
        name: 'icon',
        component: Icon,
        componentEn: IconEn,
      },
      {
        name: 'loading',
        component: Loading,
        componentEn: LoadingEn,
      },

      {
        name: 'time',
        component: Time,
        componentEn: TimeEn,
      },
    ],
  },
  {
    name: 'dataEntry',
    list: [
      {
        name: 'form',
        component: Form,
        componentEn: FormEn,
      },
    ],
  },
  {
    name: 'dataDisplay',
    list: [
      {
        name: 'table',
        component: Table,
        componentEn: TableEn,
      },
      {
        name: 'tree',
        component: Tree,
        componentEn: TreeEn,
      },
    ],
  },
  {
    name: 'container',
    list: [
      {
        name: 'modal',
        component: Modal,
        componentEn: ModalEn,
      },
      {
        name: 'page',
        component: Page,
        componentEn: PageEn,
      },
      {
        name: 'drawer',
        component: Drawer,
        componentEn: DrawerEn,
      },
      {
        name: 'container',
        component: Container,
        componentEn: ContainerEn,
      },
    ],
  },
  {
    name: 'other',
    list: [
      {
        name: 'authority',
        component: Authority,
        componentEn: AuthorityEn,
      },
      {
        name: 'app-provider',
        component: AppProvider,
        componentEn: AppProviderEn,
      },
      {
        name: 'locale-picker',
        component: LocalePicker,
        componentEn: LocalePickerEn,
      },
      {
        name: 'dark-mode-toggle',
        component: DarkModeToggle,
        componentEn: DarkModeToggleEn,
      },
      {
        name: 'clickoutside',
        component: ClickOutSide,
        componentEn: ClickOutSideEn,
      },
      {
        name: 'transition',
        component: Transition,
        componentEn: TransitionEn,
      },
    ],
  },
];

const otherApis = [
  {
    name: 'router',
    component: Router,
    componentEn: RouterEn,
  },
  {
    name: 'store',
    component: Store,
    componentEn: StoreEn,
  },
];

function toKebabCase(string: string) {
  return string.replace(/[A-Z]+/g, (match, offset) => {
    return `${offset > 0 ? '-' : ''}${match.toLocaleLowerCase()}`;
  });
}

const getRoutes = (locale: string) => {
  const routes: AppRouteRecordRaw[] = [];

  const docsMenu: AppRouteRecordRaw[] = [];
  for (const item of docs) {
    const path = `/docs/${toKebabCase(item.name)}`;
    docsMenu.push({
      name: `doc_${toKebabCase(item.name)}`,
      path,
      meta: {
        title: `docs.${item.name}`,
      },
      component: locale == 'en' && item.componentEn ? item.componentEn : item.component,
    });
  }

  const componentMenu: AppRouteRecordRaw[] = [];
  for (const group of components) {
    const menuGroup: AppRouteRecordRaw[] = [];
    for (const item of group.list) {
      const path = `/components/${group.name}/${toKebabCase(item.name)}`;
      menuGroup.push({
        name: `components_${group.name}_${item.name}`,
        path,
        component: locale == 'en' && item.componentEn ? item.componentEn : item.component,
        meta: {
          title: `component.${item.name}`,
        },
      });
    }

    if (group.list.length > 0) {
      componentMenu.push({
        name: `components_${group.name}`,
        path: `/components/${group.name}`,
        redirect: `/components/${group.name}/${toKebabCase(group.list[0].name)}`,
        children: menuGroup,
        meta: {
          title: `group.${group.name}`,
        },
      });
    }
  }

  const practicesDocsMenu: AppRouteRecordRaw[] = [];
  practicesDocs.forEach((item) => {
    const path = `/practices/${toKebabCase(item.name)}`;
    practicesDocsMenu.push({
      name: `practices_${item.name}`,
      path,
      component: locale == 'en' && item.componentEn ? item.componentEn : item.component,
      meta: {
        title: `practices.${item.name}`,
      },
    });
  });

  const apiMenu: AppRouteRecordRaw[] = [];
  for (const item of otherApis) {
    const path = `/api/${toKebabCase(item.name)}`;
    apiMenu.push({
      name: `api_${toKebabCase(item.name)}`,
      path,
      meta: {
        title: `api.${item.name}`,
      },
      component: locale == 'en' && item.componentEn ? item.componentEn : item.component,
    });
  }

  routes.push({
    path: '/home',
    name: 'root',
    //redirect: '/home/index',
    meta: {
      title: 'page.index',
    },
    component: Index,
  });

  if (docs.length > 0) {
    routes.push({
      component: 'LAYOUT',
      name: 'docs',
      path: '/docs',
      redirect: `/docs/${toKebabCase(docs[0].name)}`,
      children: docsMenu,
      meta: {
        title: 'docs.name',
      },
    });
  }

  if (practicesDocsMenu.length > 0) {
    routes.push({
      component: 'LAYOUT',
      name: 'practices',
      path: '/practices',
      redirect: `${practicesDocsMenu[0].path}`,
      children: practicesDocsMenu,
      meta: {
        title: 'practices.name',
      },
    });
  }

  if (componentMenu.length > 0) {
    routes.push({
      component: 'LAYOUT',
      name: 'components',
      path: '/components',
      redirect: `${componentMenu[0].path}`,
      children: componentMenu,
      meta: {
        title: 'component.name',
      },
    });
  }
  if (apiMenu.length > 0) {
    routes.push({
      component: 'LAYOUT',
      name: 'api',
      path: '/api',
      redirect: `${apiMenu[0].path}`,
      children: apiMenu,
      meta: {
        title: 'api.name',
      },
    });
  }
  routes.push({
    path: '/:pathMatch(.*)*',
    redirect: '/home',
    name: 'PageNotFound',
    meta: {
      title: 'PageNotFound',
      hideMenu: true,
    },
  });

  return routes;
};

export default getRoutes;

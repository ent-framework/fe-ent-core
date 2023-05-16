import {AppRouteRecordRaw} from 'fe-ent-core/lib/router';

const Start = () => import('./docs/start.zh-CN.md');
const StartEn = () => import('./docs/start.en-US.md');
const Dark = () => import('./docs/dark.zh-CN.md');
const DarkEn = () => import('./docs/dark.en-US.md');
const Theme = () => import('./docs/theme.zh-CN.md');
const ThemeEn = () => import('./docs/theme.en-US.md');
const I18n = () => import('./docs/i18n.zh-CN.md');
const I18nEn = () => import('./docs/i18n.en-US.md');
const Changelog = () => import('./pages/changelog/changelog.vue');

const Button = () => import('fe-ent-core/lib/components/button/README.zh-CN.md');
const ButtonEn = () => import('fe-ent-core/lib/components/button/README.en-US.md');

const Basic = () => import('fe-ent-core/lib/components/basic/README.zh-CN.md');
const BasicEn = () => import('fe-ent-core/lib/components/basic/README.en-US.md');


const Authority = () => import('fe-ent-core/lib/components/authority/README.zh-CN.md');
const AuthorityEn = () => import('fe-ent-core/lib/components/authority/README.en-US.md');


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
    name: 'token',
    component: () => import('./pages/token/token.vue'),
  },
  {
    name: 'i18n',
    component: I18n,
    componentEn: I18nEn,
  },
  {
    name: 'faq',
    component: () => import('./docs/faq.zh-CN.md'),
    componentEn: () => import('./docs/faq.en-US.md'),
  },
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
    name: 'stateManagementPinia',
    component: () => import('./practices/state-management-pinia.zh-CN.md'),
    componentEn: () => import('./practices/state-management-pinia.en-US.md'),
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
    ],
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
    docsMenu.push(
      {
        name: `doc_${toKebabCase(item.name)}`,
        path,
        meta: {
          title: `docs.${item.name}`,
        },
        component: locale == 'en' &&  item.componentEn ? item.componentEn : item.component,
      },
    );
  }

  const componentMenu: AppRouteRecordRaw[] = [];
  for (const group of components) {
    const menuGroup: AppRouteRecordRaw[] = []
    for (const item of group.list) {
      const path = `/components/${group.name}/${toKebabCase(item.name)}`;
      menuGroup.push({
        name: `components_${group.name}_${item.name}`,
        path,
        component: locale == 'en' &&  item.componentEn ? item.componentEn : item.component,
        meta: {
          title: `component.${item.name}`,
        }
      });
    }

    if (group.list.length>0) {
      componentMenu.push({
        name: `components_${group.name}`,
        path: `/components/${group.name}`,
        redirect: `/components/${group.name}/${toKebabCase(group.list[0].name)}`,
        children: menuGroup,
        meta: {
          title: `group.${group.name}`,
        }
      })
    }
  }


  const practicesDocsMenu: AppRouteRecordRaw[] = [];
  practicesDocs.forEach((item) => {
    const path = `/practices/${toKebabCase(item.name)}`;
    practicesDocsMenu.push(
      {
        name: `practices_${item.name}`,
        path,
        component: locale == 'en' &&  item.componentEn ? item.componentEn : item.component,
        meta: {
          title: `practices.${item.name}`,
        }
      },
    );
  });


  if (docs.length>0) {
    routes.push({
      component: 'LAYOUT',
      name: 'docs',
      path: '/docs',
      redirect: `/docs/${toKebabCase(docs[0].name)}`,
      children: docsMenu,
      meta: {
        title: 'docs.name',
      }
    })
  }

  if (practicesDocsMenu.length>0 ) {
    routes.push({
      component: 'LAYOUT',
      name: 'practices',
      path: '/practices',
      redirect: `${practicesDocsMenu[0].path}`,
      children: practicesDocsMenu,
      meta: {
        title: 'practices.name',
      }
    })
  }


  if (componentMenu.length>0 ) {
    routes.push({
      component: 'LAYOUT',
      name: 'components',
      path: '/components',
      redirect: `${componentMenu[0].path}`,
      children: componentMenu,
      meta: {
        title: 'component.name',
      }
    })
  }

  routes.push({ path: '/', redirect: 'docs', name: 'root', meta: {} });
  routes.push({ path: '/:pathMatch(.*)*', redirect: '/docs/start', name: 'PageNotFound', meta: {} });

  return routes;
}

export default getRoutes;

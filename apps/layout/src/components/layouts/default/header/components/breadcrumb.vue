<template>
  <div :class="[prefixCls, `${prefixCls}--${theme}`]">
    <NBreadcrumb>
      <NBreadcrumbItem v-for="route in routes" :key="route.path">
        <EntIcon v-if="getShowBreadCrumbIcon && getIcon(route)" :icon="getIcon(route)" />
        {{ t((route.name || route.meta.title) as string) }}
      </NBreadcrumbItem>
    </NBreadcrumb>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, watchEffect } from 'vue';
  import { useRouter } from 'vue-router';
  import { NBreadcrumb, NBreadcrumbItem } from 'naive-ui';
  import { EntIcon } from 'fe-ent-core';
  import { useDesign, useGo, useI18n } from 'fe-ent-core/es/hooks';
  import { filter, isString } from 'fe-ent-core/es/utils';
  import { REDIRECT_NAME, getAllParentPath, getMenus } from 'fe-ent-core/es/router';
  import { useLayoutThemeSetting } from '../../../../../hooks';
  import type { Menu } from 'fe-ent-core/es/router';

  import type { RouteLocationMatched } from 'vue-router';

  export default defineComponent({
    name: 'LayoutBreadcrumb',
    components: { EntIcon, NBreadcrumb, NBreadcrumbItem },
    props: {
      theme: {
        type: String,
        required: true,
        validator: (value: string) => {
          // 定义允许的值
          const validThemes = ['dark', 'light'];
          // 检查传入的值是否有效
          return validThemes.includes(value);
        }
      }
    },
    setup() {
      const routes = ref<RouteLocationMatched[]>([]);
      const { currentRoute } = useRouter();
      const { prefixCls } = useDesign('layout-breadcrumb');
      const { getShowBreadCrumbIcon } = useLayoutThemeSetting();
      const go = useGo();

      const { t } = useI18n();
      watchEffect(async () => {
        if (currentRoute.value.name === REDIRECT_NAME) return;
        const menus = await getMenus();
        const routeMatched = currentRoute.value.matched;
        const cur = routeMatched?.[routeMatched.length - 1];
        let path = currentRoute.value.path;

        if (cur && cur?.meta?.currentActiveMenu) {
          path = cur.meta.currentActiveMenu as string;
        }
        const parent = getAllParentPath(menus, path);
        const filterMenus = menus.filter((item) => item.path === parent[0]);
        const matched = getMatched(filterMenus, parent) as any;
        if (!matched || matched.length === 0) return;
        const breadcrumbList = filterItem(matched);

        if (currentRoute.value.meta?.currentActiveMenu) {
          breadcrumbList.push({
            ...currentRoute.value,
            name: currentRoute.value.meta?.title || currentRoute.value.name
          } as unknown as RouteLocationMatched);
        }
        routes.value = breadcrumbList;
      });

      function getMatched(menus: Menu[], parent: string[]) {
        const matched: Menu[] = [];
        menus.forEach((item) => {
          if (parent.includes(item.path)) {
            matched.push({
              ...item,
              name: (item.meta?.title || item.name) as string
            });
          }
          if (item.children?.length) {
            matched.push(...getMatched(item.children, parent));
          }
        });
        return matched;
      }

      function filterItem(list: RouteLocationMatched[]) {
        return filter(list, (item) => {
          const { meta, name } = item;
          if (!meta) {
            return !!name;
          }
          const { title, hideBreadcrumb } = meta;
          if (!title || hideBreadcrumb) {
            return false;
          }
          return true;
        }).filter((item) => !item.meta?.hideBreadcrumb);
      }

      function handleClick(route: RouteLocationMatched, paths: string[], e: Event) {
        e?.preventDefault();
        const { children, redirect, meta } = route;

        if (children?.length && !redirect) {
          e?.stopPropagation();
          return;
        }
        if (meta?.carryParam) {
          return;
        }

        if (redirect && isString(redirect)) {
          go(redirect);
        } else {
          let goPath = '';
          if (paths.length === 1) {
            goPath = paths[0];
          } else {
            const ps = paths.slice(1);
            const lastPath = ps.pop() || '';
            goPath = `${lastPath}`;
          }
          goPath = /^\//.test(goPath) ? goPath : `/${goPath}`;
          go(goPath);
        }
      }

      function hasRedirect(routes: RouteLocationMatched[], route: RouteLocationMatched) {
        return routes.indexOf(route) !== routes.length - 1;
      }

      function getIcon(route) {
        return route.icon || route.meta?.icon;
      }

      return { routes, t, prefixCls, getIcon, getShowBreadCrumbIcon, handleClick, hasRedirect };
    }
  });
</script>

<template>
  <SimpleMenuItem v-if="!menuHasChildren(item) && getShowMenu" v-bind="$props" />
  <SubMenu
    v-if="menuHasChildren(item) && getShowMenu"
    :key="`${item.path}`"
    :class="[theme]"
    :theme="theme"
    popup-class-name="app-top-menu-popup"
  >
    <template #title>
      <SimpleMenuItemContent v-bind="$props" :item="item" />
    </template>

    <template v-for="childrenItem in item.children || []" :key="childrenItem.path">
      <SimpleSubMenuItem v-bind="$props" :parent="false" :item="childrenItem" />
    </template>
  </SubMenu>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue';
  import { Menu } from 'ant-design-vue';
  import { useDesign } from 'fe-ent-core/es/hooks/web/use-design';
  import { itemProps } from '../props';
  import SimpleMenuItem from './simple-menu-item.vue';
  import SimpleMenuItemContent from './simple-menu-item-content.vue';
  import type { Menu as MenuType } from 'fe-ent-core/es/router/types';

  export default defineComponent({
    name: 'SimpleSubMenuItem',
    isSubMenu: true,
    components: {
      SimpleMenuItem,
      SubMenu: Menu.SubMenu,
      SimpleMenuItemContent,
    },
    props: itemProps,
    setup(props) {
      const { prefixCls } = useDesign('simple-menu-item');

      const getShowMenu = computed(() => !props.item.meta?.hideMenu);
      function menuHasChildren(menuTreeItem: MenuType): boolean {
        return (
          !menuTreeItem.meta?.hideChildrenInMenu &&
          Reflect.has(menuTreeItem, 'children') &&
          !!menuTreeItem.children &&
          menuTreeItem.children.length > 0
        );
      }
      return {
        prefixCls,
        menuHasChildren,
        getShowMenu,
      };
    },
  });
</script>

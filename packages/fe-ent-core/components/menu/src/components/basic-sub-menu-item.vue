<template>
  <BasicMenuItem v-if="!menuHasChildren(item) && getShowMenu" v-bind="$props" />
  <SubMenu
    v-if="menuHasChildren(item) && getShowMenu"
    :key="`submenu-${item.path}`"
    :class="[theme]"
    popup-class-name="app-top-menu-popup"
  >
    <template #title>
      <MenuItemContent v-bind="$props" :item="item" />
    </template>

    <template v-for="childrenItem in item.children || []" :key="childrenItem.path">
      <BasicSubMenuItem v-bind="$props" :item="childrenItem" />
    </template>
  </SubMenu>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue';
  import { Menu } from 'ant-design-vue';
  import { useDesign } from '@ent-core/hooks/web/use-design';
  import { itemProps } from '../props';
  import BasicMenuItem from './basic-menu-item.vue';
  import MenuItemContent from './menu-item-content.vue';
  import type { Menu as MenuType } from '@ent-core/router/types';

  export default defineComponent({
    name: 'BasicSubMenuItem',
    isSubMenu: true,
    components: {
      BasicMenuItem,
      SubMenu: Menu.SubMenu,
      MenuItemContent,
    },
    props: itemProps,
    setup(props) {
      const { prefixCls } = useDesign('basic-menu-item');

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

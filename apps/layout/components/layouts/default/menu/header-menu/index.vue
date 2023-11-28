<template>
  <Menu
    :selected-keys="selectedKeys"
    :default-selected-keys="defaultSelectedKeys"
    :mode="mode"
    :open-keys="getOpenKeys"
    :inline-indent="inlineIndent"
    :theme="theme"
    :class="getMenuClass"
    :sub-menu-open-delay="0.2"
    v-bind="getInlineCollapseOptions"
    @open-change="handleOpenChange"
    @click="handleMenuClick"
  >
    <template v-for="item in items" :key="item.path">
      <BasicSubMenuItem :item="item" :theme="theme" :is-horizontal="isHorizontal" />
    </template>
  </Menu>
</template>
<script lang="ts">
  import { computed, defineComponent, onMounted, reactive, ref, toRefs, unref, watch } from 'vue';
  import { Menu } from 'ant-design-vue';
  import { useRouter } from 'vue-router';
  import { MenuModeEnum, MenuTypeEnum } from 'fe-ent-core/es/logics/enums/menu-enum';
  import { REDIRECT_NAME } from 'fe-ent-core/es/router/constant';
  import { useDesign } from 'fe-ent-core/es/hooks/web/use-design';
  import { getCurrentParentPath } from 'fe-ent-core/es/router/menus';
  import { listenerRouteChange } from 'fe-ent-core/es/logics/mitt/route-change';
  import { getAllParentPath } from 'fe-ent-core/es/router/helper/menu-helper';
  import { useMenuSetting } from '../../../../../hooks';
  import { basicProps } from './props';
  import { useOpenKeys } from './use-open-keys';
  import BasicSubMenuItem from './components/basic-sub-menu-item.vue';
  import type { RouteLocationNormalizedLoaded } from 'vue-router';
  import type { MenuState } from './types';

  export default defineComponent({
    name: 'EntHeaderMenu',
    components: {
      Menu,
      BasicSubMenuItem,
    },
    props: basicProps,
    emits: ['menuClick'],
    setup(props, { emit }) {
      const isClickGo = ref(false);
      const currentActiveMenu = ref('');

      const menuState = reactive<MenuState>({
        defaultSelectedKeys: [],
        openKeys: [],
        selectedKeys: [],
        collapsedOpenKeys: [],
      });

      const { prefixCls } = useDesign('basic-menu');
      const { items, mode, accordion } = toRefs(props);

      const { getCollapsed, getTopMenuAlign, getSplit } = useMenuSetting();

      const { currentRoute } = useRouter();

      const { handleOpenChange, setOpenKeys, getOpenKeys } = useOpenKeys(
        menuState,
        items,
        mode as any,
        accordion,
      );

      const getIsTopMenu = computed(() => {
        const { type, mode } = props;

        return (
          (type === MenuTypeEnum.TOP_MENU && mode === MenuModeEnum.HORIZONTAL) ||
          (props.isHorizontal && unref(getSplit))
        );
      });

      const getMenuClass = computed(() => {
        const align = props.isHorizontal && unref(getSplit) ? 'start' : unref(getTopMenuAlign);
        return [
          prefixCls,
          `justify-${align}`,
          {
            [`${prefixCls}__second`]: !props.isHorizontal && unref(getSplit),
            [`${prefixCls}__sidebar-hor`]: unref(getIsTopMenu),
          },
        ];
      });

      const getInlineCollapseOptions = computed(() => {
        const isInline = props.mode === MenuModeEnum.INLINE;

        const inlineCollapseOptions: { inlineCollapsed?: boolean } = {};
        if (isInline) {
          inlineCollapseOptions.inlineCollapsed = props.mixSider ? false : unref(getCollapsed);
        }
        return inlineCollapseOptions;
      });

      onMounted(() => {
        listenerRouteChange((route) => {
          if (route.name === REDIRECT_NAME) return;
          handleMenuChange(route);
          currentActiveMenu.value = route.meta?.currentActiveMenu as string;

          if (unref(currentActiveMenu)) {
            menuState.selectedKeys = [unref(currentActiveMenu)];
            setOpenKeys(unref(currentActiveMenu));
          }
        });
      });

      !props.mixSider &&
        watch(
          () => props.items,
          () => {
            handleMenuChange();
          },
        );

      async function handleMenuClick({ key }: { key: string; keyPath: string[] }) {
        const { beforeClickFn } = props;
        if (beforeClickFn && typeof beforeClickFn === 'function') {
          const flag = await beforeClickFn(key);
          if (!flag) return;
        }
        emit('menuClick', key);

        isClickGo.value = true;
        menuState.selectedKeys = [key];
      }

      async function handleMenuChange(route?: RouteLocationNormalizedLoaded) {
        if (unref(isClickGo)) {
          isClickGo.value = false;
          return;
        }
        const path =
          (route || unref(currentRoute)).meta?.currentActiveMenu ||
          (route || unref(currentRoute)).path;
        setOpenKeys(path as string);
        if (unref(currentActiveMenu)) return;
        if (props.isHorizontal && unref(getSplit)) {
          const parentPath = getCurrentParentPath(path as string);
          menuState.selectedKeys = [parentPath];
        } else {
          const parentPaths = getAllParentPath(props.items, path as string);
          menuState.selectedKeys = parentPaths;
        }
      }

      return {
        handleMenuClick,
        getInlineCollapseOptions,
        getMenuClass,
        handleOpenChange,
        getOpenKeys,
        ...toRefs(menuState),
      };
    },
  });
</script>

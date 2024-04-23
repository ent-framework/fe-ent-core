<template>
  <NMenu
    :mode="mode"
    :indent="inlineIndent"
    :class="getMenuClass"
    :options="items"
    :render-label="renderMenuLabel"
    responsive
    @update:value="handleUpdateValue"
  />
</template>
<script lang="ts">
  import { computed, defineComponent, h, reactive, ref, toRefs, unref, watch } from 'vue';
  import { NMenu } from 'naive-ui';
  import { RouterLink, useRouter } from 'vue-router';
  import { MenuModeEnum, MenuTypeEnum } from 'fe-ent-core/es/logics/enums/menu-enum';
  import { REDIRECT_NAME } from 'fe-ent-core/es/router/constant';
  import { useDesign } from 'fe-ent-core/es/hooks/web/use-design';
  import { getCurrentParentPath } from 'fe-ent-core/es/router/menus';
  import { getAllParentPath } from 'fe-ent-core/es/router/helper/menu-helper';
  import { entRouter } from 'fe-ent-core/es/router';
  import { useMenuSetting } from '../../../../../hooks';
  import { basicProps } from './props';
  import { useOpenKeys } from './use-open-keys';
  import type { RouteLocationNormalizedLoaded } from 'vue-router';
  import type { MenuState } from './types';
  import type { MenuOption } from 'naive-ui/es/menu';

  export default defineComponent({
    name: 'EntHeaderMenu',
    components: {
      NMenu
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
        collapsedOpenKeys: []
      });

      const { prefixCls } = useDesign('basic-menu');
      const { items, mode, accordion } = toRefs(props);

      const { getTopMenuAlign, getSplit } = useMenuSetting();

      const { currentRoute } = useRouter();

      const { handleOpenChange, setOpenKeys, getOpenKeys } = useOpenKeys(
        menuState,
        items,
        mode as any,
        accordion
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
            [`${prefixCls}__sidebar-hor`]: unref(getIsTopMenu)
          }
        ];
      });

      function listenerRouteChange(route: RouteLocationNormalizedLoaded) {
        if (route.name === REDIRECT_NAME) return;
        handleMenuChange(route);
        currentActiveMenu.value = route.meta?.currentActiveMenu as string;

        if (unref(currentActiveMenu)) {
          menuState.selectedKeys = [unref(currentActiveMenu)];
          setOpenKeys(unref(currentActiveMenu));
        }
      }

      watch(
        () => currentRoute.value,
        (route) => {
          listenerRouteChange(route);
        },
        { immediate: true, deep: true }
      );

      !props.mixSider &&
        watch(
          () => props.items,
          () => {
            handleMenuChange();
          }
        );

      async function handleUpdateValue({ key }: { key: string; keyPath: string[] }) {
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
      function renderMenuLabel(option: MenuOption) {
        if ('href' in option) {
          return h('a', { href: option.href, target: '_blank' }, option.label as string);
        }
        let label = option.label as string;
        if (props.collapse) {
          if (!props.collapsedShowTitle) {
            // 判断有没有ICON，没有icon会造成带单空白没显示
            if (!option.icon) {
              label = label.charAt(0);
            }
          }
        }
        if (option.children?.length) {
          return label;
        }
        if (entRouter.hasRoute(option.name as string)) {
          return h(
            RouterLink,
            {
              to: {
                path: option.path as string
              }
            },
            { default: () => option.label }
          );
        }
        return option.label as string;
      }

      return {
        renderMenuLabel,
        handleUpdateValue,
        getMenuClass,
        handleOpenChange,
        getOpenKeys,
        ...toRefs(menuState)
      };
    }
  });
</script>

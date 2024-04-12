<template>
  <NMenu
    :collapsed="collapse"
    :class="prefixCls"
    :collapsed-icon-size="22"
    :options="items"
    :value="selectedKey"
    :render-label="renderMenuLabel"
    @open-change="handleOpenChange"
    @update:value="handleUpdateValue"
  />
</template>
<script lang="ts">
  import { computed, defineComponent, h, reactive, ref, toRefs, unref, watch } from 'vue';
  import { RouterLink, useRouter } from 'vue-router';
  import { NMenu } from 'naive-ui';
  import { useDesign } from 'fe-ent-core/es/hooks/web/use-design';
  import { REDIRECT_NAME } from 'fe-ent-core/es/router/constant';
  import { isUrl } from 'fe-ent-core/es/utils/is';
  import { openWindow } from 'fe-ent-core/es/utils';
  import { entRouter } from 'fe-ent-core/es/router';
  import { useOpenKeys } from './use-open-keys';
  import { basicProps } from './props';
  import type { MenuOption } from 'naive-ui/es/menu';
  import type { RouteLocationNormalizedLoaded } from 'vue-router';
  import type { SimpleMenuState } from './types';
  export default defineComponent({
    name: 'EntLeftMenu',
    components: {
      NMenu,
    },
    inheritAttrs: false,
    props: basicProps,
    emits: ['menuClick'],
    setup(props, { attrs, emit }) {
      const currentActiveMenu = ref('');
      const isClickGo = ref(false);

      const menuState = reactive<SimpleMenuState>({
        defaultSelectedKeys: [],
        openKeys: [],
        selectedKey: '',
      });

      const { currentRoute } = useRouter();
      const { prefixCls } = useDesign('simple-menu');
      const { items, accordion, mixSider, collapse } = toRefs(props);
      const { handleOpenChange, setOpenKeys, getOpenKeys } = useOpenKeys(
        menuState,
        items,
        accordion,
        mixSider as any,
        collapse as any,
      );

      const getBindValues = computed(() => ({ ...attrs, ...props }));

      function listenerRouteChange(route: RouteLocationNormalizedLoaded) {
        if (route.name === REDIRECT_NAME) return;

        currentActiveMenu.value = route.meta?.currentActiveMenu as string;
        handleMenuChange(route);

        if (unref(currentActiveMenu)) {
          menuState.selectedKey = unref(currentActiveMenu);
          setOpenKeys(unref(currentActiveMenu));
        }
      }

      watch(
        () => currentRoute.value,
        (route) => {
          listenerRouteChange(route);
        },
        { immediate: true, deep: true },
      );

      watch(
        () => props.collapse,
        (collapse) => {
          if (collapse) {
            menuState.openKeys = [];
          } else {
            setOpenKeys(currentRoute.value.path);
          }
        },
        { immediate: true },
      );

      watch(
        () => props.items,
        () => {
          if (!props.isSplitMenu) {
            return;
          }
          setOpenKeys(currentRoute.value.path);
        },
        { flush: 'post' },
      );

      async function handleMenuChange(route?: RouteLocationNormalizedLoaded) {
        if (unref(isClickGo)) {
          isClickGo.value = false;
          return;
        }
        const path = (route || unref(currentRoute)).path;

        menuState.selectedKey = path;

        setOpenKeys(path);
      }

      async function handleSelect({ key }: { key: string; keyPath: string[] }) {
        if (isUrl(key)) {
          openWindow(key);
          return;
        }
        const { beforeClickFn } = props;
        if (beforeClickFn && typeof beforeClickFn === 'function') {
          const flag = await beforeClickFn(key);
          if (!flag) return;
        }

        emit('menuClick', key);

        isClickGo.value = true;
        setOpenKeys(key);
        menuState.selectedKey = key;
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
                path: option.path as string,
              },
            },
            { default: () => option.label },
          );
        }
        return option.label as string;
      }

      async function handleUpdateValue(key: string) {
        if (isUrl(key)) {
          openWindow(key);
          return;
        }
        const { beforeClickFn } = props;
        if (beforeClickFn && typeof beforeClickFn === 'function') {
          const flag = await beforeClickFn(key);
          if (!flag) return;
        }

        emit('menuClick', key);

        isClickGo.value = true;
        setOpenKeys(key);
        menuState.selectedKey = key;
      }

      return {
        handleUpdateValue,
        renderMenuLabel,
        prefixCls,
        getBindValues,
        handleSelect,
        getOpenKeys,
        handleOpenChange,
        ...toRefs(menuState),
      };
    },
  });
</script>

<template>
  <Menu
    :theme="theme"
    :class="prefixCls"
    :open-keys="getOpenKeys"
    :selected-keys="selectedKeys"
    mode="inline"
    @click="handleSelect"
  >
    <template v-for="item in items" :key="item.path">
      <SimpleSubMenuItem
        :item="item"
        :parent="true"
        :collapsed-show-title="collapsedShowTitle"
        :collapse="collapse"
        :theme="theme"
      />
    </template>
  </Menu>
</template>
<script lang="ts">
  import { computed, defineComponent, reactive, ref, toRef, toRefs, unref, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import { isFunction } from '@vueuse/shared';
  import { Menu } from 'ant-design-vue';
  import { useDesign } from '@ent-core/hooks/web/use-design';
  import { listenerRouteChange } from '@ent-core/logics/mitt/route-change';
  import { propTypes } from '@ent-core/utils/prop-types';
  import { REDIRECT_NAME } from '@ent-core/router/constant';
  import { isUrl } from '@ent-core/utils/is';
  import { openWindow } from '@ent-core/utils';
  import SimpleSubMenuItem from './components/simple-sub-menu-item.vue';
  import { useOpenKeys } from './use-simple-open-keys';
  import type { PropType } from 'vue';
  import type { RouteLocationNormalizedLoaded } from 'vue-router';
  import type { Menu as MenuType } from '@ent-core/router/types';
  import type { SimpleMenuState } from './types';
  export default defineComponent({
    name: 'EntSimpleMenu',
    components: {
      Menu,
      SimpleSubMenuItem,
    },
    inheritAttrs: false,
    props: {
      items: {
        type: Array as PropType<MenuType[]>,
        default: () => [],
      },
      collapse: propTypes.bool,
      mixSider: propTypes.bool,
      theme: propTypes.string,
      accordion: propTypes.bool.def(true),
      collapsedShowTitle: propTypes.bool,
      beforeClickFn: {
        type: Function as PropType<(key: string) => Promise<boolean>>,
      },
      isSplitMenu: propTypes.bool,
    },
    emits: ['menuClick'],
    setup(props, { attrs, emit }) {
      const currentActiveMenu = ref('');
      const isClickGo = ref(false);

      const menuState = reactive<SimpleMenuState>({
        defaultSelectedKeys: [],
        openKeys: [],
        selectedKeys: [],
      });

      const { currentRoute } = useRouter();
      const { prefixCls } = useDesign('simple-menu');
      //const { items, accordion, mixSider, collapse } = toRefs(props);
      const items = toRef(props, 'items');
      const accordion = toRef(props, 'accordion');
      const mixSider = toRef(props, 'mixSider');
      const collapse = toRef(props, 'collapse');
      console.log(`${accordion.value}-${collapse.value}-${mixSider.value}--${props.theme}`);
      const { setOpenKeys, getOpenKeys } = useOpenKeys(
        menuState,
        items,
        accordion,
        mixSider as any,
        collapse as any,
      );

      const getBindValues = computed(() => ({ ...attrs, ...props }));

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
          console.log('tree item changed');
          if (!props.isSplitMenu) {
            return;
          }
          setOpenKeys(currentRoute.value.path);
        },
        { flush: 'post' },
      );

      listenerRouteChange((route) => {
        console.log(`route changed : ${route.path}`);
        if (route.name === REDIRECT_NAME) return;

        currentActiveMenu.value = route.meta?.currentActiveMenu as string;
        handleMenuChange(route);

        console.log('handleMenuChange');

        if (unref(currentActiveMenu)) {
          console.log('currentActiveMenu');
          menuState.selectedKeys = [unref(currentActiveMenu)];
          setOpenKeys(unref(currentActiveMenu));
        }
      });

      async function handleMenuChange(route?: RouteLocationNormalizedLoaded) {
        if (unref(isClickGo)) {
          isClickGo.value = false;
          return;
        }
        const path = (route || unref(currentRoute)).path;

        menuState.selectedKeys = [path];

        setOpenKeys(path);
      }

      async function handleSelect({ key }: { key: string; keyPath: string[] }) {
        if (isUrl(key)) {
          openWindow(key);
          return;
        }
        const { beforeClickFn } = props;
        if (beforeClickFn && isFunction(beforeClickFn)) {
          const flag = await beforeClickFn(key);
          if (!flag) return;
        }

        emit('menuClick', key);

        isClickGo.value = true;
        setOpenKeys(key);
        menuState.selectedKeys = [key];
      }

      return {
        prefixCls,
        getBindValues,
        handleSelect,
        getOpenKeys,
        ...toRefs(menuState),
      };
    },
  });
</script>

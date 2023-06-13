<template>
  <Menu
    :class="prefixCls"
    :open-keys="getOpenKeys"
    :selected-keys="selectedKeys"
    :force-sub-menu-render="true"
    mode="inline"
    :theme="theme"
    @open-change="handleOpenChange"
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
  import { computed, defineComponent, onMounted, reactive, ref, toRefs, unref, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import { isFunction } from '@vueuse/shared';
  import { Menu } from 'ant-design-vue';
  import { useDesign } from 'fe-ent-core/es/hooks/web/use-design';
  import { listenerRouteChange } from 'fe-ent-core/es/logics/mitt/route-change';
  import { REDIRECT_NAME } from 'fe-ent-core/es/router/constant';
  import { isUrl } from 'fe-ent-core/es/utils/is';
  import { openWindow } from 'fe-ent-core/es/utils';
  import SimpleSubMenuItem from './components/simple-sub-menu-item.vue';
  import { useOpenKeys } from './use-open-keys';
  import { basicProps } from './props';
  import type { RouteLocationNormalizedLoaded } from 'vue-router';
  import type { SimpleMenuState } from './types';
  export default defineComponent({
    name: 'EntLeftMenu',
    components: {
      Menu,
      SimpleSubMenuItem,
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
        selectedKeys: [],
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
      onMounted(() => {
        listenerRouteChange((route) => {
          if (route.name === REDIRECT_NAME) return;

          currentActiveMenu.value = route.meta?.currentActiveMenu as string;
          handleMenuChange(route);

          if (unref(currentActiveMenu)) {
            console.log('currentActiveMenu');
            menuState.selectedKeys = [unref(currentActiveMenu)];
            setOpenKeys(unref(currentActiveMenu));
          }
        });
      });
      return {
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

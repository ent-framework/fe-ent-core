<template>
  <div :class="getWrapClass" :style="getWrapStyle">
    <Tabs
      type="editable-card"
      size="small"
      :animated="false"
      :hide-add="true"
      :tab-bar-gutter="3"
      :active-key="activeKeyRef"
      @change="handleChange"
      @edit="handleEdit"
    >
      <template v-for="item in getTabsState" :key="item.query ? item.fullPath : item.path">
        <TabPane :closable="!(item && item.meta && item.meta.affix)">
          <template #tab>
            <TabContent :tab-item="item" />
          </template>
        </TabPane>
      </template>

      <template v-if="getShowRedo || getShowQuick" #rightExtra>
        <TabRedo v-if="getShowRedo" />
        <TabContent v-if="getShowQuick" is-extra :tab-item="$route" />
        <FoldButton v-if="getShowFold" />
      </template>
    </Tabs>
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent, ref, unref } from 'vue';

  import { Tabs } from 'ant-design-vue';

  import { useDesign, useGo, useMultipleTabSetting, useTheme } from 'fe-ent-core/es/hooks';
  import { useMultipleTabStore, useUserStore } from 'fe-ent-core/es/store';
  import { listenerRouteChange } from 'fe-ent-core/es/logics';
  import { REDIRECT_NAME } from 'fe-ent-core/es/router';
  import { useRouter } from 'vue-router';
  import { initAffixTabs, useTabsDrag } from './use-multiple-tabs';
  import TabRedo from './components/tab-redo.vue';
  import FoldButton from './components/fold-button.vue';
  import TabContent from './components/tab-content.vue';
  import type { RouteLocationNormalized, RouteMeta } from 'vue-router';
  import type { CSSProperties } from 'vue';
  export default defineComponent({
    name: 'MultipleTabs',
    components: {
      TabRedo,
      FoldButton,
      Tabs,
      TabPane: Tabs.TabPane,
      TabContent,
    },
    setup() {
      const affixTextList = initAffixTabs();
      const activeKeyRef = ref('');

      useTabsDrag(affixTextList);
      const tabStore = useMultipleTabStore();
      const userStore = useUserStore();
      const router = useRouter();

      const { prefixCls } = useDesign('multiple-tabs');

      const go = useGo();
      const { getShowQuick, getShowRedo, getShowFold } = useMultipleTabSetting();

      const getTabsState = computed(() => {
        return tabStore.getTabList.filter((item) => !item.meta?.hideTab);
      });

      const unClose = computed(() => unref(getTabsState).length === 1);

      const getWrapClass = computed(() => {
        return [
          prefixCls,
          {
            [`${prefixCls}--hide-close`]: unref(unClose),
          },
        ];
      });

      const { useToken } = useTheme();
      const { token } = useToken();
      const getWrapStyle = computed((): CSSProperties => {
        const tokenValues = unref(token);
        return {
          backgroundColor: tokenValues.colorBgContainer,
        };
      });
      listenerRouteChange((route) => {
        const { name } = route;
        if (name === REDIRECT_NAME || !route || !userStore.getToken) {
          return;
        }

        const { path, fullPath, meta = {} } = route;
        const { currentActiveMenu, hideTab } = meta as RouteMeta;
        const isHide = !hideTab ? null : currentActiveMenu;
        const p = isHide || fullPath || path;
        if (activeKeyRef.value !== p) {
          activeKeyRef.value = p as string;
        }

        if (isHide) {
          const findParentRoute = router
            .getRoutes()
            .find((item) => item.path === currentActiveMenu);

          findParentRoute && tabStore.addTab(findParentRoute as unknown as RouteLocationNormalized);
        } else {
          tabStore.addTab(unref(route));
        }
      });

      function handleChange(activeKey: any) {
        activeKeyRef.value = activeKey;
        go(activeKey, false);
      }

      // Close the current tab
      function handleEdit(targetKey: string) {
        // Added operation to hide, currently only use delete operation
        if (unref(unClose)) {
          return;
        }

        tabStore.closeTabByKey(targetKey, router);
      }
      return {
        prefixCls,
        unClose,
        getWrapClass,
        getWrapStyle,
        handleEdit,
        handleChange,
        activeKeyRef,
        getTabsState,
        getShowQuick,
        getShowRedo,
        getShowFold,
      };
    },
  });
</script>

<template>
  <div :class="getWrapClass">
    <Tabs
      type="editable-card"
      size="small"
      :animated="false"
      :hideAdd="true"
      :tabBarGutter="3"
      :activeKey="activeKeyRef"
      @change="handleChange"
      @edit="handleEdit"
    >
      <template v-for="item in getTabsState" :key="item.query ? item.fullPath : item.path">
        <TabPane :closable="!(item && item.meta && item.meta.affix)">
          <template #tab>
            <TabContent :tabItem="item" />
          </template>
        </TabPane>
      </template>

      <template #rightExtra v-if="getShowRedo || getShowQuick">
        <TabRedo v-if="getShowRedo" />
        <TabContent isExtra :tabItem="$route" v-if="getShowQuick" />
        <FoldButton v-if="getShowFold" />
      </template>
    </Tabs>
  </div>
</template>
<script lang="ts">
  import type { RouteLocationNormalized, RouteMeta } from 'vue-router';

  import { defineComponent, computed, unref, ref } from 'vue';

  import { Tabs } from 'ant-design-vue';
  import TabContent from './components/tab-content.vue';
  import FoldButton from './components/fold-button.vue';
  import TabRedo from './components/tab-redo.vue';

  import { useGo } from 'fe-ent-core/lib/hooks';

  import { useMultipleTabStore } from 'fe-ent-core/lib/store';
  import { useUserStore } from 'fe-ent-core/lib/store';

  import { initAffixTabs, useTabsDrag } from './use-multiple-tabs';
  import { useDesign } from 'fe-ent-core/lib/hooks';
  import { useMultipleTabSetting } from 'fe-ent-core/lib/hooks';

  import { REDIRECT_NAME } from 'fe-ent-core/lib/router';
  import { listenerRouteChange } from 'fe-ent-core/lib/logics';

  import { useRouter } from 'vue-router';

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

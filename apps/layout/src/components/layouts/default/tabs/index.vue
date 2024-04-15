<template>
  <div :class="getWrapClass">
    <NTabs
      type="card"
      size="small"
      :animated="false"
      :hide-add="true"
      :tab-bar-gutter="3"
      :value="activeKeyRef"
      @edit="handleEdit"
      @close="handleClose"
      @update:value="handleUpdateValue"
    >
      <NTabPane
        v-for="item in getTabsState"
        :key="getItemKey(item)"
        :closable="!(item && item.meta && item.meta.affix)"
        :name="getItemKey(item)"
        :tab="t(item.meta?.title as string)"
      >
        <template #tab>
          <TabContent :tab-item="item" />
        </template>
      </NTabPane>

      <template v-if="getShowRedo || getShowQuick" #suffix>
        <TabRedo v-if="getShowRedo" />
        <TabContent v-if="getShowQuick" is-extra :tab-item="$route" />
        <FoldButton v-if="getShowFold" />
      </template>
    </NTabs>
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent, ref, unref, watch } from 'vue';
  import { NTabPane, NTabs } from 'naive-ui';
  import { useDesign, useGo, useI18n } from 'fe-ent-core/es/hooks';

  import { useSessionStore } from 'fe-ent-core/es/store';
  import { REDIRECT_NAME } from 'fe-ent-core/es/router';
  import { useRouter } from 'vue-router';
  import { useMultipleTabStore } from '../../../../store/multiple-tab';
  import { useMultipleTabSetting } from '../../../../hooks';
  import { initAffixTabs, useTabsDrag } from './use-multiple-tabs';
  import TabRedo from './components/tab-redo.vue';
  import FoldButton from './components/fold-button.vue';
  import TabContent from './components/tab-content.vue';
  import type { RouteLocationNormalized, RouteMeta } from 'vue-router';
  export default defineComponent({
    name: 'MultipleTabs',
    components: {
      TabRedo,
      FoldButton,
      NTabs,
      NTabPane,
      TabContent,
    },
    setup() {
      const { t } = useI18n();
      const affixTextList = initAffixTabs();
      const activeKeyRef = ref('');
      const { currentRoute } = useRouter();
      useTabsDrag(affixTextList);
      const tabStore = useMultipleTabStore();
      const sessionStore = useSessionStore();
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
      watch(
        () => currentRoute.value,
        (route) => {
          listenerRouteChange(route);
        },
        { immediate: true, deep: true },
      );

      function listenerRouteChange(route: RouteLocationNormalized) {
        const { name } = route;
        if (name === REDIRECT_NAME || !route || !sessionStore.getToken) {
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
      }

      function handleUpdateValue(activeKey: any) {
        const options = unref(getTabsState).find((item) => getItemKey(item) === activeKey);
        if (options) {
          activeKeyRef.value = activeKey;
          go(activeKey, false);
        }
      }

      // Close the current tab
      function handleEdit(targetKey: string) {
        // Added operation to hide, currently only use delete operation
        if (unref(unClose)) {
          return;
        }

        tabStore.closeTabByKey(targetKey, router);
      }
      function handleClose(targetKey: string) {
        // Added operation to hide, currently only use delete operation
        if (unref(unClose)) {
          return;
        }

        tabStore.closeTabByKey(targetKey, router);
      }

      function getItemKey(item) {
        return item.query ? item.fullPath : item.path;
      }
      return {
        t,
        prefixCls,
        unClose,
        getWrapClass,
        handleEdit,
        handleClose,
        handleUpdateValue,
        activeKeyRef,
        getTabsState,
        getShowQuick,
        getShowRedo,
        getShowFold,
        getItemKey,
      };
    },
  });
</script>

<template>
  <div :class="getWrapClass">
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

  import { useDesign, useGo, useMultipleTabSetting } from 'fe-ent-core';

  import { useMultipleTabStore, useUserStore } from 'fe-ent-core';

  import { REDIRECT_NAME } from 'fe-ent-core';
  import { listenerRouteChange } from 'fe-ent-core';

  import { useRouter } from 'vue-router';
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
<style lang="less">
  @multiple-tabs-prefix-cls: ~'@{vben-prefix}-multiple-tabs';

  html[data-theme='dark'] {
    .@{multiple-tabs-prefix-cls} {
      .ant-tabs-tab {
        border-bottom: 1px solid @border-color-base;
      }
    }
  }

  html[data-theme='light'] {
    .@{multiple-tabs-prefix-cls} {
      .ant-tabs-tab:not(.ant-tabs-tab-active) {
        border: 1px solid #d9d9d9 !important;
      }
    }
  }

  .@{multiple-tabs-prefix-cls} {
    z-index: 10;
    height: @multiple-height + 2;
    line-height: @multiple-height + 2;
    background-color: @component-background;
    border-bottom: 1px solid @border-color-base;

    .ant-tabs-small {
      height: @multiple-height;
    }

    .ant-tabs.ant-tabs-card {
      .ant-tabs-nav {
        padding-top: 2px;
        height: @multiple-height;
        margin: 0;
        background-color: @component-background;
        border: 0;
        box-shadow: none;

        .ant-tabs-nav-container {
          height: @multiple-height;
          padding-top: 2px;
        }

        .ant-tabs-tab {
          height: calc(@multiple-height - 2px);
          padding-right: 12px;
          line-height: calc(@multiple-height - 2px);
          color: @text-color-base;
          background-color: @component-background;
          transition: none;

          &:hover {
            .ant-tabs-tab-remove {
              opacity: 1;
            }
          }

          .ant-tabs-tab-remove {
            width: 8px;
            height: 28px;
            font-size: 12px;
            color: inherit;
            opacity: 0;
            transition: none;
            margin-left: 2px;
            margin-right: -4px;

            &:hover {
              svg {
                width: 0.8em;
              }
            }

            .anticon-close {
              vertical-align: 0.125em !important;
            }
          }

          svg {
            fill: @text-color-base;
          }
        }

        .ant-tabs-tab:not(.ant-tabs-tab-active) {
          &:hover {
            color: @primary-color;
          }
        }

        .ant-tabs-tab-active {
          position: relative;
          padding-left: 18px;
          background: @primary-color;
          border: 0;
          transition: none;

          span {
            color: @white !important;
          }

          .ant-tabs-tab-remove {
            opacity: 1;
          }

          svg {
            width: 0.7em;
            fill: @white;
          }
        }
      }

      .ant-tabs-nav > div:nth-child(1) {
        padding: 0 6px;

        .ant-tabs-tab {
          margin-right: 3px !important;
        }
      }
    }

    .ant-tabs-tab:not(.ant-tabs-tab-active) {
      .anticon-close {
        font-size: 12px;

        svg {
          width: 0.6em;
        }
      }
    }

    .ant-tabs-extra-content {
      line-height: @multiple-height !important;
    }

    .ant-dropdown-trigger {
      display: inline-flex;
    }

    &--hide-close {
      .ant-tabs-tab-remove {
        opacity: 0 !important;
      }
    }

    &-content {
      &__extra-quick,
      &__extra-redo,
      &__extra-fold {
        display: inline-block;
        width: 36px;
        height: @multiple-height;
        line-height: @multiple-height;
        color: @text-color-secondary;
        text-align: center;
        cursor: pointer;
        border-left: 1px solid @border-color-base;

        &:hover {
          color: @text-color-base;
        }

        span[role='img'] {
          transform: rotate(90deg);
        }
      }

      &__extra-redo {
        span[role='img'] {
          transform: rotate(0deg);
        }
      }

      &__info {
        display: inline-block;
        width: 100%;
        height: @multiple-height - 2;
        padding-left: 0;
        margin-left: -10px;
        font-size: 12px;
        cursor: pointer;
        user-select: none;
      }
    }
  }
</style>

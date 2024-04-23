<template>
  <div
    v-if="getMenuFixed && !getIsMobile"
    v-show="showClassSideBarRef"
    :style="getHiddenDomStyle"
  />
  <NLayoutSider
    v-show="showClassSideBarRef"
    ref="sideRef"
    collapse-mode="width"
    :bordered="true"
    :class="getSiderClass"
    :width="getMenuWidth"
    :collapsed="getCollapsed"
    :collapsed-width="getCollapsedWidth"
    :show-trigger="getShowTrigger"
    v-bind="getTriggerAttr"
    @breakpoint="onBreakpointChange"
  >
    <LayoutMenu :menu-mode="getMode" :split-type="getSplitType" />
    <DragBar ref="dragBarRef" />
  </NLayoutSider>
</template>
<script lang="ts">
  import { computed, defineComponent, ref, unref } from 'vue';
  import { NLayoutSider } from 'naive-ui';
  import { MenuModeEnum, MenuSplitTyeEnum } from 'fe-ent-core/es/logics';
  import { useAppInject, useDesign } from 'fe-ent-core/es/hooks';
  import { useLayoutTheme, useMenuSetting } from '../../../../hooks';
  import LayoutMenu from '../menu/index.vue';
  import { useDragLine, useSiderEvent, useTrigger } from './use-layout-sider';
  import DragBar from './drag-bar.vue';
  import type { ElRef } from 'fe-ent-core/es/types';
  import type { CSSProperties } from 'vue';
  export default defineComponent({
    name: 'LayoutSideBar',
    components: { NLayoutSider, LayoutMenu, DragBar },
    setup() {
      const dragBarRef = ref<ElRef>(null);
      const sideRef = ref<ElRef>(null);

      const {
        getCollapsed,
        getMenuWidth,
        getSplit,
        getRealWidth,
        getMenuHidden,
        getMenuFixed,
        getIsMixMode,
        toggleCollapsed
      } = useMenuSetting();

      const { prefixCls } = useDesign('layout-sideBar');

      const { getIsMobile } = useAppInject();

      const { getTriggerAttr, getShowTrigger } = useTrigger(getIsMobile);
      const { getActualMenuTheme } = useLayoutTheme();

      useDragLine(sideRef, dragBarRef);

      const { getCollapsedWidth, onBreakpointChange } = useSiderEvent();

      const getMode = computed(() => {
        return unref(getSplit) ? MenuModeEnum.INLINE : null;
      });

      const getSplitType = computed(() => {
        return unref(getSplit) ? MenuSplitTyeEnum.LEFT : MenuSplitTyeEnum.NONE;
      });

      const showClassSideBarRef = computed(() => {
        return unref(getSplit) ? !unref(getMenuHidden) : true;
      });

      const getSiderClass = computed(() => {
        return [
          prefixCls,
          {
            [`${prefixCls}--fixed`]: unref(getMenuFixed),
            [`${prefixCls}--mix`]: unref(getIsMixMode) && !unref(getIsMobile)
          }
        ];
      });

      const getHiddenDomStyle = computed((): CSSProperties => {
        const width = `${unref(getRealWidth)}px`;
        return {
          width,
          overflow: 'hidden',
          flex: `0 0 ${width}`,
          maxWidth: width,
          minWidth: width,
          transition: 'all 0.2s'
        };
      });

      return {
        prefixCls,
        sideRef,
        dragBarRef,
        getIsMobile,
        getHiddenDomStyle,
        getSiderClass,
        getTriggerAttr,
        getCollapsedWidth,
        getMenuFixed,
        showClassSideBarRef,
        getMenuWidth,
        getCollapsed,
        onBreakpointChange,
        getMode,
        getSplitType,
        getShowTrigger,
        toggleCollapsed,
        getActualMenuTheme
      };
    }
  });
</script>

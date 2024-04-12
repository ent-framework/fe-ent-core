<template>
  <div
    v-if="getMenuFixed && !getIsMobile"
    v-show="showClassSideBarRef"
    :style="getHiddenDomStyle"
  />
  <NLayoutSider
    v-show="showClassSideBarRef"
    ref="sideRef"
    :bordered="true"
    :inverted="getInverted"
    :class="getSiderClass"
    :width="getMenuWidth"
    :collapsed="getCollapsed"
    :collapsed-width="getCollapsedWidth"
    :trigger="getTrigger"
    v-bind="getTriggerAttr"
    @breakpoint="onBreakpointChange"
  >
    <template v-if="getShowTrigger" #trigger>
      <LayoutTrigger />
    </template>
    <LayoutMenu :menu-mode="getMode" :split-type="getSplitType" />
    <DragBar ref="dragBarRef" />
  </NLayoutSider>
</template>
<script lang="ts">
  import { computed, defineComponent, h, ref, unref } from 'vue';
  import { NLayoutSider } from 'naive-ui';
  import { MenuModeEnum, MenuSplitTyeEnum } from 'fe-ent-core/es/logics';
  import { useAppInject, useDesign } from 'fe-ent-core/es/hooks';
  import { useLayoutTheme, useMenuSetting } from '../../../../hooks';
  import LayoutTrigger from '../trigger/index.vue';
  import LayoutMenu from '../menu/index.vue';
  import { useDragLine, useSiderEvent, useTrigger } from './use-layout-sider';
  import DragBar from './drag-bar.vue';
  import type { ElRef } from 'fe-ent-core/es/types';
  import type { CSSProperties } from 'vue';
  export default defineComponent({
    name: 'LayoutSideBar',
    components: { NLayoutSider, LayoutMenu, DragBar, LayoutTrigger },
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
        getInverted,
        toggleCollapsed,
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
            [`${prefixCls}--mix`]: unref(getIsMixMode) && !unref(getIsMobile),
          },
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
          transition: 'all 0.2s',
        };
      });

      // 在此处使用计算量可能会导致sider异常
      // andv 更新后，如果trigger插槽可用，则此处代码可废弃
      const getTrigger = h(LayoutTrigger);

      return {
        prefixCls,
        sideRef,
        dragBarRef,
        getIsMobile,
        getHiddenDomStyle,
        getSiderClass,
        getTrigger,
        getInverted,
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
        getActualMenuTheme,
      };
    },
  });
</script>

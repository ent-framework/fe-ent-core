<template>
  <div :class="prefixCls">
    <CollapseHeader v-bind="$props" :prefix-cls="prefixCls" :show="show" @expand="handleExpand">
      <template #title>
        <slot name="title" />
      </template>
      <template #action>
        <slot name="action" />
      </template>
    </CollapseHeader>

    <div class="p-2">
      <CollapseTransition :enable="canExpan">
        <NSkeleton v-if="loading" :animated="loading" />
        <div v-else v-show="show" :class="`${prefixCls}__body`">
          <slot />
        </div>
      </CollapseTransition>
    </div>
    <div v-if="$slots.footer" :class="`${prefixCls}__footer`">
      <slot name="footer" />
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  // component
  import { NSkeleton } from 'naive-ui';
  import { CollapseTransition } from '../../../../components/transition';
  import { triggerWindowResize } from '../../../../utils';
  // hook
  import { useTimeoutFn } from '../../../../hooks/core/use-timeout';
  import { useDesign } from '../../../../hooks';
  import CollapseHeader from './collapse-header.vue';
  import type { PropType } from 'vue';

  const props = {
    /**
     * 标题
     */
    title: { type: String, default: '' },
    /**
     * 显示加载骨架屏
     */
    loading: { type: Boolean },
    /**
     * @zh 是否可以展开，为true显示折叠按钮
     * @en Can it be expanded
     */
    canExpan: { type: Boolean, default: true },
    /**
     * @zh 标题右侧温馨提醒
     * @en Warm reminder on the right side of the title
     */
    helpMessage: {
      type: [Array, String] as PropType<string[] | string>,
      default: ''
    },
    /**
     * @zh 展开收缩的时候是否触发 window.resize
     * @en Whether to trigger window.resize when expanding and contracting, Can adapt to tables and forms, when the form shrinks, the form triggers resize to adapt to the height
     */
    triggerWindowResize: { type: Boolean },
    /**
     * @zh 延迟加载时间
     * @en Delayed loading time
     */
    lazyTime: { type: Number, default: 0 }
  };

  export default defineComponent({
    name: 'EntCollapseContainer',
    components: { CollapseHeader, CollapseTransition, NSkeleton },
    props,
    setup(props) {
      const show = ref(true);

      const { prefixCls } = useDesign('collapse-container');
      /**
       * @description: Handling development events
       */
      function handleExpand() {
        show.value = !show.value;
        if (props.triggerWindowResize) {
          // 200 milliseconds here is because the expansion has animation,
          useTimeoutFn(triggerWindowResize, 200);
        }
      }
      return {
        prefixCls,
        handleExpand,
        show
      };
    }
  });
</script>

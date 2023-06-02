<template>
  <div :class="prefixCls" :style="getContentStyle">
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
        <Skeleton v-if="loading" :active="loading" />
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
  import { computed, defineComponent, ref } from 'vue';
  // component
  import { Skeleton } from 'ant-design-vue';
  import { CollapseTransition } from '@ent-core/components/transition';
  import { triggerWindowResize } from '@ent-core/utils/event';
  // hook
  import { useTimeoutFn } from '@ent-core/hooks/core/use-timeout';
  import { useDesign } from '@ent-core/hooks/web/use-design';
  import { useTheme } from '@ent-core/hooks';
  import CollapseHeader from './collapse-header.vue';
  import type { CSSProperties, PropType } from 'vue';

  const props = {
    title: { type: String, default: '' },
    loading: { type: Boolean },
    /**
     *  Can it be expanded
     */
    canExpan: { type: Boolean, default: true },
    /**
     * Warm reminder on the right side of the title
     */
    helpMessage: {
      type: [Array, String] as PropType<string[] | string>,
      default: '',
    },
    /**
     * Whether to trigger window.resize when expanding and contracting,
     * Can adapt to tables and forms, when the form shrinks, the form triggers resize to adapt to the height
     */
    triggerWindowResize: { type: Boolean },
    /**
     * Delayed loading time
     */
    lazyTime: { type: Number, default: 0 },
  };

  export default defineComponent({
    name: 'EntCollapseContainer',
    components: { CollapseHeader, CollapseTransition, Skeleton },
    props,
    setup(props) {
      const show = ref(true);

      const { prefixCls } = useDesign('collapse-container');
      const { useToken } = useTheme();
      const { token } = useToken();
      const getContentStyle = computed((): CSSProperties => {
        return {
          backgroundColor: token.value.colorBgContainer,
        };
      });
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
        show,
        getContentStyle,
      };
    },
  });
</script>

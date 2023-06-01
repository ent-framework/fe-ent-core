<template>
  <span :class="getClass" :style="getContentStyle">
    <slot />
    <BasicHelp v-if="helpMessage" :class="`${prefixCls}-help`" :text="helpMessage" />
  </span>
</template>
<script lang="ts">
  import { computed, defineComponent, useSlots } from 'vue';
  import { useDesign } from '@ent-core/hooks/web/use-design';
  import { useTheme } from '@ent-core/hooks';
  import BasicHelp from './basic-help.vue';
  import type { CSSProperties, PropType } from 'vue';
  const props = {
    /**
     * Help text list or string
     * @default: ''
     */
    helpMessage: {
      type: [String, Array] as PropType<string | string[]>,
      default: '',
    },
    /**
     * Whether the color block on the left side of the title
     * @default: false
     */
    span: { type: Boolean },
    /**
     * Whether to default the text, that is, not bold
     * @default: false
     */
    normal: { type: Boolean },
  };

  export default defineComponent({
    name: 'EntTitle',
    components: { BasicHelp },
    props,
    setup(props) {
      const { prefixCls } = useDesign('basic-title');
      const slots = useSlots();
      const getClass = computed(() => [
        prefixCls,
        { [`${prefixCls}-show-span`]: props.span && slots.default },
        { [`${prefixCls}-normal`]: props.normal },
      ]);

      const { token } = useTheme();
      const getContentStyle = computed((): CSSProperties => {
        return {
          color: token.value.colorText,
        };
      });
      return {
        prefixCls,
        getClass,
        getContentStyle,
      };
    },
  });
</script>

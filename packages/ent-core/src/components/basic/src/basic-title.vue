<template>
  <span :class="getClass">
    <slot />
    <BasicHelp v-if="helpMessage" :class="`${prefixCls}-help`" :text="helpMessage" />
  </span>
</template>
<script lang="ts">
  import { computed, defineComponent, useSlots } from 'vue';
  import { useDesign } from '../../../hooks/web/use-design';
  import BasicHelp from './basic-help.vue';
  import type { PropType } from 'vue';
  const props = {
    /**
     * @zh 标题右侧帮助按钮信息
     * @en Help text list or string
     * @default: ''
     */
    helpMessage: {
      type: [String, Array] as PropType<string | string[]>,
      default: ''
    },
    /**
     * @zh 是否显示标题左侧蓝色色块
     * @en Whether the color block on the left side of the title
     * @default: false
     */
    span: { type: Boolean },
    /**
     * @zh 将文字默认化，不加粗
     * @en Whether to default the text, that is, not bold
     * @default: false
     */
    normal: { type: Boolean }
  };

  export default defineComponent({
    name: 'EntTitle',
    components: { BasicHelp },
    props,
    setup(props) {
      const { prefixCls } = useDesign('title');
      const slots = useSlots();
      const getClass = computed(() => [
        prefixCls,
        { [`${prefixCls}-show-span`]: props.span && slots.default },
        { [`${prefixCls}-normal`]: props.normal }
      ]);
      return {
        prefixCls,
        getClass
        //getContentStyle,
      };
    }
  });
</script>

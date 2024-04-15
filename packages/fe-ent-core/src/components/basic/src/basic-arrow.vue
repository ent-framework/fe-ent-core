<template>
  <span :class="getClass">
    <Icon icon="ion:chevron-forward" :style="$attrs.iconStyle" />
  </span>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue';
  import Icon from '@ent-core/components/icon/src/icon.vue';
  import { useDesign } from '@ent-core/hooks/web/use-design';

  const props = {
    /**
     * @zh 箭头展开状态
     * @en Arrow expand state
     */
    expand: { type: Boolean },
    /**
     * @zh 箭头默认向上
     * @en Arrow up by default
     */
    up: { type: Boolean },
    /**
     * @zh 箭头默认向下
     * @en Arrow down by default
     */
    down: { type: Boolean },
    /**
     * @zh 取消 padding/margin，用于内嵌
     * @en Cancel padding/margin for inline
     */
    inset: { type: Boolean },
  };

  export default defineComponent({
    name: 'EntArrow',
    components: { Icon },
    props,
    setup(props) {
      const { prefixCls } = useDesign('arrow');

      // get component class
      const getClass = computed(() => {
        const { expand, up, down, inset } = props;
        return [
          prefixCls,
          {
            [`${prefixCls}--active`]: expand,
            up,
            inset,
            down,
          },
        ];
      });
      return {
        prefixCls,
        getClass,
      };
    },
  });
</script>

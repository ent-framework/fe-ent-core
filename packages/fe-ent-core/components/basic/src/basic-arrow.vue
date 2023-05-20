<!--
 * @Author: Vben
 * @Description: Arrow component with animation
-->
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
     * Arrow expand state
     */
    expand: { type: Boolean },
    /**
     * Arrow up by default
     */
    up: { type: Boolean },
    /**
     * Arrow down by default
     */
    down: { type: Boolean },
    /**
     * Cancel padding/margin for inline
     */
    inset: { type: Boolean },
  };

  export default defineComponent({
    name: 'EntArrow',
    components: { Icon },
    props,
    setup(props) {
      const { prefixCls } = useDesign('basic-arrow');

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

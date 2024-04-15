<template>
  <div :class="getClass" :style="getDragBarStyle" />
</template>
<script lang="ts">
  import { computed, defineComponent, unref } from 'vue';

  import { useDesign } from 'fe-ent-core/es/hooks';
  import { useMenuSetting } from '../../../../hooks';
  export default defineComponent({
    name: 'DragBar',
    props: {
      mobile: Boolean,
    },
    setup(props) {
      const { getMiniWidthNumber, getCollapsed, getCanDrag } = useMenuSetting();

      const { prefixCls } = useDesign('drag-bar');
      const getDragBarStyle = computed(() => {
        if (unref(getCollapsed)) {
          return { left: `${unref(getMiniWidthNumber)}px` };
        }
        return {};
      });

      const getClass = computed(() => {
        return [
          prefixCls,
          {
            [`${prefixCls}--hide`]: !unref(getCanDrag) || props.mobile,
          },
        ];
      });

      return {
        prefixCls,
        getDragBarStyle,
        getClass,
      };
    },
  });
</script>

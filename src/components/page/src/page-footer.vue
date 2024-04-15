<template>
  <div :class="prefixCls" :style="{ width: getCalcContentWidth }">
    <div :class="`${prefixCls}__left`">
      <slot name="left" />
    </div>
    <slot />
    <div :class="`${prefixCls}__right`">
      <slot name="right" />
    </div>
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue';
  //import { useMenuSetting } from '../../../hooks/setting/use-menu-setting';
  import { useDesign } from '../../../hooks/web/use-design';

  export default defineComponent({
    name: 'PageFooter',
    inheritAttrs: false,
    setup() {
      const { prefixCls } = useDesign('page-footer');
      //const { getCalcContentWidth } = useMenuSetting();
      const getCalcContentWidth = computed(() => {
        return 120;
      });
      return { prefixCls, getCalcContentWidth };
    },
  });
</script>

<template>
  <span :class="`${prefixCls}__extra-fold`" @click="handleFold">
    <EntIcon :icon="getIcon" />
  </span>
</template>
<script lang="ts">
  import { computed, defineComponent, unref } from 'vue';
  import { EntIcon } from 'fe-ent-core/lib/components';

  import { useDesign, useHeaderSetting, useMenuSetting } from 'fe-ent-core/lib/hooks';
  import { triggerWindowResize } from 'fe-ent-core/lib/utils';

  export default defineComponent({
    name: 'FoldButton',
    components: { EntIcon },
    setup() {
      const { prefixCls } = useDesign('multiple-tabs-content');
      const { getShowMenu, setMenuSetting } = useMenuSetting();
      const { getShowHeader, setHeaderSetting } = useHeaderSetting();

      const getIsUnFold = computed(() => !unref(getShowMenu) && !unref(getShowHeader));

      const getIcon = computed(() =>
        unref(getIsUnFold) ? 'codicon:screen-normal' : 'codicon:screen-full',
      );

      function handleFold() {
        const isUnFold = unref(getIsUnFold);
        setMenuSetting({
          show: isUnFold,
          hidden: !isUnFold,
        });
        setHeaderSetting({ show: isUnFold });
        triggerWindowResize();
      }

      return { prefixCls, getIcon, handleFold };
    },
  });
</script>

<template>
  <span :class="`${prefixCls}__extra-fold`" @click="handleFold">
    <EntIcon :icon="getIcon" />
  </span>
</template>
<script lang="ts">
  import { computed, defineComponent, unref } from 'vue';
  import { EntIcon } from 'fe-ent-core';
  import { useDesign } from 'fe-ent-core/es/hooks';
  import { triggerWindowResize } from 'fe-ent-core/es/utils';
  import { useHeaderSetting, useMenuSetting } from '../../../../../hooks';

  export default defineComponent({
    name: 'FoldButton',
    components: { EntIcon },
    setup() {
      const { prefixCls } = useDesign('multiple-tabs-content');
      const { getShowMenu, setMenuSetting } = useMenuSetting();
      const { getShowHeader, setHeaderSetting } = useHeaderSetting();

      const getIsUnFold = computed(() => !unref(getShowMenu) && !unref(getShowHeader));

      const getIcon = computed(() =>
        unref(getIsUnFold)
          ? 'ant-design:fullscreen-outlined'
          : 'ant-design:fullscreen-exit-outlined'
      );

      function handleFold() {
        const isUnFold = unref(getIsUnFold);
        setMenuSetting({
          show: isUnFold,
          hidden: !isUnFold
        });
        setHeaderSetting({ show: isUnFold });
        triggerWindowResize();
      }

      return { prefixCls, getIcon, handleFold };
    }
  });
</script>

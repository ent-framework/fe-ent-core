<template>
  <span :class="`${prefixCls}__extra-fold`" @click="handleFold">
    <EntIcon :icon="getIcon" />
  </span>
</template>
<script lang="ts">
  import { defineComponent, unref, computed } from 'vue';
  import { EntIcon } from '@ent-core/components/icon';

  import { useDesign } from '@ent-core/hooks/web/use-design';
  import { useHeaderSetting } from '@ent-core/hooks/setting/use-header-setting';
  import { useMenuSetting } from '@ent-core/hooks/setting/use-menu-setting';
  import { triggerWindowResize } from '@ent-core/utils/event';

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

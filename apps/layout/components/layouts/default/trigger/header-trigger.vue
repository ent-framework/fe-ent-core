<template>
  <span :class="[prefixCls, theme]" @click="toggleCollapsed">
    <EntIcon v-if="getCollapsed" icon="ant-design:menu-unfold-outlined" width="1em" height="1em" />
    <EntIcon v-else icon="ant-design:menu-fold-outlined" width="1em" height="1em" />
  </span>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { EntIcon } from 'fe-ent-core';
  import { propTypes } from 'fe-ent-core/es/utils';
  import { useDesign } from 'fe-ent-core/es/hooks';
  import { useMenuSetting } from '../../../../hooks';

  export default defineComponent({
    name: 'HeaderTrigger',
    components: { EntIcon },
    props: {
      theme: propTypes.oneOf(['light', 'dark']),
    },
    setup() {
      const { getCollapsed, toggleCollapsed } = useMenuSetting();
      const { prefixCls } = useDesign('layout-header-trigger');
      return { getCollapsed, toggleCollapsed, prefixCls };
    },
  });
</script>

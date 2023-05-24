<template>
  <span :class="[prefixCls, theme]" @click="toggleCollapsed">
    <MenuUnfoldOutlined v-if="getCollapsed" /> <MenuFoldOutlined v-else />
  </span>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';
  import { propTypes, useDesign, useMenuSetting } from 'fe-ent-core';

  export default defineComponent({
    name: 'HeaderTrigger',
    components: { MenuUnfoldOutlined, MenuFoldOutlined },
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

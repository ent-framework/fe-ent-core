<template>
  <Drawer
    v-if="getIsMobile"
    placement="left"
    :class="prefixCls"
    :width="getMenuWidth"
    :get-container="null"
    :open="!getCollapsed"
    @close="handleClose"
  >
    <Sider />
  </Drawer>
  <MixSider v-else-if="getIsMixSidebar" />
  <Sider v-else />
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { Drawer } from 'ant-design-vue';
  import { useAppInject, useDesign } from 'fe-ent-core/es/hooks';
  import { useMenuSetting } from '../../../../hooks';
  import MixSider from './mix-sider.vue';
  import Sider from './layout-sider.vue';
  export default defineComponent({
    name: 'SiderWrapper',
    components: { Sider, Drawer, MixSider },
    setup() {
      const { prefixCls } = useDesign('layout-sider-wrapper');
      const { getIsMobile } = useAppInject();
      const { setMenuSetting, getCollapsed, getMenuWidth, getIsMixSidebar } = useMenuSetting();
      function handleClose() {
        setMenuSetting({
          collapsed: true,
        });
      }

      return { prefixCls, getIsMobile, getCollapsed, handleClose, getMenuWidth, getIsMixSidebar };
    },
  });
</script>

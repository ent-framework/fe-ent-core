<template>
  <NDrawer
    v-if="getIsMobile"
    placement="left"
    :class="prefixCls"
    :width="getMenuWidth"
    :open="!getCollapsed"
    @close="handleClose"
  >
    <NDrawerContent>
      <Sider />
    </NDrawerContent>
  </NDrawer>
  <MixSider v-else-if="getIsMixSidebar" />
  <Sider v-else />
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { NDrawer, NDrawerContent } from 'naive-ui';
  import { useAppInject, useDesign } from 'fe-ent-core/es/hooks';
  import { useMenuSetting } from '../../../../hooks';
  import MixSider from './mix-sider.vue';
  import Sider from './layout-sider.vue';
  export default defineComponent({
    name: 'SiderWrapper',
    components: { Sider, NDrawer, MixSider, NDrawerContent },
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

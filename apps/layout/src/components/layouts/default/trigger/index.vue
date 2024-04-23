<template>
  <SiderTrigger v-if="sider" />
  <HeaderTrigger v-else :theme="theme" />
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { propTypes } from 'fe-ent-core/es/utils';
  import SiderTrigger from './sider-trigger.vue';
  import HeaderTrigger from './header-trigger.vue';

  export default defineComponent({
    name: 'LayoutTrigger',
    components: {
      SiderTrigger,
      HeaderTrigger
    },
    props: {
      sider: propTypes.bool.def(true),
      theme: propTypes.oneOf(['light', 'dark'])
    }
  });
</script>

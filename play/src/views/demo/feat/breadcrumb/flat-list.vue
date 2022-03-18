<template>
  <EntPageWrapper title="平级面包屑示例" content="子级页面面包屑会覆盖当前层级">
    <router-link to="/feat/breadcrumb/flatDetail"> 进入平级详情页 </router-link>
  </EntPageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { EntPageWrapper } from 'fe-ent-core/lib/components/page';

  export default defineComponent({
    components: { EntPageWrapper },
  });
</script>

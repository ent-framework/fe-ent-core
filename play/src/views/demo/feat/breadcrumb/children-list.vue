<template>
  <EntPageWrapper title="层级面包屑示例" content="子级页面面包屑会添加到当前层级后面">
    <router-link to="/feat/breadcrumb/children/childrenDetail"> 进入子级详情页 </router-link>
  </EntPageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { EntPageWrapper } from 'fe-ent-core/lib/components/page';

  export default defineComponent({
    components: { EntPageWrapper },
  });
</script>

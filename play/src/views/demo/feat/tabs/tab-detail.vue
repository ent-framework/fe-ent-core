<template>
  <EntPageWrapper title="Tab详情页面">
    <div>{{ index }} - 详情页内容在此</div>
  </EntPageWrapper>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { EntPageWrapper } from 'fe-ent-core/lib/components/page';
  import { useTabs } from 'fe-ent-core/lib/hooks/web/use-tabs';
  import { useRoute } from 'vue-router';

  export default defineComponent({
    name: 'TabDetail',
    components: { EntPageWrapper },
    setup() {
      const route = useRoute();
      const index = route.params?.id ?? -1;
      const { setTitle } = useTabs();

      // 设置标识
      setTitle(`No.${index} - 详情信息`);
      return {
        index,
      };
    },
  });
</script>

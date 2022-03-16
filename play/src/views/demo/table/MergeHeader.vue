<template>
  <div class="p-4">
    <EntTable @register="registerTable" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { EntTable, useTable } from 'fe-ent-core/lib/components/Table';
  import { getMergeHeaderColumns } from './tableData';

  import { demoListApi } from 'fe-ent-core/lib/api/demo/table';

  export default defineComponent({
    components: { EntTable },
    setup() {
      const [registerTable] = useTable({
        title: '多级表头示例',
        api: demoListApi,
        columns: getMergeHeaderColumns(),
      });

      return {
        registerTable,
      };
    },
  });
</script>

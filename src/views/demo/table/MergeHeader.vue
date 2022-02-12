<template>
  <div class="p-4">
    <BasicTable @register="registerTable" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable } from 'fe-ent-core/components/Table';
  import { getMergeHeaderColumns } from './tableData';

  import { demoListApi } from 'fe-ent-core/api/demo/table';

  export default defineComponent({
    components: { BasicTable },
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

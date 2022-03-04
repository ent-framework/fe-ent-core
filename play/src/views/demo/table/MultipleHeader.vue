<template>
  <div class="p-4">
    <EntTable @register="registerTable" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { EntTable, useTable } from 'fe-ent-core/components/Table';
  import { getMultipleHeaderColumns } from './tableData';

  import { demoListApi } from 'fe-ent-core/api/demo/table';
  export default defineComponent({
    components: { EntTable },
    setup() {
      const [registerTable] = useTable({
        title: '多级表头示例',
        api: demoListApi,
        columns: getMultipleHeaderColumns(),
      });

      return {
        registerTable,
      };
    },
  });
</script>

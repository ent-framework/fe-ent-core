<template>
  <div class="p-4">
    <ent-table @register="registerTable" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useTable } from 'fe-ent-core/es/components/table';
  import { getMultipleHeaderColumns } from './table-data';

  import { demoListApi } from '/@/api/table';
  export default defineComponent({
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

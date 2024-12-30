<template>
  <div class="p-4">
    <ent-table @register="register">
    </ent-table>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useTable } from 'fe-ent-core/es/components/table';
  import { getBasicColumns, getTreeTableData } from './table-data';
  import type { Recordable } from 'fe-ent-core/es/types';

  export default defineComponent({
    setup() {
      const [register] = useTable({
        title: '树形表格',
        isTreeTable: true,
        rowSelection: {
          type: 'checkbox',
        },
        titleHelpMessage: '树形组件不能和序列号列同时存在',
        columns: getBasicColumns(),
        data: getTreeTableData(),
        rowKey: (row: Recordable) => {
          return row.id;
        },
      });
      return { register };
    },
  });
</script>

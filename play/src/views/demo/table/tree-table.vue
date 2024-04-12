<template>
  <div class="p-4">
    <ent-table @register="register">
      <template #toolbar>
        <ent-button type="primary" @click="expandAll">展开全部</ent-button>
        <ent-button type="primary" @click="collapseAll">折叠全部</ent-button>
      </template>
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
      const [register, { expandAll, collapseAll }] = useTable({
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
      return { register, expandAll, collapseAll };
    },
  });
</script>

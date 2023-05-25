<template>
  <div class="p-4">
    <ent-table @register="registerTable" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useTable } from 'fe-ent-core/es/components/table';
  import { getBasicColumns } from './table-data';

  import { demoListApi } from '/@/api/table';

  export default defineComponent({
    setup() {
      function handleSummary(tableData: Recordable[]) {
        const totalNo = tableData.reduce((prev, next) => {
          prev += next.no;
          return prev;
        }, 0);
        return [
          {
            _row: '合计',
            _index: '平均值',
            no: totalNo,
          },
          {
            _row: '合计',
            _index: '平均值',
            no: totalNo,
          },
        ];
      }
      const [registerTable] = useTable({
        title: '表尾行合计示例',
        api: demoListApi,
        rowSelection: { type: 'checkbox' },
        columns: getBasicColumns(),
        showSummary: true,
        summaryFunc: handleSummary,
        scroll: { x: 2000 },
        canResize: false,
      });

      return {
        registerTable,
      };
    },
  });
</script>

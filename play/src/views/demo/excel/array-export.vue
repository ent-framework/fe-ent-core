<template>
  <EntPageWrapper title="导出示例" content="根据数组格式的数据进行导出">
    <EntTable title="基础表格" :columns="columns" :dataSource="data">
      <template #toolbar>
        <ent-button @click="aoaToExcel"> 导出 </ent-button>
      </template>
    </EntTable>
  </EntPageWrapper>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { EntTable } from '@ent-core/components/table';
  import { aoaToSheetXlsx } from '@ent-core/components/excel';
  import { arrHeader, arrData, columns, data } from './data';
  import { EntPageWrapper } from '@ent-core/components/page';

  export default defineComponent({
    components: { EntTable, EntPageWrapper },
    setup() {
      function aoaToExcel() {
        // 保证data顺序与header一致
        aoaToSheetXlsx({
          data: arrData,
          header: arrHeader,
          filename: '二维数组方式导出excel.xlsx',
        });
      }

      return {
        aoaToExcel,
        columns,
        data,
      };
    },
  });
</script>

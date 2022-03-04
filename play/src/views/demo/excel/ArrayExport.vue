<template>
  <EntPageWrapper title="导出示例" content="根据数组格式的数据进行导出">
    <EntTable title="基础表格" :columns="columns" :dataSource="data">
      <template #toolbar>
        <a-button @click="aoaToExcel"> 导出 </a-button>
      </template>
    </EntTable>
  </EntPageWrapper>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { EntTable } from 'fe-ent-core/components/Table';
  import { aoaToSheetXlsx } from 'fe-ent-core/components/Excel';
  import { arrHeader, arrData, columns, data } from './data';
  import { EntPageWrapper } from 'fe-ent-core/components/Page';

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

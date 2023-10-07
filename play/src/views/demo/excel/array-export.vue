<template>
  <ent-page-wrapper title="导出示例" content="根据数组格式的数据进行导出">
    <ent-table title="基础表格" :columns="columns" :data-source="data">
      <template #toolbar>
        <ent-button @click="aoaToExcel"> 导出 </ent-button>
      </template>
    </ent-table>
  </ent-page-wrapper>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { aoaToSheetXlsx } from 'fe-ent-excel';
  import { arrData, arrHeader, columns, data } from './data';

  export default defineComponent({
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

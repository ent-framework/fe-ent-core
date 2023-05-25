<template>
  <ent-page-wrapper title="excel数据导入示例">
    <ent-import-excel date-format="YYYY-MM-DD" @success="loadDataSuccess">
      <ent-button class="m-3"> 导入Excel </ent-button>
    </ent-import-excel>
    <ent-table
      v-for="(table, index) in tableListRef"
      :key="index"
      :title="table.title"
      :columns="table.columns"
      :data-source="table.dataSource"
    />
  </ent-page-wrapper>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import type { BasicColumn } from 'fe-ent-core/es/components/table/interface';
  import type { ExcelData } from 'fe-ent-core/es/components/excel/interface';

  export default defineComponent({
    setup() {
      const tableListRef = ref<
        {
          title: string;
          columns?: any[];
          dataSource?: any[];
        }[]
      >([]);

      function loadDataSuccess(excelDataList: ExcelData[]) {
        tableListRef.value = [];
        console.log(excelDataList);
        for (const excelData of excelDataList) {
          const {
            header,
            results,
            meta: { sheetName },
          } = excelData;
          const columns: BasicColumn[] = [];
          for (const title of header) {
            columns.push({ title, dataIndex: title });
          }
          tableListRef.value.push({ title: sheetName, dataSource: results, columns });
        }
      }

      return {
        loadDataSuccess,
        tableListRef,
      };
    },
  });
</script>

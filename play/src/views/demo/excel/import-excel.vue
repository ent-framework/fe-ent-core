<template>
  <EntPageWrapper title="excel数据导入示例">
    <ExtImportExcel date-format="YYYY-MM-DD" @success="loadDataSuccess">
      <ent-button class="m-3"> 导入Excel </ent-button>
    </ExtImportExcel>
    <EntTable
      v-for="(table, index) in tableListRef"
      :key="index"
      :title="table.title"
      :columns="table.columns"
      :data-source="table.dataSource"
    />
  </EntPageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';

  import { EntPageWrapper, EntTable, ExtImportExcel } from 'fe-ent-core';
  import type { BasicColumn, ExcelData } from 'fe-ent-core';

  export default defineComponent({
    components: { EntTable, ExtImportExcel, EntPageWrapper },

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

<template>
  <EntPageWrapper title="导出示例" content="可以选择导出格式">
    <EntTable title="基础表格" :columns="columns" :dataSource="data">
      <template #toolbar>
        <a-button @click="openModal"> 导出 </a-button>
      </template>
    </EntTable>
    <EntExportExcelModal @register="register" @success="defaultHeader" />
  </EntPageWrapper>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { EntTable } from 'fe-ent-core/lib/components/table';
  import {
    jsonToSheetXlsx,
    EntExportExcelModal,
    ExportModalResult,
  } from 'fe-ent-core/lib/components/excel';
  import { columns, data } from './data';
  import { useModal } from 'fe-ent-core/lib/components/modal';
  import { EntPageWrapper } from 'fe-ent-core/lib/components/page';

  export default defineComponent({
    components: { EntTable, EntExportExcelModal, EntPageWrapper },
    setup() {
      function defaultHeader({ filename, bookType }: ExportModalResult) {
        // 默认Object.keys(data[0])作为header
        jsonToSheetXlsx({
          data,
          filename,
          write2excelOpts: {
            bookType,
          },
        });
      }
      const [register, { openModal }] = useModal();

      return {
        defaultHeader,
        columns,
        data,
        register,
        openModal,
      };
    },
  });
</script>

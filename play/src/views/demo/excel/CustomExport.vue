<template>
  <EntPageWrapper title="导出示例" content="可以选择导出格式">
    <EntTable title="基础表格" :columns="columns" :dataSource="data">
      <template #toolbar>
        <a-button @click="openModal"> 导出 </a-button>
      </template>
    </EntTable>
    <ExpExcelModal @register="register" @success="defaultHeader" />
  </EntPageWrapper>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { EntTable } from 'fe-ent-core/components/Table';
  import { jsonToSheetXlsx, ExpExcelModal, ExportModalResult } from 'fe-ent-core/components/Excel';
  import { columns, data } from './data';
  import { useModal } from 'fe-ent-core/components/Modal';
  import { EntPageWrapper } from 'fe-ent-core/components/Page';

  export default defineComponent({
    components: { EntTable, ExpExcelModal, EntPageWrapper },
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

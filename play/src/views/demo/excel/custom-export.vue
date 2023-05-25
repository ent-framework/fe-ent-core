<template>
  <ent-page-wrapper title="导出示例" content="可以选择导出格式">
    <ent-table title="基础表格" :columns="columns" :data-source="data">
      <template #toolbar>
        <ent-button @click="openModal"> 导出 </ent-button>
      </template>
    </ent-table>
    <ent-export-excel-modal @register="register" @success="defaultHeader" />
  </ent-page-wrapper>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { jsonToSheetXlsx } from 'fe-ent-core/es/components/excel';
  import { useModal } from 'fe-ent-core/es/components/modal';
  import { columns, data } from './data';
  import type { ExportModalResult } from 'fe-ent-core/es/components/excel/interface';

  export default defineComponent({
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

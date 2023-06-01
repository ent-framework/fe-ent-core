<template>
  <ent-page-wrapper content-background content-class="flex" dense content-full-height fixed-height class="p-4">
    <ent-table @register="registerTable">
      <template #toolbar>
        <ent-button type="primary" @click="handleReloadCurrent"> 刷新当前页 </ent-button>
        <ent-button type="primary" @click="handleReload"> 刷新并返回第一页 </ent-button>
      </template>
    </ent-table>
  </ent-page-wrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useTable } from 'fe-ent-core/es/components/table';
  import { getBasicColumns } from './table-data';

  import { demoListApi } from '/@/api/table';
  export default defineComponent({
    setup() {
      const [registerTable, { reload }] = useTable({
        title: '远程加载示例',
        api: demoListApi,
        columns: getBasicColumns(),
        pagination: { pageSize: 10 },
      });
      function handleReloadCurrent() {
        reload();
      }

      function handleReload() {
        reload({
          page: 1,
        });
      }
      return {
        registerTable,
        handleReloadCurrent,
        handleReload,
      };
    },
  });
</script>

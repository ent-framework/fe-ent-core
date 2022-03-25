<template>
  <EntPageWrapper contentBackground contentClass="flex" dense contentFullHeight fixedHeight>
    <EntTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleReloadCurrent"> 刷新当前页 </a-button>
        <a-button type="primary" @click="handleReload"> 刷新并返回第一页 </a-button>
      </template>
    </EntTable>
  </EntPageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { EntTable, useTable } from 'fe-ent-core/lib/components/table';
  import { getBasicColumns } from './table-data';
  import { EntPageWrapper } from 'fe-ent-core/lib/components/page';

  import { demoListApi } from '/@/api/table';
  export default defineComponent({
    components: { EntTable, EntPageWrapper },
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

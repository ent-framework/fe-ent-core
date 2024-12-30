<template>
  <ent-page-wrapper
    content-background
    content-class="flex"
    dense
    content-full-height
    fixed-height
    class="p-4"
  >
    <ent-table v-bind="tableProps" ref="tableRef">
      <template #toolbar>
        <ent-button type="primary" @click="handleReloadCurrent"> 刷新当前页 </ent-button>
        <ent-button type="primary" @click="handleReload"> 刷新并返回第一页 </ent-button>
      </template>
    </ent-table>
  </ent-page-wrapper>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useTable } from 'fe-ent-core/es/components/table';
  import { getBasicColumns } from './table-data';
  import type { BasicTableProps } from 'fe-ent-core/es/components/table';

  import { demoListApi } from '/@/api/table';
  export default defineComponent({
    setup() {
      const [registerTable, { reload }] = useTable({
        title: '远程加载示例',
        api: demoListApi,
        columns: getBasicColumns(),
        rowKey: (record) => record.id,
        pagination: { pageSize: 10 },
        fetchSetting: {
          totalField: 'total',
        },
      });

      const tableRef = ref();

      const tableProps = ref<BasicTableProps>({
        title: '远程加载示例',
        api: demoListApi,
        columns: getBasicColumns(),
        rowKey: (record) => record.id,
        pagination: { pageSize: 10 },
        fetchSetting: {
          totalField: 'total',
        },
      })

      function handleReloadCurrent() {
        tableRef.value.reload();
      }

      function handleReload() {
        tableRef.value.reload({
          pagination: {
            page: 1,
          }
        });
      }
      return {
        tableRef,
        tableProps,
        registerTable,
        handleReloadCurrent,
        handleReload,
      };
    },
  });
</script>

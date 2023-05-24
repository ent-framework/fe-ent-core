<template>
  <ent-page-wrapper
    title="可展开表格"
    content="不可与scroll共用。TableAction组件可配置stopButtonPropagation来阻止操作按钮的点击事件冒泡，以便配合Table组件的expandRowByClick"
  >
    <ent-table @register="registerTable">
      <template #expandedRowRender="{ record }">
        <span>No: {{ record.no }} </span>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <ent-table-action
            stop-button-propagation
            :actions="[
              {
                label: '删除',
                icon: 'ic:outline-delete-outline',
                onClick: handleDelete.bind(null, record),
              },
            ]"
            :drop-down-actions="[
              {
                label: '启用',
                popConfirm: {
                  title: '是否启用？',
                  confirm: handleOpen.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </ent-table>
  </ent-page-wrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useTable } from 'fe-ent-core';
  import { getBasicColumns } from './table-data';

  import { demoListApi } from '/@/api/table';

  export default defineComponent({
    setup() {
      const [registerTable] = useTable({
        api: demoListApi,
        title: '可展开表格演示',
        titleHelpMessage: ['已启用expandRowByClick', '已启用stopButtonPropagation'],
        columns: getBasicColumns(),
        rowKey: 'id',
        canResize: false,
        expandRowByClick: true,
        actionColumn: {
          width: 160,
          title: 'Action',
          dataIndex: 'action',
        },
      });
      function handleDelete(record: Recordable) {
        console.log('点击了删除', record);
      }
      function handleOpen(record: Recordable) {
        console.log('点击了启用', record);
      }

      return {
        registerTable,
        handleDelete,
        handleOpen,
      };
    },
  });
</script>

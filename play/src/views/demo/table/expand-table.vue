<template>
  <EntPageWrapper
    title="可展开表格"
    content="不可与scroll共用。TableAction组件可配置stopButtonPropagation来阻止操作按钮的点击事件冒泡，以便配合Table组件的expandRowByClick"
  >
    <EntTable @register="registerTable">
      <template #expandedRowRender="{ record }">
        <span>No: {{ record.no }} </span>
      </template>
      <template #action="{ record }">
        <EntTableAction
          stopButtonPropagation
          :actions="[
            {
              label: '删除',
              icon: 'ic:outline-delete-outline',
              onClick: handleDelete.bind(null, record),
            },
          ]"
          :dropDownActions="[
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
    </EntTable>
  </EntPageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { EntTable, useTable, EntTableAction } from 'fe-ent-core/lib/components/table';
  import { EntPageWrapper } from 'fe-ent-core/lib/components/page';
  import { getBasicColumns } from './table-data';

  import { demoListApi } from '/@/api/table';

  export default defineComponent({
    components: { EntTable, EntTableAction, EntPageWrapper },
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

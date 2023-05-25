<template>
  <div class="p-4">
    <ent-table @register="registerTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <ent-table-action
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
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import type { Recordable } from 'fe-ent-core/es/types';
  import type { BasicColumn } from 'fe-ent-core/es/components/table/interface';
  import { useTable } from 'fe-ent-core/es/components/table';

  import { demoListApi } from '/@/api/table';
  const columns: BasicColumn[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      fixed: 'left',
      width: 280,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: 260,
    },
    {
      title: '地址',
      dataIndex: 'address',
    },
    {
      title: '编号',
      dataIndex: 'no',
      width: 300,
    },
    {
      title: '开始时间',
      width: 200,
      dataIndex: 'beginTime',
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      width: 200,
    },
  ];
  export default defineComponent({
    setup() {
      const [registerTable] = useTable({
        title: 'TableAction组件及固定列示例',
        api: demoListApi,
        columns,
        rowSelection: { type: 'radio' },
        bordered: true,
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

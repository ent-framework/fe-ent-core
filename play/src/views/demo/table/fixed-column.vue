<template>
  <div class="p-4">
    <ent-table :scroll-x="1200" @register="registerTable" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, h } from 'vue';
  import type { Recordable } from 'fe-ent-core/es/types';
  import type { BasicColumn } from 'fe-ent-core/es/components/table/interface';
  import { EntTableAction, useTable } from 'fe-ent-core/es/components/table';

  import { demoListApi } from '/@/api/table';
  const columns: BasicColumn[] = [
    {
      title: '姓名',
      key: 'name',
      width: 260,
    },
    {
      title: '地址',
      key: 'address',
    },
    {
      title: 'ID',
      key: 'id',
      fixed: 'left',
      width: 100,
    },
    {
      title: '编号',
      key: 'no',
      width: 300,
    },
    {
      title: '开始时间',
      width: 500,
      key: 'beginTime',
    },
    {
      title: '结束时间',
      key: 'endTime',
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
        rowKey: (record) => record.id,
        actionColumn: {
          width: 260,
          title: 'Action',
          key: 'action',
          render: (record) => {
            return h(
              EntTableAction,
              {
                actions: [
                  {
                    tooltip: '删除',
                    icon: 'ant-design:delete-outlined',
                    onClick: handleDelete.bind(null, record),
                  },
                  {
                    label: '删除-确认',
                    tooltip: '确认删除提示',
                    icon: 'ant-design:delete-outlined',
                    onClick: handleDelete.bind(null, record),
                    confirm: '是否删除？',
                  },
                ],
                dropDownActions: [
                  {
                    label: '启用',
                    tooltip: '启用',
                    confirm: '是否启用？',
                    onClick: handleOpen.bind(null, record),
                    appendDivider: true,
                  },
                  {
                    label: '启用测试',
                    icon: 'ant-design:delete-outlined',
                    confirm: '是否启用测试？',
                    onClick: handleOpen.bind(null, record),
                  },
                ],
              },
              { default: () => '' },
            );
          },
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
      };
    },
  });
</script>

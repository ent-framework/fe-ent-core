<template>
  <div class="p-4">
    <ent-table @register="registerTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <ent-table-action
            :actions="[
              {
                label: '编辑',
                onClick: handleEdit.bind(null, record),
                auth: 'other', // 根据权限控制是否显示: 无权限，不显示
              },
              {
                label: '删除',
                icon: 'ic:outline-delete-outline',
                onClick: handleDelete.bind(null, record),
                auth: 'super', // 根据权限控制是否显示: 有权限，会显示
              },
            ]"
            :drop-down-actions="[
              {
                label: '启用',
                popConfirm: {
                  title: '是否启用？',
                  confirm: handleOpen.bind(null, record),
                },
                ifShow: (_action) => {
                  return record.status !== 'enable'; // 根据业务控制是否显示: 非enable状态的不显示启用按钮
                },
              },
              {
                label: '禁用',
                popConfirm: {
                  title: '是否禁用？',
                  confirm: handleOpen.bind(null, record),
                },
                ifShow: () => {
                  return record.status === 'enable'; // 根据业务控制是否显示: enable状态的显示禁用按钮
                },
              },
              {
                label: '同时控制',
                popConfirm: {
                  title: '是否动态显示？',
                  confirm: handleOpen.bind(null, record),
                },
                auth: 'super', // 同时根据权限和业务控制是否显示
                ifShow: () => {
                  return true;
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
  import type { BasicColumn } from 'fe-ent-core/es/components/table/interface';
  import { useTable } from 'fe-ent-core/es/components/table';

  import { demoListApi } from '/@/api/table';
  const columns: BasicColumn[] = [
    {
      title: '编号',
      key: 'no',
      width: 100,
    },
    {
      title: '姓名',
      key: 'name',
      auth: 'test', // 根据权限控制是否显示: 无权限，不显示
    },
    {
      title: '状态',
      key: 'status',
    },
    {
      title: '地址',
      key: 'address',
      auth: 'super', // 同时根据权限和业务控制是否显示
      ifShow: (_column) => {
        return true;
      },
    },
    {
      title: '开始时间',
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
        bordered: true,
        actionColumn: {
          width: 250,
          title: 'Action',
          key: 'action',
        },
      });
      function handleEdit(record: Recordable) {
        console.log('点击了编辑', record);
      }
      function handleDelete(record: Recordable) {
        console.log('点击了删除', record);
      }
      function handleOpen(record: Recordable) {
        console.log('点击了启用', record);
      }
      return {
        registerTable,
        handleEdit,
        handleDelete,
        handleOpen,
      };
    },
  });
</script>

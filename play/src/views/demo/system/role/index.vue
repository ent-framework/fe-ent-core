<template>
  <div>
    <ent-table @register="registerTable">
      <template #toolbar>
        <ent-button type="primary" @click="handleCreate"> 新增角色 </ent-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <ent-table-action
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                popConfirm: {
                  title: '是否确认删除',
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </ent-table>
    <RoleDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, h } from 'vue';

  import { useDrawer } from 'fe-ent-core/es/components/drawer';
  import { EntTableAction, useTable } from 'fe-ent-core/es/components/table';
  import { getRoleListByPage } from '/@/api/system';

  import RoleDrawer from './role-drawer.vue';

  import { columns, searchFormSchema } from './role-data';

  export default defineComponent({
    name: 'RoleManagement',
    components: { RoleDrawer },
    setup() {
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerTable, { reload }] = useTable({
        title: '角色列表',
        api: getRoleListByPage,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        actionColumn: {
          width: 80,
          title: '操作',
          key: 'action',
          // slots: { customRender: 'action' },
          fixed: undefined,
          render: (record) => {
            return h(
              EntTableAction,
              {
                actions: [
                  {
                    icon: 'clarity:note-edit-line',
                    onClick: handleEdit.bind(null, record),
                  },
                  {
                    icon: 'ant-design:delete-outlined',
                    confirm: '是否确认删除',
                    placement: 'left',
                    onClick: handleDelete.bind(null, record),
                  },
                ],
              },
              { default: () => '' },
            );
          },
        },
      });

      function handleCreate() {
        openDrawer(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        openDrawer(true, {
          record,
          isUpdate: true,
        });
      }

      function handleDelete(record: Recordable) {
        console.log(record);
      }

      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        registerDrawer,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
      };
    },
  });
</script>

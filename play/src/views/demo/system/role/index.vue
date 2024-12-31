<template>
  <div>
    <ent-table v-bind="tableProps">
      <template #toolbar>
        <ent-button type="primary" @click="handleCreate"> 新增角色 </ent-button>
      </template>
    </ent-table>
    <!--    <RoleDrawer ref="roleDrawerRef" />-->
  </div>
</template>
<script lang="ts">
  import { defineComponent, h, ref } from 'vue';
  import { EntTableAction, EntTable } from 'fe-ent-core/es/components/table';
  import { getRoleListByPage } from '/@/api/system';
  //import RoleDrawer from './role-drawer.vue';
  import { columns, searchFormSchema } from './role-data';
  import type { Recordable } from 'fe-ent-core/es/types';
  import type { BasicTableProps } from 'fe-ent-core/es/components/table';

  export default defineComponent({
    name: 'RoleManagement',
    components: { EntTable },
    setup() {
      const roleDrawerRef = ref(null);

      const tableProps = ref<BasicTableProps>({
        title: '角色列表',
        api: getRoleListByPage,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema
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
                    onClick: handleEdit.bind(null, record)
                  },
                  {
                    icon: 'ant-design:delete-outlined',
                    confirm: '是否确认删除',
                    placement: 'left',
                    onClick: handleDelete.bind(null, record)
                  }
                ]
              },
              { default: () => '' }
            );
          }
        }
      });

      function handleCreate() {
        roleDrawerRef.value?.open(true, {
          isUpdate: false
        });
      }

      function handleEdit(record: Recordable) {
        roleDrawerRef.value?.open(true, {
          record,
          isUpdate: true
        });
      }

      function handleDelete(record: Recordable) {
        console.log(record);
      }

      function handleSuccess() {
        //reload();
      }

      return {
        tableProps,
        roleDrawerRef,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess
      };
    }
  });
</script>

<template>
  <div>
    <ent-table @register="registerTable" @fetch-success="onFetchSuccess">
      <template #toolbar>
        <ent-button type="primary" @click="handleCreate"> 新增菜单 </ent-button>
      </template>
    </ent-table>
    <MenuDrawer @register="registerDrawer" @success="handleSuccess" />
    <MenuDetail @register="registerDetailDrawer" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, h, nextTick } from 'vue';

  import { EntTableAction, useTable } from 'fe-ent-core/es/components/table';
  import { useDrawer } from 'fe-ent-core/es/components/drawer';
  import { getMenuList } from '/@/api/system';
  import MenuDrawer from './menu-drawer.vue';
  import MenuDetail from './menu-detail.vue';
  import { columns, searchFormSchema } from './menu-data';
  import type { Recordable } from 'fe-ent-core/es/types';

  export default defineComponent({
    name: 'MenuManagement',
    components: { MenuDrawer, MenuDetail },
    setup() {
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerDetailDrawer, { openDrawer: openDetailDrawer }] = useDrawer();
      const [registerTable, { reload, expandAll }] = useTable({
        title: '菜单列表',
        api: getMenuList,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        isTreeTable: true,
        pagination: false,
        striped: false,
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        canResize: false,
        actionColumn: {
          width: 120,
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
                    icon: 'ant-design:unordered-list-outlined',
                    tooltip: '查看用户账号详情',
                    onClick: handleView.bind(null, record),
                  },
                  {
                    icon: 'clarity:note-edit-line',
                    onClick: handleEdit.bind(null, record),
                  },
                  {
                    icon: 'ant-design:delete-outlined',
                    confirm: '是否确认删除',
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
      function handleView(record: Recordable) {
        openDetailDrawer(true, {
          record,
        });
      }

      function handleDelete(record: Recordable) {
        console.log(record);
      }

      function handleSuccess() {
        reload();
      }

      function onFetchSuccess() {
        // 演示默认展开所有表项
        nextTick(expandAll);
      }

      return {
        registerTable,
        registerDrawer,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        onFetchSuccess,
        registerDetailDrawer,
      };
    },
  });
</script>

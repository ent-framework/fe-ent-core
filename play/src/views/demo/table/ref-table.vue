<template>
  <div class="p-4">
    <div class="mb-4">
      <ent-button class="mr-2" @click="reloadTable"> 还原 </ent-button>
      <ent-button class="mr-2" @click="changeLoading"> 开启loading </ent-button>
      <ent-button class="mr-2" @click="changeColumns"> 更改Columns </ent-button>
      <ent-button class="mr-2" @click="getColumn"> 获取Columns </ent-button>
      <ent-button class="mr-2" @click="getTableData"> 获取表格数据 </ent-button>
      <ent-button class="mr-2" @click="getTableRawData"> 获取接口原始数据 </ent-button>
      <ent-button class="mr-2" @click="setPaginationInfo"> 跳转到第2页 </ent-button>
    </div>
    <div class="mb-4">
      <ent-button class="mr-2" @click="getSelectRowList"> 获取选中行 </ent-button>
      <ent-button class="mr-2" @click="getSelectRowKeyList"> 获取选中行Key </ent-button>
      <ent-button class="mr-2" @click="setSelectedRowKeyList"> 设置选中行 </ent-button>
      <ent-button class="mr-2" @click="clearSelect"> 清空选中行 </ent-button>
      <ent-button class="mr-2" @click="getPagination"> 获取分页信息 </ent-button>
    </div>
    <ent-table
      ref="tableRef"
      :can-resize="false"
      title="RefTable示例"
      title-help-message="使用Ref调用表格内方法"
      :api="api"
      :columns="columns"
      :fetch-setting="{ totalField: 'total' }"
      :pagination="true"
      :row-key="(record) => record.id"
      :row-selection="{ type: 'checkbox' }"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import type { Nullable } from 'fe-ent-core/es/types';
  import type { TableActionType } from 'fe-ent-core/es/components/table/interface';
  import { useMessage } from 'fe-ent-core/es/hooks';
  import { getBasicColumns, getBasicShortColumns } from './table-data';
  import { demoListApi } from '/@/api/table';
  export default defineComponent({
    setup() {
      const tableRef = ref<Nullable<TableActionType>>(null);
      const { createMessage } = useMessage();

      function getTableAction() {
        const EntTableAction = unref(tableRef);
        if (!EntTableAction) {
          throw new Error('EntTableAction is null');
        }
        return EntTableAction;
      }
      function changeLoading() {
        getTableAction().setLoading(true);
        setTimeout(() => {
          getTableAction().setLoading(false);
        }, 1000);
      }
      function changeColumns() {
        getTableAction().setColumns(getBasicShortColumns());
      }
      function reloadTable() {
        getTableAction().setColumns(getBasicColumns());

        getTableAction().reload({
          pagination: { page: 1 }
        });
      }
      function getColumn() {
        createMessage.info('请在控制台查看！');
        console.log(getTableAction().getColumns());
      }

      function getTableData() {
        createMessage.info('请在控制台查看！');
        console.log(getTableAction().getDataSource());
      }
      function getTableRawData() {
        createMessage.info('请在控制台查看！');
        console.log(getTableAction().getRawDataSource());
      }

      function getPagination() {
        createMessage.info('请在控制台查看！');
        console.log(getTableAction().getPaginationRef());
      }

      function setPaginationInfo() {
        getTableAction().setPage(2);
        //getTableAction().reload();
      }
      function getSelectRowList() {
        createMessage.info('请在控制台查看！');
        console.log(getTableAction().getSelectRows());
      }
      function getSelectRowKeyList() {
        createMessage.info('请在控制台查看！');
        console.log(getTableAction().getSelectRowKeys());
      }
      function setSelectedRowKeyList() {
        getTableAction().setSelectedRowKeys(['0', '1', '2']);
      }
      function clearSelect() {
        getTableAction().clearSelectedRowKeys();
      }

      return {
        tableRef,
        api: demoListApi,
        columns: getBasicColumns(),
        changeLoading,
        changeColumns,
        reloadTable,
        getColumn,
        getTableData,
        getTableRawData,
        getPagination,
        setPaginationInfo,
        getSelectRowList,
        getSelectRowKeyList,
        setSelectedRowKeyList,
        clearSelect
      };
    }
  });
</script>

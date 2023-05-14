<template>
  <EntTable @register="registerTable">
    <template #form-custom> custom-slot </template>
    <template #headerTop>
      <a-alert type="info" show-icon>
        <template #message>
          <template v-if="checkedKeys.length > 0">
            <span>已选中{{ checkedKeys.length }}条记录(可跨页)</span>
            <ent-button type="link" @click="checkedKeys = []" size="small">清空</ent-button>
          </template>
          <template v-else>
            <span>未选中任何项目</span>
          </template>
        </template>
      </a-alert>
    </template>
    <template #toolbar>
      <ent-button type="primary" @click="getFormValues">获取表单数据</ent-button>
    </template>
  </EntTable>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { EntTable, useTable } from 'fe-ent-core/lib/components/table';
  import { getBasicColumns, getFormConfig } from './table-data';
  import { Alert } from 'ant-design-vue';

  import { demoListApi } from '/@/api/table';

  export default defineComponent({
    components: { EntTable, AAlert: Alert },
    setup() {
      const checkedKeys = ref<Array<string | number>>([]);
      const [registerTable, { getForm }] = useTable({
        title: '开启搜索区域',
        api: demoListApi,
        columns: getBasicColumns(),
        useSearchForm: true,
        formConfig: getFormConfig(),
        showTableSetting: true,
        tableSetting: { fullScreen: true },
        showIndexColumn: false,
        rowKey: 'id',
        rowSelection: {
          type: 'checkbox',
          selectedRowKeys: checkedKeys,
          onSelect: onSelect,
          onSelectAll: onSelectAll,
        },
      });

      function getFormValues() {
        console.log(getForm().getFieldsValue());
      }

      function onSelect(record, selected) {
        if (selected) {
          checkedKeys.value = [...checkedKeys.value, record.id];
        } else {
          checkedKeys.value = checkedKeys.value.filter((id) => id !== record.id);
        }
      }
      function onSelectAll(selected, selectedRows, changeRows) {
        const changeIds = changeRows.map((item) => item.id);
        if (selected) {
          checkedKeys.value = [...checkedKeys.value, ...changeIds];
        } else {
          checkedKeys.value = checkedKeys.value.filter((id) => {
            return !changeIds.includes(id);
          });
        }
      }

      return {
        registerTable,
        getFormValues,
        checkedKeys,
        onSelect,
        onSelectAll,
      };
    },
  });
</script>

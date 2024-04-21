<template>
  <ent-table
    :row-selection="{ type: 'checkbox', selectedRowKeys: checkedKeys, onSelect, onSelectAll }"
    @register="registerTable"
    @update:checked-row-keys="onSelect"
  >
    <template #form-custom> custom-slot </template>
    <!--    <template #headerTop>
      <NAlert v-if="checkedKeys.length > 0" type="info" :show-icon="false">
        <span>已选中{{ checkedKeys.length }}条记录(可跨页)</span>
        <ent-button type="link" size="small" @click="checkedKeys = []">清空</ent-button>
      </NAlert>
    </template>-->
    <template #toolbar>
      <ent-button type="primary" @click="getFormValues">获取表单数据</ent-button>
    </template>
  </ent-table>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useTable } from 'fe-ent-core/es/components/table';
  import { getBasicColumns, getFormConfig } from './table-data';
  import { NAlert } from 'naive-ui';

  import { demoListApi } from '/@/api/table';

  export default defineComponent({
    components: { NAlert },
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
        rowKey: (record) => record.id,
      });

      function getFormValues() {
        console.log(getForm().getFieldsValue());
      }

      function onSelect(keys, rows) {
        checkedKeys.value = keys;
        console.log(keys);
        console.log(rows);
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

<template>
  <div class="p-4">
    <ent-table
      :before-edit-submit="beforeEditSubmit"
      @register="registerTable"
      @edit-end="handleEditEnd"
      @edit-cancel="handleEditCancel"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import type { BasicColumn } from 'fe-ent-core/es/components/table/interface';
  import { useMessage } from 'fe-ent-core/es/hooks';
  import { useTable } from 'fe-ent-core/es/components/table';
  import { optionsListApi } from '/@/api/select';

  import { demoListApi } from '/@/api/table';
  import { treeOptionsListApi } from '/@/api/tree';
  const columns: BasicColumn[] = [
    {
      title: '输入框',
      key: 'name',
      edit: true,
      editComponentProps: {
        prefix: '$',
      },
      width: 200,
    },
    {
      title: '默认输入状态',
      key: 'name7',
      edit: true,
      editable: true,
      width: 200,
    },
    {
      title: '输入框校验',
      key: 'name1',
      edit: true,
      // 默认必填校验
      editRule: true,
      width: 200,
    },
    {
      title: '输入框函数校验',
      key: 'name2',
      edit: true,
      editRule: async (text) => {
        if (text === '2') {
          return '不能输入该值';
        }
        return '';
      },
      width: 200,
    },
    {
      title: '数字输入框',
      key: 'id',
      edit: true,
      editRule: true,
      editComponent: 'InputNumber',
      width: 200,
    },
    {
      title: '下拉框',
      key: 'name3',
      edit: true,
      editComponent: 'Select',
      editComponentProps: {
        options: [
          {
            label: 'Option1',
            value: '1',
          },
          {
            label: 'Option2',
            value: '2',
          },
        ],
      },
      width: 200,
    },
    {
      title: '远程下拉',
      key: 'name4',
      edit: true,
      editComponent: 'ApiSelect',
      editComponentProps: {
        api: optionsListApi,
        resultField: 'list',
        labelField: 'name',
        valueField: 'id',
      },
      width: 200,
    },
    {
      title: '远程下拉树',
      key: 'name71',
      edit: true,
      editComponent: 'ApiTreeSelect',
      editRule: false,
      editComponentProps: {
        api: treeOptionsListApi,
        resultField: 'list',
      },
      width: 200,
    },
    {
      title: '日期选择',
      key: 'date',
      edit: true,
      editComponent: 'DatePicker',
      editComponentProps: {
        valueFormat: 'YYYY-MM-DD',
        format: 'YYYY-MM-DD',
      },
      width: 200,
    },
    {
      title: '时间选择',
      key: 'time',
      edit: true,
      editComponent: 'TimePicker',
      editComponentProps: {
        valueFormat: 'HH:mm',
        format: 'HH:mm',
      },
      width: 200,
    },
    {
      title: '勾选框',
      key: 'name5',
      edit: true,
      editComponent: 'Checkbox',
      editValueMap: (value) => {
        return value ? '是' : '否';
      },
      width: 200,
    },
    {
      title: '开关',
      key: 'name6',
      edit: true,
      editComponent: 'Switch',
      editValueMap: (value) => {
        return value ? '开' : '关';
      },
      width: 200,
    },
  ];
  export default defineComponent({
    setup() {
      const [registerTable] = useTable({
        title: '可编辑单元格示例',
        api: demoListApi,
        columns,
        showIndexColumn: false,
        bordered: true,
      });

      const { createMessage } = useMessage();

      function handleEditEnd({ record, index, key, value }: Recordable) {
        console.log(record, index, key, value);
        return false;
      }

      // 模拟将指定数据保存
      function feakSave({ value, key, id }) {
        createMessage.loading({
          content: `正在模拟保存${key}`,
          key: '_save_fake_data',
          duration: 0,
        });
        return new Promise((resolve) => {
          setTimeout(() => {
            if (value === '') {
              createMessage.error({
                content: '保存失败：不能为空',
                key: '_save_fake_data',
                duration: 2,
              });
              resolve(false);
            } else {
              createMessage.success({
                content: `记录${id}的${key}已保存`,
                key: '_save_fake_data',
                duration: 2,
              });
              resolve(true);
            }
          }, 2000);
        });
      }

      async function beforeEditSubmit({ record, index, key, value }) {
        console.log('单元格数据正在准备提交', { record, index, key, value });
        return await feakSave({ id: record.id, key, value });
      }

      function handleEditCancel() {
        console.log('cancel');
      }

      return {
        registerTable,
        handleEditEnd,
        handleEditCancel,
        beforeEditSubmit,
      };
    },
  });
</script>

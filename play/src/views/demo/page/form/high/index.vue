<template>
  <EntPageWrapper
    class="high-form"
    title="高级表单"
    content=" 高级表单常见于一次性输入和提交大批量数据的场景。"
  >
    <a-card title="仓库管理" :bordered="false">
      <EntForm @register="register" />
    </a-card>
    <a-card title="任务管理" :bordered="false" class="!mt-5">
      <EntForm @register="registerTask" />
    </a-card>
    <a-card title="成员管理" :bordered="false">
      <PersonTable ref="tableRef" />
    </a-card>

    <template #rightFooter>
      <ent-button type="primary" @click="submitAll"> 提交 </ent-button>
    </template>
  </EntPageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { EntForm, EntPageWrapper, useForm } from 'fe-ent-core';
  import { Card } from 'ant-design-vue';
  import PersonTable from './person-table.vue';
  import { schemas, taskSchemas } from './data';

  export default defineComponent({
    name: 'FormHightPage',
    components: { EntForm, PersonTable, EntPageWrapper, [Card.name]: Card },
    setup() {
      const tableRef = ref<{ getDataSource: () => any } | null>(null);

      const [register, { validate }] = useForm({
        baseColProps: {
          span: 6,
        },
        labelCol: {
          style: { 'text-align': 'left' },
        },
        wrapperCol: {
          style: { 'min-width': '100%' },
        },
        schemas,
        showActionButtonGroup: false,
      });

      const [registerTask, { validate: validateTaskForm }] = useForm({
        baseColProps: {
          span: 6,
        },
        labelCol: {
          style: { 'text-align': 'left' },
        },
        wrapperCol: {
          style: { 'min-width': '100%' },
        },
        schemas: taskSchemas,
        showActionButtonGroup: false,
      });

      async function submitAll() {
        try {
          if (tableRef.value) {
            console.log('table data:', tableRef.value.getDataSource());
          }

          const [values, taskValues] = await Promise.all([validate(), validateTaskForm()]);
          console.log('form data:', values, taskValues);
        } catch {}
      }

      return { register, registerTask, submitAll, tableRef };
    },
  });
</script>
<style lang="less" scoped>
  .high-form {
    padding-bottom: 48px;
  }
</style>

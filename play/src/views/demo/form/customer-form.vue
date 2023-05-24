<template>
  <ent-page-wrapper title="自定义组件示例">
    <ent-collapse-container title="自定义表单">
      <ent-form @register="register" @submit="handleSubmit">
        <template #f3="{ model, field }">
          <a-input v-model:value="model[field]" placeholder="自定义slot" />
        </template>
      </ent-form>
    </ent-collapse-container>
  </ent-page-wrapper>
</template>
<script lang="ts">
  import { defineComponent, h } from 'vue';
  import { useForm, useMessage } from 'fe-ent-core';
  import { Input } from 'ant-design-vue';
  import type { FormSchema } from 'fe-ent-core';

  const schemas: FormSchema[] = [
    {
      field: 'field1',
      component: 'Input',
      label: 'render方式',
      colProps: {
        span: 8,
      },
      rules: [{ required: true }],
      render: ({ model, field }) => {
        return h(Input, {
          placeholder: '请输入',
          value: model[field],
          onChange: (e: ChangeEvent) => {
            model[field] = e.target.value;
          },
        });
      },
    },
    {
      field: 'field2',
      component: 'Input',
      label: 'render组件slot',
      colProps: {
        span: 8,
      },
      rules: [{ required: true }],
      renderComponentContent: () => {
        return {
          suffix: () => 'suffix',
        };
      },
    },
    {
      field: 'field3',
      component: 'Input',
      label: '自定义Slot',
      slot: 'f3',
      colProps: {
        span: 8,
      },
      rules: [{ required: true }],
    },
  ];
  export default defineComponent({
    components: {
      [Input.name]: Input,
    },
    setup() {
      const { createMessage } = useMessage();
      const [register, { setProps }] = useForm({
        labelWidth: 120,
        schemas,
        actionColOptions: {
          span: 24,
        },
      });
      return {
        register,
        schemas,
        handleSubmit: (values: any) => {
          createMessage.success(`click search,values:${JSON.stringify(values)}`);
        },
        setProps,
      };
    },
  });
</script>

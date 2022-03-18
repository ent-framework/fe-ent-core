<template>
  <EntPageWrapper title="自定义组件示例">
    <CollapseContainer title="自定义表单">
      <EntForm @register="register" @submit="handleSubmit">
        <template #f3="{ model, field }">
          <a-input v-model:value="model[field]" placeholder="自定义slot" />
        </template>
      </EntForm>
    </CollapseContainer>
  </EntPageWrapper>
</template>
<script lang="ts">
  import { defineComponent, h } from 'vue';
  import { EntForm, FormSchema, useForm } from 'fe-ent-core/lib/components/form';
  import { EntCollapseContainer } from 'fe-ent-core/lib/components/container';
  import { useMessage } from 'fe-ent-core/lib/hooks/web/use-message';
  import { Input } from 'ant-design-vue';
  import { EntPageWrapper } from 'fe-ent-core/lib/components/page';

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
    components: { EntForm, CollapseContainer: EntCollapseContainer, EntPageWrapper, [Input.name]: Input },
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
          createMessage.success('click search,values:' + JSON.stringify(values));
        },
        setProps,
      };
    },
  });
</script>

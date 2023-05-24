<template>
  <ent-page-wrapper title="MarkDown组件嵌入Form示例">
    <ent-collapse-container title="MarkDown表单">
      <ent-form
        :label-width="100"
        :schemas="schemas"
        :action-col-options="{ span: 24 }"
        @submit="handleSubmit"
      />
    </ent-collapse-container>
  </ent-page-wrapper>
</template>
<script lang="ts">
  import { defineComponent, h } from 'vue';
  import { useMessage } from 'fe-ent-core';
  import { EntMarkDown } from 'fe-ent-markdown';
  import type { FormSchema } from 'fe-ent-core';

  const schemas: FormSchema[] = [
    {
      field: 'title',
      component: 'Input',
      label: 'title',
      defaultValue: '标题',
      rules: [{ required: true }],
    },
    {
      field: 'markdown',
      component: 'Input',
      label: 'markdown',
      defaultValue: 'defaultValue',
      rules: [{ required: true, trigger: 'blur' }],
      render: ({ model, field }) => {
        return h(EntMarkDown, {
          value: model[field],
          onChange: (value: string) => {
            model[field] = value;
          },
        });
      },
    },
  ];
  export default defineComponent({
    setup() {
      const { createMessage } = useMessage();

      return {
        schemas,
        handleSubmit: (values: any) => {
          createMessage.success(`click search,values:${JSON.stringify(values)}`);
        },
      };
    },
  });
</script>

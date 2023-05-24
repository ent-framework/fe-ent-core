<template>
  <ent-page-wrapper title="富文本嵌入表单示例">
    <ent-collapse-container title="富文本表单">
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
  import { Tinymce } from 'fe-ent-tinymce';
  import type { FormSchema } from 'fe-ent-core';

  const schemas: FormSchema[] = [
    {
      field: 'title',
      component: 'Input',
      label: 'title',
      defaultValue: 'defaultValue',
      rules: [{ required: true }],
    },
    {
      field: 'tinymce',
      component: 'Input',
      label: 'tinymce',
      defaultValue: 'defaultValue',
      rules: [{ required: true }],
      render: ({ model, field }) => {
        return h(Tinymce, {
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

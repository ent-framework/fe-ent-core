<template>
  <ent-page-wrapper title="MarkDown组件嵌入Form示例">
    <ent-collapse-container title="MarkDown表单">
      <EntForm
        :labelWidth="100"
        :schemas="schemas"
        :actionColOptions="{ span: 24 }"
        @submit="handleSubmit"
      />
    </ent-collapse-container>
  </ent-page-wrapper>
</template>
<script lang="ts">
  import { defineComponent, h } from 'vue';
  import { EntForm, FormSchema } from '@ent-core/components/form';
  import { EntCollapseContainer } from '@ent-core/components/container';
  import { useMessage } from '@ent-core/hooks/web/use-message';
  import { EntMarkDown } from '@fe-ent-extension/markdown';
  import { EntPageWrapper } from '@ent-core/components/page';

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
    components: { EntForm, EntCollapseContainer, EntPageWrapper },
    setup() {
      const { createMessage } = useMessage();

      return {
        schemas,
        handleSubmit: (values: any) => {
          createMessage.success('click search,values:' + JSON.stringify(values));
        },
      };
    },
  });
</script>

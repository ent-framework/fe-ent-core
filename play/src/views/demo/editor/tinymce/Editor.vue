<template>
  <EntPageWrapper title="富文本嵌入表单示例">
    <CollapseContainer title="富文本表单">
      <EntForm
        :labelWidth="100"
        :schemas="schemas"
        :actionColOptions="{ span: 24 }"
        @submit="handleSubmit"
      />
    </CollapseContainer>
  </EntPageWrapper>
</template>
<script lang="ts">
  import { defineComponent, h } from 'vue';
  import { EntForm, FormSchema } from 'fe-ent-core/components/Form/index';
  import { EntCollapseContainer } from 'fe-ent-core/components/Container/index';
  import { useMessage } from 'fe-ent-core/hooks/web/useMessage';
  import { Tinymce } from 'fe-ent-core/components/Tinymce/index';
  import { EntPageWrapper } from 'fe-ent-core/components/Page';

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
    components: { EntForm, CollapseContainer: EntCollapseContainer, EntPageWrapper },
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

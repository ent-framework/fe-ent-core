<template>
  <ent-page-wrapper title="上传组件示例">
    <a-alert message="基础示例" />
    <ent-upload
      :maxSize="20"
      :maxNumber="10"
      @change="handleChange"
      :api="uploadApi"
      class="my-5"
      :accept="['image/*']"
    />

    <a-alert message="嵌入表单,加入表单校验" />

    <EntForm @register="register" class="my-5" />
  </ent-page-wrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { EntUpload } from 'fe-ent-core/lib/components/upload';
  import { useMessage } from 'fe-ent-core/lib/hooks/web/use-message';
  import { EntForm, FormSchema, useForm } from 'fe-ent-core/lib/components/form';
  import { EntPageWrapper } from 'fe-ent-core/lib/components/page';
  import { Alert } from 'ant-design-vue';
  import { uploadApi } from 'fe-ent-core/lib/logics/api/upload';

  const schemas: FormSchema[] = [
    {
      field: 'field1',
      component: 'Upload',
      label: '字段1',
      colProps: {
        span: 8,
      },
      rules: [{ required: true, message: '请选择上传文件' }],
      componentProps: {
        api: uploadApi,
      },
    },
  ];
  export default defineComponent({
    components: { EntUpload, EntForm, EntPageWrapper, [Alert.name]: Alert },
    setup() {
      const { createMessage } = useMessage();
      const [register] = useForm({
        labelWidth: 120,
        schemas,
        actionColOptions: {
          span: 16,
        },
      });
      return {
        handleChange: (list: string[]) => {
          createMessage.info(`已上传文件${JSON.stringify(list)}`);
        },
        uploadApi,
        register,
      };
    },
  });
</script>

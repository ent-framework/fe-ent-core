<template>
  <ent-page-wrapper title="上传组件示例">
    <Alert message="基础示例" />
    <ent-upload
      :max-size="20"
      :max-number="1"
      :api="uploadApi"
      class="my-5"
      :accept="['jpg', 'jpeg']"
      :upload-params="uploadParams"
      @change="handleChange"
    />

    <Alert message="嵌入表单,加入表单校验" />

    <ent-form class="my-5" @register="register" />
  </ent-page-wrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { Factory } from 'fe-ent-core/es/logics';
  import { useForm } from 'fe-ent-core/es/components/form';
  import { useMessage } from 'fe-ent-core/es/hooks';
  import { Alert } from 'ant-design-vue';
  import type { FormSchema } from 'fe-ent-core/es/components/form/interface';

  const uploadParams: any = {
    secretFlag: 'N',
    fileLocation: 'ALIYUN',
  };
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
        api: Factory.getHttpFactory().uploadApi,
        uploadParams,
      },
    },
  ];

  const uploadApi = Factory.getHttpFactory().uploadApi;

  export default defineComponent({
    components: { Alert },
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
        uploadParams,
      };
    },
  });
</script>

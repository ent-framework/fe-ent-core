<template>
  <ent-page-wrapper
    title="基础表单"
    content-background
    content=" 表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。"
    content-class="p-4"
  >
    <ent-form @register="register" />
  </ent-page-wrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useForm } from 'fe-ent-core/es/components/form';
  import { useMessage } from 'fe-ent-core/es/hooks';
  import { schemas } from './data';

  export default defineComponent({
    name: 'FormBasicPage',
    setup() {
      const { createMessage } = useMessage();
      const [register, { validate, setProps, getFieldsValue }] = useForm({
        gridProps: {
          xGap: 10,
        },
        baseGridItemProps: {
          span: 12,
        },
        schemas,
        actionColOptions: {
          offset: 8,
          span: 23,
        },
        submitButtonOptions: {
          text: '提交',
        },
        submitFunc: customSubmitFunc,
      });

      async function customSubmitFunc() {
        try {
          await validate();
          setProps({
            submitButtonOptions: {
              loading: true,
            },
          });
          setTimeout(() => {
            setProps({
              submitButtonOptions: {
                loading: false,
              },
            });
            console.log(getFieldsValue());
            createMessage.success('提交成功！');
          }, 2000);
        } catch {}
      }

      return { register };
    },
  });
</script>
<style lang="less" scoped>
  .form-wrap {
    padding: 24px;
  }
</style>

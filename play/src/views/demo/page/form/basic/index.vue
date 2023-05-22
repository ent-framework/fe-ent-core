<template>
  <EntPageWrapper
    title="基础表单"
    content-background
    content=" 表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。"
    content-class="p-4"
  >
    <EntForm @register="register" />
  </EntPageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { EntForm, EntPageWrapper, useForm, useMessage } from 'fe-ent-core';
  import { schemas } from './data';

  export default defineComponent({
    name: 'FormBasicPage',
    components: { EntForm, EntPageWrapper },
    setup() {
      const { createMessage } = useMessage();
      const [register, { validate, setProps }] = useForm({
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 10,
        },
        schemas,
        actionColOptions: {
          offset: 8,
          span: 12,
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
    background-color: @component-background;
  }
</style>

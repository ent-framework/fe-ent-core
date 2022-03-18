<template>
  <EntPageWrapper
    title="基础表单"
    contentBackground
    content=" 表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。"
    contentClass="p-4"
  >
    <EntForm @register="register" />
  </EntPageWrapper>
</template>
<script lang="ts">
  import { EntForm, useForm } from 'fe-ent-core/lib/components/form';
  import { defineComponent } from 'vue';
  import { schemas } from './data';
  import { useMessage } from 'fe-ent-core/lib/hooks/web/use-message';
  import { EntPageWrapper } from 'fe-ent-core/lib/components/page';

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
        schemas: schemas,
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
        } catch (error) {}
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

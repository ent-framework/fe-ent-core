<template>
  <ent-modal
    v-bind="$attrs"
    title="Modal Title"
    @register="register"
    @visible-change="handleVisibleChange"
  >
    <div class="pt-3px pr-3px">
      <ent-form :model="model" @register="registerForm" />
    </div>
  </ent-modal>
</template>
<script lang="ts">
  import { defineComponent, nextTick, ref } from 'vue';
  import { useForm } from 'fe-ent-core/es/components/form';
  import { useModalInner } from 'fe-ent-core/es/components/modal';
  import type { FormSchema } from 'fe-ent-core/es/components/form/interface';
  const schemas: FormSchema[] = [
    {
      field: 'field1',
      component: 'Input',
      label: '字段1',
      colProps: {
        span: 24,
      },
      defaultValue: '111',
    },
    {
      field: 'field2',
      component: 'Input',
      label: '字段2',
      colProps: {
        span: 24,
      },
    },
  ];
  export default defineComponent({
    props: {
      userData: { type: Object },
    },
    setup(props) {
      const modelRef = ref({});
      const [
        registerForm,
        {
          // setFieldsValue,
          // setProps
        },
      ] = useForm({
        labelWidth: 120,
        schemas,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 24,
        },
      });

      const [register] = useModalInner((data) => {
        data && onDataReceive(data);
      });

      function onDataReceive(data) {
        console.log('Data Received', data);
        // 方式1;
        // setFieldsValue({
        //   field2: data.data,
        //   field1: data.info,
        // });

        // // 方式2
        modelRef.value = { field2: data.data, field1: data.info };

        // setProps({
        //   model:{ field2: data.data, field1: data.info }
        // })
      }

      function handleVisibleChange(v) {
        v && props.userData && nextTick(() => onDataReceive(props.userData));
      }

      return { register, schemas, registerForm, model: modelRef, handleVisibleChange };
    },
  });
</script>

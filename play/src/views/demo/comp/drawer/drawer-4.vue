<template>
  <EntDrawer v-bind="$attrs" @register="register" title="Drawer Title" width="50%">
    <div>
      <EntForm @register="registerForm" />
    </div>
  </EntDrawer>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { EntDrawer, useDrawerInner } from '@ent-core/components/drawer';

  import { EntForm, FormSchema, useForm } from '@ent-core/components/form';
  const schemas: FormSchema[] = [
    {
      field: 'field1',
      component: 'Input',
      label: '字段1',
      colProps: {
        span: 12,
      },
      defaultValue: '111',
    },
    {
      field: 'field2',
      component: 'Input',
      label: '字段2',
      colProps: {
        span: 12,
      },
    },
  ];
  export default defineComponent({
    components: { EntDrawer, EntForm },
    setup() {
      const [registerForm, { setFieldsValue }] = useForm({
        labelWidth: 120,
        schemas,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 24,
        },
      });
      const [register] = useDrawerInner((data) => {
        // 方式1
        setFieldsValue({
          field2: data.data,
          field1: data.info,
        });
      });
      return { register, schemas, registerForm };
    },
  });
</script>

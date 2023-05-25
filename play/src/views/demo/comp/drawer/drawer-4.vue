<template>
  <ent-drawer v-bind="$attrs" title="Drawer Title" width="50%" @register="register">
    <div>
      <ent-form @register="registerForm" />
    </div>
  </ent-drawer>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useDrawerInner } from 'fe-ent-core/es/components/drawer';
  import { useForm } from 'fe-ent-core/es/components/form';
  import type { FormSchema } from 'fe-ent-core/es/components/form/interface';

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

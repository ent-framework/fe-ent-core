<template>
  <ent-drawer
    v-bind="$attrs"
    show-footer
    :title="getTitle"
    width="50%"
    destroy-on-close
    @register="registerDrawer"
    @ok="handleSubmit"
  >
    <ent-form @register="registerForm" />
  </ent-drawer>
</template>
<script lang="ts">
  import { computed, defineComponent, ref, unref } from 'vue';
  import { useForm } from 'fe-ent-core/es/components/form';
  import { useDrawerInner } from 'fe-ent-core/es/components/drawer';
  import { formSchema } from './menu-data';

  import { getMenuList } from '/@/api/system';

  export default defineComponent({
    name: 'MenuDrawer',
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);

      const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
        labelWidth: 100,
        schemas: formSchema,
        showActionButtonGroup: false,
        baseColProps: { lg: 12, md: 24 },
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        resetFields();
        setDrawerProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          setFieldsValue({
            ...data.record,
          });
        }
        const treeData = await getMenuList();
        console.log(treeData);
        updateSchema({
          field: 'parentMenu',
          componentProps: {
            treeData,
          },
        });
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增菜单' : '编辑菜单'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });
          // TODO custom api
          console.log(values);
          closeDrawer();
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return { registerDrawer, registerForm, getTitle, handleSubmit };
    },
  });
</script>

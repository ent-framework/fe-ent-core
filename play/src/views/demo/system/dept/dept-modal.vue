<template>
  <ent-modal v-bind="$attrs" :title="getTitle" @register="registerModal" @ok="handleSubmit">
    <ent-form @register="registerForm" />
  </ent-modal>
</template>
<script lang="ts">
  import { computed, defineComponent, ref, unref } from 'vue';
  import { useForm } from 'fe-ent-core/es/components/form';
  import { useModalInner } from 'fe-ent-core/es/components/modal';
  import { formSchema } from './dept-data';

  import { getDeptList } from '/@/api/system';
  export default defineComponent({
    name: 'DeptModal',
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);

      const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
        labelWidth: 100,
        schemas: formSchema,
        showActionButtonGroup: false,
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          setFieldsValue({
            ...data.record,
          });
        }
        const treeData = await getDeptList();
        updateSchema({
          field: 'parentDept',
          componentProps: { treeData },
        });
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增部门' : '编辑部门'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          // TODO custom api
          console.log(values);
          closeModal();
          emit('success');
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { registerModal, registerForm, getTitle, handleSubmit };
    },
  });
</script>

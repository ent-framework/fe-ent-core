<template>
  <EntModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <EntForm @register="registerForm" />
  </EntModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { EntModal, useModalInner } from 'fe-ent-core/lib/components/modal';
  import { EntForm, useForm } from 'fe-ent-core/lib/components/form';
  import { formSchema } from './dept-data';

  import { getDeptList } from '/@/api/system';
  export default defineComponent({
    name: 'DeptModal',
    components: { EntModal, EntForm },
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

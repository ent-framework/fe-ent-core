<template>
  <ent-drawer
    v-bind="$attrs"
    show-footer
    :title="getTitle"
    width="500px"
    @register="registerDrawer"
    @ok="handleSubmit"
  >
    <ent-form @register="registerForm">
      <template #menu="{ model, field }">
        <ent-tree
          v-model:value="model[field]"
          :tree-data="treeData"
          :field-names="{ title: 'menuName', key: 'id' }"
          checkable
          toolbar
          title="菜单分配"
        />
      </template>
    </ent-form>
  </ent-drawer>
</template>
<script lang="ts">
  import { computed, defineComponent, ref, unref } from 'vue';
  import type { TreeItem } from 'fe-ent-core';
  import { useDrawerInner, useForm } from 'fe-ent-core';
  import { formSchema } from './role-data';

  import { getMenuList } from '/@/api/system';

  export default defineComponent({
    name: 'RoleDrawer',
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const treeData = ref<TreeItem[]>([]);

      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 90,
        schemas: formSchema,
        showActionButtonGroup: false,
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        resetFields();
        setDrawerProps({ confirmLoading: false });
        // 需要在setFieldsValue之前先填充treeData，否则Tree组件可能会报key not exist警告
        if (unref(treeData).length === 0) {
          treeData.value = (await getMenuList()) as any as TreeItem[];
        }
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          setFieldsValue({
            ...data.record,
          });
        }
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增角色' : '编辑角色'));

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

      return {
        registerDrawer,
        registerForm,
        getTitle,
        handleSubmit,
        treeData,
      };
    },
  });
</script>

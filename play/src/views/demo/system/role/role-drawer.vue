<template>
  <ent-drawer
    v-bind="$attrs"
    show-footer
    :title="getTitle"
    width="500px"
    @ok="handleSubmit"
    ref="drawerRef"
  >
    <ent-form v-bind="formProps" ref="formRef">
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
  import { computed, defineComponent, onMounted, ref, unref } from 'vue';
  import type { TreeItem } from 'fe-ent-core/es/components/tree/interface';
  import type { DrawerActionType } from 'fe-ent-core/es/components/drawer';
  import type { FormActionType } from 'fe-ent-core/es/components/form';
  import { formSchema } from './role-data';
  import type { Nullable } from 'fe-ent-core/es/types';
  import { getMenuList } from '/@/api/system';

  export default defineComponent({
    name: 'RoleDrawer',
    emits: ['success', 'register'],
    setup(_, { emit, expose }) {
      const drawerRef = ref<Nullable<DrawerActionType>>(null);
      const formRef = ref<Nullable<FormActionType>>(null);
      const isUpdate = ref(true);
      const treeData = ref<TreeItem[]>([]);

      const formProps = ref({
        labelWidth: 90,
        gridItemProps: { span: 24 },
        schemas: formSchema,
        showActionButtonGroup: false
      });

      onMounted(async () => {
        // 需要在setFieldsValue之前先填充treeData，否则Tree组件可能会报key not exist警告
        if (unref(treeData).length === 0) {
          treeData.value = (await getMenuList()) as any as TreeItem[];
        }
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增角色' : '编辑角色'));

      async function handleSubmit() {
        try {
          await formRef.value?.validate();
          const values = await formRef.value?.getFieldsValue();
          drawerRef.value?.setDrawerProps({ confirmLoading: true });
          // TODO custom api
          console.log(values);
          drawerRef.value?.open(false);
          emit('success');
        } finally {
          drawerRef.value?.setDrawerProps({ confirmLoading: false });
        }
      }

      const open = async (show = true, data?: { isUpdate: boolean; record: any }): void => {
        drawerRef.value?.open(show);
        if (!data) return;
        isUpdate.value = !!data?.isUpdate;
        if (unref(isUpdate)) {
          console.log(data.record);
          await formRef.value?.resetFields();
          await formRef.value?.setFieldsValue({ ...data.record });
        }
      };

      expose({ open });

      return {
        drawerRef,
        formRef,
        formProps,
        getTitle,
        handleSubmit,
        treeData
      };
    }
  });
</script>

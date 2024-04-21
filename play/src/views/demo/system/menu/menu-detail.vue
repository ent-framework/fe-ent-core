<template>
  <EntDrawer
    v-bind="$attrs"
    show-footer
    title="查看菜单"
    width="500px"
    @register="registerDrawer"
    @ok="handleSubmit"
  >
    <EntDescription
      size="medium"
      :bordered="false"
      :column="1"
      :data="detailData"
      :schema="detailSchema"
      label-placement="left"
      :label-style="{ width: '100px' }"
    />
  </EntDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { EntDescription } from 'fe-ent-core/es/components/description';
  import { EntDrawer, useDrawerInner } from 'fe-ent-core/es/components/drawer';
  import { detailSchema } from './menu-data';

  export default defineComponent({
    name: 'AccountsDetailDrawer',
    components: { EntDrawer, EntDescription },
    emits: ['success', 'register'],
    setup(props, { emit }) {
      const detailData = ref();

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        setDrawerProps({ confirmLoading: false });
        //detailData.value = data.record;
        try {
          setDrawerProps({ confirmLoading: true });
          detailData.value = data.record;
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      });

      async function handleSubmit() {
        try {
          closeDrawer();
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return {
        registerDrawer,
        handleSubmit,
        detailSchema,
        detailData,
      };
    },
  });
</script>

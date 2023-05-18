<template>
  <EntModal
    @register="register"
    title="Modal Title"
    :helpMessage="['提示1', '提示2']"
    :okButtonProps="{ disabled: true }"
  >
    <ent-button type="primary" @click="closeModal" class="mr-2"> 从内部关闭弹窗 </ent-button>
    <ent-button type="primary" @click="setModalProps"> 从内部修改title </ent-button>
  </EntModal>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { EntModal, useModalInner } from '@ent-core/components/modal';
  export default defineComponent({
    components: { EntModal },
    setup() {
      const [register, { closeModal, setModalProps }] = useModalInner();
      return {
        register,
        closeModal,
        setModalProps: () => {
          setModalProps({ title: 'Modal New Title' });
        },
      };
    },
  });
</script>

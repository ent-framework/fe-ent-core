<template>
  <ent-modal
    title="Modal Title"
    :help-message="['提示1', '提示2']"
    :ok-button-props="{ disabled: true }"
    style="width: 600px"
    @register="register"
  >
    <ent-button type="primary" class="mr-2" @click="closeModal"> 从内部关闭弹窗 </ent-button>
    <ent-button type="primary" @click="setModalProps"> 从内部修改title </ent-button>
  </ent-modal>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useModalInner } from 'fe-ent-core/es/components/modal';
  export default defineComponent({
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

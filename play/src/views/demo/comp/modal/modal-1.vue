<template>
  <ent-modal
    v-bind="$attrs"
    destroy-on-close
    title="Modal Title"
    :help-message="['提示1', '提示2']"
    style="width: 600px"
    @register="register"
    @visible-change="handleShow"
  >
    <template #insertFooter>
      <ent-button type="primary" danger :disabled="loading" @click="setLines"
        >点我更新内容</ent-button
      >
    </template>
    <template v-if="loading">
      <div class="empty-tips">加载中，稍等3秒……</div>
    </template>
    <template v-if="!loading">
      <ul>
        <li v-for="index in lines" :key="index">加载完成{{ index }}！</li>
      </ul>
    </template>
  </ent-modal>
</template>
<script lang="ts">
  import { defineComponent, ref, watch } from 'vue';
  import { useModalInner } from 'fe-ent-core/es/components/modal';
  export default defineComponent({
    setup() {
      const loading = ref(true);
      const lines = ref(10);
      const [register, { setModalProps, redoModalHeight }] = useModalInner();

      watch(
        () => lines.value,
        () => {
          redoModalHeight();
        },
      );

      function handleShow(visible: boolean) {
        if (visible) {
          loading.value = true;
          setModalProps({ loading: true, confirmLoading: true });
          setTimeout(() => {
            lines.value = Math.round(Math.random() * 30 + 5);
            loading.value = false;
            setModalProps({ loading: false, confirmLoading: false });
          }, 3000);
        }
      }

      function setLines() {
        lines.value = Math.round(Math.random() * 20 + 10);
      }
      return { register, loading, handleShow, lines, setLines };
    },
  });
</script>
<style scoped>
  .empty-tips {
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
</style>

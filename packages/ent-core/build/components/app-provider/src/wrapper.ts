
  import { defineComponent } from 'vue';
  import { useDialog, useLoadingBar, useMessage, useModal, useNotification } from 'naive-ui';
  function registerNaiveTools() {
    window.$loadingBar = useLoadingBar();
    window.$dialog = useDialog();
    window.$message = useMessage();
    window.$notification = useNotification();
    window.$modal = useModal();
  }

  export default defineComponent({
    name: 'EntAppProviderWrapper',
    inheritAttrs: false,
    setup(_, { slots }) {
      registerNaiveTools();
      return () => slots.default?.();
    }
  });

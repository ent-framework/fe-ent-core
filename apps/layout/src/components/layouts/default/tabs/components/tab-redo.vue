<template>
  <span :class="`${prefixCls}__extra-redo`" @click="handleRedo">
    <EntIcon icon="ant-design:redo-outlined" />
  </span>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { EntIcon } from 'fe-ent-core';
  import { useDesign } from 'fe-ent-core/es/hooks';
  import { useTabs } from '../../../../../hooks';

  export default defineComponent({
    name: 'TabRedo',
    components: { EntIcon },

    setup() {
      const loading = ref(false);

      const { prefixCls } = useDesign('multiple-tabs-content');
      const { refreshPage } = useTabs();

      async function handleRedo() {
        loading.value = true;
        await refreshPage();
        setTimeout(() => {
          loading.value = false;
          // Animation execution time
        }, 1200);
      }
      return { prefixCls, handleRedo, loading };
    },
  });
</script>

<template>
  <NInput v-bind="getBindValue" />
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue';
  import { NInput } from 'naive-ui';

  export default defineComponent({
    name: 'InputTextArea',
    components: { NInput },
    extends: NInput,
    inheritAttrs: false,
    setup(props, { attrs }) {
      const getBindValue = computed(() => ({
        ...props,
        ...attrs,
        type: 'textarea',
      }));

      return {
        getBindValue,
      };
    },
  });
</script>

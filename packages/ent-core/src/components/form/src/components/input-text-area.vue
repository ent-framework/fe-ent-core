<template>
  <NInput v-bind="getBindValue" />
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue';
  import { NInput } from 'naive-ui/es/input';

  export default defineComponent({
    name: 'InputTextArea',
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

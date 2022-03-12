<template>
  <EntPageWrapper title="富文本组件示例">
    <Tinymce v-model="value" @change="handleChange" width="100%" />
  </EntPageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { Tinymce } from '@fe-ent-extension/tinymce';
  import { EntPageWrapper } from 'fe-ent-core/components/Page';

  export default defineComponent({
    components: { Tinymce, EntPageWrapper },
    setup() {
      const value = ref('hello world!');
      function handleChange(value: string) {
        console.log(value);
      }
      return { handleChange, value };
    },
  });
</script>

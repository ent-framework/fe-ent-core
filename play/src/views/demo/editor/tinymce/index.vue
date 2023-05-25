<template>
  <ent-page-wrapper title="富文本组件示例">
    <Tinymce v-model="value" width="100%" @change="handleChange" />
  </ent-page-wrapper>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { Tinymce } from 'fe-ent-tinymce';

  export default defineComponent({
    components: { Tinymce },
    setup() {
      const value = ref('hello world!');
      function handleChange(value: string) {
        console.log(value);
      }
      return { handleChange, value };
    },
  });
</script>

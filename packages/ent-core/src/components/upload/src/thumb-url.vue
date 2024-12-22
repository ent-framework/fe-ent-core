<template>
  <span class="thumb">
    <NImage v-if="fileUrl" :src="fileUrl" :width="104" />
  </span>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { NImage } from 'naive-ui';

  export default defineComponent({
    components: { NImage },
    props: {
      fileUrl: {
        type: String,
        default: ''
      },
      fileName: {
        type: String,
        default: ''
      }
    }
  });
</script>

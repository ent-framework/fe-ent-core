<template>
  <span class="thumb">
    <NImage v-if="fileUrl" :src="fileUrl" :width="104" />
  </span>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { NImage } from 'naive-ui';
  import { propTypes } from '../../../utils/prop-types';

  export default defineComponent({
    components: { NImage },
    props: {
      fileUrl: propTypes.string.def(''),
      fileName: propTypes.string.def(''),
    },
  });
</script>

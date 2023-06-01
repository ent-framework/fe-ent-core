<template>
  <ent-page-wrapper title="旋转校验示例">
    <div class="flex justify-center p-4 items-center">
      <ent-rotate-drag-verify ref="el" :src="img" @success="handleSuccess" />
    </div>
  </ent-page-wrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import img from '/@/assets/images/header.jpg';

  export default defineComponent({
    setup() {
      const handleSuccess = () => {
        console.log('success!');
      };
      return {
        handleSuccess,
        img,
      };
    },
  });
</script>

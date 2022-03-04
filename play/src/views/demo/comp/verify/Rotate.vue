<template>
  <EntPageWrapper title="旋转校验示例">
    <div class="flex justify-center p-4 items-center bg-gray-700">
      <EntRotateDragVerify :src="img" ref="el" @success="handleSuccess" />
    </div>
  </EntPageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { EntRotateDragVerify } from 'fe-ent-core/components/Verify';

  import img from 'fe-ent-core/assets/images/header.jpg';

  import { EntPageWrapper } from 'fe-ent-core/components/Page';

  export default defineComponent({
    components: { EntRotateDragVerify, EntPageWrapper },
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
<style lang="less" scoped>
  .bg-gray-700 {
    background-color: #4a5568;
  }
</style>

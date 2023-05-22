<template>
  <EntPageWrapper title="Ripple示例">
    <div v-ripple class="demo-box">content</div>
  </EntPageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import RippleDirective, { EntPageWrapper } from 'fe-ent-core';

  export default defineComponent({
    components: { EntPageWrapper },
    directives: {
      Ripple: RippleDirective,
    },
  });
</script>

<style lang="less" scoped>
  .demo-box {
    display: flex;
    width: 300px;
    height: 300px;
    font-size: 24px;
    color: #fff;
    background-color: #408ede;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
  }
</style>

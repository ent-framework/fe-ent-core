<template>
  <ent-page-wrapper title="Ripple示例">
    <div v-ripple class="demo-box">content</div>
  </ent-page-wrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { vRipple } from 'fe-ent-core/es/directives';

  export default defineComponent({
    directives: {
      ripple: vRipple,
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

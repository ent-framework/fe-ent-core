<template>
  <EntPageWrapper title="Ripple示例">
    <div class="demo-box" v-ripple>content</div>
  </EntPageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import RippleDirective from 'fe-ent-core/lib/directives/ripple';
  import { EntPageWrapper } from 'fe-ent-core/lib/components/page';

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

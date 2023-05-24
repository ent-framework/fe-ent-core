<template>
  <ent-page-wrapper title="点内外部触发事件">
    <ent-click-out-side class="flex justify-center" @click-outside="handleClickOutside">
      <div class="demo-box" @click="innerClick">
        {{ text }}
      </div>
    </ent-click-out-side>
  </ent-page-wrapper>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';

  export default defineComponent({
    setup() {
      const text = ref('Click');
      function handleClickOutside() {
        text.value = 'Click Out Side';
      }

      function innerClick() {
        text.value = 'Click Inner';
      }
      return { innerClick, handleClickOutside, text };
    },
  });
</script>

<style lang="less" scoped>
  .demo-box {
    display: flex;
    width: 100%;
    height: 300px;
    font-size: 24px;
    color: #fff;
    background-color: #408ede;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
  }
</style>

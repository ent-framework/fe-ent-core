<template>
  <EntPageWrapper title="点内外部触发事件">
    <EntClickOutSide class="flex justify-center" @clickOutside="handleClickOutside">
      <div class="demo-box" @click="innerClick">
        {{ text }}
      </div>
    </EntClickOutSide>
  </EntPageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { EntClickOutSide, EntPageWrapper } from 'fe-ent-core';

  export default defineComponent({
    components: { EntClickOutSide, EntPageWrapper },
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

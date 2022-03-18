<template>
  <EntPageWrapper title="点内外部触发事件">
    <EntClickOutSide @clickOutside="handleClickOutside" class="flex justify-center">
      <div @click="innerClick" class="demo-box">
        {{ text }}
      </div>
    </EntClickOutSide>
  </EntPageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { EntClickOutSide } from 'fe-ent-core/lib/components/click-out-side';
  import { EntPageWrapper } from 'fe-ent-core/lib/components/page';

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

<template>
  <ent-page-wrapper title="密码强度校验组件">
    <div class="flex justify-center">
      <div class="demo-wrap p-10">
        <ent-strength-meter placeholder="默认" />
        <ent-strength-meter placeholder="禁用" disabled />
        <br />
        <ent-strength-meter placeholder="隐藏input" :show-input="false" value="!@#qwe12345" />
      </div>
    </div>
  </ent-page-wrapper>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { EntStrengthMeter } from 'fe-ent-core/lib/components/strength-meter';
  import { EntPageWrapper } from 'fe-ent-core/lib/components/page';

  export default defineComponent({
    components: {
      EntStrengthMeter,
      EntPageWrapper,
    },
  });
</script>
<style lang="less" scoped>
  .demo-wrap {
    width: 50%;
    background-color: @component-background;
    border-radius: 10px;
  }
</style>

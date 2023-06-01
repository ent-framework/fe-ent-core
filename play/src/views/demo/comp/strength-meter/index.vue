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

<style lang="less" scoped>
  .demo-wrap {
    width: 50%;
    border-radius: 10px;
  }
</style>

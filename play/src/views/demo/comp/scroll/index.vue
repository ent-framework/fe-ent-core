<template>
  <ent-page-wrapper title="滚动组件示例" content="基于el-scrollbar">
    <div class="scroll-wrap">
      <ent-scroll-container class="mt-4">
        <ul class="p-3">
          <template v-for="index in 100" :key="index">
            <li class="p-2" :style="{ border: '1px solid #eee' }">
              {{ index }}
            </li>
          </template>
        </ul>
      </ent-scroll-container>
    </div>
  </ent-page-wrapper>
</template>
<style lang="less" scoped>
  .scroll-wrap {
    width: 50%;
    height: 300px;
    background-color: @component-background;
  }
</style>

<template>
  <EntPageWrapper title="滚动组件示例" content="基于el-scrollbar">
    <div class="scroll-wrap">
      <ScrollContainer class="mt-4">
        <ul class="p-3">
          <template v-for="index in 100" :key="index">
            <li class="p-2" :style="{ border: '1px solid #eee' }">
              {{ index }}
            </li>
          </template>
        </ul>
      </ScrollContainer>
    </div>
  </EntPageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { EntScrollContainer } from 'fe-ent-core/lib/components/container/index';
  import { EntPageWrapper } from 'fe-ent-core/lib/components/page';

  export default defineComponent({
    components: { ScrollContainer: EntScrollContainer, EntPageWrapper },
  });
</script>
<style lang="less" scoped>
  .scroll-wrap {
    width: 50%;
    height: 300px;
    background-color: @component-background;
  }
</style>

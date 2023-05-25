<template>
  <ent-page-wrapper title="滚动组件函数示例" content="基于el-scrollbar">
    <div class="my-4">
      <ent-button class="mr-2" @click="scrollTo(100)"> 滚动到100px位置 </ent-button>
      <ent-button class="mr-2" @click="scrollTo(800)"> 滚动到800px位置 </ent-button>
      <ent-button class="mr-2" @click="scrollTo(0)"> 滚动到顶部 </ent-button>
      <ent-button class="mr-2" @click="scrollBottom()"> 滚动到底部 </ent-button>
    </div>
    <div class="scroll-wrap">
      <ent-scroll-container ref="scrollRef" class="mt-4">
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
<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import type { Nullable } from 'fe-ent-core/es/types';
  import type { ScrollActionType } from 'fe-ent-core/es/components/container/interface';

  export default defineComponent({
    setup() {
      const scrollRef = ref<Nullable<ScrollActionType>>(null);
      const getScroll = () => {
        const scroll = unref(scrollRef);
        if (!scroll) {
          throw new Error('scroll is Null');
        }
        return scroll;
      };

      function scrollTo(top: number) {
        getScroll().scrollTo(top);
      }
      function scrollBottom() {
        getScroll().scrollBottom();
      }
      return {
        scrollTo,
        scrollRef,
        scrollBottom,
      };
    },
  });
</script>
<style lang="less" scoped>
  .scroll-wrap {
    width: 50%;
    height: 300px;
    background-color: @component-background;
  }
</style>

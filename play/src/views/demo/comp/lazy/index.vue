<template>
  <EntPageWrapper title="懒加载基础示例" content="向下滚动到可见区域才会加载组件">
    <div class="lazy-base-demo-wrap">
      <h1>向下滚动</h1>

      <div class="lazy-base-demo-box">
        <LazyContainer>
          <TargetContent />
          <template #skeleton>
            <Skeleton :rows="10" />
          </template>
        </LazyContainer>
      </div>
    </div>
  </EntPageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { Skeleton } from 'ant-design-vue';
  import TargetContent from './target-Content.vue';
  import { EntLazyContainer } from 'fe-ent-core/lib/components/container';
  import { EntPageWrapper } from 'fe-ent-core/lib/components/page';

  export default defineComponent({
    components: { LazyContainer: EntLazyContainer, EntPageWrapper, TargetContent, Skeleton },
  });
</script>
<style lang="less">
  .lazy-base-demo {
    &-wrap {
      display: flex;
      width: 50%;
      height: 2000px;
      margin: 20px auto;
      text-align: center;
      background-color: @component-background;
      justify-content: center;
      flex-direction: column;
      align-items: center;
    }

    &-box {
      width: 300px;
      height: 300px;
    }

    h1 {
      height: 1300px;
      margin: 20px 0;
    }
  }
</style>

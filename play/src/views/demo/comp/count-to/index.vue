<template>
  <ent-page-wrapper title="数字动画示例">
    <Card>
      <CardGrid class="count-to-demo-card">
        <ent-count-to
          prefix="$"
          :color="'#409EFF'"
          :start-val="1"
          :end-val="200000"
          :duration="8000"
        />
      </CardGrid>
      <CardGrid class="count-to-demo-card">
        <ent-count-to
          suffix="$"
          :color="'red'"
          :start-val="1"
          :end-val="300000"
          :decimals="2"
          :duration="6000"
        />
      </CardGrid>
      <CardGrid class="count-to-demo-card">
        <ent-count-to
          suffix="$"
          :color="'rgb(0,238,0)'"
          :start-val="1"
          :end-val="400000"
          :duration="7000"
        />
      </CardGrid>
      <CardGrid class="count-to-demo-card">
        <ent-count-to
          separator="-"
          :color="'rgba(138,43,226,.6)'"
          :start-val="10000"
          :end-val="500000"
          :duration="8000"
        />
      </CardGrid>
    </Card>
  </ent-page-wrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { Card } from 'ant-design-vue';

  export default defineComponent({
    components: {
      Card,
      CardGrid: Card.Grid,
    },
  });
</script>
<style lang="less" scoped>
  .count-to-demo {
    &-card {
      width: 50%;
      font-size: 30px;
      text-align: center;
    }
  }
</style>

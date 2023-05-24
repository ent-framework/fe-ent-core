<template>
  <ent-page-wrapper
    title="流程图"
    content="简单流程图示例,具体功能需要自己完善"
    content-full-height
    fixed-height
  >
    <FlowChart :data="demoData" />
  </ent-page-wrapper>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { FlowChart } from 'fe-ent-flow-chart';
  import demoData from './dataTurbo.json';
  export default defineComponent({
    components: { FlowChart },
    setup() {
      return { demoData };
    },
  });
</script>

<template>
  <ent-page-wrapper title="时间组件示例">
    <ent-collapse-container title="基础示例">
      <ent-time :value="time1" />
      <br />
      <ent-time :value="time2" />
    </ent-collapse-container>

    <ent-collapse-container title="定时更新" class="my-4">
      <ent-time :value="now" :step="1" />
      <br />
      <ent-time :value="now" :step="5" />
    </ent-collapse-container>

    <ent-collapse-container title="定时更新">
      <ent-time :value="now" mode="date" />
      <br />
      <ent-time :value="now" mode="datetime" />
      <br />
      <ent-time :value="now" />
    </ent-collapse-container>
  </ent-page-wrapper>
</template>
<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue';
  import { EntPageWrapper } from 'fe-ent-core/lib/components/page';
  import { EntTime } from 'fe-ent-core/lib/components/time';
  import { EntCollapseContainer } from 'fe-ent-core/lib/components/container';

  export default defineComponent({
    components: { EntPageWrapper, EntTime, EntCollapseContainer },
    setup() {
      const now = new Date().getTime();
      const state = reactive({
        time1: now - 60 * 3 * 1000,
        time2: now - 86400 * 3 * 1000,
      });
      return {
        ...toRefs(state),
        now,
      };
    },
  });
</script>

<template>
  <Tooltip
    :title="t('layout.header.tooltipErrorLog')"
    placement="bottom"
    :mouse-enter-delay="0.5"
    @click="handleToErrorList"
  >
    <Badge :count="getCount" :offset="[0, 10]" :overflow-count="99">
      <EntIcon icon="ion:bug-outline" />
    </Badge>
  </Tooltip>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue';
  import { Badge, Tooltip } from 'ant-design-vue';
  import { EntIcon, useErrorLogStore, useGlobalStore, useI18n } from 'fe-ent-core';

  import { useRouter } from 'vue-router';

  export default defineComponent({
    name: 'ErrorAction',
    components: { EntIcon, Tooltip, Badge },

    setup() {
      const { t } = useI18n();
      const { push } = useRouter();
      const errorLogStore = useErrorLogStore();
      const globalStore = useGlobalStore();
      const getCount = computed(() => errorLogStore.getErrorLogListCount);

      function handleToErrorList() {
        push(globalStore.getErrorLogPagePath).then(() => {
          errorLogStore.setErrorLogListCount(0);
        });
      }

      return {
        t,
        getCount,
        handleToErrorList,
      };
    },
  });
</script>

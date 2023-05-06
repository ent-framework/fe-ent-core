<template>
  <Tooltip
    :title="t('layout.header.tooltipErrorLog')"
    placement="bottom"
    :mouseEnterDelay="0.5"
    @click="handleToErrorList"
  >
    <Badge :count="getCount" :offset="[0, 10]" :overflowCount="99">
      <EntIcon icon="ion:bug-outline" />
    </Badge>
  </Tooltip>
</template>
<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { Tooltip, Badge } from 'ant-design-vue';
  import { EntIcon } from 'fe-ent-core/lib/components';

  import { useI18n } from 'fe-ent-core/lib/hooks';
  import { useErrorLogStore } from 'fe-ent-core/lib/store';
  import { PageEnum } from 'fe-ent-core/lib/logics';

  import { useRouter } from 'vue-router';

  export default defineComponent({
    name: 'ErrorAction',
    components: { EntIcon, Tooltip, Badge },

    setup() {
      const { t } = useI18n();
      const { push } = useRouter();
      const errorLogStore = useErrorLogStore();

      const getCount = computed(() => errorLogStore.getErrorLogListCount);

      function handleToErrorList() {
        push(PageEnum.ERROR_LOG_PAGE).then(() => {
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

<template>
  <NTooltip placement="bottom" :mouse-enter-delay="0.5" @click="handleToErrorList">
    <NBadge :value="getCount" :max="10">
      <EntIcon icon="ion:bug-outline" />
    </NBadge>
    {{ t('layout.header.tooltipErrorLog') }}
  </NTooltip>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue';
  import { NBadge, NTooltip } from 'naive-ui';
  import { EntIcon } from 'fe-ent-core';
  import { useGlobSetting, useI18n } from 'fe-ent-core/es/hooks';
  import { useErrorLogStore } from 'fe-ent-core/es/store';

  import { useRouter } from 'vue-router';

  export default defineComponent({
    name: 'ErrorAction',
    components: { EntIcon, NTooltip, NBadge },

    setup() {
      const { t } = useI18n();
      const { push } = useRouter();
      const errorLogStore = useErrorLogStore();
      const globSetting = useGlobSetting();
      const getCount = computed(() => errorLogStore.getErrorLogListCount);

      function handleToErrorList() {
        push(globSetting.errorLogPath).then(() => {
          errorLogStore.setErrorLogListCount(0);
        });
      }

      return {
        t,
        getCount,
        handleToErrorList
      };
    }
  });
</script>

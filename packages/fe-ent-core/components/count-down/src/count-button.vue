<template>
  <Button v-bind="$attrs" :disabled="isStart" :loading="loading" @click="handleStart">
    {{ getButtonText }}
  </Button>
</template>
<script lang="ts">
  import { computed, defineComponent, ref, unref, watchEffect } from 'vue';
  import { Button } from 'ant-design-vue';
  import { isFunction } from '@ent-core/utils/is';
  import { useI18n } from '@ent-core/hooks/web/use-i18n';
  import { useCountdown } from './use-countdown';
  import type { PropType } from 'vue';

  const props = {
    /**
     * 绑定值
     */
    value: { type: [Object, Number, String, Array] },
    /**
     * 倒计时时间(秒)
     */
    count: { type: Number, default: 60 },
    /**
     * 倒计时之前执行的函数，返回 true 才会开始执行
     */
    beforeStartFunc: {
      type: Function as PropType<() => Promise<boolean>>,
      default: null,
    },
  };

  export default defineComponent({
    name: 'EntCountButton',
    components: { Button },
    props,
    setup(props) {
      const loading = ref(false);

      const { currentCount, isStart, start, reset } = useCountdown(props.count);
      const { t } = useI18n();

      const getButtonText = computed(() => {
        return !unref(isStart)
          ? t('component.countdown.normalText')
          : t('component.countdown.sendText', [unref(currentCount)]);
      });

      watchEffect(() => {
        props.value === undefined && reset();
      });

      /**
       * @description: Judge whether there is an external function before execution, and decide whether to start after execution
       */
      async function handleStart() {
        const { beforeStartFunc } = props;
        if (beforeStartFunc && isFunction(beforeStartFunc)) {
          loading.value = true;
          try {
            const canStart = await beforeStartFunc();
            canStart && start();
          } finally {
            loading.value = false;
          }
        } else {
          start();
        }
      }
      return { handleStart, currentCount, loading, getButtonText, isStart };
    },
  });
</script>

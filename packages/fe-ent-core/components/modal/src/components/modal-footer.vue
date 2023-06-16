<template>
  <div>
    <slot name="insertFooter" />
    <ent-button v-if="showCancelBtn" v-bind="cancelButtonProps" @click="handleCancel">
      {{ cancelText }}
    </ent-button>
    <slot name="centerFooter" />
    <ent-button
      v-if="showOkBtn"
      :type="okType"
      :loading="confirmLoading"
      v-bind="okButtonProps"
      @click="handleOk"
    >
      {{ okText }}
    </ent-button>
    <slot name="appendFooter" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { useI18n } from '@ent-core/hooks';
  import { basicProps } from '../props';
  export default defineComponent({
    name: 'BasicModalFooter',
    props: basicProps,
    emits: ['ok', 'cancel'],
    setup(props, { emit }) {
      const { t } = useI18n();
      const cancelText =
        !props.cancelText || props.cancelText.length == 0
          ? t('common.cancelText')
          : props.cancelText;
      const okText = !props.okText || props.okText.length == 0 ? t('common.okText') : props.okText;
      function handleOk(e: Event) {
        emit('ok', e);
      }

      function handleCancel(e: Event) {
        emit('cancel', e);
      }

      return { handleOk, handleCancel, cancelText, okText };
    },
  });
</script>

<template>
  <div>
    <slot name="insertFooter"></slot>
    <a-button v-bind="cancelButtonProps" @click="handleCancel" v-if="showCancelBtn">
      {{ cancelText }}
    </a-button>
    <slot name="centerFooter"></slot>
    <a-button
      :type="okType"
      @click="handleOk"
      :loading="confirmLoading"
      v-bind="okButtonProps"
      v-if="showOkBtn"
    >
      {{ okText }}
    </a-button>
    <slot name="appendFooter"></slot>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { basicProps } from '../props';
  import { useI18n } from '@ent-core/hooks';
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

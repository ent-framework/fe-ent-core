<template>
  <div v-if="showFooter || $slots.footer" :class="prefixCls" :style="getStyle">
    <template v-if="!$slots.footer">
      <slot name="insertFooter" />
      <ent-button v-if="showCancelBtn" v-bind="cancelButtonProps" class="mr-2" @click="handleClose">
        {{ cancelText }}
      </ent-button>
      <slot name="centerFooter" />
      <ent-button
        v-if="showOkBtn"
        :type="okType"
        v-bind="okButtonProps"
        class="mr-2"
        :loading="confirmLoading"
        @click="handleOk"
      >
        {{ okText }}
      </ent-button>
      <slot name="appendFooter" />
    </template>

    <template v-else>
      <slot name="footer" />
    </template>
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue';
  import { useDesign } from '@ent-core/hooks/web/use-design';
  import { useI18n } from '@ent-core/hooks/web/use-i18n';
  import { footerProps } from '../props';
  import type { CSSProperties } from 'vue';
  export default defineComponent({
    name: 'EntDrawerFooter',
    props: {
      ...footerProps,
      height: {
        type: String,
        default: '60px',
      },
    },
    emits: ['ok', 'close'],
    setup(props, { emit }) {
      const { t } = useI18n();
      const cancelText =
        !props.cancelText || props.cancelText.length == 0
          ? t('common.cancelText')
          : props.cancelText;
      const okText = !props.okText || props.okText.length == 0 ? t('common.okText') : props.okText;

      const { prefixCls } = useDesign('basic-drawer-footer');

      const getStyle = computed((): CSSProperties => {
        const heightStr = `${props.height}`;
        return {
          height: heightStr,
          lineHeight: heightStr,
        };
      });

      function handleOk() {
        emit('ok');
      }

      function handleClose() {
        emit('close');
      }
      return { handleOk, prefixCls, handleClose, getStyle, okText, cancelText };
    },
  });
</script>

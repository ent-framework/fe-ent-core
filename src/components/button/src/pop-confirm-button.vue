<script lang="ts">
  import { computed, defineComponent, h, unref } from 'vue';
  import { NButton, NPopconfirm } from 'naive-ui';
  import { omit } from 'lodash-es';
  import { useAttrs } from '../../../hooks/core/use-attrs';
  import { useI18n } from '../../../hooks/web/use-i18n';
  import { type Recordable } from '../../../types';
  import { popConfirmBtnProps } from './props';

  export default defineComponent({
    name: 'EntPopButton',
    inheritAttrs: false,
    props: popConfirmBtnProps,
    setup(props) {
      const { t } = useI18n();
      const attrs = useAttrs();

      // get inherit binding value
      const getBindValues = computed(() => {
        return { ...props, ...unref(attrs) };
      });

      return () => {
        const bindValues = omit(unref(getBindValues), 'icon');
        const { btnLabel } = bindValues;
        const btnBind = omit(bindValues, 'title') as Recordable;
        if (btnBind.disabled) btnBind.color = '';
        const Button = h(NButton, btnBind, {
          default: () => btnLabel,
        });

        // If it is not enabled, it is a normal button
        if (!props.enable) {
          return Button;
        }
        const { popConfirm = {} } = bindValues;
        return h(
          NPopconfirm,
          {
            positiveText: t('common.okText'),
            negativeText: t('common.cancelText'),
            ...popConfirm,
          },
          {
            trigger: () => {
              return h(NButton, btnBind, { default: () => btnLabel });
            },
            default: () => {
              return popConfirm.confirmContent;
            },
          },
        );
      };
    },
  });
</script>

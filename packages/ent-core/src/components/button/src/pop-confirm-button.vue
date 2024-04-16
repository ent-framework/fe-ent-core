<script lang="ts">
  import { computed, defineComponent, h, unref } from 'vue';
  import { NButton, NPopconfirm, NTooltip } from 'naive-ui';
  import { omit } from 'lodash-es';
  import { useAttrs } from '../../../hooks/core/use-attrs';
  import { type Recordable } from '../../../types';
  import { isFunction, isString } from '../../../utils';
  import { EntIcon } from '../../icon';
  import { popConfirmBtnProps } from './props';
  export default defineComponent({
    name: 'EntPopButton',
    inheritAttrs: false,
    props: popConfirmBtnProps,
    setup(props, { slots }) {
      const attrs = useAttrs();

      // get inherit binding value
      const getBindValues = computed(() => {
        return { ...props, ...unref(attrs) };
      });

      return () => {
        const bindValues = unref(getBindValues);
        const { icon, onClick } = bindValues;
        const btnBind = omit(bindValues, ['icon', 'onClick']) as Recordable;
        const { popConfirmProps, tooltipProps, renderIcon } = btnBind;

        const renderButton = (withClick = true) => {
          return h(
            NButton,
            {
              bordered: false,
              text: true,
              size: 'small',
              ...btnBind,
              ...(icon
                ? {
                    renderIcon: () => {
                      if (isString(icon)) {
                        return h(EntIcon, { icon });
                      }
                      if (isFunction(icon)) {
                        return icon?.();
                      }
                      return null;
                    },
                  }
                : {
                    renderIcon,
                  }),

              ...(withClick
                ? {
                    onClick,
                  }
                : {}),
            },
            {
              default: () => slots.default?.(),
            },
          );
        };

        // If it is not enabled, it is a normal button
        if (!(slots.tooltip || slots.confirm)) {
          return renderButton(true);
        }

        const renderConfirmChild = () => {
          if (slots.confirm) {
            return h(
              NPopconfirm,
              {
                ...popConfirmProps,
                onPositiveClick: onClick,
              },
              {
                trigger: () => {
                  return renderButton(false);
                },
                default: () => {
                  return slots.confirm?.();
                },
              },
            );
          }
          return renderButton(true);
        };

        //tooltip 优先显示
        if (slots.tooltip) {
          return h(
            NTooltip,
            { ...tooltipProps, trigger: 'hover' },
            {
              trigger: () => {
                return renderConfirmChild();
              },
              default: () => {
                return slots.tooltip?.();
              },
            },
          );
        } else if (slots.confirm) {
          return renderConfirmChild();
        }
        return null;
      };
    },
  });
</script>

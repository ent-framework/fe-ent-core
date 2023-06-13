<script lang="ts">
  import { computed, defineComponent, h, unref } from 'vue';
  import { Popconfirm } from 'ant-design-vue';
  import { omit } from 'lodash-es';
  import { extendSlots } from '@ent-core/utils/helper/tsx-helper';
  import { useAttrs } from '@ent-core/hooks/core/use-attrs';
  import { useI18n } from '@ent-core/hooks/web/use-i18n';
  import { type Recordable } from '@ent-core/types';
  import BasicButton from './basic-button.vue';
  import { btnProps } from './props';
  const props = {
    /**
     * 是否启用下拉菜单
     * @default: true
     */
    enable: {
      type: Boolean,
      default: true,
    },
    ...btnProps,
  };

  export default defineComponent({
    name: 'EntPopButton',
    extends: BasicButton,
    inheritAttrs: false,
    props,
    setup(props, { slots }) {
      const { t } = useI18n();
      const attrs = useAttrs();

      // get inherit binding value
      const getBindValues = computed(() => {
        return Object.assign(
          {
            okText: t('common.okText'),
            cancelText: t('common.cancelText'),
          },
          { ...props, ...unref(attrs) },
        );
      });

      return () => {
        const bindValues = omit(unref(getBindValues), 'icon');
        const btnBind = omit(bindValues, 'title') as Recordable;
        if (btnBind.disabled) btnBind.color = '';
        const Button = h(BasicButton, btnBind, extendSlots(slots));

        // If it is not enabled, it is a normal button
        if (!props.enable) {
          return Button;
        }
        return h(Popconfirm, bindValues, { default: () => Button });
      };
    },
  });
</script>

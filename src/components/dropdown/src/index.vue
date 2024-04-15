<template>
  <NDropdown v-bind="getBindValue" :options="getOptions" :class="`${prefixCls}`">
    <slot />
  </NDropdown>
</template>
<script lang="ts">
  import { computed, defineComponent, h } from 'vue';
  import { NButton, NDropdown, NPopconfirm } from 'naive-ui';
  import { omit } from 'lodash-es';
  import { isFunction, isString } from '../../../utils';
  import { EntIcon } from '../../../components/icon';
  import { useDesign } from '../../../hooks';
  import { basicDropdownProps } from './props';
  import type { DropdownRenderOption } from 'naive-ui';
  import type { DropMenu } from './typing';
  import type {
    DropdownDividerOption,
    DropdownMixedOption,
  } from 'naive-ui/es/dropdown/src/interface';

  export default defineComponent({
    name: 'EntDropdown',
    components: { NDropdown },
    props: basicDropdownProps,
    emits: [
      /**
       * 点击菜单时触发
       * @param {{onClick?: Function;to?: string;icon?: string;event: string | number; text: string;disabled?: boolean;divider?: boolean}} menu
       */
      'menuEvent',
    ],
    setup(props, { emit, attrs }) {
      const { prefixCls } = useDesign('dropdown');
      function handleClickMenu(item: DropMenu) {
        const { event } = item;
        const menu = props.dropMenuList.find((item) => `${item.event}` === `${event}`);
        emit('menuEvent', menu);
        item.onClick?.();
      }

      const getBindValue = computed(() => {
        return {
          ...props,
          ...attrs,
        };
      });

      const getOptions = computed((): DropdownMixedOption[] => {
        if (!props.dropMenuList) return [];
        const options: DropdownMixedOption[] = [];
        props.dropMenuList.forEach((item) => {
          const { disabled, icon, key, label, popConfirm } = item;
          options.push({
            type: 'render',
            key,
            render: () => {
              if (popConfirm) {
                return h(
                  NPopconfirm,
                  {
                    ...omit(popConfirm, ['title']),
                  },
                  {
                    trigger: () => {
                      return h(
                        NButton,
                        {
                          renderIcon: () => {
                            return icon?.();
                          },
                          disabled,
                          bordered: false,
                          text: true,
                          size: 'small',
                        },
                        { default: () => label },
                      );
                    },
                    default: () => {
                      return popConfirm.confirmContent;
                    },
                  },
                );
              }
              return h(
                NButton,
                {
                  renderIcon: () => {
                    if (isString(icon)) {
                      return h(EntIcon, { icon });
                    }
                    if (isFunction(icon)) {
                      return icon?.();
                    }
                    return null;
                  },
                  disabled,
                  bordered: false,
                  text: true,
                  size: 'small',
                  class: `${prefixCls}-dropdown-item`,
                },
                { default: () => label },
              );
            },
          } as DropdownRenderOption);

          if (item.appendDivider) {
            options.push({
              type: 'divider',
              key: item.key,
            } as DropdownDividerOption);
          }
        });
        return options;
      });

      const getAttr = (key: string | number) => ({ key });
      return {
        getBindValue,
        getAttr,
        handleClickMenu,
        getOptions,
        prefixCls,
      };
    },
  });
</script>

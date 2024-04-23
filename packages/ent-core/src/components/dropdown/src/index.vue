<template>
  <NDropdown v-bind="getBindValue" :options="getOptions" :class="`${prefixCls}`">
    <slot />
  </NDropdown>
</template>
<script lang="ts">
  import { computed, createTextVNode, defineComponent, h } from 'vue';
  import { NDropdown } from 'naive-ui';
  import { isFunction, isString } from '../../../utils';
  import { EntIcon } from '../../icon';
  import { useDesign } from '../../../hooks';
  import { PopConfirmButton } from '../../button';
  import { basicDropdownProps } from './props';
  import type { DropdownRenderOption } from 'naive-ui';
  import type { DropMenu } from './typing';
  import type {
    DropdownDividerOption,
    DropdownMixedOption
  } from 'naive-ui/es/dropdown/src/interface';

  export default defineComponent({
    name: 'EntDropdown',
    components: { NDropdown, PopConfirmButton },
    extends: NDropdown,
    inheritAttrs: false,
    props: basicDropdownProps,
    emits: [
      /**
       * 点击菜单时触发
       * @param {{onClick?: Function;to?: string;icon?: string;event: string | number; text: string;disabled?: boolean;divider?: boolean}} menu
       */
      'menuEvent'
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
          ...attrs
        };
      });

      const getOptions = computed((): DropdownMixedOption[] => {
        if (!props.dropMenuList) return [];
        const options: DropdownMixedOption[] = [];
        props.dropMenuList.forEach((item) => {
          const {
            key,
            label,
            tooltip,
            disabled,
            tooltipProps = {},
            confirm,
            popConfirmProps = {},
            onClick
          } = item;
          options.push({
            type: 'render',
            key,
            render: () => {
              const slots: any = {};
              if (tooltip) {
                Object.assign(slots, {
                  tooltip: () => {
                    if (isFunction(tooltip)) {
                      return tooltip();
                    } else if (isString(tooltip)) {
                      return createTextVNode(tooltip);
                    }
                    return null;
                  }
                });
              }
              if (confirm) {
                Object.assign(slots, {
                  confirm: () => {
                    if (isFunction(confirm)) {
                      return confirm();
                    } else if (isString(confirm)) {
                      return createTextVNode(confirm);
                    }
                    return null;
                  }
                });
              }
              if (label) {
                Object.assign(slots, {
                  default: () => {
                    return createTextVNode(label);
                  }
                });
              }
              const { icon } = item;
              return h(
                PopConfirmButton,
                {
                  text: true,
                  size: 'small',
                  popConfirmProps,
                  tooltipProps,
                  disabled,
                  onClick,
                  renderIcon: () => {
                    if (isString(icon)) {
                      return h(EntIcon, { icon });
                    }
                    if (isFunction(icon)) {
                      return icon?.();
                    }
                    return null;
                  }
                },
                { ...slots }
              );
            }
          } as DropdownRenderOption);

          if (item.appendDivider) {
            options.push({
              type: 'divider',
              key: item.key
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
        prefixCls
      };
    }
  });
</script>

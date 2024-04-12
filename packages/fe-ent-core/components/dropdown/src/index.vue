<template>
  <NDropdown v-bind="$attrs" :options="getOptions">
    <slot />
  </NDropdown>
</template>
<script lang="ts">
  import { computed, defineComponent, h } from 'vue';
  import { NButton, NDropdown, NPopconfirm } from 'naive-ui';
  import { omit } from 'lodash-es';
  import { isFunction, isString } from '@ent-core/utils';
  import { EntIcon } from '@ent-core/components/icon';
  import type { DropdownRenderOption } from 'naive-ui';
  import type { DropMenu } from './typing';
  import type { PropType } from 'vue';
  import type {
    DropdownDividerOption,
    DropdownMixedOption,
  } from 'naive-ui/es/dropdown/src/interface';

  const props = {
    /**
     * 触发方式
     */
    trigger: {
      type: String as PropType<'hover' | 'click' | 'focus' | 'manual'>,
      default: () => 'click',
    },
    /**
     * 菜单列表
     */
    dropMenuList: {
      type: Array as PropType<DropMenu[]>,
      default: () => [],
    },
    /**
     * 已选中的菜单
     */
    selectedKeys: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  };
  export default defineComponent({
    name: 'EntDropdown',
    components: { NDropdown },
    inheritAttrs: false,
    props,
    emits: [
      /**
       * 点击菜单时触发
       * @param {{onClick?: Function;to?: string;icon?: string;event: string | number; text: string;disabled?: boolean;divider?: boolean}} menu
       */
      'menuEvent',
    ],
    setup(props, { emit }) {
      function handleClickMenu(item: DropMenu) {
        const { event } = item;
        const menu = props.dropMenuList.find((item) => `${item.event}` === `${event}`);
        emit('menuEvent', menu);
        item.onClick?.();
      }

      const getOptions = computed((): DropdownMixedOption[] => {
        if (!props.dropMenuList) return [];
        const options: DropdownMixedOption[] = [];
        options.push(
          ...props.dropMenuList.map((item) => {
            if (item.divider) {
              return {
                type: 'divider',
                key: item.key,
              } as DropdownDividerOption;
            } else {
              const { disabled, icon, key, label, popConfirm } = item;
              return {
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
                    },
                    { default: () => label },
                  );
                },
              } as DropdownRenderOption;
            }
          }),
        );
        return options;
      });

      const getAttr = (key: string | number) => ({ key });
      return {
        getAttr,
        handleClickMenu,
        getOptions,
      };
    },
  });
</script>

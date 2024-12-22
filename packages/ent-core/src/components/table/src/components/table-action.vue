<template>
  <NFlex :class="[prefixCls, getAlign]" :size="[4, 4]" @click="onCellClick">
    <template v-for="(action, index) in getActions" :key="`${index}-${action.label}`">
      <EntPopButton v-bind="getPopButton(action)">
        <template v-if="action.tooltip" #tooltip>
          {{ action.tooltip }}
        </template>
        <template v-if="action.confirm" #confirm>
          {{ action.confirm }}
        </template>
      </EntPopButton>
    </template>
    <EntDropdown
      v-if="dropDownActions && getDropdownList.length > 0"
      trigger="hover"
      :drop-menu-list="getDropdownList"
      popconfirm
    >
      <slot name="more" />
      <ent-button
        v-if="!$slots.more"
        icon="ant-design:more-outlined"
        type="default"
        :size="getButtonSize"
        class="icon-more"
      />
    </EntDropdown>
  </NFlex>
</template>
<script lang="ts">
  import { computed, defineComponent, h, toRaw, unref } from 'vue';
  import { NFlex } from 'naive-ui';
  import Icon from '../../../../components/icon';
  import { EntPopButton } from '../../../button';
  import { EntDropdown } from '../../../dropdown';
  import { useDesign, usePermission } from '../../../../hooks';
  import { isBoolean, isString } from '../../../../utils/is';
  import { useTableContext } from '../hooks/use-table-context';
  import { ACTION_COLUMN_FLAG } from '../const';
  import type { RetInstance } from '../hooks/use-table-context';
  import type { PopButtonProps } from '../../../button/interface';
  import type { DropMenu } from '../../../dropdown/src/typing';
  import type { TableActionItem, TableActionType } from '../../../../components/table/interface';
  import type { TooltipProps } from 'naive-ui';
  import type { Size } from 'naive-ui/es/button/src/interface';
  import type { PropType } from 'vue';

  export default defineComponent({
    name: 'EntTableAction',
    components: { EntPopButton, NFlex, EntDropdown },
    props: {
      actions: {
        type: Array as PropType<TableActionItem[]>,
        default: () => []
      },
      dropDownActions: {
        type: Array as PropType<TableActionItem[]>,
        default: () => []
      },
      divider: {
        type: Boolean,
        default: true
      },
      outside: {
        type: Boolean,
        default: false
      },
      stopButtonPropagation: {
        type: Boolean,
        default: false
      },
      buttonSize: {
        type: String as PropType<Size>,
        default: () => 'small'
      }
    },
    setup(props) {
      const { prefixCls } = useDesign('basic-table-action');
      let table: RetInstance;
      if (!props.outside) {
        table = useTableContext();
      }

      const { hasPermission } = usePermission();
      function isIfShow(action: TableActionItem): boolean {
        const ifShow = action.ifShow;

        let isIfShow = true;

        if (isBoolean(ifShow)) {
          isIfShow = ifShow;
        }
        if (ifShow && typeof ifShow === 'function') {
          isIfShow = ifShow(action);
        }
        return isIfShow;
      }

      /**
       * 转成PopButton的属性
       */
      const getActions = computed((): TableActionItem[] => {
        return (toRaw(props.actions) || []).filter((action) => {
          return hasPermission(action.auth) && isIfShow(action);
        });
      });

      function getPopButton(action: TableActionItem): PopButtonProps {
        const { label, icon, disabled, ...others } = action;
        const buttonSize = unref(getButtonSize);
        return {
          size: buttonSize,
          btnLabel: label,
          disabled,
          renderIcon: () => {
            if (icon) {
              return h(Icon, { icon: action.icon });
            }
            return null;
          },
          ...others
        } as PopButtonProps;
      }

      /**
       * 利用EntDropDown 渲染下拉菜单，菜单也是可以支持PopButton的
       */
      const getDropdownList = computed((): DropMenu[] => {
        const list = (toRaw(props.dropDownActions) || []).filter((action) => {
          return hasPermission(action.auth) && isIfShow(action);
        });
        return list.map((action, index) => {
          const { label, popConfirmProps, confirm, tooltip, tooltipProps } = action;
          return {
            icon: () => {
              if (action.icon) {
                return h(Icon, { icon: action.icon });
              }
              return null;
            },
            popConfirmProps,
            label,
            confirm,
            tooltip,
            tooltipProps,
            key: `dropdown-${label}-${index}`,
            appendDivider: action.appendDivider
          };
        });
      });

      const getAlign = computed(() => {
        const columns = (table as TableActionType)?.getColumns?.() || [];
        const actionColumn = columns.find((item) => item.key === ACTION_COLUMN_FLAG);
        return actionColumn?.align ?? 'left';
      });

      const getButtonSize = computed((): Size => {
        if (props.outside) {
          return props.buttonSize;
        } else {
          const tableSize = table !== undefined ? table!.getSize() || 'small' : 'small';
          switch (tableSize) {
            case 'small':
              return 'tiny';
            case 'large':
              return 'medium';
            default:
              return 'small';
          }
        }
      });

      function getTooltip(data: string | TooltipProps): TooltipProps {
        return {
          //to: unref((table as any)?.wrapRef) || document.body,
          placement: 'bottom',
          ...(isString(data) ? { title: data } : data)
        };
      }

      function onCellClick(e: MouseEvent) {
        if (!props.stopButtonPropagation) return;
        const path = e.composedPath() as HTMLElement[];
        const isInButton = path.find((ele) => {
          return ele.tagName?.toUpperCase() === 'BUTTON';
        });
        isInButton && e.stopPropagation();
      }

      return {
        prefixCls,
        getActions,
        getDropdownList,
        getAlign,
        onCellClick,
        getTooltip,
        getPopButton,
        getButtonSize
      };
    }
  });
</script>

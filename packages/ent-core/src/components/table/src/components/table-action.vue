<template>
  <NFlex :class="[prefixCls, getAlign]" @click="onCellClick">
    <template v-for="(action, index) in getActions" :key="`${index}-${action.label}`">
      <EntPopButton v-bind="getPopButton(action)" />
    </template>
    <EntDropdown
      v-if="dropDownActions && getDropdownList.length > 0"
      trigger="hover"
      :drop-menu-list="getDropdownList"
      popconfirm
    >
      <slot name="more" />
      <ent-button v-if="!$slots.more" type="default" size="small">
        <Icon icon="ant-design:more-outlined" class="icon-more" />
      </ent-button>
    </EntDropdown>
  </NFlex>
</template>
<script lang="ts">
  import { computed, defineComponent, h, toRaw } from 'vue';
  import { NFlex } from 'naive-ui';
  import Icon from '../../../../components/icon';
  import { EntPopButton } from '../../../../components/button';
  import { EntDropdown } from '../../../../components/dropdown';
  import { useDesign } from '../../../../hooks/web/use-design';
  import { usePermission } from '../../../../hooks/web/use-permission';
  import { isBoolean, isString } from '../../../../utils/is';
  import { propTypes } from '../../../../utils/prop-types';
  import { useTableContext } from '../hooks/use-table-context';
  import { ACTION_COLUMN_FLAG } from '../const';
  import type { PopButtonProps } from '../../../../components/button/interface';
  import type { DropMenu } from '../../../../components/dropdown/interface';
  import type { TableActionItem, TableActionType } from '../../../../components/table/interface';
  import type { TooltipProps } from 'naive-ui';
  import type { PropType } from 'vue';

  export default defineComponent({
    name: 'EntTableAction',
    components: { Icon, EntPopButton, NFlex, EntDropdown },
    props: {
      actions: {
        type: Array as PropType<TableActionItem[]>,
        default: () => [],
      },
      dropDownActions: {
        type: Array as PropType<TableActionItem[]>,
        default: () => [],
      },
      divider: propTypes.bool.def(true),
      outside: propTypes.bool,
      stopButtonPropagation: propTypes.bool.def(false),
    },
    setup(props) {
      const { prefixCls } = useDesign('basic-table-action');
      let table: Partial<TableActionType> = {};
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
        const { popConfirmProps, label, icon, disabled, ...others } = action;
        return {
          //to: unref((table as any)?.wrapRef) || document.body,
          size: 'small',
          btnLabel: label,
          disabled,
          renderIcon: () => {
            if (icon) {
              return h(Icon, { icon: action.icon });
            }
            return null;
          },
          ...others,
          popConfirmProps,
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
            appendDivider: action.appendDivider,
          };
        });
      });

      const getAlign = computed(() => {
        const columns = (table as TableActionType)?.getColumns?.() || [];
        const actionColumn = columns.find((item) => item.flag === ACTION_COLUMN_FLAG);
        return actionColumn?.align ?? 'left';
      });

      function getTooltip(data: string | TooltipProps): TooltipProps {
        return {
          //to: unref((table as any)?.wrapRef) || document.body,
          placement: 'bottom',
          ...(isString(data) ? { title: data } : data),
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
      };
    },
  });
</script>

<template>
  <div :class="[prefixCls, getAlign]" @click="onCellClick">
    <template v-for="(action, index) in getActions" :key="`${index}-${action.label}`">
      <Tooltip v-if="action.tooltip" v-bind="getTooltip(action.tooltip)">
        <EntPopButton v-bind="action">
          <Icon v-if="action.icon" :icon="action.icon" :class="{ 'mr-1': !!action.label }" />
          <template v-if="action.label">{{ action.label }}</template>
        </EntPopButton>
      </Tooltip>
      <EntPopButton v-else v-bind="action">
        <Icon v-if="action.icon" :icon="action.icon" :class="{ 'mr-1': !!action.label }" />
        <template v-if="action.label">{{ action.label }}</template>
      </EntPopButton>
      <Divider
        v-if="divider && index < getActions.length - 1"
        type="vertical"
        class="action-divider"
      />
    </template>
    <EntDropdown
      v-if="dropDownActions && getDropdownList.length > 0"
      :trigger="['hover']"
      :drop-menu-list="getDropdownList"
      popconfirm
    >
      <slot name="more" />
      <ent-button v-if="!$slots.more" type="link" size="small">
        <MoreOutlined class="icon-more" />
      </ent-button>
    </EntDropdown>
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent, toRaw, unref } from 'vue';
  import { MoreOutlined } from '@ant-design/icons-vue';
  import { Divider, Tooltip } from 'ant-design-vue';
  import { isFunction } from '@vueuse/shared';
  import Icon from '@ent-core/components/icon';
  import { EntPopButton } from '@ent-core/components/button';
  import { EntDropdown } from '@ent-core/components/dropdown';
  import { useDesign } from '@ent-core/hooks/web/use-design';
  import { usePermission } from '@ent-core/hooks/web/use-permission';
  import { isBoolean, isString } from '@ent-core/utils/is';
  import { propTypes } from '@ent-core/utils/prop-types';
  import { useTableContext } from '../hooks/use-table-context';
  import { ACTION_COLUMN_FLAG } from '../const';
  import type { TableActionItem, TableActionType } from '@ent-core/components/table/interface';
  import type { TooltipProps } from 'ant-design-vue';
  import type { PropType } from 'vue';

  export default defineComponent({
    name: 'EntTableAction',
    components: { Icon, EntPopButton, Divider, EntDropdown, MoreOutlined, Tooltip },
    props: {
      actions: {
        type: Array as PropType<TableActionItem[]>,
        default: null,
      },
      dropDownActions: {
        type: Array as PropType<TableActionItem[]>,
        default: null,
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
        if (isFunction(ifShow)) {
          isIfShow = ifShow(action);
        }
        return isIfShow;
      }

      const getActions = computed(() => {
        return (toRaw(props.actions) || [])
          .filter((action) => {
            return hasPermission(action.auth) && isIfShow(action);
          })
          .map((action) => {
            const { popConfirm } = action;
            return {
              getPopupContainer: () => unref((table as any)?.wrapRef) ?? document.body,
              type: 'link',
              size: 'small',
              ...action,
              ...(popConfirm || {}),
              onConfirm: popConfirm?.confirm,
              onCancel: popConfirm?.cancel,
              enable: !!popConfirm,
            };
          });
      });

      const getDropdownList = computed((): any[] => {
        const list = (toRaw(props.dropDownActions) || []).filter((action) => {
          return hasPermission(action.auth) && isIfShow(action);
        });
        return list.map((action, index) => {
          const { label, popConfirm } = action;
          return {
            ...action,
            ...popConfirm,
            onConfirm: popConfirm?.confirm,
            onCancel: popConfirm?.cancel,
            text: label,
            divider: index < list.length - 1 ? props.divider : false,
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
          getPopupContainer: () => unref((table as any)?.wrapRef) ?? document.body,
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

      return { prefixCls, getActions, getDropdownList, getAlign, onCellClick, getTooltip };
    },
  });
</script>

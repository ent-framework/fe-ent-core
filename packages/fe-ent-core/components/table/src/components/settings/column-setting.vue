<template>
  <Tooltip placement="top">
    <template #title>
      <span>{{ t('component.table.settingColumn') }}</span>
    </template>
    <Popover
      placement="bottomLeft"
      trigger="click"
      :overlay-class-name="`${prefixCls}__column-list`"
      :get-popup-container="getPopupContainer"
      @open-change="handleVisibleChange"
    >
      <template #title>
        <div :class="`${prefixCls}__popover-title`">
          <Checkbox
            v-model:checked="checkAll"
            :indeterminate="indeterminate"
            @change="onCheckAllChange"
          >
            {{ t('component.table.settingColumnShow') }}
          </Checkbox>

          <Checkbox v-model:checked="checkIndex" @change="handleIndexCheckChange">
            {{ t('component.table.settingIndexColumnShow') }}
          </Checkbox>

          <Checkbox
            v-model:checked="checkSelect"
            :disabled="!defaultRowSelection"
            @change="handleSelectCheckChange"
          >
            {{ t('component.table.settingSelectColumnShow') }}
          </Checkbox>

          <ent-button size="small" type="link" @click="reset">
            {{ t('common.resetText') }}
          </ent-button>
        </div>
      </template>

      <template #content>
        <EntScrollContainer>
          <CheckboxGroup ref="columnListRef" v-model:value="checkedList" @change="onChange">
            <template v-for="item in plainOptions" :key="item.value">
              <div v-if="!('ifShow' in item && !item.ifShow)" :class="`${prefixCls}__check-item`">
                <DragOutlined class="table-column-drag-icon" />
                <Checkbox :value="item.value">
                  {{ item.label }}
                </Checkbox>

                <Tooltip
                  placement="bottomLeft"
                  :mouse-leave-delay="0.4"
                  :get-popup-container="getPopupContainer"
                >
                  <template #title>
                    {{ t('component.table.settingFixedLeft') }}
                  </template>
                  <EntIcon
                    icon="line-md:arrow-align-left"
                    :class="[
                      `${prefixCls}__fixed-left`,
                      {
                        active: item.fixed === 'left',
                        disabled: !checkedList.includes(item.value),
                      },
                    ]"
                    @click="handleColumnFixed(item, 'left')"
                  />
                </Tooltip>
                <Divider type="vertical" />
                <Tooltip
                  placement="bottomLeft"
                  :mouse-leave-delay="0.4"
                  :get-popup-container="getPopupContainer"
                >
                  <template #title>
                    {{ t('component.table.settingFixedRight') }}
                  </template>
                  <EntIcon
                    icon="line-md:arrow-align-left"
                    :class="[
                      `${prefixCls}__fixed-right`,
                      {
                        active: item.fixed === 'right',
                        disabled: !checkedList.includes(item.value),
                      },
                    ]"
                    @click="handleColumnFixed(item, 'right')"
                  />
                </Tooltip>
              </div>
            </template>
          </CheckboxGroup>
        </EntScrollContainer>
      </template>
      <SettingOutlined />
    </Popover>
  </Tooltip>
</template>
<script lang="ts">
  import {
    computed,
    defineComponent,
    nextTick,
    reactive,
    ref,
    toRefs,
    unref,
    watchEffect,
  } from 'vue';
  import { Checkbox, Divider, Popover, Tooltip } from 'ant-design-vue';
  import { DragOutlined, SettingOutlined } from '@ant-design/icons-vue';
  import { cloneDeep, omit } from 'lodash-es';
  import sortablejs from 'sortablejs';
  import { EntIcon } from '@ent-core/components/icon';
  import { EntScrollContainer } from '@ent-core/components/container';
  import { useI18n } from '@ent-core/hooks/web/use-i18n';
  import { useDesign } from '@ent-core/hooks/web/use-design';
  import { isNullAndUnDef } from '@ent-core/utils/is';
  import { getPopupContainer as getParentContainer } from '@ent-core/utils';
  import { useTableContext } from '../../hooks/use-table-context';
  import type { CheckboxChangeEvent } from 'ant-design-vue/es/checkbox/interface';
  import type { BasicColumn, BasicTableProps, ColumnChangeParam } from '../../types/table';
  import type Sortable from 'sortablejs';

  interface State {
    checkAll: boolean;
    isInit?: boolean;
    checkedList: string[];
    defaultCheckList: string[];
  }

  interface Options {
    label: string;
    value: string;
    fixed?: boolean | 'left' | 'right';
  }

  export default defineComponent({
    name: 'ColumnSetting',
    components: {
      SettingOutlined,
      Popover,
      Tooltip,
      Checkbox,
      CheckboxGroup: Checkbox.Group,
      DragOutlined,
      EntScrollContainer,
      Divider,
      EntIcon,
    },
    emits: ['columns-change'],

    setup(_, { emit, attrs }) {
      const { t } = useI18n();
      const table = useTableContext();

      const defaultRowSelection = omit(table.getRowSelection(), 'selectedRowKeys');
      let inited = false;
      // 是否当前的setColums触发的
      let isSetColumnsFromThis = false;
      // 是否当前组件触发的setProps
      let isSetPropsFromThis = false;

      const cachePlainOptions = ref<Options[]>([]);
      const plainOptions = ref<Options[] | any>([]);

      const plainSortOptions = ref<Options[]>([]);

      const columnListRef = ref(null);

      const state = reactive<State>({
        checkAll: true,
        checkedList: [],
        defaultCheckList: [],
      });
      /** 缓存初始化props */
      let cacheTableProps: Partial<BasicTableProps<any>> = {};
      const checkIndex = ref(false);
      const checkSelect = ref(false);

      const { prefixCls } = useDesign('basic-column-setting');

      const getValues = computed(() => {
        return unref(table?.getBindValues) || {};
      });

      watchEffect(() => {
        const columns = table.getColumns();
        setTimeout(() => {
          if (isSetColumnsFromThis) {
            isSetColumnsFromThis = false;
          } else if (columns.length) {
            init();
          }
        }, 0);
      });

      watchEffect(() => {
        const values = unref(getValues);
        if (isSetPropsFromThis) {
          isSetPropsFromThis = false;
        } else {
          cacheTableProps = cloneDeep(values);
        }
        checkIndex.value = !!values.showIndexColumn;
        checkSelect.value = !!values.rowSelection;
      });

      function getColumns() {
        const ret: Options[] = [];
        table.getColumns({ ignoreIndex: true, ignoreAction: true }).forEach((item) => {
          ret.push({
            label: (item.title as string) || (item.customTitle as string),
            value: (item.dataIndex || item.title) as string,
            ...item,
          });
        });
        return ret;
      }

      async function init(isReset = false) {
        // Sortablejs存在bug，不知道在哪个步骤中会向el append了一个childNode，因此这里先清空childNode
        // 有可能复现上述问题的操作：拖拽一个元素，快速的上下移动，最后放到最后的位置中松手
        plainOptions.value = [];
        const columnListEl = unref(columnListRef);
        if (columnListEl && (columnListEl as any).$el) {
          const el = (columnListEl as any).$el as Element;
          Array.from(el.children).forEach((item) => el.removeChild(item));
        }
        await nextTick();
        const columns = isReset ? cloneDeep(cachePlainOptions.value) : getColumns();

        const checkList = table
          .getColumns({ ignoreAction: true, ignoreIndex: true })
          .map((item) => {
            if (item.defaultHidden) {
              return '';
            }
            return item.dataIndex || item.title;
          })
          .filter(Boolean) as string[];
        plainOptions.value = columns;
        plainSortOptions.value = columns;
        // 更新缓存配置
        table.setCacheColumns?.(columns);
        !isReset && (cachePlainOptions.value = cloneDeep(columns));
        state.defaultCheckList = checkList;
        state.checkedList = checkList;
        // 是否列展示全选
        state.checkAll = checkList.length === columns.length;
        inited = false;
        handleVisibleChange();
      }

      // checkAll change
      function onCheckAllChange(e: CheckboxChangeEvent) {
        const checkList = plainSortOptions.value.map((item) => item.value);
        plainSortOptions.value.forEach(
          (item) => ((item as BasicColumn).defaultHidden = !e.target.checked),
        );
        if (e.target.checked) {
          state.checkedList = checkList;
          setColumns(checkList);
        } else {
          state.checkedList = [];
          setColumns([]);
        }
      }

      const indeterminate = computed(() => {
        const len = plainOptions.value.length;
        const checkedLen = state.checkedList.length;
        // unref(checkIndex) && checkedLen--;
        return checkedLen > 0 && checkedLen < len;
      });

      // Trigger when check/uncheck a column
      function onChange(checkedList: string[]) {
        const len = plainSortOptions.value.length;
        state.checkAll = checkedList.length === len;
        const sortList = unref(plainSortOptions).map((item) => item.value);
        checkedList.sort((prev, next) => {
          return sortList.indexOf(prev) - sortList.indexOf(next);
        });
        unref(plainSortOptions).forEach((item) => {
          (item as BasicColumn).defaultHidden = !checkedList.includes(item.value);
        });
        setColumns(checkedList);
      }

      let sortable: Sortable;
      let sortableOrder: string[] = [];
      // reset columns
      function reset() {
        setColumns(cachePlainOptions.value);
        init(true);
        checkIndex.value = !!cacheTableProps.showIndexColumn;
        checkSelect.value = !!cacheTableProps.rowSelection;
        table.setProps({
          showIndexColumn: checkIndex.value,
          rowSelection: checkSelect.value ? defaultRowSelection : undefined,
        });
        sortable.sort(sortableOrder);
      }

      // Open the pop-up window for drag and drop initialization
      function handleVisibleChange() {
        if (inited) return;
        nextTick(() => {
          const columnListEl = unref(columnListRef);
          if (!columnListEl) return;
          const el = (columnListEl as any).$el;
          if (!el) return;
          // Drag and drop sort
          //防止生成dts时报错
          //@ts-ignore
          sortable = sortablejs.create(unref(el), {
            animation: 500,
            delay: 400,
            delayOnTouchOnly: true,
            handle: '.table-column-drag-icon ',
            onEnd: (evt) => {
              const { oldIndex, newIndex } = evt;
              if (isNullAndUnDef(oldIndex) || isNullAndUnDef(newIndex) || oldIndex === newIndex) {
                return;
              }
              // Sort column
              const columns = cloneDeep(plainSortOptions.value);

              if (oldIndex > newIndex) {
                columns.splice(newIndex, 0, columns[oldIndex]);
                columns.splice(oldIndex + 1, 1);
              } else {
                columns.splice(newIndex + 1, 0, columns[oldIndex]);
                columns.splice(oldIndex, 1);
              }

              plainSortOptions.value = columns;
              setColumns(columns.filter((item) => state.checkedList.includes(item.value)));
            },
          });
          // 记录原始order 序列
          sortableOrder = sortable.toArray();
          inited = true;
        });
      }

      // Control whether the serial number column is displayed
      function handleIndexCheckChange(e: CheckboxChangeEvent) {
        isSetPropsFromThis = true;
        isSetColumnsFromThis = true;
        table.setProps({
          showIndexColumn: e.target.checked,
        });
      }

      // Control whether the check box is displayed
      function handleSelectCheckChange(e: CheckboxChangeEvent) {
        isSetPropsFromThis = true;
        isSetColumnsFromThis = true;
        table.setProps({
          rowSelection: e.target.checked ? defaultRowSelection : undefined,
        });
      }

      function handleColumnFixed(item: BasicColumn, fixed?: 'left' | 'right') {
        if (!state.checkedList.includes(item.dataIndex as string)) return;

        const columns = getColumns().filter((c: BasicColumn) =>
          state.checkedList.includes(c.dataIndex as string),
        ) as BasicColumn[];
        const isFixed = item.fixed === fixed ? false : fixed;
        const index = columns.findIndex((col) => col.dataIndex === item.dataIndex);
        if (index !== -1) {
          columns[index].fixed = isFixed;
        }
        item.fixed = isFixed;

        if (isFixed && !item.width) {
          item.width = 100;
        }
        updateSortOption(item);
        table.setCacheColumnsByField?.(item.dataIndex as string, { fixed: isFixed });
        setColumns(columns);
      }

      function setColumns(columns: BasicColumn[] | string[]) {
        isSetPropsFromThis = true;
        isSetColumnsFromThis = true;
        table.setColumns(columns);
        const data: ColumnChangeParam[] = unref(plainSortOptions).map((col) => {
          const visible =
            columns.findIndex(
              (c: BasicColumn | string) =>
                c === col.value || (typeof c !== 'string' && c.dataIndex === col.value),
            ) !== -1;
          return { dataIndex: col.value, fixed: col.fixed, visible };
        });

        emit('columns-change', data);
      }

      function getPopupContainer() {
        return attrs.getPopupContainer && typeof attrs.getPopupContainer === 'function'
          ? attrs.getPopupContainer()
          : getParentContainer();
      }

      function updateSortOption(column: BasicColumn) {
        plainSortOptions.value.forEach((item) => {
          if (item.value === column.dataIndex) {
            Object.assign(item, column);
          }
        });
      }

      return {
        t,
        ...toRefs(state),
        indeterminate,
        onCheckAllChange,
        onChange,
        plainOptions,
        reset,
        prefixCls,
        columnListRef,
        handleVisibleChange,
        checkIndex,
        checkSelect,
        handleIndexCheckChange,
        handleSelectCheckChange,
        defaultRowSelection,
        handleColumnFixed,
        getPopupContainer,
      };
    },
  });
</script>

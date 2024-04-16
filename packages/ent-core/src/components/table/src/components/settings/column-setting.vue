<template>
  <NTooltip placement="top" trigger="hover">
    <template #trigger>
      <NPopover
        placement="bottom-start"
        trigger="click"
        class="`${prefixCls}__column-list`"
        @open-change="handleVisibleChange"
      >
        <template #trigger>
          <EntIcon icon="ant-design:setting-outlined" />
        </template>
        <div :class="`${prefixCls}__popover-title`">
          <NCheckbox
            v-model:checked="checkAll"
            :indeterminate="indeterminate"
            @update:checked="onCheckAllChange"
          >
            {{ t('component.table.settingColumnShow') }}
          </NCheckbox>

          <NCheckbox v-model:checked="checkIndex" @update:checked="handleIndexCheckChange">
            {{ t('component.table.settingIndexColumnShow') }}
          </NCheckbox>

          <NCheckbox
            v-model:checked="checkSelect"
            :disabled="!defaultRowSelection"
            @update:checked="handleSelectCheckChange"
          >
            {{ t('component.table.settingSelectColumnShow') }}
          </NCheckbox>

          <ent-button size="small" type="default" @click="reset">
            {{ t('common.resetText') }}
          </ent-button>
        </div>
        <EntScrollContainer>
          <NCheckboxGroup ref="columnListRef" v-model:value="checkedList" @change="onChange">
            <template v-for="item in plainOptions" :key="item.value">
              <div v-if="!('ifShow' in item && !item.ifShow)" :class="`${prefixCls}__check-item`">
                <NSpace justify="space-between">
                  <EntIcon icon="ant-design:drag-outlined" class="table-column-drag-icon" />
                  <NCheckbox :value="item.value">
                    {{ item.label }}
                  </NCheckbox>
                </NSpace>
                <NSpace justify="end">
                  <NTooltip placement="bottom-start" :mouse-leave-delay="0.4">
                    <template #trigger>
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
                    </template>
                    {{ t('component.table.settingFixedLeft') }}
                  </NTooltip>
                  <NDivider type="vertical" :vertical="true" />
                  <NTooltip placement="bottom-start" :mouse-leave-delay="0.4">
                    <template #trigger>
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
                    </template>
                    {{ t('component.table.settingFixedRight') }}
                  </NTooltip>
                </NSpace>
              </div>
            </template>
          </NCheckboxGroup>
        </EntScrollContainer>
      </NPopover>
    </template>
    <span>{{ t('component.table.settingColumn') }}</span>
  </NTooltip>
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
  import { NCheckbox, NCheckboxGroup, NDivider, NPopover, NSpace, NTooltip } from 'naive-ui';
  import { cloneDeep, omit } from 'lodash-es';
  import sortablejs from 'sortablejs';
  import { EntIcon } from '../../../../../components/icon';
  import { EntScrollContainer } from '../../../../../components/container';
  import { useI18n } from '../../../../../hooks/web/use-i18n';
  import { useDesign } from '../../../../../hooks/web/use-design';
  import { isNullAndUnDef } from '../../../../../utils/is';
  import { useTableContext } from '../../hooks/use-table-context';
  import type { BasicColumn, BasicTableProps, ColumnChangeParam } from '../../types/table';
  import type Sortable from 'sortablejs';
  import type { DataTableRowKey } from 'naive-ui';
  interface State {
    checkAll: boolean;
    isInit?: boolean;
    checkedList: DataTableRowKey[];
    defaultCheckList: DataTableRowKey[];
  }

  export default defineComponent({
    name: 'ColumnSetting',
    components: {
      NPopover,
      NTooltip,
      NCheckbox,
      NCheckboxGroup,
      NSpace,
      EntScrollContainer,
      NDivider,
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

      const cachePlainOptions = ref<BasicColumn[]>([]);
      const plainOptions = ref<BasicColumn[] | any>([]);

      const plainSortOptions = ref<BasicColumn[]>([]);

      const columnListRef = ref(null);

      const state = reactive<State>({
        checkAll: true,
        checkedList: [],
        defaultCheckList: [],
      });
      /** 缓存初始化props */
      let cacheTableProps: Partial<BasicTableProps> = {};
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
        const ret: BasicColumn[] = [];
        table.getColumns({ ignoreIndex: true, ignoreAction: true }).forEach((item) => {
          ret.push(item);
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
            return item.key || item.title;
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
      function onCheckAllChange(checked: boolean) {
        if (checked) {
          const checkList = plainSortOptions.value.map((item) => item.key);
          plainSortOptions.value.forEach(
            (item) => ((item as BasicColumn).defaultHidden = !checked),
          );
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
      function onChange(checkedList: DataTableRowKey[]) {
        const len = plainSortOptions.value.length;
        state.checkAll = checkedList.length === len;
        const sortList = unref(plainSortOptions).map((item) => item.key);
        checkedList.sort((prev, next) => {
          return sortList.indexOf(prev) - sortList.indexOf(next);
        });
        unref(plainSortOptions).forEach((item) => {
          (item as BasicColumn).defaultHidden = !checkedList.includes(item.key);
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
              setColumns(columns.filter((item) => state.checkedList.includes(item.key)));
            },
          });
          // 记录原始order 序列
          sortableOrder = sortable.toArray();
          inited = true;
        });
      }

      // Control whether the serial number column is displayed
      function handleIndexCheckChange(checked: boolean) {
        isSetPropsFromThis = true;
        isSetColumnsFromThis = true;
        table.setProps({
          showIndexColumn: checked,
        });
      }

      // Control whether the check box is displayed
      function handleSelectCheckChange(checked: boolean) {
        isSetPropsFromThis = true;
        isSetColumnsFromThis = true;
        table.setProps({
          rowSelection: checked ? defaultRowSelection : undefined,
        });
      }

      function handleColumnFixed(item: BasicColumn, fixed: 'left' | 'right') {
        if (!state.checkedList.includes(item.key as string)) return;

        const columns = getColumns().filter((c: BasicColumn) =>
          state.checkedList.includes(c.key as string),
        ) as BasicColumn[];
        const isFixed = item.fixed === fixed ? false : fixed;
        const index = columns.findIndex((col) => col.key === item.key);
        if (index !== -1) {
          columns[index].fixed = item.fixed;
        }
        item.fixed = fixed;

        if (isFixed && !item.width) {
          item.width = 100;
        }
        updateSortOption(item);
        table.setCacheColumnsByField?.(item.key as string, { fixed });
        setColumns(columns);
      }

      function setColumns(columns: BasicColumn[] | DataTableRowKey[]) {
        isSetPropsFromThis = true;
        isSetColumnsFromThis = true;
        table.setColumns(columns);
        const data: ColumnChangeParam[] = unref(plainSortOptions).map((col) => {
          const visible =
            columns.findIndex(
              (c: BasicColumn | DataTableRowKey) =>
                c === col.key ||
                ((typeof c !== 'string' || typeof c !== 'number') && c === col.key),
            ) !== -1;
          return { key: col.key as string, fixed: col.fixed, visible };
        });

        emit('columns-change', data);
      }

      function updateSortOption(column: BasicColumn) {
        plainSortOptions.value.forEach((item) => {
          if (item.key === column.key) {
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
      };
    },
  });
</script>

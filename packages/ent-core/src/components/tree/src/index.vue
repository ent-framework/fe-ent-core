<script lang="tsx">
  import { computed, defineComponent, reactive, ref, toRaw, unref, watch, watchEffect } from 'vue';
  import { NDropdown, NSpin, NTree } from 'naive-ui';
  import { cloneDeep, omit } from 'lodash-es';
  import { EntScrollContainer } from '../../container';
  import { isFunction } from '../../../utils/is';
  import { extendSlots } from '../../../utils';

  import { useContextMenu, useDesign } from '../../../hooks';

  import { useTree } from './hooks/use-tree';
  import { TreeIcon } from './tree-icon';
  import TreeHeader from './components/tree-header.vue';
  import { basicTreeProps, treeEmits } from './types/tree';
  import type { ContextMenuItem, CreateContextOptions } from '../../context-menu/src/typing';
  import type { FieldNames, KeyType, TreeActionType, TreeItem, TreeState } from './types/tree';
  import type { DropdownOption, TreeOption, TreeProps } from 'naive-ui';
  import type { Recordable } from '../../../types';
  import type { CSSProperties } from 'vue';

  export default defineComponent({
    name: 'EntTree',
    components: { NTree, EntScrollContainer, TreeIcon },
    extends: NTree,
    inheritAttrs: false,
    props: basicTreeProps,
    emits: treeEmits,
    setup(props, { attrs, slots, emit, expose }) {
      const { prefixCls } = useDesign('basic-tree');
      const state = reactive<TreeState>({
        cascade: props.cascade,
        expandedKeys: props.expandedKeys || [],
        selectedKeys: props.selectedKeys || [],
        checkedKeys: props.checkedKeys || []
      });

      const showDropdownRef = ref(false);
      const xRef = ref(0);
      const yRef = ref(0);

      const searchState = reactive({
        startSearch: false,
        searchText: '',
        searchData: [] as TreeItem[]
      });

      const treeDataRef = ref<TreeItem[]>([]);

      const [createContextMenu] = useContextMenu();

      const getFieldNames = computed((): Required<FieldNames> => {
        const { keyField, labelField, childrenField, disabledField } = props;
        return {
          children: childrenField,
          label: labelField,
          key: keyField,
          disabled: disabledField
        };
      });

      const getBindValues = computed((): TreeProps => {
        const propsData = {
          ...attrs,
          ...props,
          blockNode: true,
          expandedKeys: state.expandedKeys,
          selectedKeys: state.selectedKeys,
          checkedKeys: state.checkedKeys,
          cascade: state.cascade,
          pattern: searchState.searchText,
          'onUpdate:expandedKeys': (
            value: KeyType[],
            option: Array<TreeItem | null>,
            meta: { node: TreeItem | null; action: 'expand' | 'collapse' | 'filter' }
          ) => {
            state.expandedKeys = value;
            emit('update:expandedKeys', value, option, meta);
          },
          'on-update:checked-keys': (
            value: KeyType[],
            option: Array<TreeItem | null>,
            meta: {
              node: TreeItem | null;
              action: 'check' | 'uncheck';
            }
          ) => {
            state.checkedKeys = value;
            emit('update:checkedKeys', value, option, meta);
          },
          'onUpdate:selectedKeys': (
            value: KeyType[],
            option: Array<TreeItem | null>,
            meta: {
              node: TreeItem | null;
              action: 'select' | 'unselect';
            }
          ) => {
            state.selectedKeys = value;
            emit('update:selectedKeys', value, option, meta);
          },
          onRightClick: handleRightClick
        };
        return omit(propsData, 'data', 'class');
      });

      const getTreeData = computed((): TreeItem[] =>
        searchState.startSearch ? searchState.searchData : unref(treeDataRef)
      );
      const {
        deleteNodeByKey,
        insertNodeByKey,
        insertNodesByKey,
        filterByLevel,
        updateNodeByKey,
        getAllKeys,
        // getChildrenKeys,
        getEnabledKeys,
        getSelectedNode
      } = useTree(treeDataRef, getFieldNames);

      // function getIcon(params: Recordable, icon?: string) {
      //   if (!icon) {
      //     if (props.renderIcon && isFunction(props.renderIcon)) {
      //       return props.renderIcon(params);
      //     }
      //   }
      //   return icon;
      // }

      async function handleRightClick({ event, node }: Recordable) {
        const { rightMenuList: menuList = [], beforeRightClick } = props;
        const contextMenuOptions: CreateContextOptions = { event, items: [] };

        if (beforeRightClick && isFunction(beforeRightClick)) {
          const result = await beforeRightClick(node, event);
          if (Array.isArray(result)) {
            contextMenuOptions.items = result;
          } else {
            Object.assign(contextMenuOptions, result);
          }
        } else {
          contextMenuOptions.items = menuList;
        }
        if (!contextMenuOptions.items?.length) return;
        contextMenuOptions.items = contextMenuOptions.items.filter((item) => !item.hidden);
        createContextMenu(contextMenuOptions);
      }

      function setExpandedKeys(keys: KeyType[]) {
        state.expandedKeys = keys;
      }

      function getExpandedKeys() {
        return state.expandedKeys || [];
      }
      function setSelectedKeys(keys: KeyType[]) {
        state.selectedKeys = keys;
      }

      function getSelectedKeys() {
        return state.selectedKeys || [];
      }

      function setCheckedKeys(keys: KeyType[]) {
        state.checkedKeys = keys;
      }

      function getCheckedKeys() {
        return state.checkedKeys || [];
      }

      function checkAll(checkAll: boolean) {
        state.checkedKeys = checkAll ? getEnabledKeys() : ([] as KeyType[]);
        emit('check-all', state.checkedKeys);
      }

      function expandAll(expandAll: boolean) {
        state.expandedKeys = expandAll ? getAllKeys() : ([] as KeyType[]);
      }

      function onStrictlyChange(strictly: boolean) {
        state.cascade = strictly;
      }

      watch(
        () => props.pattern,
        (val) => {
          if (val !== searchState.searchText) {
            searchState.searchText = val;
          }
        },
        {
          immediate: true
        }
      );

      // watch(
      //   () => props.data,
      //   (val) => {
      //     if (val) {
      //       handleSearch(searchState.searchText);
      //     }
      //   },
      // );

      // function handleSearch(searchValue: string) {
      //   if (searchValue !== searchState.searchText) searchState.searchText = searchValue;
      //   emit('update:searchValue', searchValue);
      //   if (!searchValue) {
      //     searchState.startSearch = false;
      //     return;
      //   }
      //   const { filterFn, checkable, expandOnSearch, checkOnSearch, selectedOnSearch } =
      //     unref(props);
      //   searchState.startSearch = true;
      //   const { label: titleField, key: keyField } = unref(getFieldNames);

      //   const matchedKeys: string[] = [];
      //   searchState.searchData = filter(
      //     unref(treeDataRef),
      //     (node) => {
      //       const result = filterFn
      //         ? filterFn(searchValue, node, unref(getFieldNames))
      //         : node[titleField]?.includes(searchValue) ?? false;
      //       if (result) {
      //         matchedKeys.push(node[keyField]);
      //       }
      //       return result;
      //     },
      //     unref(getFieldNames),
      //   );

      //   if (expandOnSearch) {
      //     const expandKeys = treeToList(searchState.searchData).map((val) => {
      //       return val[keyField];
      //     });
      //     if (expandKeys && expandKeys.length) {
      //       setExpandedKeys(expandKeys);
      //     }
      //   }

      //   if (checkOnSearch && checkable && matchedKeys.length) {
      //     setCheckedKeys(matchedKeys);
      //   }

      //   if (selectedOnSearch && matchedKeys.length) {
      //     setSelectedKeys(matchedKeys);
      //   }
      // }

      watchEffect(() => {
        treeDataRef.value = props.data as TreeItem[];
      });

      // onMounted(() => {
      //   const level = isNumber(props.defaultExpandLevel)
      //     ? props.defaultExpandLevel
      //     : Number.parseInt(props.defaultExpandLevel);
      //   if (level > 0) {
      //     state.expandedKeys = filterByLevel(level);
      //   } else if (props.defaultExpandAll) {
      //     expandAll(true);
      //   }
      // });

      watchEffect(() => {
        state.expandedKeys = props.expandedKeys;
      });

      watchEffect(() => {
        state.selectedKeys = props.selectedKeys;
      });

      watchEffect(() => {
        state.checkedKeys = props.checkedKeys;
      });

      // watch(
      //   () => props.value,
      //   () => {
      //     state.checkedKeys = toRaw(props.value || []);
      //   },
      //   { immediate: true },
      // );

      watch(
        () => state.checkedKeys,
        () => {
          const v = toRaw(state.checkedKeys);
          emit('update:value', v);
          emit('change', v);
        }
      );

      watchEffect(() => {
        state.cascade = props.cascade;
      });

      const instance: TreeActionType = {
        setExpandedKeys,
        getExpandedKeys,
        setSelectedKeys,
        getSelectedKeys,
        setCheckedKeys,
        getCheckedKeys,
        insertNodeByKey,
        insertNodesByKey,
        deleteNodeByKey,
        updateNodeByKey,
        getSelectedNode,
        checkAll,
        expandAll,
        filterByLevel: (level: number) => {
          state.expandedKeys = filterByLevel(level);
        },
        setSearchValue: (value: string) => {
          //handleSearch(value);
        },
        getSearchValue: () => {
          return searchState.searchText;
        }
      };

      const treeData = computed((): TreeItem[] => {
        const data = cloneDeep(getTreeData.value);
        return data;
      });

      function handleSelect() {
        showDropdownRef.value = false;
      }
      function handleClickoutside() {
        showDropdownRef.value = false;
      }

      const contentMenuEnabled = computed(() => {
        const { rightMenuList = [] } = props;
        return rightMenuList.length > 0;
      });

      const optionsRef = ref<DropdownOption>();

      const dropdownOptions = computed(() => {
        const { rightMenuList = [], beforeRightClick } = props;
        const menuList: ContextMenuItem[] = [];
        if (beforeRightClick && isFunction(beforeRightClick)) {
          const result = beforeRightClick(optionsRef.value, event);
          if (Array.isArray(result)) {
            menuList.push(...result);
          } else {
            menuList.push(result);
          }
        } else {
          menuList.push(...rightMenuList);
        }
        // menuList.filter((item) => !item.hidden);
        const items: DropdownOption[] = [];

        return items;
      });

      expose(instance);

      return () => {
        const { title, helpMessage, toolbar, search, checkable, nodeProps } = props;
        const showTitle = title || toolbar || search || slots.headerTitle;
        const scrollStyle: CSSProperties = { height: 'calc(100% - 38px)' };

        const nodePropsWithContextMenu = (info: { option: TreeOption }) => {
          const result = nodeProps ? nodeProps?.(info) : {};
          if (contentMenuEnabled.value) {
            return {
              onClick() {
                console.log(`[Click] ${info.option.label}`);
              },
              onContextmenu(e: MouseEvent) {
                showDropdownRef.value = true;
                xRef.value = e.clientX;
                yRef.value = e.clientY;
                console.log(e.clientX, e.clientY);
                e.preventDefault();
                optionsRef.value = info.option;
              },
              ...result
            };
          }
          return result;
        };

        return (
          <div class={[prefixCls, 'h-full', attrs.class]}>
            {showTitle && (
              <TreeHeader
                checkable={checkable}
                checkAll={checkAll}
                expandAll={expandAll}
                title={title}
                search={search}
                toolbar={toolbar}
                helpMessage={helpMessage}
                onChange={onStrictlyChange}
                searchText={searchState.searchText}
              >
                {extendSlots(slots)}
              </TreeHeader>
            )}
            <NSpin
              contentClass={unref(props.treeWrapperClassName)}
              show={unref(props.loading)}
              description="加载中..."
            >
              <EntScrollContainer style={scrollStyle}>
                <NTree
                  {...unref(getBindValues)}
                  nodeProps={nodePropsWithContextMenu}
                  data={treeData.value}
                />
              </EntScrollContainer>
            </NSpin>
            {contentMenuEnabled.value && (
              <NDropdown
                v-if={contentMenuEnabled}
                trigger="manual"
                placement="bottom-start"
                show={unref(showDropdownRef)}
                options={unref(dropdownOptions)}
                x={xRef.value}
                y={yRef.value}
                onSelect={handleSelect}
                onClickoutside={handleClickoutside}
              ></NDropdown>
            )}
          </div>
        );
      };
    }
  });
</script>

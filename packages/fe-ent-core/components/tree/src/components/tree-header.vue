<template>
  <div class="flex px-2 py-1.5 items-center basic-tree-header">
    <slot v-if="slots.headerTitle" name="headerTitle" />
    <EntTitle v-if="!$slots.headerTitle && title" :help-message="helpMessage">
      {{ title }}
    </EntTitle>

    <div
      v-if="search || toolbar"
      class="flex items-center flex-1 cursor-pointer justify-self-stretch"
    >
      <div v-if="search" :class="getInputSearchCls">
        <InputSearch
          v-model:value="searchValue"
          :placeholder="t('common.searchText')"
          size="small"
          allow-clear
        />
      </div>
      <Dropdown v-if="toolbar" @click.prevent>
        <EntIcon icon="ion:ellipsis-vertical" />
        <template #overlay>
          <Menu @click="handleMenuClick">
            <template v-for="item in toolbarList" :key="item.value">
              <MenuItem v-bind="{ key: item.value }">
                {{ item.label }}
              </MenuItem>
              <MenuDivider v-if="item.divider" />
            </template>
          </Menu>
        </template>
      </Dropdown>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { type PropType, computed, ref, useSlots, watch } from 'vue';
  import { Dropdown, InputSearch, Menu, MenuDivider, MenuItem } from 'ant-design-vue';
  import { useDebounceFn } from '@vueuse/core';
  import { EntIcon } from '@ent-core/components/icon';
  import { EntTitle } from '@ent-core/components/basic';
  import { useI18n } from '@ent-core//hooks/web/use-i18n';
  import { ToolbarEnum } from '../types/tree';

  const searchValue = ref('');

  const props = defineProps({
    helpMessage: {
      type: [String, Array] as PropType<string | string[]>,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    toolbar: {
      type: Boolean,
      default: false,
    },
    checkable: {
      type: Boolean,
      default: false,
    },
    search: {
      type: Boolean,
      default: false,
    },
    searchText: {
      type: String,
      default: '',
    },
    checkAll: {
      type: Function,
      default: undefined,
    },
    expandAll: {
      type: Function,
      default: undefined,
    },
  } as const);
  const emit = defineEmits(['change', 'search']);

  const slots = useSlots();
  const { t } = useI18n();

  const getInputSearchCls = computed(() => {
    const titleExists = slots.headerTitle || props.title;
    return [
      'mr-1',
      'w-full',
      {
        ['ml-5']: titleExists,
      },
    ];
  });

  const toolbarList = computed(() => {
    const { checkable } = props;
    const defaultToolbarList = [
      { label: t('component.tree.expandAll'), value: ToolbarEnum.EXPAND_ALL },
      {
        label: t('component.tree.unExpandAll'),
        value: ToolbarEnum.UN_EXPAND_ALL,
        divider: checkable,
      },
    ];

    return checkable
      ? [
          { label: t('component.tree.selectAll'), value: ToolbarEnum.SELECT_ALL },
          {
            label: t('component.tree.unSelectAll'),
            value: ToolbarEnum.UN_SELECT_ALL,
            divider: checkable,
          },
          ...defaultToolbarList,
        ]
      : defaultToolbarList;
  });

  function handleMenuClick(e: { key: ToolbarEnum }) {
    const { key } = e;
    switch (key) {
      case ToolbarEnum.SELECT_ALL:
        props.checkAll?.(true);
        break;
      case ToolbarEnum.UN_SELECT_ALL:
        props.checkAll?.(false);
        break;
      case ToolbarEnum.EXPAND_ALL:
        props.expandAll?.(true);
        break;
      case ToolbarEnum.UN_EXPAND_ALL:
        props.expandAll?.(false);
        break;
      // CHECK_STRICTLY 选取有bug，暂时注释掉
      // case ToolbarEnum.CHECK_STRICTLY:
      //   emit('change', false);
      //   break;
      // case ToolbarEnum.CHECK_UN_STRICTLY:
      //   emit('change', true);
      //   break;
    }
  }

  function emitChange(value?: string): void {
    emit('search', value);
  }

  const debounceEmitChange = useDebounceFn(emitChange, 200);

  watch(
    () => searchValue.value,
    (v) => {
      debounceEmitChange(v);
    },
  );

  watch(
    () => props.searchText,
    (v) => {
      if (v !== searchValue.value) {
        searchValue.value = v;
      }
    },
  );
</script>

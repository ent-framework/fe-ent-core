<template>
  <Input
    disabled
    :style="{ width }"
    :placeholder="t('component.icon.placeholder')"
    :class="prefixCls"
    v-model:value="currentSelect"
  >
    <template #addonAfter>
      <Popover
        placement="bottomLeft"
        trigger="click"
        v-model="visible"
        :overlayClassName="`${prefixCls}-popover`"
      >
        <template #title>
          <div class="flex justify-between">
            <Input
              :placeholder="t('component.icon.search')"
              @change="debounceHandleSearchChange"
              allowClear
            />
          </div>
        </template>

        <template #content>
          <div v-if="getPaginationList.length">
            <EntScrollContainer class="border border-solid border-t-0">
              <ul class="flex flex-wrap px-2">
                <li
                  v-for="icon in getPaginationList"
                  :key="icon"
                  :class="currentSelect === icon ? 'border border-primary' : ''"
                  class="p-2 w-1/8 cursor-pointer mr-1 mt-1 flex justify-center items-center border border-solid hover:border-primary"
                  @click="handleClick(icon)"
                  :title="icon"
                >
                  <!-- <Icon :icon="icon" :prefix="prefix" /> -->
                  <SvgIcon v-if="isSvgMode" :name="icon" />
                  <Icon :icon="icon" v-else />
                </li>
              </ul>
            </EntScrollContainer>
            <div class="flex py-2 items-center justify-center" v-if="getTotal >= pageSize">
              <Pagination
                showLessItems
                size="small"
                :pageSize="pageSize"
                :total="getTotal"
                @change="handlePageChange"
              />
            </div>
          </div>
          <template v-else
            ><div class="p-5"><Empty /></div>
          </template>
        </template>

        <span class="cursor-pointer px-2 py-1 flex items-center" v-if="isSvgMode && currentSelect">
          <SvgIcon :name="currentSelect" />
        </span>
        <Icon :icon="currentSelect || 'ion:apps-outline'" class="cursor-pointer px-2 py-1" v-else />
      </Popover>
    </template>
  </Input>
</template>
<script lang="ts">
  import { ref, watchEffect, watch, unref, defineComponent } from 'vue';
  import { useDesign } from '@ent-core/hooks/web/use-design';
  import { EntScrollContainer } from '@ent-core/components/container';
  import { Input, Popover, Pagination, Empty } from 'ant-design-vue';
  import Icon from './icon.vue';
  import SvgIcon from './svg-icon.vue';

  import iconsData from '../data/icons-data';
  import { propTypes } from '@ent-core/utils/prop-types';
  import { usePagination } from '@ent-core/hooks/web/use-pagination';
  import { useDebounceFn } from '@vueuse/core';
  import { useI18n } from '@ent-core/hooks/web/use-i18n';
  import { useCopyToClipboard } from '@ent-core/hooks/web/use-copy-to-clipboard';
  import { useMessage } from '@ent-core/hooks/web/use-message';
  //import svgIcons from 'virtual:svg-icons-names';

  const svgIcons = [
    'icon-download-count',
    'icon-dynamic-avatar-1',
    'icon-dynamic-avatar-2',
    'icon-dynamic-avatar-3',
    'icon-dynamic-avatar-4',
    'icon-dynamic-avatar-5',
    'icon-dynamic-avatar-6',
    'icon-moon',
    'icon-sun',
    'icon-test',
    'icon-total-sales',
    'icon-transaction',
    'icon-visit-count',
  ];

  function getIcons() {
    const data = iconsData as any;
    const prefix: string = data?.prefix ?? '';
    let result: string[] = [];
    if (prefix) {
      result = (data?.icons ?? []).map((item) => `${prefix}:${item}`);
    } else if (Array.isArray(iconsData)) {
      result = iconsData as string[];
    }
    return result;
  }

  function getSvgIcons() {
    return svgIcons.map((icon) => icon.replace('icon-', ''));
  }

  export default defineComponent({
    name: 'EntIconPicker',
    components: {
      EntScrollContainer,
      Input,
      Popover,
      Pagination,
      Empty,
      Icon,
      SvgIcon,
    },
    props: {
      value: propTypes.string,
      width: propTypes.string.def('100%'),
      pageSize: propTypes.number.def(140),
      copy: propTypes.bool.def(false),
      mode: propTypes.oneOf(['svg', 'iconify']).def('iconify'),
    },
    emits: ['change', 'update:value'],
    setup(props, { emit }) {
      const isSvgMode = props.mode === 'svg';
      const icons = isSvgMode ? getSvgIcons() : getIcons();

      const currentSelect = ref('');
      const visible = ref(false);
      const currentList = ref(icons);

      const { t } = useI18n();
      const { prefixCls } = useDesign('icon-picker');

      const debounceHandleSearchChange = useDebounceFn(handleSearchChange, 100);
      const { clipboardRef, isSuccessRef } = useCopyToClipboard(props.value);
      const { createMessage } = useMessage();

      const { getPaginationList, getTotal, setCurrentPage } = usePagination(
        currentList,
        props.pageSize,
      );

      watchEffect(() => {
        currentSelect.value = props.value;
      });

      watch(
        () => currentSelect.value,
        (v) => {
          emit('update:value', v);
          return emit('change', v);
        },
      );

      function handlePageChange(page: number) {
        setCurrentPage(page);
      }

      function handleClick(icon: string) {
        currentSelect.value = icon;
        if (props.copy) {
          clipboardRef.value = icon;
          if (unref(isSuccessRef)) {
            createMessage.success(t('component.icon.copy'));
          }
        }
      }

      function handleSearchChange(e: ChangeEvent) {
        const value = e.target.value;
        if (!value) {
          setCurrentPage(1);
          currentList.value = icons;
          return;
        }
        currentList.value = icons.filter((item) => item.includes(value));
      }
      return {
        prefixCls,
        currentSelect,
        visible,
        debounceHandleSearchChange,
        getPaginationList,
        getTotal,
        handleClick,
        isSvgMode,
        handlePageChange,
        t,
      };
    },
  });
</script>

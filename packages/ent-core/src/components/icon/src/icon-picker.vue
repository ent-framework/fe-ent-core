<template>
  <NInput
    v-model:value="currentSelect"
    disabled
    :style="{ width }"
    :placeholder="t('component.icon.placeholder')"
    :class="prefixCls"
  >
    <template #suffix>
      <NPopover :content-class="`${prefixCls}-popover`">
        <template #trigger>
          <Icon :icon="currentSelect || 'ion:apps-outline'" class="cursor-pointer" />
        </template>
        <template #header>
          <div class="flex justify-between">
            <NInput
              :value="currentSearchText"
              :placeholder="t('component.icon.search')"
              clearable
              @update:value="handleSearchChange"
            />
          </div>
        </template>
        <div v-if="getPaginationList.length">
          <EntScrollContainer class="border border-solid border-t-0">
            <ul class="flex flex-wrap px-2">
              <li
                v-for="icon in getPaginationList"
                :key="icon"
                :class="currentSelect === icon ? 'border border-primary border-solid' : ''"
                class="w-1/8 cursor-pointer flex justify-center items-center"
                :title="icon"
                @click="handleClick(icon)"
              >
                <span class="p-1 hover:border-primary items-center">
                  <Icon :icon="icon" :size="30" />
                </span>
              </li>
            </ul>
          </EntScrollContainer>
          <NFlex>
            <div v-if="getTotal >= pageSize" class="flex py-2 items-center justify-center">
              <NPagination
                size="small"
                :page-slot="6"
                :page-sizes="[40, 80, 120]"
                :page-size="pageSize"
                :item-count="getTotal"
                @update:page="handlePageChange"
              />
            </div>
          </NFlex>
        </div>
        <template v-else>
          <div class="p-5"><NEmpty /></div>
        </template>
      </NPopover>
    </template>
  </NInput>
</template>
<script lang="ts">
  import { defineComponent, ref, unref, watch, watchEffect } from 'vue';
  import { NEmpty, NFlex, NInput, NPagination, NPopover } from 'naive-ui';
  import { useDesign } from '../../../hooks/web/use-design';
  import { EntScrollContainer } from '../../../components/container';

  import { propTypes } from '../../../utils/prop-types';
  import { usePagination } from '../../../hooks/web/use-pagination';
  import { useI18n } from '../../../hooks/web/use-i18n';
  import { useCopyToClipboard } from '../../../hooks/web/use-copy-to-clipboard';
  import { useMessage } from '../../../hooks/web/use-message';
  import { useIconData } from './use-icon-data';
  import Icon from './icon.vue';

  export default defineComponent({
    name: 'EntIconPicker',
    components: {
      EntScrollContainer,
      Icon,
      NEmpty,
      NInput,
      NPopover,
      NPagination,
      NFlex,
    },
    props: {
      value: propTypes.string,
      width: propTypes.string.def('100%'),
      pageSize: propTypes.number.def(40),
      copy: propTypes.bool.def(false),
    },
    emits: ['change', 'update:value'],
    setup(props, { emit }) {
      const { getIconData } = useIconData();
      const icons = Array.from(getIconData().keys());

      const currentSelect = ref('');
      const currentSearchText = ref('');
      const currentList = ref(icons);

      const { t } = useI18n();
      const { prefixCls } = useDesign('icon-picker');
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

      function handleSearchChange(value: string) {
        currentSearchText.value = value;
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
        currentSearchText,
        handleSearchChange,
        getPaginationList,
        getTotal,
        handleClick,
        handlePageChange,
        t,
      };
    },
  });
</script>

<template>
  <Input
    v-model:value="currentSelect"
    disabled
    :style="{ width }"
    :placeholder="t('component.icon.placeholder')"
    :class="prefixCls"
  >
    <template #addonAfter>
      <Popover
        v-model="visible"
        placement="bottomLeft"
        trigger="click"
        :overlay-class-name="`${prefixCls}-popover`"
      >
        <template #title>
          <div class="flex justify-between">
            <Input
              :placeholder="t('component.icon.search')"
              allow-clear
              @change="debounceHandleSearchChange"
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
                  :title="icon"
                  @click="handleClick(icon)"
                >
                  <Icon :icon="icon" />
                </li>
              </ul>
            </EntScrollContainer>
            <div v-if="getTotal >= pageSize" class="flex py-2 items-center justify-center">
              <Pagination
                show-less-items
                size="small"
                :page-size="pageSize"
                :total="getTotal"
                @change="handlePageChange"
              />
            </div>
          </div>
          <template v-else
            ><div class="p-5"><Empty /></div>
          </template>
        </template>

        <Icon :icon="currentSelect || 'ion:apps-outline'" class="cursor-pointer px-2 py-1" />
      </Popover>
    </template>
  </Input>
</template>
<script lang="ts">
  import { defineComponent, ref, unref, watch, watchEffect } from 'vue';
  import { Empty, Input, Pagination, Popover } from 'ant-design-vue';
  import { useDebounceFn } from '@vueuse/shared';
  import { useDesign } from '@ent-core/hooks/web/use-design';
  import { EntScrollContainer } from '@ent-core/components/container';

  import { propTypes } from '@ent-core/utils/prop-types';
  import { usePagination } from '@ent-core/hooks/web/use-pagination';
  import { useI18n } from '@ent-core/hooks/web/use-i18n';
  import { useCopyToClipboard } from '@ent-core/hooks/web/use-copy-to-clipboard';
  import { useMessage } from '@ent-core/hooks/web/use-message';
  import iconsData from '../data/icons-data';
  import Icon from './icon.vue';
  import type { ChangeEvent } from '@ent-core/types';

  export default defineComponent({
    name: 'EntIconPicker',
    components: {
      EntScrollContainer,
      Input,
      Popover,
      Pagination,
      Empty,
      Icon,
    },
    props: {
      value: propTypes.string,
      width: propTypes.string.def('100%'),
      pageSize: propTypes.number.def(140),
      copy: propTypes.bool.def(false),
    },
    emits: ['change', 'update:value'],
    setup(props, { emit }) {
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

      const icons = getIcons();

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
        handlePageChange,
        t,
      };
    },
  });
</script>

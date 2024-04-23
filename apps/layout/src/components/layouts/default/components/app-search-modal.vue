<template>
  <Teleport to="body">
    <transition name="zoom-fade" mode="out-in">
      <div v-if="visible" :class="getClass" @click.stop>
        <div v-click-outside="handleClose" :class="`${prefixCls}-content`">
          <div :class="`${prefixCls}-input__wrapper`">
            <NInput
              ref="inputRef"
              :class="`${prefixCls}-input`"
              :placeholder="t('common.searchText')"
              clearable
              @update:value="handleSearch"
            >
              <template #prefix>
                <EntIcon icon="ant-design:search-outlined" />
              </template>
            </NInput>
            <span :class="`${prefixCls}-cancel`" @click="handleClose">
              {{ t('common.cancelText') }}
            </span>
          </div>

          <div v-show="getIsNotData" :class="`${prefixCls}-not-data`">
            {{ t('component.app.searchNotData') }}
          </div>

          <ul v-show="!getIsNotData" ref="scrollWrap" :class="`${prefixCls}-list`">
            <li
              v-for="(item, index) in searchResult"
              :ref="setRefs(index)"
              :key="item.path"
              :data-index="index"
              :class="[
                `${prefixCls}-list__item`,
                {
                  [`${prefixCls}-list__item--active`]: activeIndex === index
                }
              ]"
              @mouseenter="handleMouseenter"
              @click="handleEnter"
            >
              <div :class="`${prefixCls}-list__item-icon`">
                <EntIcon :icon="item.icon || 'mdi:form-select'" :size="20" />
              </div>
              <div :class="`${prefixCls}-list__item-text`">
                {{ item.name }}
              </div>
              <div :class="`${prefixCls}-list__item-enter`">
                <EntIcon icon="ant-design:enter-outlined" :size="20" />
              </div>
            </li>
          </ul>
          <AppSearchFooter />
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script lang="ts" setup>
  import { computed, nextTick, ref, unref, watch } from 'vue';
  import { EntIcon } from 'fe-ent-core';
  import { NInput } from 'naive-ui';
  import { useAppInject, useDesign, useI18n, useRefs } from 'fe-ent-core/es/hooks';
  import { vClickOutside } from 'fe-ent-core/es/directives';
  import { useMenuSearch } from './use-menu-search';
  import AppSearchFooter from './app-search-footer.vue';
  import type { Nullable } from 'fe-ent-core/es/types';

  const props = defineProps({
    visible: { type: Boolean }
  });

  const emit = defineEmits(['close']);

  const scrollWrap = ref(null);
  const inputRef = ref<Nullable<HTMLElement>>(null);

  const { t } = useI18n();
  const { prefixCls } = useDesign('app-search-modal');
  const [refs, setRefs] = useRefs();
  const { getIsMobile } = useAppInject();

  const handleCloseCallback = () => {
    emit('close');
  };

  const { handleSearch, searchResult, keyword, activeIndex, handleEnter, handleMouseenter } =
    useMenuSearch(refs, scrollWrap, handleCloseCallback);

  const getIsNotData = computed(() => !keyword || unref(searchResult).length === 0);

  const getClass = computed(() => {
    return [
      prefixCls,
      {
        [`${prefixCls}--mobile`]: unref(getIsMobile)
      }
    ];
  });

  watch(
    () => props.visible,
    (visible: boolean) => {
      visible &&
        nextTick(() => {
          unref(inputRef)?.focus();
        });
    }
  );

  function handleClose() {
    searchResult.value = [];
    emit('close');
  }
</script>

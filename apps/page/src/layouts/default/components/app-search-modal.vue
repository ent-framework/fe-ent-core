<template>
  <Teleport to="body">
    <transition name="zoom-fade" mode="out-in">
      <div :class="getClass" @click.stop v-if="visible">
        <div :class="`${prefixCls}-content`" v-click-outside="handleClose">
          <div :class="`${prefixCls}-input__wrapper`">
            <a-input
              :class="`${prefixCls}-input`"
              :placeholder="t('common.searchText')"
              ref="inputRef"
              allow-clear
              @change="handleSearch"
            >
              <template #prefix>
                <SearchOutlined />
              </template>
            </a-input>
            <span :class="`${prefixCls}-cancel`" @click="handleClose">
              {{ t('common.cancelText') }}
            </span>
          </div>

          <div :class="`${prefixCls}-not-data`" v-show="getIsNotData">
            {{ t('component.app.searchNotData') }}
          </div>

          <ul :class="`${prefixCls}-list`" v-show="!getIsNotData" ref="scrollWrap">
            <li
              :ref="setRefs(index)"
              v-for="(item, index) in searchResult"
              :key="item.path"
              :data-index="index"
              @mouseenter="handleMouseenter"
              @click="handleEnter"
              :class="[
                `${prefixCls}-list__item`,
                {
                  [`${prefixCls}-list__item--active`]: activeIndex === index,
                },
              ]"
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
  import { computed, unref, ref, watch, nextTick } from 'vue';
  import { SearchOutlined } from '@ant-design/icons-vue';
  import AppSearchFooter from './app-search-footer.vue';
  import { EntIcon } from 'fe-ent-core/lib/components';
  // @ts-ignore
  import { ClickOutside } from 'fe-ent-core/lib/directives';
  import { useDesign } from 'fe-ent-core/lib/hooks';
  import { useRefs } from 'fe-ent-core/lib/hooks';
  import { useMenuSearch } from './use-menu-search';
  import { useI18n } from 'fe-ent-core/lib/hooks';
  import { useAppInject } from 'fe-ent-core/lib/hooks';

  const props = defineProps({
    visible: { type: Boolean },
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
        [`${prefixCls}--mobile`]: unref(getIsMobile),
      },
    ];
  });

  watch(
    () => props.visible,
    (visible: boolean) => {
      visible &&
        nextTick(() => {
          unref(inputRef)?.focus();
        });
    },
  );

  function handleClose() {
    searchResult.value = [];
    emit('close');
  }
</script>

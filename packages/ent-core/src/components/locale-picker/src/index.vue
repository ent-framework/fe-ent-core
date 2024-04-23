<template>
  <div>
    <NPopselect
      v-model:value="selectedKeys"
      placement="bottom"
      trigger="click"
      :options="localeList"
      class="app-locale-picker-overlay"
      @update:value="handleMenuEvent"
    >
      <div class="cursor-pointer flex items-center">
        <EntIcon icon="ion:language" />
        <span v-if="showText" class="ml-1">{{ getLocaleText }}</span>
      </div>
    </NPopselect>
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent, ref, unref, watchEffect } from 'vue';
  import { NPopselect } from 'naive-ui';
  import { EntIcon } from '../../icon';
  import { useLocale } from '../../../locales';
  import { localeList } from '../../../logics';
  import type { LocaleType } from '../../../store/types';
  import type { DropdownOption } from 'naive-ui';

  const props = {
    /**
     * Whether to display text
     */
    showText: { type: Boolean, default: true },
    /**
     * Whether to refresh the interface when changing
     */
    reload: { type: Boolean }
  };

  export default defineComponent({
    name: 'EntLocalePicker',
    components: { EntIcon, NPopselect },
    props,
    setup(props) {
      const selectedKeys = ref<string>();

      const { changeLocale, getLocale } = useLocale();

      const getLocaleText = computed(() => {
        const key = selectedKeys.value;
        if (!key) {
          return '';
        }
        return localeList.find((item) => item.event === key)?.text;
      });

      watchEffect(() => {
        selectedKeys.value = unref(getLocale);
      });

      async function toggleLocale(lang: LocaleType | string) {
        await changeLocale(lang as LocaleType);
        selectedKeys.value = lang as string;
        props.reload && location.reload();
      }

      function handleMenuEvent(key: string | number, menu: DropdownOption) {
        if (unref(getLocale) === menu.value) {
          return;
        }
        toggleLocale(menu.value as string);
      }
      return {
        getLocaleText,
        localeList,
        handleMenuEvent,
        selectedKeys
      };
    }
  });
</script>

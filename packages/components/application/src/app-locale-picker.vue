<!--
 * @Author: Vben
 * @Description: Multi-language switching component
-->
<template>
  <EntDropdown
    placement="bottom"
    :trigger="['click']"
    :drop-menu-list="localeList"
    :selected-keys="selectedKeys"
    overlay-class-name="app-locale-picker-overlay"
    @menu-event="handleMenuEvent"
  >
    <span class="cursor-pointer flex items-center">
      <EntIcon icon="ion:language" />
      <span v-if="showText" class="ml-1">{{ getLocaleText }}</span>
    </span>
  </EntDropdown>
</template>
<script lang="ts" setup>
  import { computed, defineComponent, ref, unref, watchEffect } from 'vue';
  import { EntDropdown } from '@ent-core/components/dropdown';
  import { EntIcon } from '@ent-core/components/icon';
  import { useLocale } from '@ent-core/locales/use-locale';
  import { localeList } from '@ent-core/logics/settings/locale-setting';
  import type { DropMenu } from '@ent-core/components/dropdown';
  import type { LocaleType } from '@ent-core/logics/types/config';

  defineOptions({
    name: 'EntAppLocalePicker',
  });
  const props = defineProps({
    /**
     * Whether to display text
     */
    showText: { type: Boolean, default: true },
    /**
     * Whether to refresh the interface when changing
     */
    reload: { type: Boolean },
  });

  defineComponent({
    components: { EntDropdown },
  });

  const selectedKeys = ref<string[]>([]);

  const { changeLocale, getLocale } = useLocale();

  const getLocaleText = computed(() => {
    const key = selectedKeys.value[0];
    if (!key) {
      return '';
    }
    return localeList.find((item) => item.event === key)?.text;
  });

  watchEffect(() => {
    selectedKeys.value = [unref(getLocale)];
  });

  async function toggleLocale(lang: LocaleType | string) {
    await changeLocale(lang as LocaleType);
    selectedKeys.value = [lang as string];
    props.reload && location.reload();
  }

  function handleMenuEvent(menu: DropMenu) {
    if (unref(getLocale) === menu.event) {
      return;
    }
    toggleLocale(menu.event as string);
  }
</script>

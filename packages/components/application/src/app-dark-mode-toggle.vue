<template>
  <div v-if="getShowDarkModeToggle" :class="getClass" @click="toggleDarkMode">
    <div :class="`${prefixCls}-inner`"></div>
    <EntSvgIcon size="14" name="sun" />
    <EntSvgIcon size="14" name="moon" />
  </div>
</template>
<script lang="ts" setup>
  import { computed, unref } from 'vue';
  import { EntSvgIcon } from '@ent-core/components/icon';
  import { useDesign } from '@ent-core/hooks/web/use-design';
  import { useRootSetting } from '@ent-core/hooks/setting/use-root-setting';
  import {
    updateHeaderBgColor,
    updateSidebarBgColor,
  } from '@ent-core/logics/theme/update-background';
  import { updateDarkTheme } from '@ent-core/logics/theme/dark';
  import { ThemeEnum } from '@ent-core/logics/enums/app-enum';

  defineOptions({
    name: 'EntAppDarkModeToggle',
  });

  const { prefixCls } = useDesign('dark-switch');
  const { getDarkMode, setDarkMode, getShowDarkModeToggle } = useRootSetting();

  const isDark = computed(() => getDarkMode.value === ThemeEnum.DARK);

  const getClass = computed(() => [
    prefixCls,
    {
      [`${prefixCls}--dark`]: unref(isDark),
    },
  ]);

  function toggleDarkMode() {
    const darkMode = getDarkMode.value === ThemeEnum.DARK ? ThemeEnum.LIGHT : ThemeEnum.DARK;
    setDarkMode(darkMode);
    updateDarkTheme(darkMode);
    updateHeaderBgColor();
    updateSidebarBgColor();
  }
</script>

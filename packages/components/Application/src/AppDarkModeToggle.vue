<template>
  <div v-if="getShowDarkModeToggle" :class="getClass" @click="toggleDarkMode">
    <div :class="`${prefixCls}-inner`"></div>
    <SvgIcon size="14" name="sun" />
    <SvgIcon size="14" name="moon" />
  </div>
</template>
<script lang="ts">
  export default { name: 'AppDarkModeToggle' };
</script>
<script lang="ts" setup>
  import { computed, unref } from 'vue';
  import { SvgIcon } from '@ent-core/components/Icon';
  import { useDesign } from '@ent-core/hooks/web/useDesign';
  import { useRootSetting } from '@ent-core/hooks/setting/useRootSetting';
  import {
    updateHeaderBgColor,
    updateSidebarBgColor,
  } from '@ent-core/logics/theme/updateBackground';
  import { updateDarkTheme } from '@ent-core/logics/theme/dark';
  import { ThemeEnum } from '@ent-core/enums/appEnum';

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

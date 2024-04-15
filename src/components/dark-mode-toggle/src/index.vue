<template>
  <div v-if="getShowDarkModeToggle" :class="getClass">
    <EntIcon
      v-if="getGlobalTheme === 'light'"
      icon="ion:sunny-outline"
      name="sun"
      @click="toggleDarkMode"
    />
    <EntIcon v-if="getGlobalTheme === 'dark'" icon="ion:moon-outline" @click="toggleDarkMode" />
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent, unref } from 'vue';
  import { EntIcon } from '@ent-core/components/icon';
  import { useDesign } from '@ent-core/hooks/web/use-design';
  import { useRootSetting, useThemeSetting } from '@ent-core/hooks/setting';
  import { ThemeEnum } from '@ent-core/logics/enums/app-enum';

  export default defineComponent({
    name: 'EntDarkModeToggle',
    components: { EntIcon },
    setup() {
      const { prefixCls } = useDesign('dark-switch');
      const { getShowDarkModeToggle } = useRootSetting();
      const { getGlobalTheme, setGlobalTheme } = useThemeSetting();

      const isDark = computed(() => getGlobalTheme.value === ThemeEnum.DARK);

      const getClass = computed(() => [
        prefixCls,
        {
          [`${prefixCls}--dark`]: unref(isDark),
        },
      ]);

      function toggleDarkMode() {
        const darkMode = getGlobalTheme.value === ThemeEnum.DARK ? ThemeEnum.LIGHT : ThemeEnum.DARK;
        setGlobalTheme(darkMode);
      }
      return {
        getGlobalTheme,
        prefixCls,
        getShowDarkModeToggle,
        getClass,
        toggleDarkMode,
      };
    },
  });
</script>

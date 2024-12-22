
  import { computed, defineComponent, unref } from 'vue';
  import { EntIcon } from '../../../components/icon';
  import { useDesign } from '../../../hooks/web/use-design';
  import { useRootSetting, useThemeSetting } from '../../../hooks/setting';
  import { ThemeEnum } from '../../../logics/enums/app-enum';

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
          [`${prefixCls}--dark`]: unref(isDark)
        }
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
        toggleDarkMode
      };
    }
  });

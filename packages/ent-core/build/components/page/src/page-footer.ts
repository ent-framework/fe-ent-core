
  import { computed, defineComponent } from 'vue';
  //import { useMenuSetting } from '../../../hooks/setting/use-menu-setting';
  import { useDesign } from '../../../hooks/web/use-design';

  export default defineComponent({
    name: 'PageFooter',
    inheritAttrs: false,
    setup() {
      const { prefixCls } = useDesign('page-footer');
      //const { getCalcContentWidth } = useMenuSetting();
      const getCalcContentWidth = computed(() => {
        return 120;
      });
      return { prefixCls, getCalcContentWidth };
    }
  });

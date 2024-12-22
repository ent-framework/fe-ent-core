
  import { computed, defineComponent } from 'vue';
  import { NIcon } from 'naive-ui';
  import { iconProps } from 'naive-ui/es/icon';
  import { useIconData } from './use-icon-data';

  /**
   * Icon，不能extend，加标记处理
   * @extends NIcon
   */
  export default defineComponent({
    name: 'EntIcon',
    components: { NIcon },
    inheritAttrs: false,
    props: {
      ...iconProps,
      /**
       * 图标名
       * @type {string}
       */
      icon: {
        type: String
      }
    },
    setup(props, { attrs }) {
      const { getIconData } = useIconData();

      const getBindValue = computed(() => {
        const { icon, ...others } = props;
        const propValue = {
          ...others,
          ...attrs
        };
        if (icon) {
          const iconData = getIconData();
          if (iconData?.has(icon)) {
            propValue.component = iconData.get(icon);
          }
        }
        return propValue;
      });
      return { getBindValue };
    }
  });


  import { computed, defineComponent, h, unref } from 'vue';
  import { NButton } from 'naive-ui';
  import { pick } from 'lodash-es';
  import { buttonProps } from 'naive-ui/es/button';
  import Icon from '../../../components/icon/src/icon';
  import { useAttrs } from '../../../hooks';
  import { btnProps } from './props';

  export default defineComponent({
    name: 'EntButton',
    components: { NButton },
    extends: NButton,
    inheritAttrs: false,
    props: btnProps,
    setup(props) {
      const attrs = useAttrs({ excludeDefaultKeys: false });
      const getRenderIcon = computed(() => {
        const { icon } = props;
        if (icon) {
          return {
            renderIcon: () => {
              return h(Icon, { icon, size: props.iconSize });
            }
          };
        }
        return {};
      });
      const getBindValue = computed(() => {
        return {
          ...pick(props, Object.keys(buttonProps)),
          ...unref(attrs),
          ...unref(getRenderIcon)
        };
      });
      return {
        getBindValue
      };
    }
  });

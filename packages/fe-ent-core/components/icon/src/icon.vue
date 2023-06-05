<template>
  <SvgIcon
    v-if="isSvgIcon"
    :size="size"
    :name="getSvgIcon"
    :class="[$attrs.class, 'anticon']"
    :spin="spin"
  />
  <span
    v-else
    :class="[$attrs.class, 'app-iconify anticon', spin && 'app-iconify-spin']"
    :style="getWrapStyle"
  >
    <IconifyIcon v-bind="getBindValue" />
  </span>
</template>
<script lang="ts">
  import { computed, defineComponent, unref } from 'vue';
  import { Icon } from '@iconify/vue';
  import { isString } from '@ent-core/utils/is';
  import { useTheme } from '@ent-core/hooks';
  import { propTypes } from '@ent-core/utils/prop-types';
  import SvgIcon from './svg-icon.vue';
  import type { CSSProperties, PropType } from 'vue';

  const SVG_END_WITH_FLAG = '|svg';
  const IconifyIcon = Icon;
  export default defineComponent({
    name: 'EntIcon',
    components: { SvgIcon, IconifyIcon },
    props: {
      // icon name
      icon: propTypes.string,
      // icon color
      color: propTypes.string,
      width: propTypes.string,
      height: propTypes.string,
      // icon size
      size: {
        type: [String, Number] as PropType<string | number>,
        default: 16,
      },
      spin: propTypes.bool.def(false),
      prefix: propTypes.string.def(''),
    },
    setup(props) {
      // const elRef = ref<ElRef>(null);

      const isSvgIcon = computed(() => props.icon?.endsWith(SVG_END_WITH_FLAG));
      const getSvgIcon = computed(() => props.icon.replace(SVG_END_WITH_FLAG, ''));
      const { useToken } = useTheme();
      const { token } = useToken();
      const getBindValue = computed(() => {
        return {
          ...props,
        };
      });
      const getWrapStyle = computed((): CSSProperties => {
        const { size, color } = props;
        let fs = size;
        if (isString(size)) {
          fs = Number.parseInt(size, 10);
        }
        const tokenValue = unref(token);
        return {
          fontSize: `${fs}px`,
          color: color ? color : tokenValue.colorText,
          display: 'inline-flex',
        };
      });

      return { getBindValue, getWrapStyle, isSvgIcon, getSvgIcon };
    },
  });
</script>

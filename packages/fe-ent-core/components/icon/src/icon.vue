<template>
  <span
    :class="[$attrs.class, 'app-iconify anticon', spin && 'app-iconify-spin']"
    :style="getWrapStyle"
  >
    <IconifyIcon v-bind="getBindValue" />
  </span>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue';
  import { Icon } from '@iconify/vue';
  import { isString } from '@ent-core/utils/is';
  import { propTypes } from '@ent-core/utils/prop-types';
  import type { CSSProperties, PropType } from 'vue';

  const IconifyIcon = Icon;
  export default defineComponent({
    name: 'EntIcon',
    components: { IconifyIcon },
    props: {
      /**
       * 图标名
       * @type {string}
       */
      icon: propTypes.string,
      /**
       * 图标颜色
       * @type {string}
       */
      color: propTypes.string,
      /**
       * 图标宽度
       * @type {string}
       */
      width: propTypes.string,
      /**
       * 图标高度
       * @type {string}
       */
      height: propTypes.string,
      /**
       * 图标大小
       * @type {string | number}
       */
      size: {
        type: [String, Number] as PropType<string | number>,
        default: 16,
      },
      /**
       *
       */
      spin: propTypes.bool.def(false),
      /**
       * 图标前缀
       * @type {string}
       */
      prefix: propTypes.string.def(''),
    },
    setup(props) {
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
        return {
          fontSize: `${fs}px`,
          color: color ? color : 'var(--n-text-color-base)',
          display: 'inline-flex',
        };
      });

      return { getBindValue, getWrapStyle };
    },
  });
</script>

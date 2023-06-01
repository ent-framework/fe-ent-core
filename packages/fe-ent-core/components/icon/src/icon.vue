<template>
  <SvgIcon
    v-if="isSvgIcon"
    :size="size"
    :name="getSvgIcon"
    :class="[$attrs.class, 'anticon']"
    :spin="spin"
  />
  <!-- <span
    v-else
    ref="elRef"
    :class="[$attrs.class, 'app-iconify anticon', spin && 'app-iconify-spin']"
    :style="getWrapStyle"
  /> -->
  <span
    v-else
    :class="[$attrs.class, 'app-iconify anticon', spin && 'app-iconify-spin']"
    :style="getWrapStyle"
  >
    <IconifyIcon :icon="icon" />
  </span>
</template>
<script lang="ts">
  import { computed, defineComponent, nextTick, onMounted, ref, unref, watch } from 'vue';
  //import Iconify from '@iconify/iconify';
  import { Icon } from '@iconify/vue';
  import { isString } from '@ent-core/utils/is';
  import { propTypes } from '@ent-core/utils/prop-types';
  import SvgIcon from './svg-icon.vue';
  import type { CSSProperties, PropType } from 'vue';
  import type { ElRef } from '@ent-core/types';

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
      // const getIconRef = computed(() => `${props.prefix ? `${props.prefix}:` : ''}${props.icon}`);

      // const update = async () => {
      //   if (unref(isSvgIcon)) return;

      //   const el = unref(elRef);
      //   if (!el) return;

      //   await nextTick();
      //   const icon = unref(getIconRef);
      //   if (!icon) return;

      //   const svg = Iconify.renderSVG(icon, {});
      //   if (svg) {
      //     el.textContent = '';
      //     el.appendChild(svg);
      //   } else {
      //     const span = document.createElement('span');
      //     span.className = 'iconify';
      //     span.dataset.icon = icon;
      //     el.textContent = '';
      //     el.appendChild(span);
      //   }
      // };

      const getWrapStyle = computed((): CSSProperties => {
        const { size, color } = props;
        let fs = size;
        if (isString(size)) {
          fs = Number.parseInt(size, 10);
        }

        return {
          fontSize: `${fs}px`,
          color,
          display: 'inline-flex',
        };
      });

      //watch(() => props.icon, update, { flush: 'post' });

      //onMounted(update);

      return { getWrapStyle, isSvgIcon, getSvgIcon };
    },
  });
</script>

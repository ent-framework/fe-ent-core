<template>
  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 20 18" :class="cls" :style="innerStyle" :stroke-width="strokeWidth" :stroke-linecap="strokeLinecap" :stroke-linejoin="strokeLinejoin" @click="onClick"><path fill="currentColor" d="M3.01 14a1 1 0 0 1 .988 1h12.004a1 1 0 0 1 1-1V4a1 1 0 0 1-1-1H4.01a1 1 0 0 1-1 1zm.988 3a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h.01V4a1 1 0 0 1-.998-1V1a1 1 0 0 1 .999-1H3.01a1 1 0 0 1 1 1h11.992a1 1 0 0 1 1-1H19a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v10a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-1.998a1 1 0 0 1-1-1z"></path></svg>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue';
  import type { CSSProperties } from 'vue';

  function isNumber(obj: any): obj is number {
    return Object.prototype.toString.call(obj) === '[object Number]' && obj === obj;
  }
  export default defineComponent({
    name: 'IconSelectAll',
    props: {
      size: {
        type: [Number, String],
      },
      strokeWidth: {
        type: Number,
        default: 4,
      },
      strokeLinecap: {
        type: String,
        default: 'butt',
        validator: (value: any) => {
          return ['butt', 'round', 'square'].includes(value);
        },
      },
      strokeLinejoin: {
        type: String,
        default: 'miter',
        validator: (value: any) => {
          return ['arcs', 'bevel', 'miter', 'miter-clip', 'round'].includes(value);
        },
      },
      rotate: Number,
      spin: Boolean,
      prefixCls: {
        type: String,
        default: 'icon',
      },
    },
    emits: {
      click: (ev: MouseEvent) => true,
    },
    setup(props, { emit }) {
      const cls = computed(() => [
        props.prefixCls,
         `${props.prefixCls}-select-all`,
          { [`${props.prefixCls}-spin`]: props.spin }]
        );
      const innerStyle = computed(() => {
        const styles: CSSProperties = {};
        if (props.size) {
          styles.fontSize = isNumber(props.size) ? `${props.size}px` : props.size;
        }
        if (props.rotate) {
          styles.transform = `rotate(${props.rotate}deg)`;
        }
        return styles;
      });
      const onClick = (ev: MouseEvent) => {
        emit('click', ev);
      };

      return {
        cls,
        innerStyle,
        onClick,
      };
    },
  });
</script>

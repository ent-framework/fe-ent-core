<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="64 64 896 896" :class="cls" :style="innerStyle" :stroke-width="strokeWidth" :stroke-linecap="strokeLinecap" :stroke-linejoin="strokeLinejoin" @click="onClick"><path d="M920 416H616c-4.4 0-8 3.6-8 8v112c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-56h60v320h-46c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h164c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8h-46V480h60v56c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V424c0-4.4-3.6-8-8-8M656 296V168c0-4.4-3.6-8-8-8H104c-4.4 0-8 3.6-8 8v128c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-64h168v560h-92c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h264c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-92V232h168v64c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8"></path></svg>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue';
  import type { CSSProperties } from 'vue';

  function isNumber(obj: any): obj is number {
    return Object.prototype.toString.call(obj) === '[object Number]' && obj === obj;
  }
  export default defineComponent({
    name: 'IconFontSize',
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
         `${props.prefixCls}-font-size`,
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

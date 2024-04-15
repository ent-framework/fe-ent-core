<template>
  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 448 512" :class="cls" :style="innerStyle" :stroke-width="strokeWidth" :stroke-linecap="strokeLinecap" :stroke-linejoin="strokeLinejoin" @click="onClick"><path fill="currentColor" d="M16 224h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16m416 192H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16m3.17-384H172.83A12.82 12.82 0 0 0 160 44.83v38.34A12.82 12.82 0 0 0 172.83 96h262.34A12.82 12.82 0 0 0 448 83.17V44.83A12.82 12.82 0 0 0 435.17 32m0 256H172.83A12.82 12.82 0 0 0 160 300.83v38.34A12.82 12.82 0 0 0 172.83 352h262.34A12.82 12.82 0 0 0 448 339.17v-38.34A12.82 12.82 0 0 0 435.17 288"></path></svg>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue';
  import type { CSSProperties } from 'vue';

  function isNumber(obj: any): obj is number {
    return Object.prototype.toString.call(obj) === '[object Number]' && obj === obj;
  }
  export default defineComponent({
    name: 'IconAlignRight',
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
         `${props.prefixCls}-align-right`,
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

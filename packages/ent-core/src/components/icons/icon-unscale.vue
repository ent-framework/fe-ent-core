<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" :class="cls" :style="innerStyle" :stroke-width="strokeWidth" :stroke-linecap="strokeLinecap" :stroke-linejoin="strokeLinejoin" @click="onClick"><path fill="#fff" d="M750.3 198.7C598 46.4 351.1 46.4 198.7 198.7s-152.3 399.2 0 551.5C345.1 896.6 578.8 902.3 732 767.3l172.1 172.1 35.4-35.4-172.1-171.9c135-153.2 129.3-387-17.1-533.4m39.3 403.8c-17.1 42.1-42.2 80-74.7 112.4-32.5 32.5-70.3 57.6-112.4 74.7-40.7 16.5-83.8 24.9-128 24.9s-87.2-8.4-128-24.9c-42.1-17.1-80-42.2-112.4-74.7s-57.6-70.3-74.7-112.4c-16.5-40.7-24.9-83.8-24.9-128s8.4-87.2 24.9-128c17.1-42.1 42.2-80 74.7-112.4s70.3-57.6 112.4-74.7c40.7-16.5 83.8-24.9 128-24.9s87.2 8.4 128 24.9c42.1 17.1 80 42.2 112.4 74.7 32.5 32.5 57.6 70.3 74.7 112.4 16.5 40.7 24.9 83.8 24.9 128s-8.4 87.3-24.9 128M671 502H271v-50h400z"></path></svg>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue';
  import type { CSSProperties } from 'vue';

  function isNumber(obj: any): obj is number {
    return Object.prototype.toString.call(obj) === '[object Number]' && obj === obj;
  }
  export default defineComponent({
    name: 'IconUnscale',
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
         `${props.prefixCls}-unscale`,
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

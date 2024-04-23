<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    viewBox="0 0 48 48"
    :class="cls"
    :style="innerStyle"
    :stroke-width="strokeWidth"
    :stroke-linecap="strokeLinecap"
    :stroke-linejoin="strokeLinejoin"
    @click="onClick"
  >
    <mask id="b">
      <g fill="none">
        <g stroke="#fff" clip-path="url(#a)">
          <path fill="#fff" d="M44.782 24.17 31.918 7.1 14.135 20.5 27.5 37l3.356-2.336z"></path>
          <path d="m27.5 37-3.839 3.075-10.563-.001-2.6-3.45-6.433-8.536L14.5 20.225"></path>
          <path d="M13.206 40.072h31.36"></path>
        </g>
        <defs>
          <clipPath id="a"><path fill="#000" d="M0 0h48v48H0z"></path></clipPath>
        </defs>
      </g>
    </mask>
    <path fill="currentColor" d="M0 0h48v48H0z" mask="url(#b)"></path>
  </svg>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue';
  import type { CSSProperties } from 'vue';

  function isNumber(obj: any): obj is number {
    return Object.prototype.toString.call(obj) === '[object Number]' && obj === obj;
  }
  export default defineComponent({
    name: 'IconClearFormat',
    props: {
      size: {
        type: [Number, String]
      },
      strokeWidth: {
        type: Number,
        default: 4
      },
      strokeLinecap: {
        type: String,
        default: 'butt',
        validator: (value: any) => {
          return ['butt', 'round', 'square'].includes(value);
        }
      },
      strokeLinejoin: {
        type: String,
        default: 'miter',
        validator: (value: any) => {
          return ['arcs', 'bevel', 'miter', 'miter-clip', 'round'].includes(value);
        }
      },
      rotate: Number,
      spin: Boolean,
      prefixCls: {
        type: String,
        default: 'icon'
      }
    },
    emits: {
      click: (ev: MouseEvent) => true
    },
    setup(props, { emit }) {
      const cls = computed(() => [
        props.prefixCls,
        `${props.prefixCls}-clear-format`,
        { [`${props.prefixCls}-spin`]: props.spin }
      ]);
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
        onClick
      };
    }
  });
</script>

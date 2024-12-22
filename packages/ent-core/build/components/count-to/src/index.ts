
  import { computed, defineComponent, onMounted, ref, unref, watch, watchEffect } from 'vue';
  import { TransitionPresets, useTransition } from '@vueuse/core';
  import { isNumber } from '../../../utils/is';

  const props = {
    /**
     * 起始值
     */
    startVal: { type: Number, default: 0 },
    /**
     * 结束值
     */
    endVal: { type: Number, default: 2021 },
    /**
     * 周期
     */
    duration: { type: Number, default: 1500 },
    /**
     * 自动开始
     */
    autoplay: { type: Boolean, default: true },
    /**
     * 保留小数点位数
     */
    decimals: {
      type: Number,
      default: 0,
      validator(value: number) {
        return value >= 0;
      }
    },
    /**
     * 前缀
     */
    prefix: { type: String, default: '' },
    /**
     * 后缀
     */
    suffix: { type: String, default: '' },
    /**
     * 分割字符
     */
    separator: { type: String, default: ',' },
    decimal: { type: String, default: '.' },
    /**
     * 颜色
     */
    color: { type: String },
    /**
     * 是否启用数字动画
     */
    useEasing: { type: Boolean, default: true },
    /**
     * 动画效果
     */
    transition: { type: String, default: 'linear' }
  };

  export default defineComponent({
    name: 'EntCountTo',
    props,
    emits: ['onStarted', 'onFinished'],
    setup(props, { emit }) {
      const source = ref<number>(props.startVal);
      const disabled = ref<boolean>(false);
      let outputValue = useTransition(source);

      const value = computed(() => formatNumber(unref(outputValue)));

      watchEffect(() => {
        source.value = props.startVal;
      });

      watch([() => props.startVal, () => props.endVal], () => {
        if (props.autoplay) {
          start();
        }
      });

      onMounted(() => {
        props.autoplay && start();
      });

      function start() {
        run();
        source.value = props.endVal;
      }

      function reset() {
        source.value = props.startVal;
        run();
      }

      function run() {
        outputValue = useTransition(source, {
          disabled,
          duration: props.duration,
          onFinished: () => emit('onFinished'),
          onStarted: () => emit('onStarted'),
          ...(props.useEasing ? { transition: TransitionPresets[props.transition] } : {})
        });
      }

      function formatNumber(num: number | string) {
        if (!num && num !== 0) {
          return '';
        }
        const { decimals, decimal, separator, suffix, prefix } = props;
        num = Number(num).toFixed(decimals);
        num += '';

        const x = num.split('.');
        let x1 = x[0];
        const x2 = x.length > 1 ? decimal + x[1] : '';

        const rgx = /(\d+)(\d{3})/;
        if (separator && !isNumber(separator)) {
          while (rgx.test(x1)) {
            x1 = x1.replace(rgx, `$1${separator}$2`);
          }
        }
        return prefix + x1 + x2 + suffix;
      }

      return { value, start, reset };
    }
  });

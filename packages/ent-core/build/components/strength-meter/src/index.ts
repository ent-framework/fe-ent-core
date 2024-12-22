
  import { defineComponent, computed, ref, watch, unref, watchEffect } from 'vue';
  import { NInput } from 'naive-ui';
  import { zxcvbn, ZxcvbnResult } from '@zxcvbn-ts/core';
  import { useDesign } from '../../../hooks/web/use-design';

  export default defineComponent({
    name: 'EntStrengthMeter',
    components: { NInput },
    props: {
      value: {
        type: String,
      },
      showInput: {
        type: Boolean,
        default: true
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    emits: ['score-change', 'change'],
    setup(props, { emit }) {
      const innerValueRef = ref('');
      const { prefixCls } = useDesign('strength-meter');

      const getPasswordStrength = computed(() => {
        const { disabled } = props;
        if (disabled) return -1;
        const innerValue = unref(innerValueRef);
        const zxcvbnResult = zxcvbn(unref(innerValueRef));
        const score =
          innerValue && (<ZxcvbnResult>zxcvbnResult).score
            ? (<ZxcvbnResult>zxcvbnResult).score
            : -1;
        emit('score-change', score);
        return score;
      });

      function handleChange(val) {
        innerValueRef.value = val;
      }

      watchEffect(() => {
        innerValueRef.value = props.value || '';
      });

      watch(
        () => unref(innerValueRef),
        (val) => {
          emit('change', val);
        }
      );

      return {
        getPasswordStrength,
        handleChange,
        prefixCls,
        innerValueRef
      };
    }
  });

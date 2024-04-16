<template>
  <div :class="prefixCls" class="relative">
    <NInput
      v-if="showInput"
      v-bind="$attrs"
      allowClear
      :value="innerValueRef"
      type="password"
      @update:value="handleChange"
      :disabled="disabled"
    >
      <template #[item]="data" v-for="item in Object.keys($slots)">
        <slot :name="item" v-bind="data || {}"></slot>
      </template>
    </NInput>
    <div :class="`${prefixCls}-bar`">
      <div :class="`${prefixCls}-bar--fill`" :data-score="getPasswordStrength"></div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, ref, watch, unref, watchEffect } from 'vue';
  import { NInput } from 'naive-ui';
  import { zxcvbn, ZxcvbnResult } from '@zxcvbn-ts/core';
  import { useDesign } from '../../../hooks/web/use-design';
  import { propTypes } from '../../../utils/prop-types';

  export default defineComponent({
    name: 'EntStrengthMeter',
    components: { NInput },
    props: {
      value: propTypes.string,
      showInput: propTypes.bool.def(true),
      disabled: propTypes.bool,
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
        const score = innerValue && (<ZxcvbnResult>zxcvbnResult).score ? (<ZxcvbnResult>zxcvbnResult).score : -1;
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
        },
      );

      return {
        getPasswordStrength,
        handleChange,
        prefixCls,
        innerValueRef,
      };
    },
  });
</script>

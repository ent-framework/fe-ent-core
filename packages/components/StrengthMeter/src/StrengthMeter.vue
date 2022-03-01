<template>
  <div :class="prefixCls" class="relative">
    <InputPassword
      v-if="showInput"
      v-bind="$attrs"
      allowClear
      :value="innerValueRef"
      @change="handleChange"
      :disabled="disabled"
    >
      <template #[item]="data" v-for="item in Object.keys($slots)">
        <slot :name="item" v-bind="data || {}"></slot>
      </template>
    </InputPassword>
    <div :class="`${prefixCls}-bar`">
      <div :class="`${prefixCls}-bar--fill`" :data-score="getPasswordStrength"></div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, ref, watch, unref, watchEffect } from 'vue';
  import { Input } from 'ant-design-vue';
  import { zxcvbn, ZxcvbnResult } from '@zxcvbn-ts/core';
  import { useDesign } from '@ent-core/hooks/web/useDesign';
  import { propTypes } from '@ent-core/utils/propTypes';
  export default defineComponent({
    name: 'EntStrengthMeter',
    components: { InputPassword: Input.Password },
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

      function handleChange(e: ChangeEvent) {
        innerValueRef.value = e.target.value;
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

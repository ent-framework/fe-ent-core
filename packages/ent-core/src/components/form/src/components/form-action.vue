<template>
  <NFormItem :show-feedback="false">
    <slot name="resetBefore" />
    <EntButton
      v-if="showResetButton"
      type="default"
      class="ml-2"
      v-bind="getResetBtnOptions"
      @click="resetAction"
    >
      {{ getResetBtnOptions.btnContent }}
    </EntButton>
    <slot name="submitBefore" />

    <EntButton
      v-if="showSubmitButton"
      type="primary"
      class="ml-2"
      v-bind="getSubmitBtnOptions"
      @click="submitAction"
    >
      {{ getSubmitBtnOptions.btnContent }}
    </EntButton>

    <slot name="advanceBefore" />
    <EntButton v-if="showAdvancedButton && !hideAdvanceBtn" size="small" @click="toggleAdvanced">
      {{ isAdvanced ? t('component.form.putAway') : t('component.form.unfold') }}
      <EntArrow class="ml-1" :expand="!isAdvanced" up />
    </EntButton>
    <slot name="advanceAfter" />
  </NFormItem>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue';
  import { NFormItem } from 'naive-ui';
  import { EntButton } from '../../../button';
  import { EntArrow } from '../../../basic';
  import { useI18n } from '../../../../hooks';
  import { useFormContext } from '../hooks/use-form-context';
  import { formActionProps } from '../props';
  import type { FormButtonOptions } from '../types/form';

  export default defineComponent({
    name: 'BasicFormAction',
    components: {
      NFormItem,
      EntButton,
      EntArrow
    },
    props: formActionProps,
    emits: ['toggle-advanced'],
    setup(props, { emit }) {
      const { t } = useI18n();

      const getResetBtnOptions = computed((): FormButtonOptions => {
        return Object.assign(
          {
            btnContent: t('common.resetText')
          },
          props.resetButtonOptions
        );
      });

      const getSubmitBtnOptions = computed(() => {
        return Object.assign(
          {
            btnContent: t('common.queryText')
          },
          props.submitButtonOptions
        );
      });

      function toggleAdvanced() {
        emit('toggle-advanced');
      }

      return {
        t,
        getResetBtnOptions,
        getSubmitBtnOptions,
        toggleAdvanced,
        ...useFormContext()
      };
    }
  });
</script>

<template>
  <a-col v-if="showActionButtonGroup" v-bind="actionColOpt">
    <div style="width: 100%" :style="{ textAlign: actionColOpt.style.textAlign }">
      <FormItem>
        <slot name="resetBefore" />
        <EntButton
          v-if="showResetButton"
          type="default"
          class="mr-2"
          v-bind="getResetBtnOptions"
          @click="resetAction"
        >
          {{ getResetBtnOptions.text }}
        </EntButton>
        <slot name="submitBefore" />

        <EntButton
          v-if="showSubmitButton"
          type="primary"
          class="mr-2"
          v-bind="getSubmitBtnOptions"
          @click="submitAction"
        >
          {{ getSubmitBtnOptions.text }}
        </EntButton>

        <slot name="advanceBefore" />
        <EntButton
          v-if="showAdvancedButton && !hideAdvanceBtn"
          type="link"
          size="small"
          @click="toggleAdvanced"
        >
          {{ isAdvanced ? t('component.form.putAway') : t('component.form.unfold') }}
          <EntArrow class="ml-1" :expand="!isAdvanced" up />
        </EntButton>
        <slot name="advanceAfter" />
      </FormItem>
    </div>
  </a-col>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue';
  import { Col, Form } from 'ant-design-vue';
  import { EntButton } from '@ent-core/components/button';
  import { EntArrow } from '@ent-core/components/basic';
  import { useI18n } from '@ent-core/hooks/web/use-i18n';
  import { propTypes } from '@ent-core/utils/prop-types';
  import { useFormContext } from '../hooks/use-form-context';
  import type { PropType } from 'vue';
  import type { ColEx } from '../types';
  import type { FormButtonOptions } from '../types/form';

  export default defineComponent({
    name: 'BasicFormAction',
    components: {
      FormItem: Form.Item,
      EntButton,
      EntArrow,
      [Col.name]: Col,
    },
    props: {
      showActionButtonGroup: propTypes.bool.def(true),
      showResetButton: propTypes.bool.def(true),
      showSubmitButton: propTypes.bool.def(true),
      showAdvancedButton: propTypes.bool.def(true),
      resetButtonOptions: {
        type: Object as PropType<FormButtonOptions>,
        default: () => ({}),
      },
      submitButtonOptions: {
        type: Object as PropType<FormButtonOptions>,
        default: () => ({}),
      },
      actionColOptions: {
        type: Object as PropType<Partial<ColEx>>,
        default: () => ({}),
      },
      actionSpan: propTypes.number.def(6),
      isAdvanced: propTypes.bool,
      hideAdvanceBtn: propTypes.bool,
    },
    emits: ['toggle-advanced'],
    setup(props, { emit }) {
      const { t } = useI18n();

      const actionColOpt = computed(() => {
        const { showAdvancedButton, actionSpan: span, actionColOptions } = props;
        const actionSpan = 24 - span;
        const advancedSpanObj = showAdvancedButton
          ? { span: actionSpan < 6 ? 24 : actionSpan }
          : {};
        const actionColOpt: Partial<ColEx> = {
          style: { textAlign: 'right' },
          span: showAdvancedButton ? 6 : 4,
          ...advancedSpanObj,
          ...actionColOptions,
        };
        return actionColOpt;
      });

      const getResetBtnOptions = computed((): FormButtonOptions => {
        return Object.assign(
          {
            text: t('common.resetText'),
          },
          props.resetButtonOptions,
        );
      });

      const getSubmitBtnOptions = computed(() => {
        return Object.assign(
          {
            text: t('common.queryText'),
          },
          props.submitButtonOptions,
        );
      });

      function toggleAdvanced() {
        emit('toggle-advanced');
      }

      return {
        t,
        actionColOpt,
        getResetBtnOptions,
        getSubmitBtnOptions,
        toggleAdvanced,
        ...useFormContext(),
      };
    },
  });
</script>

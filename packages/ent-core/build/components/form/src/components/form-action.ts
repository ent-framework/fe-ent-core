
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

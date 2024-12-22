
  import { computed, defineComponent, nextTick, onMounted, reactive, ref, unref, watch } from 'vue';
  import { NDivider, NForm, NGrid, NGridItem, NSpace } from 'naive-ui';
  import { useDebounceFn } from '@vueuse/shared';
  import { formProps } from 'naive-ui/es/form';
  import { cloneDeep, pick } from 'lodash-es';
  import { deepMerge } from '../../../utils';
  import { useModalContext } from '../../modal';
  import { useDesign } from '../../../hooks';
  import FormItem from './components/form-item';
  import FormAction from './components/form-action';
  import { useFormValues } from './hooks/use-form-values';
  import useAdvanced from './hooks/use-advanced';
  import { useFormEvents } from './hooks/use-form-events';
  import { createFormContext } from './hooks/use-form-context';
  import { useAutoFocus } from './hooks/use-auto-focus';
  import { basicProps, formActionProps } from './props';
  import type { CSSProperties, Ref } from 'vue';
  import type { AdvanceState } from './types/hooks';
  import type { GridItemProps, GridProps } from 'naive-ui/es/grid';
  import type { FormActionType, FormProps, FormSchema } from './types/form';

  export default defineComponent({
    name: 'EntForm',
    components: {
      NGrid,
      NGridItem,
      NForm,
      NDivider,
      FormAction,
      FormItem,
      NSpace
    },
    extends: NForm,
    inheritAttrs: false,
    props: basicProps,
    emits: ['advanced-change', 'reset', 'submit', 'register', 'field-value-change'],
    setup(props, { emit, attrs }) {
      const formModel = reactive({});
      const modalFn = useModalContext();

      const advanceState = reactive<AdvanceState>({
        isAdvanced: true,
        hideAdvanceBtn: false,
        isLoad: false,
        actionSpan: 6
      });

      const defaultValueRef = ref({});
      const isInitedDefaultRef = ref(false);
      const propsRef = ref<Partial<FormProps>>({});
      const schemaRef = ref<FormSchema[] | null>(null);
      const formElRef = ref<FormActionType | null>(null);

      const { prefixCls } = useDesign('form');

      // Get the basic configuration of the form
      const getProps = computed((): FormProps => {
        // @ts-ignore
        return { ...props, ...unref(propsRef) } as FormProps;
      });

      const getFormClass = computed(() => {
        const { showFeedback } = unref(getProps);
        return [
          prefixCls,
          {
            [`${prefixCls}--inline`]: unref(isInline)
          },
          {
            [`${prefixCls}--show-feed-back`]: showFeedback
          }
        ];
      });

      const isInline = computed(() => {
        const { inline } = unref(getProps);
        return !!inline;
      });

      // Get uniform row style and Row configuration for the entire form
      const getGrid = computed((): GridProps => {
        const { gridProps } = unref(getProps);
        return {
          ...gridProps
        };
      });

      const getBindValue = computed((): FormProps => {
        const value = pick(
          {
            ...props,
            ...unref(getProps)
          },
          Object.keys(formProps)
        );
        return { ...attrs, ...value } as FormProps;
      });

      const getSchema = computed((): FormSchema[] => {
        const props_ = unref(getProps);
        const schemas: FormSchema[] = unref(schemaRef) || (props_.schemas as any);
        for (const schema of schemas) {
          if (schema.component === 'Divider') {
            schema.componentProps = Object.assign(
              { 'title-placement': 'left' },
              schema.componentProps
            );
          } else {
            // 基础表单的baseColProps
            const { baseGridItemProps } = props_;
            schema.gridItemProps = {
              ...baseGridItemProps,
              ...schema.gridItemProps
            };
          }
        }
        if (unref(getProps).showAdvancedButton) {
          return cloneDeep(
            schemas.filter((schema) => schema.component !== 'Divider') as FormSchema[]
          );
        } else {
          return cloneDeep(schemas as FormSchema[]);
        }
      });

      const { handleToggleAdvanced, fieldsIsAdvancedMap } = useAdvanced({
        advanceState,
        emit,
        getProps,
        getSchema,
        formModel,
        defaultValueRef
      });

      const { handleFormValues, initDefault } = useFormValues({
        getProps,
        defaultValueRef,
        getSchema,
        formModel
      });

      useAutoFocus({
        getSchema,
        getProps,
        isInitedDefault: isInitedDefaultRef,
        formElRef: formElRef as Ref<FormActionType>
      });

      const {
        handleSubmit,
        setFieldsValue,
        validate,
        getFieldsValue,
        updateSchema,
        resetSchema,
        appendSchemaByField,
        removeSchemaByField,
        resetFields
      } = useFormEvents({
        emit,
        getProps,
        formModel,
        getSchema,
        defaultValueRef,
        formElRef: formElRef as Ref<FormActionType>,
        schemaRef: schemaRef as Ref<FormSchema[]>,
        handleFormValues
      });

      createFormContext({
        resetAction: resetFields,
        submitAction: handleSubmit
      });

      watch(
        () => unref(getProps).model,
        () => {
          const { model } = unref(getProps);
          if (!model) return;
          setFieldsValue(model);
        },
        {
          immediate: true
        }
      );

      watch(
        () => unref(getProps).schemas,
        (schemas) => {
          resetSchema(schemas ?? []);
        }
      );

      watch(
        () => getSchema.value,
        (schema) => {
          nextTick(() => {
            //  Solve the problem of modal adaptive height calculation when the form is placed in the modal
            modalFn?.redoModalHeight?.();
          });
          if (unref(isInitedDefaultRef)) {
            return;
          }
          if (schema?.length) {
            initDefault();
            isInitedDefaultRef.value = true;
          }
        }
      );

      watch(
        () => formModel,
        useDebounceFn(() => {
          unref(getProps).submitOnChange && handleSubmit();
        }, 300),
        { deep: true }
      );

      async function setProps(formProps: Partial<FormProps>): Promise<void> {
        propsRef.value = deepMerge(unref(propsRef) || {}, formProps);
      }

      function setFormModel(key: string, value: any) {
        formModel[key] = value;
        emit('field-value-change', key, value);
        // TODO 优化验证，这里如果是autoLink=false手动关联的情况下才会再次触发此函数
        // if (schema && schema.itemProps && !schema.itemProps.autoLink) {
        //   validateFields([key]);
        // }
        // validate();
      }

      function handleEnterPress(e: KeyboardEvent) {
        const { autoSubmitOnEnter } = unref(getProps);
        if (!autoSubmitOnEnter) return;
        if (e.key === 'Enter' && e.target && e.target instanceof HTMLElement) {
          const target: HTMLElement = e.target as HTMLElement;
          if (target && target.tagName && target.tagName.toUpperCase() == 'INPUT') {
            handleSubmit();
          }
        }
      }

      const formActionType: Partial<FormActionType> = {
        getFieldsValue,
        setFieldsValue,
        resetFields,
        updateSchema,
        resetSchema,
        setProps,
        removeSchemaByField,
        appendSchemaByField,
        validate,
        submit: handleSubmit
      };

      onMounted(() => {
        initDefault();
        emit('register', formActionType);
      });

      const getFormActionBindProps = computed(() => {
        return pick({ ...getProps.value, ...advanceState }, Object.keys(formActionProps));
      });

      const actionColProps = computed(() => {
        const { showAdvancedButton, actionSpan: span, actionColOptions } = props;
        const actionSpan = 24 - span;
        const advancedSpanObj = showAdvancedButton
          ? { span: actionSpan < 6 ? 24 : actionSpan }
          : {};
        const actionColOpt: Partial<GridItemProps> = {
          span: showAdvancedButton ? 6 : 4,
          ...advancedSpanObj,
          ...actionColOptions
        };
        return actionColOpt;
      });

      const actionColStyles = computed((): CSSProperties => {
        return { textAlign: 'right' };
      });

      const getActionButtonGroupJustify = computed(() => {
        const inline = unref(isInline);
        if (inline) {
          return 'end';
        }
        const { actionButtonGroupPosition } = unref(getFormActionBindProps);
        return actionButtonGroupPosition;
      });
      const getActionButtonGroupStyles = computed((): CSSProperties => {
        const inline = unref(isInline);
        const { labelWidth } = unref(getProps);
        return { 'margin-left': `${inline ? 12 : labelWidth}px` };
      });

      return {
        prefixCls,
        isInline,
        getBindValue,
        handleToggleAdvanced,
        handleEnterPress,
        formModel,
        defaultValueRef,
        advanceState,
        getGrid,
        getProps,
        formElRef,
        getSchema,
        formActionType: formActionType as any,
        setFormModel,
        getFormClass,
        getFormActionBindProps,
        fieldsIsAdvancedMap,
        actionColProps,
        actionColStyles,
        getActionButtonGroupJustify,
        getActionButtonGroupStyles,
        ...formActionType
      };
    }
  });

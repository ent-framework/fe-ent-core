<template>
  <Form
    v-bind="getBindValue"
    ref="formElRef"
    :class="getFormClass"
    :model="formModel"
    @keypress.enter="handleEnterPress"
  >
    <Row v-bind="getRow">
      <slot name="formHeader" />
      <template v-for="schema in getSchema" :key="schema.field">
        <FormItem
          :is-advanced="fieldsIsAdvancedMap[schema.field]"
          :table-action="tableAction"
          :form-action-type="formActionType"
          :schema="schema"
          :form-props="getProps"
          :all-default-values="defaultValueRef"
          :form-model="formModel"
          :set-form-model="setFormModel"
        >
          <template v-for="item in Object.keys($slots)" #[item]="data">
            <slot :name="item" v-bind="data || {}" />
          </template>
        </FormItem>
      </template>

      <FormAction v-bind="getFormActionBindProps" @toggle-advanced="handleToggleAdvanced">
        <template
          v-for="item in ['resetBefore', 'submitBefore', 'advanceBefore', 'advanceAfter']"
          #[item]="data"
        >
          <slot :name="item" v-bind="data || {}" />
        </template>
      </FormAction>
      <slot name="formFooter" />
    </Row>
  </Form>
</template>
<script lang="ts">
  import { computed, defineComponent, nextTick, onMounted, reactive, ref, unref, watch } from 'vue';
  import { Form, Row } from 'ant-design-vue';
  import { useDebounceFn } from '@vueuse/shared';
  import { cloneDeep } from 'lodash-es';
  import { dateUtil } from '@ent-core/utils/date-util';
  import { deepMerge } from '@ent-core/utils';
  import { useModalContext } from '@ent-core/components/modal';
  import { useDesign } from '@ent-core/hooks/web/use-design';
  import FormItem from './components/form-item.vue';
  import FormAction from './components/form-action.vue';

  import { dateItemType } from './helper';
  import { useFormValues } from './hooks/use-form-values';
  import useAdvanced from './hooks/use-advanced';
  import { useFormEvents } from './hooks/use-form-events';
  import { createFormContext } from './hooks/use-form-context';
  import { useAutoFocus } from './hooks/use-auto-focus';
  import { basicProps } from './props';
  import type { Ref } from 'vue';
  import type { AdvanceState } from './types/hooks';
  import type { FormActionType, FormProps, FormSchema } from './types/form';

  /**
   * @docLocation https://raw.githubusercontent.com/vueComponent/ant-design-vue/4.0.0/components/form/index.zh-CN.md
   * @extends Form
   * @docLink https://next.antdv.com/components/form-cn
   */
  export default defineComponent({
    name: 'EntForm',
    components: { FormItem, Form, Row, FormAction },
    props: basicProps,
    emits: ['advanced-change', 'reset', 'submit', 'register', 'field-value-change'],
    setup(props, { emit, attrs }) {
      const formModel = reactive({});
      const modalFn = useModalContext();

      const advanceState = reactive<AdvanceState>({
        isAdvanced: true,
        hideAdvanceBtn: false,
        isLoad: false,
        actionSpan: 6,
      });

      const defaultValueRef = ref({});
      const isInitedDefaultRef = ref(false);
      const propsRef = ref<Partial<FormProps>>({});
      const schemaRef = ref<FormSchema[] | null>(null);
      const formElRef = ref<FormActionType | null>(null);

      const { prefixCls } = useDesign('basic-form');

      // Get the basic configuration of the form
      const getProps = computed((): FormProps => {
        // @ts-ignore
        return { ...props, ...unref(propsRef) } as FormProps;
      });

      const getFormClass = computed(() => {
        return [
          prefixCls,
          {
            [`${prefixCls}--compact`]: unref(getProps).compact,
          },
        ];
      });

      // Get uniform row style and Row configuration for the entire form
      const getRow = computed(() => {
        const { baseRowStyle = {}, rowProps } = unref(getProps);
        return {
          style: baseRowStyle,
          ...rowProps,
        };
      });

      const getBindValue = computed(() => ({ ...attrs, ...props, ...unref(getProps) }));

      const getSchema = computed((): FormSchema[] => {
        const schemas: FormSchema[] = unref(schemaRef) || (unref(getProps).schemas as any);
        for (const schema of schemas) {
          const { defaultValue, component, isHandleDateDefaultValue = true } = schema;
          // handle date type
          if (isHandleDateDefaultValue && defaultValue && dateItemType.includes(component)) {
            if (!Array.isArray(defaultValue)) {
              schema.defaultValue = dateUtil(defaultValue);
            } else {
              const def: any[] = [];
              defaultValue.forEach((item) => {
                def.push(dateUtil(item));
              });
              schema.defaultValue = def;
            }
          }
        }
        if (unref(getProps).showAdvancedButton) {
          return cloneDeep(
            schemas.filter((schema) => schema.component !== 'Divider') as FormSchema[],
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
        defaultValueRef,
      });

      const { handleFormValues, initDefault } = useFormValues({
        getProps,
        defaultValueRef,
        getSchema,
        formModel,
      });

      useAutoFocus({
        getSchema,
        getProps,
        isInitedDefault: isInitedDefaultRef,
        formElRef: formElRef as Ref<FormActionType>,
      });

      const {
        handleSubmit,
        setFieldsValue,
        clearValidate,
        validate,
        validateFields,
        getFieldsValue,
        updateSchema,
        resetSchema,
        appendSchemaByField,
        removeSchemaByField,
        resetFields,
        scrollToField,
      } = useFormEvents({
        emit,
        getProps,
        formModel,
        getSchema,
        defaultValueRef,
        formElRef: formElRef as Ref<FormActionType>,
        schemaRef: schemaRef as Ref<FormSchema[]>,
        handleFormValues,
      });

      createFormContext({
        resetAction: resetFields,
        submitAction: handleSubmit,
      });

      watch(
        () => unref(getProps).model,
        () => {
          const { model } = unref(getProps);
          if (!model) return;
          setFieldsValue(model);
        },
        {
          immediate: true,
        },
      );

      watch(
        () => unref(getProps).schemas,
        (schemas) => {
          resetSchema(schemas ?? []);
        },
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
        },
      );

      watch(
        () => formModel,
        useDebounceFn(() => {
          unref(getProps).submitOnChange && handleSubmit();
        }, 300),
        { deep: true },
      );

      async function setProps(formProps: Partial<FormProps>): Promise<void> {
        propsRef.value = deepMerge(unref(propsRef) || {}, formProps);
      }

      function setFormModel(key: string, value: any, schema: FormSchema) {
        formModel[key] = value;
        emit('field-value-change', key, value);
        // TODO 优化验证，这里如果是autoLink=false手动关联的情况下才会再次触发此函数
        if (schema && schema.itemProps && !schema.itemProps.autoLink) {
          validateFields([key]);
        }
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
        clearValidate,
        validateFields,
        validate,
        submit: handleSubmit,
        scrollToField,
      };

      onMounted(() => {
        initDefault();
        emit('register', formActionType);
      });

      return {
        getBindValue,
        handleToggleAdvanced,
        handleEnterPress,
        formModel,
        defaultValueRef,
        advanceState,
        getRow,
        getProps,
        formElRef,
        getSchema,
        formActionType: formActionType as any,
        setFormModel,
        getFormClass,
        getFormActionBindProps: computed(() => ({ ...getProps.value, ...advanceState })),
        fieldsIsAdvancedMap,
        ...formActionType,
      };
    },
  });
</script>

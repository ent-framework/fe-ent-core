<script lang="tsx">
  import { computed, defineComponent, unref, ref } from 'vue';
  import { NFormItem } from 'naive-ui';
  import { cloneDeep, upperFirst } from 'lodash-es';
  import { EntHelp } from '@ent-core/components/basic';
  import { isBoolean, isFunction, isNull } from '@ent-core/utils/is';
  import { getSlot } from '@ent-core/utils/helper/tsx-helper';
  import { useI18n } from '@ent-core/hooks/web/use-i18n';
  import { createPlaceholderMessage, setComponentRuleType } from '../helper';
  import { componentMap } from '../component-map';
  import { formItemProps } from '../props';
  import type { Nullable, Recordable } from '@ent-core/types';
  import type { FormItemInst, FormItemRule } from 'naive-ui/es/form';

  export default defineComponent({
    name: 'BasicFormItem',
    inheritAttrs: false,
    props: formItemProps,
    setup(props, { slots }) {
      const { t } = useI18n();

      const formItemRef = ref<FormItemInst>();

      const getValues = computed(() => {
        const { allDefaultValues, formModel, schema } = props;
        const { mergeDynamicData } = props.formProps;
        return {
          field: schema.field,
          model: formModel,
          values: {
            ...mergeDynamicData,
            ...allDefaultValues,
            ...formModel,
          } as Recordable<any>,
          schema,
        };
      });

      const getComponentsProps = computed(() => {
        const { schema, tableAction, formModel, formActionType } = props;
        let { componentProps = {} } = schema;
        if (typeof componentProps === 'function') {
          componentProps = componentProps({ schema, tableAction, formModel, formActionType }) ?? {};
        }
        return componentProps as Recordable;
      });

      const getDisable = computed(() => {
        const { disabled: globDisabled } = props.formProps;
        const { dynamicDisabled } = props.schema;
        const { disabled: itemDisabled = false } = unref(getComponentsProps);
        let disabled = !!globDisabled || itemDisabled;
        if (isBoolean(dynamicDisabled)) {
          disabled = dynamicDisabled;
        }
        if (typeof dynamicDisabled === 'function') {
          disabled = dynamicDisabled(unref(getValues));
        }
        return disabled;
      });

      function getShow(): { isShow: boolean; isIfShow: boolean } {
        const { show, ifShow } = props.schema;
        const { showAdvancedButton } = props.formProps;
        const itemIsAdvanced = showAdvancedButton
          ? isBoolean(props.isAdvanced)
            ? props.isAdvanced
            : true
          : true;

        let isShow = true;
        let isIfShow = true;

        if (isBoolean(show)) {
          isShow = show;
        }
        if (isBoolean(ifShow)) {
          isIfShow = ifShow;
        }
        if (typeof show === 'function') {
          isShow = show(unref(getValues));
        }
        if (typeof ifShow === 'function') {
          isIfShow = ifShow(unref(getValues));
        }
        isShow = isShow && itemIsAdvanced;
        return { isShow, isIfShow };
      }

      function handleRules(): FormItemRule[] {
        const {
          rules: defRules = [],
          component,
          rulesMessageJoinLabel,
          label,
          dynamicRules,
          required,
        } = props.schema;

        if (typeof dynamicRules === 'function') {
          return dynamicRules(unref(getValues)) as FormItemRule[];
        }

        let rules: FormItemRule[] = cloneDeep(defRules) as FormItemRule[];
        const { rulesMessageJoinLabel: globalRulesMessageJoinLabel } = props.formProps;

        const joinLabel = Reflect.has(props.schema, 'rulesMessageJoinLabel')
          ? rulesMessageJoinLabel
          : globalRulesMessageJoinLabel;
        const defaultMsg = `${createPlaceholderMessage(component)}${joinLabel ? label : ''}`;

        function validator(rule: any, value: any) {
          const msg = rule.message || defaultMsg;
          if (value === undefined || isNull(value)) {
            // 空值
            return Promise.reject(msg);
          } else if (Array.isArray(value) && value.length === 0) {
            // 数组类型
            return Promise.reject(msg);
          } else if (typeof value === 'string' && value.trim() === '') {
            // 空字符串
            return Promise.reject(msg);
          } else if (
            typeof value === 'object' &&
            Reflect.has(value, 'checked') &&
            Reflect.has(value, 'halfChecked') &&
            Array.isArray(value.checked) &&
            Array.isArray(value.halfChecked) &&
            value.checked.length === 0 &&
            value.halfChecked.length === 0
          ) {
            // 非关联选择的tree组件
            return Promise.reject(msg);
          }
          return Promise.resolve();
        }

        const getRequired = typeof required === 'function' ? required(unref(getValues)) : required;

        /*
         * 1、若设置了required属性，又没有其他的rules，就创建一个验证规则；
         * 2、若设置了required属性，又存在其他的rules，则只rules中不存在required属性时，才添加验证required的规则
         *     也就是说rules中的required，优先级大于required
         */
        if (getRequired) {
          if (!rules || rules.length === 0) {
            rules = [{ required: getRequired, validator }];
          } else {
            const requiredIndex: number = rules.findIndex((rule) => Reflect.has(rule, 'required'));

            if (requiredIndex === -1) {
              rules.push({ required: getRequired, validator });
            }
          }
        }

        const requiredRuleIndex: number = rules.findIndex(
          (rule) => Reflect.has(rule, 'required') && !Reflect.has(rule, 'validator'),
        );

        if (requiredRuleIndex !== -1) {
          const rule = rules[requiredRuleIndex];
          const { isShow } = getShow();
          if (!isShow) {
            rule.required = false;
          }
          if (component) {
            if (!Reflect.has(rule, 'type')) {
              rule.type = component === 'InputNumber' ? 'number' : 'string';
            }

            rule.message = rule.message || defaultMsg;

            if (component.includes('Input') || component.includes('Textarea')) {
              rule.whitespace = true;
            }
            const valueFormat = unref(getComponentsProps)?.valueFormat;
            setComponentRuleType(rule, component, valueFormat);
          }
        }

        // Maximum input length rule check
        const characterInx = rules.findIndex((val) => val.max);
        if (characterInx !== -1 && !rules[characterInx].validator) {
          rules[characterInx].message =
            rules[characterInx].message ||
            t('component.form.maxTip', [rules[characterInx].max] as Recordable<any>);
        }
        return rules;
      }

      function renderComponent() {
        const {
          renderComponentContent,
          component,
          field,
          changeEvent = 'update:value',
          valueField,
        } = props.schema;

        const isCheck = component && ['Switch', 'Checkbox'].includes(component);
        const componentProps = unref(getComponentsProps);
        const { onChange, ...others } = componentProps;
        const eventKey = `on${upperFirst(changeEvent)}`;

        const on = {
          [eventKey]: (...args: Nullable<Recordable<any>>[]) => {
            const [e] = args;
            if (propsData[eventKey]) {
              propsData[eventKey](...args);
            }
            const target = e ? e.target : null;
            const value = target ? (isCheck ? target.checked : target.value) : e;
            props.setFormModel(field, value, props.schema);
            if (onChange && isFunction(onChange)) {
              onChange(value, props.schema);
            }
            unref(formItemRef)?.validate();
          },
        };

        const Comp = componentMap.get(component) as ReturnType<typeof defineComponent>;

        const { autoSetPlaceHolder, size } = props.formProps;

        const propsData: Recordable<any> = {
          clearable: true,
          getPopupContainer: (trigger: Element) => trigger.parentNode,
          size,
          ...others,
          disabled: unref(getDisable),
        };

        const isCreatePlaceholder = !propsData.disabled && autoSetPlaceHolder;
        // RangePicker place is an array
        if (isCreatePlaceholder && component !== 'RangePicker' && component) {
          propsData.placeholder =
            componentProps?.placeholder || createPlaceholderMessage(component);
        }
        propsData.codeField = field;
        propsData.formValues = unref(getValues);

        const bindValue: Recordable<any> = {
          [valueField || (isCheck ? 'checked' : 'value')]: props.formModel[field],
        };

        const compAttr: Recordable<any> = {
          ...propsData,
          ...on,
          ...bindValue,
        };

        if (!renderComponentContent) {
          return <Comp {...compAttr} />;
        }
        const compSlot =
          typeof renderComponentContent === 'function'
            ? { ...renderComponentContent(unref(getValues)) }
            : {
                default: () => renderComponentContent,
              };
        return <Comp {...compAttr}>{compSlot}</Comp>;
      }

      function renderLabelHelpMessage() {
        const { label, helpMessage, helpComponentProps, subLabel } = props.schema;
        const renderLabel = subLabel ? (
          <span>
            {label} <span class="text-secondary">{subLabel}</span>
          </span>
        ) : (
          label
        );
        const getHelpMessage =
          typeof helpMessage === 'function' ? helpMessage(unref(getValues)) : helpMessage;
        if (!getHelpMessage || (Array.isArray(getHelpMessage) && getHelpMessage.length === 0)) {
          return renderLabel;
        }
        return (
          <span>
            {renderLabel}
            <EntHelp placement="top" class="mx-1" text={getHelpMessage} {...helpComponentProps} />
          </span>
        );
      }

      function renderItem() {
        const { formItemProps = {}, slot, render, field, suffix, label } = props.schema;
        const { baseFormItemProps = {} } = props.formProps;
        const getContent = () => {
          return slot
            ? getSlot(slots, slot, unref(getValues))
            : render
              ? render(unref(getValues))
              : renderComponent();
        };

        const showSuffix = !!suffix;
        const getSuffix = typeof suffix === 'function' ? suffix(unref(getValues)) : suffix;

        // TODO 自定义组件验证会出现问题，因此这里框架默认将自定义组件设置手动触发验证，如果其他组件还有此问题请手动设置autoLink=false
        // if (NO_AUTO_LINK_COMPONENTS.includes(component)) {
        //   props.schema &&
        //     (props.schema.itemProps! = {
        //       autoLink: false,
        //       ...props.schema.itemProps,
        //     });
        // }
        const itemProps = { ...baseFormItemProps, ...formItemProps };
        return (
          <NFormItem
            ref={formItemRef}
            class={{ 'suffix-item': showSuffix }}
            {...(itemProps as Recordable)}
            label={label}
            path={field}
            rule={handleRules()}
            v-model:value={props.formModel[field]}
            v-slots={{
              label: () => renderLabelHelpMessage(),
            }}
          >
            {getContent()}
            {showSuffix && <span class="suffix">{getSuffix}</span>}
          </NFormItem>
        );
      }

      return () => {
        const { colSlot, renderColContent, component } = props.schema;
        if (!componentMap.has(component)) {
          return null;
        }

        const { isIfShow, isShow } = getShow();
        const values = unref(getValues);

        const getContent = () => {
          return colSlot
            ? getSlot(slots, colSlot, values)
            : renderColContent
              ? renderColContent(values)
              : renderItem();
        };
        return isIfShow && isShow && getContent();
        // return (
        //   isIfShow && (
        //     <NGridItem {...realColProps} v-show={isShow}>
        //       {getContent()}
        //     </NGridItem>
        //   )
        // );
      };
    },
  });
</script>

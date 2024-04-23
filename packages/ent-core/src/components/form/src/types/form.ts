import type { basicProps } from '../props';
import type { VNode } from 'vue';
import type { ButtonProps } from '../../../button/interface';
import type { ComponentType, componentsRegistry } from './index';
import type { TableActionType } from '../../../table/src/types/table';
import type { ExtractPublicPropTypes, Recordable } from '../../../../types';
import type { GridItemProps } from 'naive-ui/es/grid';
import type { FormInst, FormItemProps, FormItemRule } from 'naive-ui/es/form';

export type FieldMapToTime = [string, [string, string], (string | [string, string])?][];

export interface RenderCallbackParams {
  schema: FormSchema;
  values: Recordable;
  model: Recordable;
  field: string;
}

export interface FormActionType extends FormInst {
  submit: () => Promise<void>;
  setFieldsValue: (values: Recordable) => Promise<void>;
  resetFields: () => Promise<void>;
  getFieldsValue: () => Recordable;
  updateSchema: (data: Partial<FormSchema> | Partial<FormSchema>[]) => Promise<void>;
  resetSchema: (data: Partial<FormSchema> | Partial<FormSchema>[]) => Promise<void>;
  setProps: (formProps: Partial<FormProps>) => Promise<void>;
  removeSchemaByField: (field: string | string[]) => Promise<void>;
  appendSchemaByField: (
    schema: FormSchema | FormSchema[],
    prefixField: string | undefined,
    first?: boolean | undefined
  ) => Promise<void>;
}

export type FormRegisterFn = (formInstance: FormActionType) => void;

export type UseFormReturnType = [FormRegisterFn, FormActionType];

export type FormButtonOptions = Partial<ButtonProps> & { btnContent?: string };

export interface FormProps extends ExtractPublicPropTypes<typeof basicProps> {}

export interface FormSchema extends DynamicComponentProps<ComponentType> {
  // Field name
  field: string;
  // Event name triggered by internal value change, default update
  changeEvent?: string;
  // Variable name bound to v-model Default value
  valueField?: string;
  // Label name
  label: string;
  // Auxiliary text
  subLabel?: string;
  // Help text on the right side of the text
  helpMessage?:
    | string
    | string[]
    | ((renderCallbackParams: RenderCallbackParams) => string | string[]);
  // BaseHelp component props
  helpComponentProps?: Partial<HelpComponentProps>;
  // Label width, if it is passed, the labelCol and WrapperCol configured by itemProps will be invalid
  labelWidth?: string | number;
  /**
   * Disable the adjustment of labelWidth with global settings of formModel, and manually set labelCol and wrapperCol by yourself
   */
  disabledLabelWidth?: boolean;

  // Required
  required?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean);

  suffix?: string | number | ((values: RenderCallbackParams) => string | number);

  /**
   * Validation rules
   */
  rules?: FormItemRule[];
  /**
   * Check whether the information is added to the label
   */
  rulesMessageJoinLabel?: boolean;

  /**
   * Reference formModelItem
   */
  formItemProps?: Partial<FormItemProps>;

  /**
   * col configuration outside formModelItem
   */
  gridItemProps?: Partial<GridItemProps>;

  /**
   * 默认值
   */
  defaultValue?: any;

  isAdvanced?: boolean;

  // Matching details components
  span?: number;

  /**
   * 是否显示，可以根据其他输入选项的值，做一些联动
   */
  ifShow?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean);

  show?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean);
  /**
   *  Render the content in the form-item tag
   * @param renderCallbackParams
   */
  render?: (renderCallbackParams: RenderCallbackParams) => VNode | VNode[] | string;

  /**
   * Rendering col content requires outer wrapper form-item
   * @param renderCallbackParams
   */
  renderColContent?: (renderCallbackParams: RenderCallbackParams) => VNode | VNode[] | string;

  renderComponentContent?:
    | ((renderCallbackParams: RenderCallbackParams) => any)
    | VNode
    | VNode[]
    | string;

  /**
   * Custom slot, in from-item
   */
  slot?: string;

  /**
   * Custom slot, similar to renderColContent
   */
  colSlot?: string;
  dynamicDisabled?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean);

  dynamicRules?: (renderCallbackParams: RenderCallbackParams) => FormItemRule[];
}
export interface HelpComponentProps {
  maxWidth: string;
  // Whether to display the serial number
  showIndex: boolean;
  // Text list
  text: any;
  // colour
  color: string;
  // font size
  fontSize: string;
  icon: string;
  absolute: boolean;
  // Positioning
  position: any;
}

// 定义动态组件的props类型
export type DynamicComponentProps<T extends ComponentType> = {
  component: T;
  componentProps?:
    | ExtractPublicPropTypes<(typeof componentsRegistry)[T]['props']>
    | ((opt: {
        schema: FormSchema;
        tableAction: TableActionType;
        formActionType: FormActionType;
        formModel: Recordable;
      }) => Recordable);
};

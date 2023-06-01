import type { PropType } from 'vue';
import type { ButtonType } from 'ant-design-vue/es/button';

export const buttonProps = {
  color: { type: String, validator: (v) => ['error', 'warning', 'success', ''].includes(v) },
  loading: { type: Boolean },
  disabled: { type: Boolean },
  type: {
    type: String as PropType<ButtonType>,
    default: 'default',
  },
  ghost: { type: Boolean, default: undefined },
  title: { type: String },
  /**
   * Icon before text.
   */
  preIcon: { type: String },
  /**
   * Icon after text.
   */
  postIcon: { type: String },
  /**
   * preIcon and postIcon icon size.
   * @default: 14
   */
  iconSize: { type: Number, default: 14 },
  onClick: { type: Function as PropType<(...args) => any>, default: null },
};

import { buttonProps } from 'ant-design-vue/es/button/buttonTypes';
export const btnProps = {
  /**
   * 按钮文本前图标，参考 Icon 组件
   */
  preIcon: { type: String },
  /**
   * 按钮文本后图标，参考 Icon 组件
   */
  postIcon: { type: String },
  /**
   * 按钮图标大小
   */
  iconSize: { type: Number, default: 14 },
  //onClick: { type: Function as PropType<(...args) => any>, default: null },
  ...buttonProps(),
};

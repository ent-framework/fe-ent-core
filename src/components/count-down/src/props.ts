import type { PropType } from 'vue';
import type { Size } from 'naive-ui/es/input/src/interface';

export const countDownInputProps = {
  /**
   * 绑定值
   */
  value: { type: String },
  /**
   * 输入框即按钮大小
   */
  size: {
    type: String as PropType<Size>,
    default: 'medium',
  },
  /**
   * 倒计时时间(秒)
   */
  count: { type: Number, default: 60 },
  /**
   * 倒计时之前执行的函数，返回 true 才会开始执行
   */
  sendCodeApi: {
    type: Function as PropType<() => Promise<boolean>>,
    default: null,
  },
};

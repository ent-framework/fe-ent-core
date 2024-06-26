import { drawerProps } from 'naive-ui/es/drawer';
import { type Recordable } from '../../../types';
import type { DrawerContentProps } from 'naive-ui/es/drawer';
import type { PropType } from 'vue';

export const footerProps = {
  /**
   *
   */
  confirmLoading: { type: Boolean },
  /**
   * 是否显示取消按钮
   */
  showCancelBtn: { type: Boolean, default: true },
  /**
   * 取消按钮绑定的属性
   */
  cancelButtonProps: Object as PropType<Recordable>,
  /**
   * 取消按钮文本
   */
  cancelText: { type: String },
  /**
   * 是否显示确认按钮
   */
  showOkBtn: { type: Boolean, default: true },
  /**
   * 确认按钮属性
   */
  okButtonProps: Object as PropType<Recordable>,
  /**
   * 确认按文本
   */
  okText: { type: String },
  /**
   * 确认按钮类型
   */
  okType: { type: String, default: 'primary' },
  /**
   * 是否显示底部
   */
  showFooter: { type: Boolean, default: true }
};

export const basicProps = {
  ...drawerProps,
  /**
   * 抽屉标题
   */
  title: { type: String },
  /**
   * 是否明细页面
   */
  isDetail: { type: Boolean },
  //title: { type: String, default: '' },
  /**
   * 装载中显示文本
   */
  loadingText: { type: String },
  /**
   * 是否显示退回按钮
   */
  showDetailBack: { type: Boolean, default: true },
  //visible: { type: Boolean },
  /**
   * 是否正在装载
   */
  loading: { type: Boolean },
  //maskClosable: { type: Boolean, default: true },
  // getContainer: {
  //   type: [Object, String] as PropType<any>,
  // },
  /**
   * 关闭后回调函数
   */
  closeFunc: {
    type: [Function, Object] as PropType<any>,
    default: null
  },
  /**
   *
   */
  content: {
    type: Object as PropType<DrawerContentProps>,
    default: () => ({
      closable: true
    })
  },
  //destroyOnClose: { type: Boolean },
  ...footerProps
};

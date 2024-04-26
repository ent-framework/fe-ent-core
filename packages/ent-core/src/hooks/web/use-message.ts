import { h } from 'vue';
import { CheckCircleFilled, CloseCircleFilled, InfoCircleFilled } from '@vicons/antd';
import { useI18n } from './use-i18n';
import type {
  DialogOptions,
  MessageProviderInst,
  ModalOptions,
  NotificationProviderInst
} from 'naive-ui';

export declare type IconType = 'default' | 'error' | 'info' | 'success' | 'warning';

/**
 * @description: Create confirmation box
 */
function createConfirm(options: DialogOptions & { iconType: IconType }) {
  const iconType = options.iconType || 'warning';
  Reflect.deleteProperty(options, 'iconType');
  const { t } = useI18n();
  const opt: DialogOptions = {
    type: iconType,
    icon: () => {
      if (iconType === 'warning') {
        return h(InfoCircleFilled, { class: 'modal-icon-warning' });
      } else if (iconType === 'success') {
        return h(CheckCircleFilled, { class: 'modal-icon-success' });
      } else if (iconType === 'info') {
        return h(InfoCircleFilled, { class: 'modal-icon-info' });
      } else {
        return h(CloseCircleFilled, { class: 'modal-icon-error' });
      }
    },
    positiveText: t('common.okText'),
    negativeText: t('common.cancelText'),
    ...options
  };
  window.$dialog?.create(opt);
}

const getBaseOptions = (): ModalOptions => {
  return {
    closable: true
  };
};

function createModalOptions(setupOptions: ModalOptions, iconType: string): ModalOptions {
  const { to } = setupOptions;
  const { t } = useI18n();
  return {
    ...getBaseOptions(),
    positiveText: t('common.okText'),
    negativeText: t('common.cancelText'),
    ...setupOptions,
    icon: () => {
      if (iconType === 'warning') {
        return h(InfoCircleFilled, { class: 'modal-icon-warning' });
      } else if (iconType === 'success') {
        return h(CheckCircleFilled, { class: 'modal-icon-success' });
      } else if (iconType === 'info') {
        return h(InfoCircleFilled, { class: 'modal-icon-info' });
      } else {
        return h(CloseCircleFilled, { class: 'modal-icon-error' });
      }
    },
    to: to ?? document.body,
    preset: 'dialog'
  };
}

function createSuccessModal(options: ModalOptions) {
  return window.$modal?.create({ type: 'success', ...createModalOptions(options, 'success') });
}

function createErrorModal(options: ModalOptions) {
  return window.$modal?.create({ type: 'error', ...createModalOptions(options, 'error') });
}

function createInfoModal(options: ModalOptions) {
  return window.$modal?.create({ type: 'info', ...createModalOptions(options, 'info') });
}

function createWarningModal(options: ModalOptions) {
  return window.$modal?.create({ type: 'warning', ...createModalOptions(options, 'warning') });
}

/**
 * @description: message
 */
export function useMessage() {
  return {
    createMessage: window.$message as MessageProviderInst,
    notification: window.$notification as NotificationProviderInst,
    createConfirm,
    createSuccessModal,
    createErrorModal,
    createInfoModal,
    createWarningModal
  };
}

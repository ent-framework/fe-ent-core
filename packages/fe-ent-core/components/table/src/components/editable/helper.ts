import { useI18n } from '@ent-core/hooks/web/use-i18n';
import type { ComponentType } from '../../types/component-type';

/**
 * @description: 生成placeholder
 */
export function createPlaceholderMessage(component: ComponentType) {
  const { t } = useI18n();
  if (component.includes('Input') || component.includes('AutoComplete')) {
    return t('common.inputText');
  }
  if (component.includes('Picker')) {
    return t('common.chooseText');
  }

  if (
    component.includes('Select') ||
    component.includes('Checkbox') ||
    component.includes('Radio') ||
    component.includes('Switch') ||
    component.includes('DatePicker') ||
    component.includes('TimePicker')
  ) {
    return t('common.chooseText');
  }
  return '';
}

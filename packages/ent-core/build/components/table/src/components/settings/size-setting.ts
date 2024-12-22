
  import { defineComponent, ref } from 'vue';
  import { NPopselect, NTooltip } from 'naive-ui';
  import { EntIcon } from '../../../../../components/icon';
  import { useI18n } from '../../../../../hooks/web/use-i18n';
  import { getPopupContainer } from '../../../../../utils';
  import { useTableContext } from '../../hooks/use-table-context';
  import type { DropdownOption } from 'naive-ui/es/dropdown';
  import type { SizeType } from '../../types/table';

  export default defineComponent({
    name: 'SizeSetting',
    components: {
      NTooltip,
      NPopselect,
      EntIcon
    },
    setup() {
      const table = useTableContext();
      const { t } = useI18n();

      const selectedKeysRef = ref<SizeType>(table.getSize());

      function handleTitleClick(value: SizeType) {
        selectedKeysRef.value = value;
        table.setProps({
          size: value
        });
      }

      const sizeOptions: DropdownOption[] = [
        {
          value: 'small',
          label: t('component.table.settingDensSmall')
        },
        {
          value: 'medium',
          label: t('component.table.settingDensMiddle')
        },
        {
          value: 'large',
          label: t('component.table.settingDensLarge')
        }
      ];

      return {
        handleTitleClick,
        selectedKeysRef,
        getPopupContainer,
        sizeOptions,
        t
      };
    }
  });

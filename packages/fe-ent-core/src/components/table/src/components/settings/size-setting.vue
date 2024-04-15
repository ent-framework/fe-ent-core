<template>
  <NTooltip placement="top" trigger="hover">
    <template #trigger>
      <NPopselect
        v-model:value="selectedKeysRef"
        placement="bottom"
        trigger="click"
        :options="sizeOptions"
        @update:value="handleTitleClick"
      >
        <EntIcon icon="ant-design:column-height-outlined" />
      </NPopselect>
    </template>
    <span>{{ t('component.table.settingDens') }}</span>
  </NTooltip>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { NPopselect, NTooltip } from 'naive-ui';
  import { EntIcon } from '@ent-core/components/icon';
  import { useI18n } from '@ent-core/hooks/web/use-i18n';
  import { getPopupContainer } from '@ent-core/utils';
  import { useTableContext } from '../../hooks/use-table-context';
  import type { DropdownOption } from 'naive-ui/es/dropdown';
  import type { SizeType } from '../../types/table';

  export default defineComponent({
    name: 'SizeSetting',
    components: {
      NTooltip,
      NPopselect,
      EntIcon,
    },
    setup() {
      const table = useTableContext();
      const { t } = useI18n();

      const selectedKeysRef = ref<SizeType>(table.getSize());

      function handleTitleClick(value: SizeType) {
        selectedKeysRef.value = value;
        table.setProps({
          size: value,
        });
      }

      const sizeOptions: DropdownOption[] = [
        {
          value: 'small',
          label: t('component.table.settingDensSmall'),
        },
        {
          value: 'medium',
          label: t('component.table.settingDensMiddle'),
        },
        {
          value: 'large',
          label: t('component.table.settingDensLarge'),
        },
      ];

      return {
        handleTitleClick,
        selectedKeysRef,
        getPopupContainer,
        sizeOptions,
        t,
      };
    },
  });
</script>

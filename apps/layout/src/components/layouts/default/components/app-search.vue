<script lang="tsx">
  import { defineComponent, ref, unref } from 'vue';
  import { NTooltip } from 'naive-ui';
  import { EntIcon } from 'fe-ent-core';
  import { useI18n } from 'fe-ent-core/es/hooks';
  import AppSearchModal from './app-search-modal.vue';

  export default defineComponent({
    name: 'AppSearch',
    setup() {
      const showModal = ref(false);
      const { t } = useI18n();

      function changeModal(show: boolean) {
        showModal.value = show;
      }

      return () => {
        return (
          <div class="p-1" onClick={changeModal.bind(null, true)}>
            <NTooltip>
              {{
                footer: () => t('common.searchText'),
                trigger: () => <EntIcon icon="ant-design:search-outlined" />,
              }}
            </NTooltip>
            <AppSearchModal onClose={changeModal.bind(null, false)} visible={unref(showModal)} />
          </div>
        );
      };
    },
  });
</script>

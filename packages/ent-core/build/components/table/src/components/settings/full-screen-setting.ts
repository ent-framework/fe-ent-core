
  import { defineComponent } from 'vue';
  import { NTooltip } from 'naive-ui';
  import { useFullscreen } from '@vueuse/core';
  import { EntIcon } from '../../../../../components/icon';
  import { useI18n } from '../../../../../hooks/web/use-i18n';
  import { useTableContext } from '../../hooks/use-table-context';

  export default defineComponent({
    name: 'FullScreenSetting',
    components: {
      NTooltip,
      EntIcon
    },

    setup() {
      const table = useTableContext();
      const { t } = useI18n();
      const { toggle, isFullscreen } = useFullscreen(table.wrapRef);

      return {
        toggle,
        isFullscreen,
        t
      };
    }
  });

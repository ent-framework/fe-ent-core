
  import { defineComponent, ref, unref, watch, watchEffect } from 'vue';
  import { NEmpty, NFlex, NInput, NPagination, NPopover } from 'naive-ui';
  import { useDesign } from '../../../hooks/web/use-design';
  import { EntScrollContainer } from '../../../components/container';

  import { usePagination } from '../../../hooks/web/use-pagination';
  import { useI18n } from '../../../hooks/web/use-i18n';
  import { useCopyToClipboard } from '../../../hooks/web/use-copy-to-clipboard';
  import { useMessage } from '../../../hooks/web/use-message';
  import { useIconData } from './use-icon-data';
  import Icon from './icon';

  export default defineComponent({
    name: 'EntIconPicker',
    components: {
      EntScrollContainer,
      Icon,
      NEmpty,
      NInput,
      NPopover,
      NPagination,
      NFlex
    },
    props: {
      value: {
        type: String
      },
      width: {
        type: String,
        default: '100%'
      },
      pageSize: {
        type: Number,
        default: 40
      },
      copy: {
        type: Boolean,
        default: false
      }
    },
    emits: ['change', 'update:value'],
    setup(props, { emit }) {
      const { getIconData } = useIconData();
      const icons = Array.from(getIconData().keys());

      const currentSelect = ref('');
      const currentSearchText = ref('');
      const currentList = ref(icons);

      const { t } = useI18n();
      const { prefixCls } = useDesign('icon-picker');
      const { clipboardRef, isSuccessRef } = useCopyToClipboard(props.value);
      const { createMessage } = useMessage();

      const { getPaginationList, getTotal, setCurrentPage } = usePagination(
        currentList,
        props.pageSize
      );

      watchEffect(() => {
        currentSelect.value = props.value;
      });

      watch(
        () => currentSelect.value,
        (v) => {
          emit('update:value', v);
          return emit('change', v);
        }
      );

      function handlePageChange(page: number) {
        setCurrentPage(page);
      }

      function handleClick(icon: string) {
        currentSelect.value = icon;
        if (props.copy) {
          clipboardRef.value = icon;
          if (unref(isSuccessRef)) {
            createMessage.success(t('component.icon.copy'));
          }
        }
      }

      function handleSearchChange(value: string) {
        currentSearchText.value = value;
        if (!value) {
          setCurrentPage(1);
          currentList.value = icons;
          return;
        }
        currentList.value = icons.filter((item) => item.includes(value));
      }
      return {
        prefixCls,
        currentSelect,
        currentSearchText,
        handleSearchChange,
        getPaginationList,
        getTotal,
        handleClick,
        handlePageChange,
        t
      };
    }
  });

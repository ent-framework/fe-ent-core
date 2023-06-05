<template>
  <span :class="`${prefixCls}- flex items-center `">
    <Icon v-if="getIcon" :icon="getIcon" :size="18" :class="`${prefixCls}-wrapper__icon mr-2`" />
    {{ getI18nName }}
  </span>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue';

  import Icon from 'fe-ent-core/es/components/icon';
  import { useI18n } from 'fe-ent-core/es/hooks/web/use-i18n';
  import { useDesign } from 'fe-ent-core/es/hooks/web/use-design';
  import { contentProps } from '../props';

  export default defineComponent({
    name: 'MenuItemContent',
    components: {
      Icon,
    },
    props: contentProps,
    setup(props) {
      const { t } = useI18n();
      const { prefixCls } = useDesign('basic-menu-item-content');
      const getI18nName = computed(() => t(props.item?.name));
      const getIcon = computed(() => props.item?.icon);

      return {
        prefixCls,
        getI18nName,
        getIcon,
      };
    },
  });
</script>

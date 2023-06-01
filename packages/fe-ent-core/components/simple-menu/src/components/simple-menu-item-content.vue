<template>
  <span :class="`${prefixCls}- flex items-center `">
    <Icon v-if="getIcon" :icon="getIcon" :size="18" :class="`${prefixCls}-wrapper__icon mr-2`" />
    {{ getI18nName }}
  </span>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue';
  import Icon from '@ent-core/components/icon';
  import { useI18n } from '@ent-core/hooks/web/use-i18n';
  import { useDesign } from '@ent-core/hooks/web/use-design';
  import { contentProps } from '../props';

  export default defineComponent({
    name: 'MenuItemContent',
    components: {
      Icon,
    },
    props: contentProps,
    setup(props) {
      const { t } = useI18n();
      const { prefixCls } = useDesign('simple-menu-item-content');
      const getI18nName = computed(() => {
        const name = t(props.item?.name);
        const isParent = props.parent;
        if (props.collapse) {
          if (!props.collapsedShowTitle && isParent) {
            // 判断有没有ICON，没有icon会造成带单空白没显示
            if (!props.item?.icon && name.length > 0) return name.charAt(0);
            return '';
          }
        }
        return name;
      });
      const getIcon = computed(() => props.item?.icon);
      const getShowTitle = computed(() => !props.collapse);

      return {
        prefixCls,
        getI18nName,
        getIcon,
        getShowTitle,
      };
    },
  });
</script>

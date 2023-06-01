<template>
  <MenuItem :key="item.path" :title="getFullI18nName">
    <SimpleMenuItemContent v-bind="$props" :item="item" />
  </MenuItem>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue';
  import { Menu } from 'ant-design-vue';
  import { useI18n } from '@ent-core/hooks/web/use-i18n';
  import { itemProps } from '../props';

  import SimpleMenuItemContent from './simple-menu-item-content.vue';
  export default defineComponent({
    name: 'SimpleMenuItem',
    components: { MenuItem: Menu.Item, SimpleMenuItemContent },
    props: itemProps,
    setup(props) {
      const { t } = useI18n();
      const getFullI18nName = computed(() => t(props.item?.name));

      return {
        getFullI18nName,
      };
    },
  });
</script>

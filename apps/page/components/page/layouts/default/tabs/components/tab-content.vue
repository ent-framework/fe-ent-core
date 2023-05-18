<template>
  <EntDropdown
    :drop-menu-list="getDropMenuList"
    :trigger="getTrigger"
    @menu-event="handleMenuEvent"
  >
    <div v-if="getIsTabs" :class="`${prefixCls}__info`" @contextmenu="handleContext">
      <span class="ml-1">{{ getTitle }}</span>
    </div>
    <span v-else :class="`${prefixCls}__extra-quick`" @click="handleContext">
      <EntIcon icon="ion:chevron-down" />
    </span>
  </EntDropdown>
</template>
<script lang="ts">
  import { computed, defineComponent, unref } from 'vue';
  import { EntDropdown, EntIcon } from 'fe-ent-core/lib/components';

  import { useDesign, useI18n } from 'fe-ent-core/lib/hooks';
  import { useTabDropdown } from '../use-tab-dropdown';
  import type { TabContentProps } from '../types';
  import type { RouteLocationNormalized } from 'vue-router';
  import type { PropType } from 'vue';

  export default defineComponent({
    name: 'TabContent',
    components: { EntDropdown, EntIcon },
    props: {
      tabItem: {
        type: Object as PropType<RouteLocationNormalized>,
        default: null,
      },
      isExtra: Boolean,
    },
    setup(props) {
      const { prefixCls } = useDesign('multiple-tabs-content');
      const { t } = useI18n();

      const getTitle = computed(() => {
        const { tabItem: { meta } = {} } = props;
        return meta && t(meta.title as string);
      });

      const getIsTabs = computed(() => !props.isExtra);

      const getTrigger = computed((): ('contextmenu' | 'click' | 'hover')[] =>
        unref(getIsTabs) ? ['contextmenu'] : ['click'],
      );

      const { getDropMenuList, handleMenuEvent, handleContextMenu } = useTabDropdown(
        props as TabContentProps,
        getIsTabs,
      );

      function handleContext(e) {
        props.tabItem && handleContextMenu(props.tabItem)(e);
      }

      return {
        prefixCls,
        getDropMenuList,
        handleMenuEvent,
        handleContext,
        getTrigger,
        getIsTabs,
        getTitle,
      };
    },
  });
</script>

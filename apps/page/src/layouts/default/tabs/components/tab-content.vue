<template>
  <EntDropdown :dropMenuList="getDropMenuList" :trigger="getTrigger" @menu-event="handleMenuEvent">
    <div :class="`${prefixCls}__info`" @contextmenu="handleContext" v-if="getIsTabs">
      <span class="ml-1">{{ getTitle }}</span>
    </div>
    <span :class="`${prefixCls}__extra-quick`" v-else @click="handleContext">
      <EntIcon icon="ion:chevron-down" />
    </span>
  </EntDropdown>
</template>
<script lang="ts">
  import type { PropType } from 'vue';
  import type { RouteLocationNormalized } from 'vue-router';

  import { defineComponent, computed, unref } from 'vue';
  import { EntDropdown } from 'fe-ent-core/lib/components';
  import { EntIcon } from 'fe-ent-core/lib/components';

  import { TabContentProps } from '../types';

  import { useDesign } from 'fe-ent-core/lib/hooks';
  import { useI18n } from 'fe-ent-core/lib/hooks';
  import { useTabDropdown } from '../use-tab-dropdown';

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

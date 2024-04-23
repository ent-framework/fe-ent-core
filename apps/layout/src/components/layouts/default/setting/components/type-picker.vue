<template>
  <div :class="prefixCls">
    <template v-for="item in menuTypeList || []" :key="item.title">
      <NTooltip placement="bottom">
        <template #trigger>
          <div
            :class="[
              `${prefixCls}__item`,
              `${prefixCls}__item--${item.type}`,
              {
                [`${prefixCls}__item--active`]: def === item.type
              }
            ]"
            @click="handler(item)"
          >
            <div class="mix-sidebar" />
          </div>
        </template>
        {{ item.title }}
      </NTooltip>
    </template>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { NTooltip } from 'naive-ui';
  import { useDesign } from 'fe-ent-core/es/hooks';
  import type { PropType } from 'vue';
  import type { Fn } from 'fe-ent-core/es/types';
  import type { MenuType } from '../enum';
  export default defineComponent({
    name: 'MenuTypePicker',
    components: { NTooltip },
    props: {
      menuTypeList: {
        type: Array as PropType<MenuType[]>,
        default: () => []
      },
      handler: {
        type: Function as PropType<Fn>,
        default: () => ({})
      },
      def: {
        type: String,
        default: ''
      }
    },
    setup() {
      const { prefixCls } = useDesign('setting-menu-type-picker');

      return {
        prefixCls
      };
    }
  });
</script>

<template>
  <div :class="prefixCls">
    <template v-for="theme in themeSettings || []" :key="theme.name">
      <span
        :class="[
          `${prefixCls}__item`,
          {
            [`${prefixCls}__item--active`]: def === theme.name
          }
        ]"
        :style="{ background: theme.themeOverrides.common?.primaryColor }"
        @click="handleClick(theme)"
      >
        <EntIcon icon="ant-design:check-outlined" />
      </span>
    </template>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { EntIcon } from 'fe-ent-core';
  import { useDesign } from 'fe-ent-core/es/hooks';
  import { Factory } from 'fe-ent-core/es/logics';
  import type { ThemeSetting } from 'fe-ent-core/es/store/types';

  import type { PropType } from 'vue';
  import type { HandlerEnum } from '../enum';
  import type { Fn } from 'fe-ent-core/es/types';

  export default defineComponent({
    name: 'ThemeColorPicker',
    components: { EntIcon },
    props: {
      event: {
        type: Number as PropType<HandlerEnum>
      },
      handler: {
        type: Function as PropType<Fn>,
        default: () => ({})
      },
      def: {
        type: String
      }
    },
    setup(props) {
      const { prefixCls } = useDesign('setting-theme-picker');
      const themeSettings = Factory.getLayoutFactory().getThemeSettings();

      function handleClick(theme: ThemeSetting) {
        props.event &&
          props.handler &&
          props.handler(props.event, { name: theme.name, token: theme.themeOverrides });
      }
      return {
        prefixCls,
        handleClick,
        themeSettings
      };
    }
  });
</script>

<template>
  <Button v-bind="getBindValue" :class="getClass" :style="getButtonStyle" @click="onClick">
    <template #default="data">
      <Icon v-if="preIcon" :icon="preIcon" :size="iconSize" />
      <slot v-bind="data || {}" />
      <Icon v-if="postIcon" :icon="postIcon" :size="iconSize" />
    </template>
  </Button>
</template>

<script lang="ts">
  import { computed, defineComponent, unref } from 'vue';
  import { Button } from 'ant-design-vue';
  import { useConfigContextInject } from 'ant-design-vue/es/config-provider/context';
  import Icon from '@ent-core/components/icon/src/icon.vue';
  import { useAttrs } from '@ent-core/hooks/core/use-attrs';
  import { useTheme } from '@ent-core/hooks';
  import { btnProps } from './props';
  import type { CSSProperties } from 'vue';

  /**
   * @docLocation https://raw.githubusercontent.com/vueComponent/ant-design-vue/4.0.0/components/button/index.zh-CN.md
   * @extends Button
   * @docLink https://next.antdv.com/components/button-cn
   */
  export default defineComponent({
    name: 'EntButton',
    components: {
      Button,
      Icon,
    },
    inheritAttrs: false,
    props: btnProps,
    setup(props) {
      const attrs = useAttrs({ excludeDefaultKeys: false });
      const { useToken } = useTheme();
      const { token } = useToken();

      const appContext = useConfigContextInject();
      const globalPrefix = appContext.getPrefixCls();

      const getClass = computed(() => {
        const classNames: string[] = [];
        const { color } = props;
        if (color) {
          classNames.push(`--${globalPrefix}-${color}-color`);
        }
        return classNames;
      });

      const getButtonStyle = computed((): CSSProperties => {
        const { color, type, ghost } = props;
        const tokenValues = unref(token);
        if (color && !ghost) {
          if (type === 'primary' || type === 'default') {
            switch (color) {
              case 'success':
                return {
                  color: tokenValues.colorTextLightSolid,
                  backgroundColor: tokenValues.colorSuccess,
                };
              case 'warning':
                return {
                  color: tokenValues.colorTextLightSolid,
                  backgroundColor: tokenValues.colorWarning,
                  borderColor: tokenValues.colorWarningBorderHover,
                };
              case 'error':
                return {
                  color: tokenValues.colorTextLightSolid,
                  backgroundColor: tokenValues.colorError,
                  borderColor: tokenValues.colorErrorBorderHover,
                };
              default:
                return {
                  color: tokenValues.colorTextLightSolid,
                  backgroundColor: tokenValues.colorPrimary,
                };
            }
          }
          if (type === 'link' || ghost) {
            switch (color) {
              case 'success':
                return { color: tokenValues.colorSuccess };
              case 'warning':
                return { color: tokenValues.colorWarning };
              case 'error':
                return { color: tokenValues.colorError };
              default:
                return { color: tokenValues.colorPrimary };
            }
          }
        }
        return {};
      });

      // get inherit binding value
      const getBindValue = computed(() => ({ ...unref(attrs), ...props }));
      return {
        getBindValue,
        getButtonStyle,
        getClass,
      };
    },
  });
</script>

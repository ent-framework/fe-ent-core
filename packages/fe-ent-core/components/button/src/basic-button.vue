<template>
  <Button v-bind="getBindValue" :style="getButtonStyle" @click="onClick">
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
  import Icon from '@ent-core/components/icon/src/icon.vue';
  import { useAttrs } from '@ent-core/hooks/core/use-attrs';
  import { useTheme } from '@ent-core/hooks';
  import { buttonProps } from './props';
  import type { CSSProperties } from 'vue';

  export default defineComponent({
    name: 'EntButton',
    components: {
      Button,
      Icon,
    },
    extends: Button,
    inheritAttrs: false,
    props: buttonProps,
    setup(props) {
      const attrs = useAttrs({ excludeDefaultKeys: false });
      const { useToken } = useTheme();
      const { token } = useToken();

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
      };
    },
  });
</script>

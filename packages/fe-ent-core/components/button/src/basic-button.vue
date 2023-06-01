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
      const { token } = useTheme();

      const getButtonStyle = computed((): CSSProperties => {
        const { color, type, ghost } = props;
        if (color && !ghost) {
          if (type === 'primary' || type === 'default') {
            switch (color) {
              case 'success':
                return {
                  color: token.value.colorTextLightSolid,
                  backgroundColor: token.value.colorSuccess,
                };
              case 'warning':
                return {
                  color: token.value.colorTextLightSolid,
                  backgroundColor: token.value.colorWarning,
                  borderColor: token.value.colorWarningBorderHover,
                };
              case 'error':
                return {
                  color: token.value.colorTextLightSolid,
                  backgroundColor: token.value.colorError,
                  borderColor: token.value.colorErrorBorderHover,
                };
              default:
                return {
                  color: token.value.colorTextLightSolid,
                  backgroundColor: token.value.colorPrimary,
                };
            }
          }
          if (type === 'link' || ghost) {
            switch (color) {
              case 'success':
                return { color: token.value.colorSuccess };
              case 'warning':
                return { color: token.value.colorWarning };
              case 'error':
                return { color: token.value.colorError };
              default:
                return { color: token.value.colorPrimary };
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

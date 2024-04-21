<template>
  <NButton v-bind="getBindValue">
    <slot />
  </NButton>
</template>

<script lang="ts">
  import { computed, defineComponent, h, unref } from 'vue';
  import { NButton } from 'naive-ui';
  import Icon from '../../../components/icon/src/icon.vue';
  import { useAttrs } from '../../../hooks';
  import { btnProps } from './props';

  export default defineComponent({
    name: 'EntButton',
    extends: NButton,
    inheritAttrs: false,
    props: btnProps,
    setup(props) {
      const attrs = useAttrs({ excludeDefaultKeys: false });
      const getRenderIcon = computed(() => {
        const { icon } = props;
        if (icon) {
          return {
            renderIcon: () => {
              return h(Icon, { icon, size: props.iconSize });
            },
          };
        }
        return {};
      });
      const getBindValue = computed(() => ({ ...unref(attrs), ...props, ...unref(getRenderIcon) }));
      return {
        getBindValue,
      };
    },
  });
</script>

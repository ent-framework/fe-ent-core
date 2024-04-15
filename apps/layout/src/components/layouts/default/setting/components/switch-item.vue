<template>
  <div :class="prefixCls">
    <NText> {{ title }}</NText>
    <NSwitch :value="getBindValue" :disabled="disabled" @update:value="handleChange">
      <template #checked>
        {{ t('layout.setting.on') }}
      </template>
      <template #unchecked>
        {{ t('layout.setting.off') }}
      </template>
    </NSwitch>
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue';
  import { NSwitch, NText } from 'naive-ui';
  import { useDesign, useI18n } from 'fe-ent-core/es/hooks';
  import type { PropType } from 'vue';
  import type { HandlerEnum } from '../enum';
  import type { ChangeEvent, Fn } from 'fe-ent-core/es/types';

  export default defineComponent({
    name: 'SwitchItem',
    components: { NSwitch, NText },
    props: {
      event: {
        type: Number as PropType<HandlerEnum>,
      },
      handler: {
        type: Function as PropType<Fn>,
        default: () => ({}),
      },
      disabled: {
        type: Boolean,
      },
      title: {
        type: String,
      },
      def: {
        type: Boolean,
      },
    },
    setup(props) {
      const { prefixCls } = useDesign('setting-switch-item');
      const { t } = useI18n();

      const getBindValue = computed(() => {
        return props.def;
      });
      function handleChange(e: ChangeEvent) {
        props.event && props.handler && props.handler(props.event, e);
      }
      return {
        prefixCls,
        t,
        handleChange,
        getBindValue,
      };
    },
  });
</script>

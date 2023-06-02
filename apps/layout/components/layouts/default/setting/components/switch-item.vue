<template>
  <div :class="prefixCls">
    <Text> {{ title }}</Text>
    <Switch
      v-bind="getBindValue"
      :disabled="disabled"
      :checked-children="t('layout.setting.on')"
      :un-checked-children="t('layout.setting.off')"
      @change="handleChange"
    />
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue';

  import { Switch, Typography } from 'ant-design-vue';
  import { useDesign, useI18n } from 'fe-ent-core/es/hooks';
  import { baseHandler } from '../handler';
  import type { PropType } from 'vue';
  import type { HandlerEnum } from '../enum';
  import type { ChangeEvent } from 'fe-ent-core/es/types';

  export default defineComponent({
    name: 'SwitchItem',
    components: { Switch, Text: Typography.Text },
    props: {
      event: {
        type: Number as PropType<HandlerEnum>,
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
        return props.def ? { checked: props.def } : {};
      });
      function handleChange(e: ChangeEvent) {
        props.event && baseHandler(props.event, e);
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

<template>
  <div :class="prefixCls">
    <template v-for="color in colorList || []" :key="color">
      <span
        :class="[
          `${prefixCls}__item`,
          {
            [`${prefixCls}__item--active`]: def === color,
          },
        ]"
        :style="{ background: color }"
        @click="handleClick(color)"
      >
        <CheckOutlined />
      </span>
    </template>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { CheckOutlined } from '@ant-design/icons-vue';

  import { useDesign } from 'fe-ent-core/lib/hooks';

  import { baseHandler } from '../handler';
  import type { PropType } from 'vue';
  import type { HandlerEnum } from '../enum';

  export default defineComponent({
    name: 'ThemeColorPicker',
    components: { CheckOutlined },
    props: {
      colorList: {
        type: Array as PropType<string[]>,
        defualt: [],
      },
      event: {
        type: Number as PropType<HandlerEnum>,
      },
      def: {
        type: String,
      },
    },
    setup(props) {
      const { prefixCls } = useDesign('setting-theme-picker');

      function handleClick(color: string) {
        props.event && baseHandler(props.event, color);
      }
      return {
        prefixCls,
        handleClick,
      };
    },
  });
</script>

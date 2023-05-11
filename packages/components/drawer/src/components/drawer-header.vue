<template>
  <EntTitle v-if="!isDetail" :class="prefixCls">
    <slot name="title"></slot>
    {{ !$slots.title ? title : '' }}
  </EntTitle>

  <div :class="[prefixCls, `${prefixCls}--detail`]" v-else>
    <span :class="`${prefixCls}__twrap`">
      <span @click="handleClose" v-if="showDetailBack">
        <ArrowLeftOutlined :class="`${prefixCls}__back`" />
      </span>
      <span v-if="title">{{ title }}</span>
    </span>

    <span :class="`${prefixCls}__toolbar`">
      <slot name="titleToolbar"></slot>
    </span>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { EntTitle } from '@ent-core/components/basic';
  import { ArrowLeftOutlined } from '@ant-design/icons-vue';

  import { useDesign } from '@ent-core/hooks/web/use-design';

  import { propTypes } from '@ent-core/utils/prop-types';
  export default defineComponent({
    name: 'BasicDrawerHeader',
    components: { EntTitle, ArrowLeftOutlined },
    props: {
      isDetail: propTypes.bool,
      showDetailBack: propTypes.bool,
      title: propTypes.string,
    },
    emits: ['close'],
    slots: ['titleToolbar'],
    setup(_, { emit }) {
      const { prefixCls } = useDesign('basic-drawer-header');

      function handleClose() {
        emit('close');
      }

      return { prefixCls, handleClose };
    },
  });
</script>

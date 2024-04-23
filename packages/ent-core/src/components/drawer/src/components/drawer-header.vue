<template>
  <EntTitle v-if="!isDetail" :class="prefixCls">
    <slot name="title" />
    {{ !$slots.title ? title : '' }}
  </EntTitle>

  <div v-else :class="[prefixCls, `${prefixCls}--detail`]">
    <span :class="`${prefixCls}__twrap`">
      <span v-if="showDetailBack" @click="handleClose">
        <EntIcon icon="ant-design:arrow-left-outlined" :class="`${prefixCls}__back`" />
      </span>
      <span v-if="title">{{ title }}</span>
    </span>

    <span :class="`${prefixCls}__toolbar`">
      <slot name="titleToolbar" />
    </span>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { EntTitle } from '../../../../components/basic';
  import { EntIcon } from '../../../../components/icon';

  import { useDesign } from '../../../../hooks/web/use-design';

  import { propTypes } from '../../../../utils/prop-types';
  export default defineComponent({
    name: 'EntDrawerHeader',
    components: { EntTitle, EntIcon },
    props: {
      isDetail: propTypes.bool,
      showDetailBack: propTypes.bool,
      title: propTypes.string
    },
    emits: ['close'],
    // slots: ['titleToolbar'],
    setup(_, { emit }) {
      const { prefixCls } = useDesign('basic-drawer-header');

      function handleClose() {
        emit('close');
      }

      return { prefixCls, handleClose };
    }
  });
</script>

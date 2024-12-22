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
  import { EntTitle } from '../../../basic';
  import { EntIcon } from '../../../icon';
  import { useDesign } from '../../../../hooks';
  export default defineComponent({
    name: 'EntDrawerHeader',
    components: { EntTitle, EntIcon },
    props: {
      isDetail: {
        type: Boolean,
        default: false
      },
      showDetailBack: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: null
      }
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

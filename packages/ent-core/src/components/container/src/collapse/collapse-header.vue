<template>
  <div :class="[`${prefixCls}__header px-2 py-5`, $attrs.class]">
    <EntTitle :help-message="helpMessage" normal>
      <template v-if="title">
        <NElement tag="span">{{ title }}</NElement>
      </template>
      <template v-else>
        <slot name="title" />
      </template>
    </EntTitle>
    <div :class="`${prefixCls}__action`">
      <slot name="action" />
      <EntArrow v-if="canExpan" up :expand="show" @click="$emit('expand')" />
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { NElement } from 'naive-ui';
  import { EntArrow, EntTitle } from '../../../basic';
  import type { PropType } from 'vue';

  const props = {
    prefixCls: { type: String },
    helpMessage: {
      type: [Array, String] as PropType<string[] | string>,
      default: ''
    },
    title: { type: String },
    show: { type: Boolean },
    canExpan: { type: Boolean }
  };

  export default defineComponent({
    components: { EntArrow, EntTitle, NElement },
    props,
    emits: ['expand']
  });
</script>

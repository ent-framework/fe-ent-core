<template>
  <div :class="[`${prefixCls}__header px-2 py-5`, $attrs.class]">
    <EntTitle :help-message="helpMessage" normal>
      <template v-if="title">
        {{ title }}
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
  import { EntArrow, EntTitle } from '@ent-core/components/basic';
  import type { PropType } from 'vue';

  const props = {
    prefixCls: { type: String },
    helpMessage: {
      type: [Array, String] as PropType<string[] | string>,
      default: '',
    },
    title: { type: String },
    show: { type: Boolean },
    canExpan: { type: Boolean },
  };

  export default defineComponent({
    components: { EntArrow, EntTitle },
    inheritAttrs: false,
    props,
    emits: ['expand'],
  });
</script>

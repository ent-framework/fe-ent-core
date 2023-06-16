<template>
  <EntTitle :help-message="helpMessage">
    {{ title }}
  </EntTitle>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { EntTitle } from '@ent-core/components/basic';
  import type { PropType } from 'vue';

  export default defineComponent({
    name: 'EntModalHeader',
    components: { EntTitle },
    props: {
      helpMessage: {
        type: [String, Array] as PropType<string | string[]>,
      },
      title: { type: String },
    },
    emits: ['dblclick'],
  });
</script>

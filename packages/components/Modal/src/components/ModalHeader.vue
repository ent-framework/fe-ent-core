<template>
  <EntTitle :helpMessage="helpMessage">
    {{ title }}
  </EntTitle>
</template>
<script lang="ts">
  import type { PropType } from 'vue';
  import { defineComponent } from 'vue';
  import { EntTitle } from '@ent-core/components/Basic';

  export default defineComponent({
    name: 'BasicModalHeader',
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

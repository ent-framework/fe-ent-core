<template>
  <BasicTitle :help-message="helpMessage">
    {{ title }}
  </BasicTitle>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTitle } from '../../../basic';
  import type { PropType } from 'vue';

  export default defineComponent({
    name: 'EntModalHeader',
    components: { BasicTitle },
    props: {
      helpMessage: {
        type: [String, Array] as PropType<string | string[]>
      },
      title: { type: String }
    },
    emits: ['dblclick']
  });
</script>

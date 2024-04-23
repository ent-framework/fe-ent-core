<template>
  <!-- eslint-disable vue/no-v-html -->
  <div :class="$props.class" class="markdown-viewer" v-html="getHtmlData" />
</template>

<script lang="ts" setup>
  import { computed, defineComponent } from 'vue';
  import showdown from 'showdown';

  const converter = new showdown.Converter();
  converter.setOption('tables', true);
  const props = defineProps({
    value: { type: String },
    class: { type: String }
  });
  defineComponent({
    name: 'EntMarkdownViewer'
  });
  const getHtmlData = computed(() => converter.makeHtml(props.value || ''));
</script>

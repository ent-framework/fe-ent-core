<template>
  <node-view-wrapper class="task-item-wrapper">
    <li :data-type="node?.type.name" :data-done="done.toString()" data-drag-handle>
      <span contenteditable="false">
        <Checkbox v-model="done" />
      </span>

      <node-view-content class="todo-content" />
    </li>
  </node-view-wrapper>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { NodeViewContent, NodeViewWrapper, nodeViewProps } from '@tiptap/vue-3';
  import { Checkbox } from 'ant-design-vue';

  export default defineComponent({
    name: 'TaskItemView',

    components: {
      NodeViewWrapper,
      NodeViewContent,
      Checkbox,
    },

    props: nodeViewProps,
    computed: {
      done: {
        get(): boolean {
          return this.node?.attrs.done;
        },
        set(done: boolean) {
          this.updateAttributes?.({
            done,
          });
        },
      },
    },
  });
</script>

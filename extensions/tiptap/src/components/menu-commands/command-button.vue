<template>
  <Tooltip :title="tooltip" :disabled="!enableTooltip || readonly" placement="top">
    <div v-if="!buttonIcon" :class="commandButtonClass" @mousedown.prevent @click="onClick">
      <component :is="icon" :size="12" class="btn" />
    </div>
    <div
      v-else
      :class="commandButtonClass"
      @mousedown.prevent
      @click="onClick"
      v-html="buttonIcon"
    />
  </Tooltip>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue';
  import { Tooltip } from 'ant-design-vue';
  import { noop } from '../../utils/shared';
  import type { Component, PropType } from 'vue';

  export default defineComponent({
    components: {
      Tooltip
    },
    props: {
      icon: {
        type: [Object, String] as PropType<Component | string>,
        required: true
      },

      disabled: {
        type: Boolean,
        default: false
      },

      isActive: {
        type: Boolean,
        default: false
      },

      tooltip: {
        type: String,
        required: true
      },

      enableTooltip: {
        type: Boolean,
        required: true
      },

      command: {
        type: Function,
        default: noop
      },
      buttonIcon: {
        type: String,
        required: false,
        default: ''
      },
      readonly: {
        type: Boolean,
        default: false
      }
    },
    emits: ['cmdBtnClicked'],
    setup(props, { emit }) {
      const commandButtonClass = computed(() => {
        return {
          'ent-tiptap-editor__command-button': true,
          'ent-tiptap-editor__command-button--active': props.isActive,
          'ent-tiptap-editor__command-button--readonly': props.readonly || props.disabled
        };
      });

      const onClick = () => {
        if (!props.readonly && !props.disabled) props.command();
        emit('cmdBtnClicked');
      };

      return { commandButtonClass, onClick };
    }
  });
</script>

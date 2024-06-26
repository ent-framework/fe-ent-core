<template>
  <Popover placement="bottom" trigger="click" popper-class="ent-tiptap-popper">
    <template v-if="!isCodeViewMode" #content>
      <div class="color-set">
        <div v-for="color in colorSet" :key="color" class="color__wrapper">
          <div
            :style="{
              'background-color': color
            }"
            :class="{ 'color--selected': selectedColor === color }"
            class="color"
            @mousedown.prevent
            @click.stop="confirmColor(color)"
          />
        </div>

        <div class="color__wrapper">
          <div class="color color--remove" @mousedown.prevent @click.stop="confirmColor()" />
        </div>
      </div>
    </template>

    <span>
      <command-button
        :button-icon="buttonIcon"
        :enable-tooltip="enableTooltip"
        :tooltip="t('editor.extensions.TextHighlight.tooltip')"
        :icon="highlight"
        :readonly="isCodeViewMode"
      />
    </span>
  </Popover>
</template>

<script lang="ts">
  import { computed, defineComponent, inject, ref } from 'vue';
  import { Editor, getMarkAttributes } from '@tiptap/vue-3';
  import { Popover } from 'ant-design-vue';
  import highlight from '../icons/icon-highlight.vue';
  import CommandButton from './command-button.vue';

  export default defineComponent({
    name: 'HighlightPopover',

    components: {
      Popover,
      CommandButton
    },

    props: {
      editor: {
        type: Editor,
        required: true
      },
      buttonIcon: {
        default: '',
        type: String
      }
    },

    setup(props) {
      const t = inject('t');
      const enableTooltip = inject('enableTooltip', true);
      const isCodeViewMode = inject('isCodeViewMode', false);

      const popoverVisible = ref(false);

      function confirmColor(color?: string) {
        if (color) {
          props.editor.commands.setHighlight({ color });
        } else {
          props.editor.commands.unsetHighlight();
        }
      }

      const selectedColor = computed<string>(() => {
        return getMarkAttributes(props.editor.state, 'highlight').color || '';
      });

      return {
        t,
        enableTooltip,
        isCodeViewMode,
        selectedColor,
        popoverVisible,
        confirmColor,
        highlight
      };
    },

    computed: {
      colorSet(): string[] {
        const colorOptions = this.editor.extensionManager.extensions.find(
          (e) => e.name === 'highlight'
        )!.options;
        return colorOptions.colors;
      }
    }
  });
</script>

<template>
  <Popover ref="popoverRef" placement="bottom" trigger="click" popper-class="ent-tiptap-popper">
    <template v-if="!isCodeViewMode" #content>
      <div class="color-set">
        <div v-for="color in colorSet" :key="color" class="color__wrapper">
          <div
            :style="{
              'background-color': color,
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

      <div class="color-hex">
        <Input
          v-model="colorText"
          placeholder="HEX"
          :autofocus="true"
          :maxlength="7"
          size="small"
          class="color-hex__input"
          allow-clear
        />

        <Button
          text
          type="primary"
          size="small"
          class="color-hex__button"
          @click="confirmColor(colorText)"
        >
          OK
        </Button>
      </div>
    </template>
    <span>
      <command-button
        :enable-tooltip="enableTooltip"
        :tooltip="t('editor.extensions.TextColor.tooltip')"
        :icon="fontColor"
        :button-icon="buttonIcon"
        :readonly="isCodeViewMode"
      />
    </span>
  </Popover>
</template>

<script lang="ts">
  import { computed, defineComponent, inject, ref, watch } from 'vue';
  import { Editor, getMarkAttributes } from '@tiptap/vue-3';
  import { Button, Input, Popover } from 'ant-design-vue';
  import fontColor from '../icons/icon-font-color.vue';
  import CommandButton from './command-button.vue';

  export default defineComponent({
    name: 'ColorPopover',

    components: {
      Button,
      Popover,
      Input,
      CommandButton,
    },

    props: {
      editor: {
        type: Editor,
        required: true,
      },
      buttonIcon: {
        default: '',
        type: String,
      },
    },

    setup(props) {
      const t = inject('t');
      const enableTooltip = inject('enableTooltip', true);
      const isCodeViewMode = inject('isCodeViewMode', false);
      const colorText = ref('');

      function confirmColor(color?: string) {
        if (color) {
          props.editor.commands.setColor(color);
        } else {
          props.editor.commands.unsetColor();
        }
      }

      const selectedColor = computed<string>(() => {
        return getMarkAttributes(props.editor.state, 'textStyle').color || '';
      });

      watch(selectedColor, (color) => {
        colorText.value = color;
      });

      return {
        t,
        enableTooltip,
        isCodeViewMode,
        colorText,
        selectedColor,
        confirmColor,
        fontColor,
      };
    },

    computed: {
      colorSet(): string[] {
        const colorOptions = this.editor.extensionManager.extensions.find(
          (e) => e.name === 'color',
        )!.options;
        return colorOptions.colors;
      },
    },
  });
</script>

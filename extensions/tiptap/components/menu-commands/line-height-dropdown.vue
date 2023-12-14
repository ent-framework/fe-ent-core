<template>
  <Dropdown
    placement="bottom"
    trigger="click"
    popper-class="my-dropdown"
    :popper-options="{ modifiers: [{ name: 'computeStyles', options: { adaptive: false } }] }"
    @command="(lineHeight) => editor.commands.setLineHeight(lineHeight)"
  >
    <div>
      <command-button
        :enable-tooltip="enableTooltip"
        :button-icon="buttonIcon"
        :tooltip="t('editor.extensions.LineHeight.tooltip')"
        :readonly="isCodeViewMode"
        :icon="textHeight"
      />
    </div>
    <template #dropdown>
      <Menu class="ent-tiptap-dropdown-menu">
        <MenuItem
          v-for="lineHeight in lineHeights"
          :key="lineHeight"
          :command="lineHeight"
          :class="{
            'ent-tiptap-dropdown-menu__item--active': isLineHeightActive(lineHeight),
          }"
          class="ent-tiptap-dropdown-menu__item"
        >
          <span>{{ lineHeight }}</span>
        </MenuItem>
      </Menu>
    </template>
  </Dropdown>
</template>

<script lang="ts">
  import { defineComponent, inject } from 'vue';
  import { Editor } from '@tiptap/vue-3';
  import { Dropdown, Menu } from 'ant-design-vue';
  import { isLineHeightActive } from '../../utils/line-height';
  import textHeight from '../icons/icon-text-height.vue';
  import CommandButton from './command-button.vue';
  const MenuItem = Menu.Item;
  export default defineComponent({
    name: 'LineHeightDropdown',

    components: {
      Dropdown,
      Menu,
      MenuItem,
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

    setup() {
      const t = inject('t');
      const enableTooltip = inject('enableTooltip', true);
      const isCodeViewMode = inject('isCodeViewMode', false);

      return { t, enableTooltip, isCodeViewMode, textHeight };
    },

    computed: {
      lineHeights() {
        const lineHeightOptions = this.editor.extensionManager.extensions.find(
          (e) => e.name === 'lineHeight',
        )!.options;
        return lineHeightOptions.lineHeights;
      },
    },

    methods: {
      isLineHeightActive(lineHeight: string) {
        return isLineHeightActive(this.editor.state, lineHeight);
      },
    },
  });
</script>

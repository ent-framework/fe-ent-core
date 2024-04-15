<template>
  <Dropdown placement="bottom" trigger="click">
    <div>
      <command-button
        :enable-tooltip="enableTooltip"
        :tooltip="t('editor.extensions.FontSize.tooltip')"
        :readonly="isCodeViewMode"
        :button-icon="buttonIcon"
        :icon="fontSize"
      />
    </div>
    <template #overlay>
      <Menu class="ent-tiptap-dropdown-menu" @click="toggleFontSize">
        <MenuItem
          key="default"
          :command="defaultSize"
          :class="{
            'ent-tiptap-dropdown-menu__item--active': activeFontSize === defaultSize,
          }"
          class="ent-tiptap-dropdown-menu__item"
        >
          <span data-font-size="default">{{ t('editor.extensions.FontSize.default') }}</span>
        </MenuItem>

        <MenuItem
          v-for="fs in fontSizes"
          :key="fs"
          :command="fs"
          :class="{
            'ent-tiptap-dropdown-menu__item--active': fs === activeFontSize,
          }"
          class="ent-tiptap-dropdown-menu__item"
        >
          <span :data-font-size="fs">{{ fs }}</span>
        </MenuItem>
      </Menu>
    </template>
  </Dropdown>
</template>

<script lang="ts">
  import { computed, defineComponent, inject, unref } from 'vue';
  import { Editor, getMarkAttributes } from '@tiptap/vue-3';
  import { Dropdown, Menu } from 'ant-design-vue';
  import { DEFAULT_FONT_SIZE } from '../../utils/font-size';
  import fontSize from '../icons/icon-font-size.vue';
  import CommandButton from './command-button.vue';
  import type { MenuProps } from 'ant-design-vue';
  const MenuItem = Menu.Item;
  export default defineComponent({
    name: 'FontSizeDropdown',

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

    setup(props) {
      const t = inject('t');
      const enableTooltip = inject('enableTooltip', true);
      const isCodeViewMode = inject('isCodeViewMode', false);

      const fontSizes = computed(() => {
        const fontSizeOptions = props.editor.extensionManager.extensions.find(
          (e) => e.name === 'fontSize',
        )!.options;
        return fontSizeOptions.fontSizes;
      });

      const activeFontSize = computed(() => {
        return getMarkAttributes(props.editor.state, 'textStyle').fontSize || '';
      });

      const toggleFontSize: MenuProps['onClick'] = (e) => {
        if (e.key === unref(activeFontSize)) {
          props.editor.commands.unsetFontSize();
        } else {
          props.editor.commands.setFontSize(e.key);
        }
      };

      return {
        t,
        enableTooltip,
        isCodeViewMode,
        defaultSize: DEFAULT_FONT_SIZE,
        fontSize,
        fontSizes,
        activeFontSize,
        toggleFontSize,
      };
    },
  });
</script>

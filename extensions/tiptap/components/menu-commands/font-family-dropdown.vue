<template>
  <Dropdown placement="bottom" trigger="click">
    <div>
      <command-button
        :enable-tooltip="enableTooltip"
        :tooltip="t('editor.extensions.FontType.tooltip')"
        :readonly="isCodeViewMode"
        :icon="fontFamily"
        :button-icon="buttonIcon"
      />
    </div>
    <template #overlay>
      <Menu class="ent-tiptap-editor-dropdown-menu" @click="toggleFontType">
        <MenuItem
          v-for="name in fontFamilies"
          :key="name"
          :command="name"
          :class="{
            'ent-tiptap-editor-dropdown-menu__item--active': name === activeFontFamily,
          }"
          class="ent-tiptap-editor-dropdown-menu__item"
        >
          <span :data-font="name" :style="{ 'font-family': name }">{{ name }}</span>
        </MenuItem>
      </Menu>
    </template>
  </Dropdown>
</template>

<script lang="ts">
  import { computed, defineComponent, inject, unref } from 'vue';
  import { Editor, getMarkAttributes } from '@tiptap/vue-3';
  import { Dropdown, Menu } from 'ant-design-vue';
  import fontFamily from '../icons/icon-font-family.vue';
  import CommandButton from './command-button.vue';
  import type { MenuProps } from 'ant-design-vue';
  const MenuItem = Menu.Item;

  export default defineComponent({
    name: 'FontFamilyDropdown',

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

      const fontFamilies = computed(() => {
        const fontFamilyOptions = props.editor.extensionManager.extensions.find(
          (e) => e.name === 'fontFamily',
        )!.options;
        return fontFamilyOptions.fontFamilyMap;
      });

      const activeFontFamily = computed(() => {
        return getMarkAttributes(props.editor.state, 'textStyle').fontFamily || '';
      });

      const toggleFontType: MenuProps['onClick'] = (e) => {
        const aff = unref(activeFontFamily);
        if (e.key === aff) {
          //props.editor.chain().focus().unsetFontFamily().run();
          props.editor.commands.unsetFontFamily();
        } else {
          //props.editor.chain().focus().unsetFontFamily(e.key).run();
          props.editor.commands.setFontFamily(e.key);
        }
      };

      return {
        t,
        enableTooltip,
        isCodeViewMode,
        fontFamily,
        toggleFontType,
        fontFamilies,
        activeFontFamily,
      };
    },
  });
</script>

<template>
  <el-dropdown
    placement="bottom"
    trigger="click"
    popper-class="my-dropdown"
    :popper-options="{ modifiers: [{ name: 'computeStyles', options: { adaptive: false } }] }"
    @command="toggleFontType"
  >
    <div>
      <command-button
        :enable-tooltip="enableTooltip"
        :tooltip="t('editor.extensions.FontType.tooltip')"
        :readonly="isCodeViewMode"
        icon="font-family"
        :button-icon="buttonIcon"
      />
    </div>
    <template #dropdown>
      <el-dropdown-menu class="el-tiptap-dropdown-menu">
        <el-dropdown-item
          v-for="name in fontFamilies"
          :key="name"
          :command="name"
          :class="{
            'el-tiptap-dropdown-menu__item--active': name === activeFontFamily,
          }"
          class="el-tiptap-dropdown-menu__item"
        >
          <span :data-font="name" :style="{ 'font-family': name }">{{ name }}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts">
  import { defineComponent, inject } from 'vue';
  import { Editor, getMarkAttributes } from '@tiptap/vue-3';
  import { ElDropdown, ElDropdownItem, ElDropdownMenu } from 'element-plus';
  import CommandButton from './command-button.vue';

  export default defineComponent({
    name: 'FontFamilyDropdown',

    components: {
      ElDropdown,
      ElDropdownMenu,
      ElDropdownItem,
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

      return { t, enableTooltip, isCodeViewMode };
    },

    computed: {
      fontFamilies() {
        const fontFamilyOptions = this.editor.extensionManager.extensions.find(
          (e) => e.name === 'fontFamily',
        )!.options;
        return fontFamilyOptions.fontFamilyMap;
      },

      activeFontFamily() {
        return getMarkAttributes(this.editor.state, 'textStyle').fontFamily || '';
      },
    },

    methods: {
      toggleFontType(name: string) {
        if (name === this.activeFontFamily) {
          this.editor.commands.unsetFontFamily();
        } else {
          this.editor.commands.setFontFamily(name);
        }
      },
    },
  });
</script>

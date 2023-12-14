<template>
  <bubble-menu
    v-if="editor"
    v-show="activeMenu !== 'none'"
    :tippy-options="{ zIndex: 1000 }"
    :editor="editor"
  >
    <div
      :class="{
        'ent-tiptap-editor__menu-bubble--active': bubbleMenuEnable,
      }"
      class="ent-tiptap-editor__menu-bubble"
    >
      <link-bubble-menu v-if="activeMenu === 'link'" :editor="editor">
        <template #prepend>
          <div
            v-if="textMenuEnable"
            class="ent-tiptap-editor__command-button"
            @mousedown.prevent
            @click="linkBack"
          >
            <ArrowLeft :size="16" />
          </div>
        </template>
      </link-bubble-menu>

      <template v-else-if="activeMenu === 'default'">
        <component
          :is="spec.component"
          v-for="(spec, i) in generateCommandButtonComponentSpecs()"
          :key="'command-button' + i"
          :enable-tooltip="enableTooltip"
          v-bind="spec.componentProps"
          :readonly="isCodeViewMode"
          v-on="spec.componentEvents || {}"
        />
      </template>
    </div>
  </bubble-menu>
</template>

<script lang="ts">
  import { defineComponent, inject } from 'vue';
  import { BubbleMenu, Editor } from '@tiptap/vue-3';
  import { getMarkRange } from '@tiptap/core';
  import { AllSelection, TextSelection } from 'prosemirror-state';
  import ArrowLeft from '../icons/icon-arrow-left.vue';
  import LinkBubbleMenu from './link-bubble-menu.vue';
  import type { Selection } from 'prosemirror-state';

  const enum MenuType {
    NONE = 'none',
    DEFAULT = 'default',
    LINK = 'link',
  }

  export default defineComponent({
    name: 'MenuBubble',

    components: {
      BubbleMenu,
      LinkBubbleMenu,
      ArrowLeft,
    },

    props: {
      editor: {
        type: Editor,
        required: true,
      },

      menuBubbleOptions: {
        type: Object,
        default: () => ({}),
      },
    },

    setup() {
      const t = inject('t');
      const enableTooltip = inject('enableTooltip', true);
      const isCodeViewMode = inject('isCodeViewMode', false);

      return { t, enableTooltip, isCodeViewMode };
    },

    data() {
      return {
        activeMenu: MenuType.NONE,
        isLinkBack: false,
        ArrowLeft,
      };
    },

    computed: {
      bubbleMenuEnable(): boolean {
        return this.linkMenuEnable || this.textMenuEnable;
      },

      linkMenuEnable(): boolean {
        const { schema } = this.editor;
        return !!schema.marks.link;
      },

      textMenuEnable(): boolean {
        const extensionManager = this.editor.extensionManager;
        return extensionManager.extensions.some((extension) => {
          return extension.options.bubble;
        });
      },

      isLinkSelection(): boolean {
        const { state } = this.editor;
        const { tr } = state;
        const { selection } = tr;

        return this.$_isLinkSelection(selection);
      },
    },

    watch: {
      'editor.state.selection': function (selection: Selection) {
        if (this.$_isLinkSelection(selection)) {
          if (!this.isLinkBack) {
            this.setMenuType(MenuType.LINK);
          }
        } else {
          this.activeMenu = this.$_getCurrentMenuType();
          this.isLinkBack = false;
        }
      },
    },

    methods: {
      generateCommandButtonComponentSpecs() {
        const extensionManager = this.editor.extensionManager;
        return extensionManager.extensions
          .reduce((acc: any, extension) => {
            if (!extension.options.bubble) return acc;
            const { button } = extension.options;
            if (!button || typeof button !== 'function') return acc;

            const menuBtnComponentSpec = button({
              editor: this.editor,
              t: this.t, // i18n
              extension,
            });

            if (Array.isArray(menuBtnComponentSpec)) {
              return [
                ...acc,
                ...menuBtnComponentSpec.map((item) => {
                  return { ...item, priority: extension.options.priority };
                }),
              ];
            }

            return [...acc, { ...menuBtnComponentSpec, priority: extension.options.priority }];
          }, [])
          ?.sort((a: any, b: any) => b.priority - a.priority);
      },
      linkBack() {
        this.setMenuType(MenuType.DEFAULT);
        this.isLinkBack = true;
      },

      setMenuType(type: MenuType) {
        this.activeMenu = type;
      },

      $_isLinkSelection(selection: Selection) {
        const { schema } = this.editor;
        const linkType = schema.marks.link;
        if (!linkType) return false;
        if (!selection) return false;

        const { $from, $to } = selection;
        const range = getMarkRange($from, linkType);
        if (!range) return false;

        return range.to === $to.pos;
      },

      $_getCurrentMenuType(): MenuType {
        if (this.isLinkSelection) return MenuType.LINK;
        if (this.editor.isActive('codeBlock') || this.editor.isActive('codeBlockLowlight')) {
          return MenuType.NONE;
        }
        if (
          this.editor.state.selection instanceof TextSelection ||
          this.editor.state.selection instanceof AllSelection
        ) {
          return MenuType.DEFAULT;
        }
        return MenuType.NONE;
      },
    },
  });
</script>

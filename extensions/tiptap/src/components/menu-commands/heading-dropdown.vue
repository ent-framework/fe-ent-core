<template>
  <Dropdown
    placement="bottom"
    trigger="click"
    popper-class="ent-tiptap-dropdown-popper"
    :popper-options="{ modifiers: [{ name: 'computeStyles', options: { adaptive: false } }] }"
    @command="toggleHeading"
  >
    <div>
      <command-button
        :enable-tooltip="enableTooltip"
        :is-active="editor.isActive('heading')"
        :tooltip="t('editor.extensions.Heading.tooltip')"
        :readonly="isCodeViewMode"
        :button-icon="buttonIcon"
        :icon="heading"
      />
    </div>
    <template #dropdown>
      <Menu class="ent-tiptap-dropdown-menu">
        <MenuItem v-for="level in [0, ...levels]" :key="level" :command="level">
          <div
            :class="[
              {
                'ent-tiptap-dropdown-menu__item--active':
                  level > 0
                    ? editor.isActive('heading', {
                        level,
                      })
                    : editor.isActive('paragraph'),
              },
              'ent-tiptap-dropdown-menu__item',
            ]"
          >
            <template v-if="level > 0">
              <component :is="'h' + level" data-item-type="heading">
                {{ t('editor.extensions.Heading.buttons.heading') }} {{ level }}
              </component>
            </template>
            <span v-else>{{ t('editor.extensions.Heading.buttons.paragraph') }}</span>
          </div>
        </MenuItem>
      </Menu>
    </template>
  </Dropdown>
</template>

<script lang="ts">
  import { defineComponent, inject } from 'vue';
  import { Dropdown, Menu } from 'ant-design-vue';
  import { Editor } from '@tiptap/core';
  import heading from '../icons/icon-heading.vue';
  import CommandButton from './command-button.vue';
  import type { Level } from '@tiptap/extension-heading';
  const MenuItem = Menu.Item;
  export default defineComponent({
    name: 'HeadingDropdown',

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

      levels: {
        type: Array,
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

      return { t, enableTooltip, isCodeViewMode, heading };
    },

    methods: {
      toggleHeading(level: Level) {
        if (level > 0) {
          this.editor.commands.toggleHeading({ level });
        } else {
          this.editor.commands.setParagraph();
        }
      },
    },
  });
</script>

<template>
  <Popover ref="popoverRef" placement="bottom" trigger="click" popper-class="ent-tiptap-popper">
    <template v-if="!isCodeViewMode" #content>
      <div class="ent-tiptap-popper__menu">
        <div class="ent-tiptap-popper__menu__item">
          <create-table-popover @create-table="createTable" />
        </div>

        <div class="ent-tiptap-popper__menu__item__separator" />

        <div
          :class="{ 'ent-tiptap-popper__menu__item--disabled': !isTableActive }"
          class="ent-tiptap-popper__menu__item"
          @mousedown="hidePopover"
          @click="editor.commands.addColumnBefore"
        >
          <span>{{ t('editor.extensions.Table.buttons.add_column_before') }}</span>
        </div>

        <div
          :class="{ 'ent-tiptap-popper__menu__item--disabled': !isTableActive }"
          class="ent-tiptap-popper__menu__item"
          @mousedown="hidePopover"
          @click="editor.commands.addColumnAfter"
        >
          <span>{{ t('editor.extensions.Table.buttons.add_column_after') }}</span>
        </div>

        <div
          :class="{ 'ent-tiptap-popper__menu__item--disabled': !isTableActive }"
          class="ent-tiptap-popper__menu__item"
          @mousedown="hidePopover"
          @click="editor.commands.deleteColumn"
        >
          <span>{{ t('editor.extensions.Table.buttons.delete_column') }}</span>
        </div>

        <div class="ent-tiptap-popper__menu__item__separator" />

        <div
          :class="{ 'ent-tiptap-popper__menu__item--disabled': !isTableActive }"
          class="ent-tiptap-popper__menu__item"
          @mousedown="hidePopover"
          @click="editor.commands.addRowBefore"
        >
          <span>{{ t('editor.extensions.Table.buttons.add_row_before') }}</span>
        </div>

        <div
          :class="{ 'ent-tiptap-popper__menu__item--disabled': !isTableActive }"
          class="ent-tiptap-popper__menu__item"
          @mousedown="hidePopover"
          @click="editor.commands.addRowAfter"
        >
          <span>{{ t('editor.extensions.Table.buttons.add_row_after') }}</span>
        </div>

        <div
          :class="{ 'ent-tiptap-popper__menu__item--disabled': !isTableActive }"
          class="ent-tiptap-popper__menu__item"
          @mousedown="hidePopover"
          @click="editor.commands.deleteRow"
        >
          <span>{{ t('editor.extensions.Table.buttons.delete_row') }}</span>
        </div>

        <div class="ent-tiptap-popper__menu__item__separator" />

        <div
          :class="{ 'ent-tiptap-popper__menu__item--disabled': !enableMergeCells }"
          class="ent-tiptap-popper__menu__item"
          @mousedown="hidePopover"
          @click="editor.commands.mergeCells"
        >
          <span>{{ t('editor.extensions.Table.buttons.merge_cells') }}</span>
        </div>

        <div
          :class="{ 'ent-tiptap-popper__menu__item--disabled': !enableSplitCell }"
          class="ent-tiptap-popper__menu__item"
          @mousedown="hidePopover"
          @click="editor.commands.splitCell"
        >
          <span>{{ t('editor.extensions.Table.buttons.split_cell') }}</span>
        </div>

        <div class="ent-tiptap-popper__menu__item__separator" />

        <div
          :class="{ 'ent-tiptap-popper__menu__item--disabled': !isTableActive }"
          class="ent-tiptap-popper__menu__item"
          @mousedown="hidePopover"
          @click="editor.commands.deleteTable"
        >
          <span>{{ t('editor.extensions.Table.buttons.delete_table') }}</span>
        </div>
      </div>
    </template>
    <span>
      <command-button
        :is-active="isTableActive"
        :enable-tooltip="enableTooltip"
        :tooltip="t('editor.extensions.Table.tooltip')"
        :readonly="isCodeViewMode"
        :icon="table"
        :button-icon="buttonIcon"
      />
    </span>
  </Popover>
</template>

<script lang="ts">
  import { defineComponent, inject, ref, unref } from 'vue';
  import { Editor } from '@tiptap/vue-3';
  import { Popover } from 'ant-design-vue';
  import CommandButton from '../command-button.vue';
  import { enableMergeCells, enableSplitCell, isTableActive } from '../../../utils/table';
  import table from '../../icons/icon-table.vue';
  import CreateTablePopover from './create-table-popover.vue';

  export default defineComponent({
    name: 'TablePopover',

    components: {
      Popover,
      CommandButton,
      CreateTablePopover
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

    setup() {
      const t = inject('t');
      const enableTooltip = inject('enableTooltip', true);
      const isCodeViewMode = inject('isCodeViewMode', false);

      const popoverRef = ref();

      const hidePopover = () => {
        unref(popoverRef).hide();
      };

      return { t, enableTooltip, isCodeViewMode, popoverRef, hidePopover, table };
    },

    computed: {
      isTableActive() {
        return isTableActive(this.editor.state);
      },

      enableMergeCells() {
        return enableMergeCells(this.editor.state);
      },

      enableSplitCell() {
        return enableSplitCell(this.editor.state);
      }
    },

    methods: {
      createTable({ row, col }: { row: number; col: number }): void {
        this.editor.commands.insertTable({
          rows: row,
          cols: col,
          withHeaderRow: true
        });

        this.hidePopover();
      }
    }
  });
</script>

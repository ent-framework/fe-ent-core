<template>
  <Popover ref="popoverRef" placement="top" trigger="click" popper-class="ent-tiptap-popper">
    <div class="ent-tiptap-popper__menu">
      <div
        v-for="display in displayCollection"
        :key="display"
        :class="{
          'ent-tiptap-popper__menu__item--active': display === currDisplay,
        }"
        class="ent-tiptap-popper__menu__item"
        @mousedown="hidePopover"
        @click="updateAttrs!({ display })"
      >
        <span>{{ t(`editor.extensions.Image.buttons.display.${display}`) }}</span>
      </div>
    </div>

    <template #reference>
      <span>
        <command-button
          :enable-tooltip="enableTooltip"
          :tooltip="t('editor.extensions.Image.buttons.display.tooltip')"
          icon="image-align"
          :button-icon="buttonIcon"
        />
      </span>
    </template>
  </Popover>
</template>

<script lang="ts">
  import { defineComponent, inject } from 'vue';
  import { nodeViewProps } from '@tiptap/vue-3';
  import { Popover } from 'ant-design-vue';
  import CommandButton from '../command-button.vue';
  import { ImageDisplay } from '../../../utils/image';

  export default defineComponent({
    name: 'ImageDisplayCommandButton',

    components: {
      Popover,
      CommandButton,
    },
    props: {
      node: nodeViewProps['node'],
      updateAttrs: nodeViewProps['updateAttributes'],
      buttonIcon: {
        default: '',
        type: String,
      },
    },

    setup() {
      const t = inject('t');
      const enableTooltip = inject('enableTooltip', true);

      return { t, enableTooltip };
    },

    data() {
      return {
        displayCollection: [
          ImageDisplay.INLINE,
          ImageDisplay.BREAK_TEXT,
          ImageDisplay.FLOAT_LEFT,
          ImageDisplay.FLOAT_RIGHT,
        ],
      };
    },

    computed: {
      currDisplay() {
        return this.node!.attrs.display;
      },
    },

    methods: {
      hidePopover() {
        this.$refs.popoverRef?.hide();
      },
    },
  });
</script>

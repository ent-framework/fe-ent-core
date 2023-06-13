<template>
  <a-dropdown :trigger="trigger" v-bind="$attrs">
    <span>
      <slot />
    </span>
    <template #overlay>
      <a-menu :selected-keys="selectedKeys">
        <template v-for="item in dropMenuList" :key="`${item.event}`">
          <a-menu-item
            v-bind="getAttr(item.event)"
            :disabled="item.disabled"
            @click="handleClickMenu(item)"
          >
            <a-popconfirm
              v-if="popconfirm && item.popConfirm"
              v-bind="getPopConfirmAttrs(item.popConfirm)"
            >
              <template v-if="item.popConfirm.icon" #icon>
                <EntIcon :icon="item.popConfirm.icon" />
              </template>
              <div>
                <EntIcon v-if="item.icon" :icon="item.icon" />
                <span class="ml-1">{{ item.text }}</span>
              </div>
            </a-popconfirm>
            <template v-else>
              <EntIcon v-if="item.icon" :icon="item.icon" />
              <span class="ml-1">{{ item.text }}</span>
            </template>
          </a-menu-item>
          <a-menu-divider v-if="item.divider" :key="`d-${item.event}`" />
        </template>
      </a-menu>
    </template>
  </a-dropdown>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue';
  import { Dropdown, Menu, Popconfirm } from 'ant-design-vue';
  import { omit } from 'lodash-es';
  import { isFunction } from '@vueuse/shared';
  import { EntIcon } from '@ent-core/components/icon';
  import type { DropMenu } from './typing';
  import type { PropType } from 'vue';
  const ADropdown = Dropdown;
  const AMenu = Menu;
  const AMenuItem = Menu.Item;
  const AMenuDivider = Menu.Divider;
  const APopconfirm = Popconfirm;
  const props = {
    /**
     * 是否用popconfirm触发
     */
    popconfirm: Boolean,
    /**
     * 触发方式
     */
    trigger: {
      type: [Array] as PropType<('contextmenu' | 'click' | 'hover')[]>,
      default: () => ['contextmenu'],
    },
    /**
     * 菜单列表
     */
    dropMenuList: {
      type: Array as PropType<DropMenu[]>,
      default: () => [],
    },
    /**
     * 已选中的菜单
     */
    selectedKeys: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  };
  export default defineComponent({
    name: 'EntDropdown',
    components: { ADropdown, AMenu, AMenuItem, AMenuDivider, APopconfirm, EntIcon },
    inheritAttrs: false,
    props,
    emits: [
      /**
       * 点击菜单时触发
       * @param {{onClick?: Function;to?: string;icon?: string;event: string | number; text: string;disabled?: boolean;divider?: boolean}} menu
       */
      'menuEvent',
    ],
    setup(props, { emit }) {
      function handleClickMenu(item: DropMenu) {
        const { event } = item;
        const menu = props.dropMenuList.find((item) => `${item.event}` === `${event}`);
        emit('menuEvent', menu);
        item.onClick?.();
      }

      const getPopConfirmAttrs = computed(() => {
        return (attrs) => {
          const originAttrs = omit(attrs, ['confirm', 'cancel', 'icon']);
          if (!attrs.onConfirm && attrs.confirm && isFunction(attrs.confirm))
            originAttrs['onConfirm'] = attrs.confirm;
          if (!attrs.onCancel && attrs.cancel && isFunction(attrs.cancel))
            originAttrs['onCancel'] = attrs.cancel;
          return originAttrs;
        };
      });

      const getAttr = (key: string | number) => ({ key });
      return {
        getAttr,
        getPopConfirmAttrs,
        handleClickMenu,
      };
    },
  });
</script>

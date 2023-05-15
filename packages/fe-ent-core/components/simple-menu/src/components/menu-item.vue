<template>
  <li :class="getClass" :style="getCollapse ? {} : getItemStyle" @click.stop="handleClickItem">
    <Tooltip v-if="showTooltip" placement="right">
      <template #title>
        <slot name="title" />
      </template>
      <div :class="`${prefixCls}-tooltip`">
        <slot />
      </div>
    </Tooltip>

    <template v-else>
      <slot />
      <slot name="title" />
    </template>
  </li>
</template>

<script lang="ts">
  import { computed, defineComponent, getCurrentInstance, ref, unref, watch } from 'vue';
  import { Tooltip } from 'ant-design-vue';
  import { useDesign } from '@ent-core/hooks/web/use-design';
  import { propTypes } from '@ent-core/utils/prop-types';
  import { useMenuItem } from './use-menu';
  import { useSimpleRootMenuContext } from './use-simple-menu-context';
  import type { PropType } from 'vue';
  export default defineComponent({
    name: 'MenuItem',
    components: { Tooltip },
    props: {
      name: {
        type: [String, Number] as PropType<string | number>,
        required: true,
      },
      disabled: propTypes.bool,
    },
    setup(props, { slots }) {
      const instance = getCurrentInstance();

      const active = ref(false);

      const { getItemStyle, getParentList, getParentMenu, getParentRootMenu } =
        useMenuItem(instance);

      const { prefixCls } = useDesign('menu');

      const { rootMenuEmitter, activeName } = useSimpleRootMenuContext();

      const getClass = computed(() => {
        return [
          `${prefixCls}-item`,
          {
            [`${prefixCls}-item-active`]: unref(active),
            [`${prefixCls}-item-selected`]: unref(active),
            [`${prefixCls}-item-disabled`]: !!props.disabled,
          },
        ];
      });

      const getCollapse = computed(() => unref(getParentRootMenu)?.props.collapse);

      const showTooltip = computed(() => {
        return unref(getParentMenu)?.type.name === 'Menu' && unref(getCollapse) && slots.title;
      });

      function handleClickItem() {
        const { disabled } = props;
        if (disabled) {
          return;
        }

        rootMenuEmitter.emit('on-menu-item-select', props.name);
        if (unref(getCollapse)) {
          return;
        }
        const { uidList } = getParentList();

        rootMenuEmitter.emit('on-update-opened', {
          opend: false,
          parent: instance?.parent,
          uidList,
        });
      }
      watch(
        () => activeName.value,
        (name) => {
          if (name === props.name) {
            const { list, uidList } = getParentList();
            active.value = true;
            list.forEach((item) => {
              if (item.proxy) {
                (item.proxy as any).active = true;
              }
            });
            rootMenuEmitter.emit('on-update-active-name:submenu', uidList);
          } else {
            active.value = false;
          }
        },
        { immediate: true },
      );

      return { getClass, prefixCls, getItemStyle, getCollapse, handleClickItem, showTooltip };
    },
  });
</script>

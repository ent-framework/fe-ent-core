
  import { computed, defineComponent, h, nextTick, onMounted, onUnmounted, ref, unref } from 'vue';
  import { NDropdown } from 'naive-ui';
  import { EntIcon } from '../../../components/icon';
  import type {
    DropdownDividerOption,
    DropdownMixedOption,
    DropdownOption
  } from 'naive-ui/es/dropdown/src/interface';
  import type { CSSProperties, PropType } from 'vue';
  import type { Axis, ContextMenuItem } from './typing';

  const prefixCls = 'context-menu';

  const props = {
    width: { type: Number, default: 156 },
    customEvent: { type: Object as PropType<Event>, default: null },
    styles: { type: Object as PropType<CSSProperties> },
    showIcon: { type: Boolean, default: true },
    axis: {
      // The position of the right mouse button click
      type: Object as PropType<Axis>,
      default() {
        return { x: 0, y: 0 };
      }
    },
    items: {
      // The most important list, if not, will not be displayed
      type: Array as PropType<ContextMenuItem[]>,
      default() {
        return [];
      }
    }
  };

  export default defineComponent({
    name: 'ContextMenu',
    props,
    setup(props) {
      const wrapRef = ref(null);
      const showRef = ref(false);

      const getStyle = computed((): CSSProperties => {
        const { axis, items, styles, width } = props;
        const { x, y } = axis || { x: 0, y: 0 };
        const menuHeight = (items || []).length * 40;
        const menuWidth = width;
        const body = document.body;

        const left = body.clientWidth < x + menuWidth ? x - menuWidth : x;
        const top = body.clientHeight < y + menuHeight ? y - menuHeight : y;
        return {
          ...styles,
          position: 'absolute',
          width: `${width}px`,
          left: `${left + 1}px`,
          top: `${top + 1}px`,
          zIndex: 9999
        };
      });

      onMounted(() => {
        nextTick(() => (showRef.value = true));
      });

      onUnmounted(() => {
        const el = unref(wrapRef);
        el && document.body.removeChild(el);
      });

      return () => {
        if (!unref(showRef)) {
          return null;
        }
        const menuOptions: DropdownMixedOption[] = [];
        const { items } = props;
        if (items && items.length > 0) {
          items.forEach((item) => {
            const { label, children, divider = false } = item;
            if (!children || children.length === 0) {
              if (divider) {
                menuOptions.push({
                  type: 'divider',
                  key: `d-${label}`
                } as DropdownDividerOption);
              } else {
                menuOptions.push({
                  type: 'render',
                  label: item.label,
                  key: `d-${label}`,
                  icon: () => {
                    if (item.icon) {
                      return h(EntIcon, { icon: item.icon });
                    }
                  }
                } as DropdownOption);
              }
            }
          });
        }
        return (
          <div class={prefixCls}>
            <NDropdown options={menuOptions} ref={wrapRef} style={unref(getStyle)} />
          </div>
        );
      };
    }
  });

<script lang="tsx">
  import { computed, defineComponent, unref } from 'vue';
  import { NTooltip } from 'naive-ui';
  import EntIcon from '../../../components/icon/src/icon.vue';
  import { isArray, isString } from '../../../utils/is';
  import { getSlot } from '../../../utils';
  import { useDesign } from '../../../hooks';
  import type { CSSProperties, PropType } from 'vue';

  const props = {
    /**
     * @zh 最大宽度
     * @en Help text max-width
     * @default: 600px
     */
    maxWidth: { type: String, default: '600px' },
    /**
     * @zh 是否显示序号,在 text 为 string[] 情况下生效
     * @en Whether to display the serial number
     * @default: false
     */
    showIndex: { type: Boolean },
    /**
     * @zh 颜色
     * @en Help text font color
     * @default: #ffffff
     */
    color: { type: String, default: '#ffffff' },
    /**
     * @zh 字体大小
     * @en Help text font size
     * @default: 14px
     */
    fontSize: { type: String, default: '14px' },
    /**
     * @zh 显示方向，参考 Tooltip 组件
     * @en Help text list
     */
    placement: { type: String, default: 'right' },
    /**
     * @zh 文本列表
     * @en Help text list
     */
    text: { type: [Array, String] as PropType<string[] | string> }
  };

  export default defineComponent({
    name: 'EntHelp',
    components: { NTooltip, EntIcon },
    props,
    setup(props, { slots }) {
      const { prefixCls } = useDesign('help');

      const getTooltipStyle = computed(
        (): CSSProperties => ({ color: props.color, fontSize: props.fontSize })
      );

      const getOverlayStyle = computed((): CSSProperties => ({ maxWidth: props.maxWidth }));

      function renderTitle() {
        const textList = props.text;

        if (isString(textList)) {
          return <p>{textList}</p>;
        }

        if (isArray(textList)) {
          return textList.map((text, index) => {
            return (
              <p key={text}>
                <>
                  {props.showIndex ? `${index + 1}. ` : ''}
                  {text}
                </>
              </p>
            );
          });
        }
        return null;
      }

      return () => {
        return (
          <NTooltip
            contentClass={`${prefixCls}__wrap`}
            contentStyle={unref(getOverlayStyle)}
            placement={props.placement as 'right'}
          >
            {{
              trigger: () => {
                return (
                  <span class={prefixCls}>
                    {getSlot(slots) || <EntIcon icon="ant-design:info-circle-outlined" />}
                  </span>
                );
              },
              default: () => {
                return <div style={unref(getTooltipStyle)}>{renderTitle()}</div>;
              }
            }}
          </NTooltip>
        );
      };
    }
  });
</script>

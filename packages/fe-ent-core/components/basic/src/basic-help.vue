<script lang="tsx">
  import { computed, defineComponent, unref } from 'vue';
  import { Tooltip } from 'ant-design-vue';
  import { InfoCircleOutlined } from '@ant-design/icons-vue';
  import { getPopupContainer } from '@ent-core/utils';
  import { isArray, isString } from '@ent-core/utils/is';
  import { getSlot } from '@ent-core/utils/helper/tsx-helper';
  import { useDesign } from '@ent-core/hooks/web/use-design';
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
    text: { type: [Array, String] as PropType<string[] | string> },
  };

  export default defineComponent({
    name: 'EntHelp',
    components: { Tooltip },
    props,
    setup(props, { slots }) {
      const { prefixCls } = useDesign('basic-help');

      const getTooltipStyle = computed(
        (): CSSProperties => ({ color: props.color, fontSize: props.fontSize }),
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
          <Tooltip
            overlayClassName={`${prefixCls}__wrap`}
            title={<div style={unref(getTooltipStyle)}>{renderTitle()}</div>}
            autoAdjustOverflow={true}
            overlayStyle={unref(getOverlayStyle)}
            placement={props.placement as 'right'}
            getPopupContainer={() => getPopupContainer()}
          >
            <span class={prefixCls}>{getSlot(slots) || <InfoCircleOutlined />}</span>
          </Tooltip>
        );
      };
    },
  });
</script>

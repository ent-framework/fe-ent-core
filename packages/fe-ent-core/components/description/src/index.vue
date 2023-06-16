<script lang="tsx">
  import { computed, defineComponent, ref, unref } from 'vue';
  import { get } from 'lodash-es';
  import { Descriptions } from 'ant-design-vue';
  import { isFunction } from '@vueuse/shared';
  import CollapseContainer from '@ent-core/components/container';
  import { useDesign } from '@ent-core/hooks/web/use-design';
  import { getSlot } from '@ent-core/utils/helper/tsx-helper';
  import { useAttrs } from '@ent-core/hooks/core/use-attrs';
  import { descriptionsProps } from 'ant-design-vue/es/descriptions/index';
  import { type Recordable } from '@ent-core/types';
  import type { CollapseContainerOptions } from '@ent-core/components/container/interface';
  import type { CSSProperties, PropType } from 'vue';
  import type { DescriptionsProps } from 'ant-design-vue/es';
  import type { DescInstance, DescItem, DescriptionProps } from './typing';
  const props = {
    /**
     * 是否包裹 CollapseContainer 组件
     */
    useCollapse: { type: Boolean, default: true },
    /**
     * CollapseContainer 组件属性
     */
    collapseOptions: {
      type: Object as PropType<CollapseContainerOptions>,
      default: null,
    },
    /**
     * 详情项配置，见下方 DescItem 配置
     */
    schema: {
      type: Array as PropType<DescItem[]>,
      default: () => [],
    },
    /**
     * 数据源
     */
    data: { type: Object },
    ...descriptionsProps(),
  };

  /**
   * @docLocation https://raw.githubusercontent.com/vueComponent/ant-design-vue/4.0.0-rc.5/components/descriptions/index.zh-CN.md
   * @extends Descriptions
   * @docLink https://next.antdv.com/components/descriptions-cn
   */
  export default defineComponent({
    name: 'EntDescription',
    props,
    emits: ['register'],
    setup(props, { slots, emit }) {
      const propsRef = ref<Partial<DescriptionProps> | null>(null);

      const { prefixCls } = useDesign('description');
      const attrs = useAttrs();

      // Custom title component: get title
      const getMergeProps = computed(() => {
        return {
          ...props,
          ...(unref(propsRef) as Recordable),
        } as DescriptionProps;
      });

      const getProps = computed(() => {
        const opt = {
          ...unref(getMergeProps),
          title: undefined,
        };
        return opt as DescriptionProps;
      });

      /**
       * @description: Whether to setting title
       */
      const useWrapper = computed(() => !!unref(getMergeProps).title);

      /**
       * @description: Get configuration Collapse
       */
      const getCollapseOptions = computed((): CollapseContainerOptions => {
        return {
          // Cannot be expanded by default
          canExpand: false,
          ...unref(getProps).collapseOptions,
        };
      });

      const getDescriptionsProps = computed(() => {
        return { ...unref(attrs), ...unref(getProps) } as DescriptionsProps;
      });

      /**
       * @description:设置desc
       */
      function setDescProps(descProps: Partial<DescriptionProps>): void {
        // Keep the last setDrawerProps
        propsRef.value = { ...(unref(propsRef) as Recordable), ...descProps } as Recordable;
      }

      // Prevent line breaks
      function renderLabel({ label, labelMinWidth, labelStyle }: DescItem) {
        if (!labelStyle && !labelMinWidth) {
          return label;
        }

        const labelStyles: CSSProperties = {
          ...labelStyle,
          minWidth: `${labelMinWidth}px `,
        };
        return <div style={labelStyles}>{label}</div>;
      }

      function renderItem() {
        const { schema, data } = unref(getProps);
        return unref(schema)
          .map((item) => {
            const { render, field, span, show, contentMinWidth } = item;

            if (show && isFunction(show) && !show(data)) {
              return null;
            }

            const getContent = () => {
              const _data = unref(getProps)?.data;
              if (!_data) {
                return null;
              }
              const getField = get(_data, field);
              return isFunction(render) ? render(getField, _data) : getField ?? '';
            };

            const width = contentMinWidth;
            return (
              <Descriptions.Item label={renderLabel(item)} key={field} span={span}>
                {() => {
                  if (!contentMinWidth) {
                    return getContent();
                  }
                  const style: CSSProperties = {
                    minWidth: `${width}px`,
                  };
                  return <div style={style}>{getContent()}</div>;
                }}
              </Descriptions.Item>
            );
          })
          .filter((item) => !!item);
      }

      const renderDesc = () => {
        return (
          <Descriptions class={`${prefixCls}`} {...(unref(getDescriptionsProps) as any)}>
            {renderItem()}
          </Descriptions>
        );
      };

      const renderContainer = () => {
        const content = props.useCollapse ? renderDesc() : <div>{renderDesc()}</div>;
        // Reduce the dom level
        if (!props.useCollapse) {
          return content;
        }

        const { canExpand, helpMessage } = unref(getCollapseOptions);
        const { title } = unref(getMergeProps);

        return (
          <CollapseContainer title={title} canExpan={canExpand} helpMessage={helpMessage}>
            {{
              default: () => content,
              action: () => getSlot(slots, 'action'),
            }}
          </CollapseContainer>
        );
      };

      const methods: DescInstance = {
        setDescProps,
      };

      emit('register', methods);
      return () => (unref(useWrapper) ? renderContainer() : renderDesc());
    },
  });
</script>

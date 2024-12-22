
  import { computed, defineComponent, ref, unref } from 'vue';
  import { get, omit } from 'lodash-es';
  import { NDescriptions, NDescriptionsItem } from 'naive-ui';
  import { isFunction } from '../../../utils/is';
  import CollapseContainer from '../../../components/container';
  import { useAttrs, useDesign } from '../../../hooks';
  import { getSlot } from '../../../utils';
  import { type Recordable } from '../../../types';
  import { basicDescriptionsProps } from './props';
  import type { DescriptionsProps } from 'naive-ui';
  import type { CollapseContainerOptions } from '../../container/src/typing';
  import type { DescInstance, DescriptionProps } from './typing';

  export default defineComponent({
    name: 'EntDescription',
    extends: NDescriptions,
    inheritAttrs: false,
    props: basicDescriptionsProps,
    emits: ['register'],
    setup(props, { slots, emit }) {
      const propsRef = ref<Partial<DescriptionProps> | null>(null);

      const { prefixCls } = useDesign('description');
      const attrs = useAttrs();

      // Custom title component: get title
      const getMergeProps = computed(() => {
        return {
          ...props,
          ...(unref(propsRef) as Recordable)
        } as DescriptionProps;
      });

      const getProps = computed(() => {
        const opt = {
          ...unref(getMergeProps),
          title: undefined
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
          ...unref(getProps).collapseOptions
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

      function renderItem() {
        const { schema, data } = unref(getProps);
        return unref(schema)
          .map((item) => {
            const { render, field, show } = item;
            const descItemProps = omit(item, ['field', 'show', 'render']);
            if (show && isFunction(show) && !show(data)) {
              return null;
            }

            const getContent = () => {
              const _data = unref(getProps)?.data;
              if (!_data) {
                return null;
              }
              const getField = get(_data, field);
              return render !== undefined && isFunction(render)
                ? render(getField, _data)
                : getField ?? '';
            };

            return (
              <NDescriptionsItem key={field} {...descItemProps}>
                {{
                  default: () => getContent()
                }}
              </NDescriptionsItem>
            );
          })
          .filter((item) => !!item);
      }

      const renderDesc = () => {
        return (
          <NDescriptions class={`${prefixCls}`} {...(unref(getDescriptionsProps) as any)}>
            {renderItem()}
          </NDescriptions>
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
              action: () => getSlot(slots, 'action')
            }}
          </CollapseContainer>
        );
      };

      const methods: DescInstance = {
        setDescProps
      };

      emit('register', methods);
      return () => (unref(useWrapper) ? renderContainer() : renderDesc());
    }
  });

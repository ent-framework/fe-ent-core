import { descriptionsProps } from 'naive-ui';
import type { PropType } from 'vue';
import type { CollapseContainerOptions } from '../../container/src/typing';
import type { DescItem } from './typing';

export const basicDescriptionsProps = {
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
  ...descriptionsProps,
};

import type { BarMap } from './types';
import type { CSSProperties, ExtractPropTypes } from 'vue';
export const thumbProps = {
  vertical: Boolean,
  size: String,
  move: Number,
  ratio: {
    type: Number,
    required: true
  },
  always: Boolean
};

export type ThumbProps = ExtractPropTypes<typeof thumbProps>;

export const BAR_MAP: BarMap = {
  vertical: {
    offset: 'offsetHeight',
    scroll: 'scrollTop',
    scrollSize: 'scrollHeight',
    size: 'height',
    key: 'vertical',
    axis: 'Y',
    client: 'clientY',
    direction: 'top'
  },
  horizontal: {
    offset: 'offsetWidth',
    scroll: 'scrollLeft',
    scrollSize: 'scrollWidth',
    size: 'width',
    key: 'horizontal',
    axis: 'X',
    client: 'clientX',
    direction: 'left'
  }
};

export const renderThumbStyle = ({
  move,
  size,
  bar
}: Pick<ThumbProps, 'move' | 'size'> & {
  bar: (typeof BAR_MAP)[keyof typeof BAR_MAP];
}): CSSProperties => ({
  [bar.size]: size,
  transform: `translate${bar.axis}(${move}%)`
});

import { createTypes } from 'vue-types';
import type { CSSProperties, VNodeChild } from 'vue';
import type { VueTypeValidableDef, VueTypesInterface } from 'vue-types';
type VueNode = VNodeChild | JSX.Element;

const propTypes = createTypes({
  func: undefined,
  bool: undefined,
  string: undefined,
  number: undefined,
  object: undefined,
  integer: undefined,
  array: undefined,
});

propTypes.extend([
  {
    name: 'looseBool',
    getter: true,
    type: Boolean,
    default: undefined,
  },
  {
    name: 'style',
    getter: true,
    type: [String, Object],
    default: undefined,
  },
  {
    name: 'VNodeChild',
    getter: true,
    type: undefined,
  },
]);
export { propTypes };

export default propTypes as VueTypesInterface & {
  readonly looseBool: VueTypeValidableDef<boolean>;
  readonly style: VueTypeValidableDef<CSSProperties>;
  readonly VNodeChild: VueTypeValidableDef<VueNode>;
};

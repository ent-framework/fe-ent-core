import { createVNode, render } from 'vue';
import { isClient } from '../../../utils';
import ImgPreview from './functional-preview.vue';
import type { Options, Props } from './typing';

let instance: ReturnType<typeof createVNode> | null = null;
export function createImgPreview(options: Options) {
  if (!isClient) return;
  const propsData: Partial<Props> = {};
  const container = document.createElement('div');
  Object.assign(propsData, { show: true, index: 0, scaleStep: 100 }, options);

  instance = createVNode(ImgPreview, propsData);
  render(instance, container);
  document.body.appendChild(container);
  return instance.component?.exposed;
}

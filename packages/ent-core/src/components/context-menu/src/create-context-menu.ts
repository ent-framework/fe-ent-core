import { createVNode, render } from 'vue';
import { isClient } from '../../../utils/is';
import contextMenuVue from './index.vue';
import type { ContextMenuProps, CreateContextOptions } from './typing';
import type { Fn } from '../../../types';

const menuManager: {
  domList: Element[];
  resolve: Fn;
} = {
  domList: [],
  resolve: () => undefined
};

export const createContextMenu = function (options: CreateContextOptions) {
  const { event } = options || {};

  event && event?.preventDefault();

  if (!isClient) {
    return;
  }
  return new Promise((resolve) => {
    const body = document.body;

    const container = document.createElement('div');
    const propsData: Partial<ContextMenuProps> = {};
    if (options.styles) {
      propsData.styles = options.styles;
    }

    if (options.items) {
      propsData.items = options.items;
    }

    if (options.event) {
      propsData.customEvent = event;
      propsData.axis = { x: event.clientX, y: event.clientY };
    }

    const vm = createVNode(contextMenuVue, propsData);
    render(vm, container);

    const handleClick = function () {
      menuManager.resolve('');
    };

    menuManager.domList.push(container);

    const remove = function () {
      menuManager.domList.forEach((dom: Element) => {
        try {
          dom && body.removeChild(dom);
        } catch {
          //
        }
      });
      body.removeEventListener('click', handleClick);
      body.removeEventListener('scroll', handleClick);
    };

    menuManager.resolve = function (arg) {
      remove();
      resolve(arg);
    };
    remove();
    body.appendChild(container);
    body.addEventListener('click', handleClick);
    body.addEventListener('scroll', handleClick);
  });
};

export const destroyContextMenu = function () {
  if (menuManager) {
    menuManager.resolve('');
    menuManager.domList = [];
  }
};

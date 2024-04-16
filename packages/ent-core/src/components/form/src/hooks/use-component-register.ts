import { tryOnUnmounted } from '@vueuse/core';
import { add, del } from '../component-map';
import type { ComponentType } from '../types';
import type { Component } from 'vue';

export function useComponentRegister(compName: ComponentType, comp: Component) {
  add(compName, comp);
  tryOnUnmounted(() => {
    del(compName);
  });
}

import { inject, provide } from 'vue';
import type LogicFlow from '@logicflow/core';

const key = Symbol('flow-chart');

type Instance = {
  logicFlow: LogicFlow;
};

export function createFlowChartContext(instance: Instance) {
  provide(key, instance);
}

export function useFlowChartContext(): Instance {
  return inject(key) as Instance;
}

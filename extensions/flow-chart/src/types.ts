import type { NodeConfig } from '@logicflow/core';
import type { ToolbarTypeEnum } from './enum';

export interface NodeItem extends NodeConfig {
  icon: string;
}

export interface ToolbarConfig {
  type?: string | ToolbarTypeEnum;
  tooltip?: string | boolean;
  icon?: string;
  disabled?: boolean;
  separate?: boolean;
}

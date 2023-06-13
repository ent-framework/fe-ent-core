import type { NodePath } from 'ast-types/lib/node-path';
import type * as bt from '@babel/types';
import type { ComponentDoc } from 'vue-docgen-api';

export type PropsValuePath = NodePath<bt.ObjectExpression, any> | NodePath<bt.ArrayExpression, any>;

export interface ExtComponentDoc extends ComponentDoc {
  parent: ComponentDoc;
}

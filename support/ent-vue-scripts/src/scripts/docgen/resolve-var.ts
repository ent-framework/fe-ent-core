import * as bt from '@babel/types';
import { visit } from 'recast';
import type { NodePath } from 'ast-types/lib/node-path';

function ignore(): boolean {
  return false;
}

export type PropsValuePath = NodePath<bt.ObjectExpression, any> | NodePath<bt.ArrayExpression, any>;

export default function resolveVar(ast: bt.File): Map<string, PropsValuePath> {

  const nodePaths = new Map<string, PropsValuePath>();

  visit(ast.program, {
    // to look only at the root we ignore all traversing
    visitFunctionDeclaration: ignore,
    visitFunctionExpression: ignore,
    visitClassExpression: ignore,
    visitIfStatement: ignore,
    visitWithStatement: ignore,
    visitSwitchStatement: ignore,
    visitWhileStatement: ignore,
    visitDoWhileStatement: ignore,
    visitForStatement: ignore,
    visitForInStatement: ignore,

    visitVariableDeclaration(variablePath) {
      if (!bt.isVariableDeclaration(variablePath.node)) {
        return false;
      }
      const varID = variablePath.node.declarations[0].id;
      if (!varID || !bt.isIdentifier(varID)) {
        return false;
      }
      nodePaths.set(varID.name, variablePath.get('declarations', 0).get('init'));
      return false;
    },
  });
  return nodePaths;
}

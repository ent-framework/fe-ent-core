import fs from 'fs';
import * as bt from '@babel/types';
import { parse, visit } from 'recast';
import buildParser from './babel-parser';
import type { ParserPlugin } from '@babel/parser';
import type { NodePath } from 'ast-types/lib/node-path';

function ignore(): boolean {
  return false;
}

export type PropsValuePath = NodePath<bt.ObjectExpression, any> | NodePath<bt.ArrayExpression, any>;

export default function resolveImport(file: string): Map<string, PropsValuePath> {
  const source = fs.readFileSync(file, { encoding: 'utf-8' });
  const plugins: ParserPlugin[] = ['typescript'];
  const ast = parse(source, { parser: buildParser({ plugins }) });
  if (!ast) {
    throw new Error(`Unable to parse empty file "${file}"`);
  }

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

import fs from 'fs';
import { parse } from 'recast';
import buildParser from 'vue-docgen-api/dist/babel-parser';
import type * as bt from '@babel/types';
import type { ParserPlugin } from '@babel/parser';

export default function readFile(file: string): bt.File {
  const source = fs.readFileSync(file, { encoding: 'utf-8' });
  const plugins: ParserPlugin[] = ['typescript'];
  const ast = parse(source, { parser: buildParser({ plugins }) });
  if (!ast) {
    throw new Error(`Unable to parse empty file "${file}"`);
  }
  return ast;
}

import * as nodePath from 'path';
import fs from 'fs';
import * as bt from '@babel/types';
import { describePropsFromValue } from 'vue-docgen-api/dist/script-handlers/propHandler';
import getMemberFilter from './getPropsFilter';
import resolveImport from './resolveImport';
import resolveVar from './resolve-var';
import type { Documentation, ParseOptions } from 'vue-docgen-api';
import type { NodePath } from 'ast-types/lib/node-path';
import type { PropsValuePath } from './resolveImport';

function resolveImportFile(cwd: string, fileName: string, types: string[] = ['ts']) {
  // eslint-disable-next-line guard-for-in
  for (const ext in types) {
    const result = nodePath.resolve(cwd, `${fileName}.${types[ext]}`);
    if (fs.existsSync(result)) {
      return result;
    }
  }
  return undefined;
}

/**
 * Extract props information form an object-style VueJs component
 * @param documentation
 * @param path
 */
export default async function propExtHandler(
  documentation: Documentation,
  path: NodePath,
  ast: bt.File,
  opt: ParseOptions,
) {
  if (bt.isObjectExpression(path.node)) {
    const propsPath = path
      .get('properties')
      .filter((p: NodePath) => bt.isObjectProperty(p.node) && getMemberFilter('props')(p));

    // if no prop return
    if (!propsPath.length) {
      return Promise.resolve();
    }

    const modelPropertyName = getModelPropName(path);

    const propsValuePath = propsPath[0].get('value');

    if (bt.isIdentifier(propsValuePath.node)) {
      const varName = propsValuePath.node.name;
      //从vue文件定义的变量查找props
      const varDesc = ast.program.body
        .filter((n) => n.type === 'VariableDeclaration')
        .flatMap((val) => {
          const n = val as bt.VariableDeclaration;
          return n.declarations;
        })
        .find((val) => {
          const n = val as bt.VariableDeclarator;
          return (n.id as bt.Identifier).name === varName;
        });

      if (varDesc && varDesc.init && varDesc.init.type === 'ObjectExpression') {
        const vals = resolveVar(ast);
        const varDescPath = vals.get(varName);
        // @ts-ignore
        await describePropsFromValue(documentation, varDescPath, ast, opt, modelPropertyName);
      } else {
        //从import中查找定义的props
        const importDesc = ast.program.body
          .filter((n) => n.type === 'ImportDeclaration')
          .find((val) => {
            const n = val as bt.ImportDeclaration;
            return n.specifiers.map((m) => m.local.name).includes(varName);
          }) as bt.ImportDeclaration;
        if (importDesc) {
          const cwd = nodePath.dirname(opt.filePath);
          const importFile = resolveImportFile(cwd, importDesc.source.value);
          const nodePaths = resolveImport(importFile as string);
          if (nodePaths.has(varName)) {
            const p = nodePaths.get(varName) as PropsValuePath;
            // @ts-ignore
            await describePropsFromValue(
              documentation,
              // @ts-ignore
              p,
              ast,
              opt,
              modelPropertyName,
            );
          }
        }
      }
    }
  }
  return Promise.resolve();
}

/**
 * extract the property model.prop from the component object
 * @param path component NodePath
 * @returns name of the model prop, null if none
 */
function getModelPropName(path: NodePath): string | null {
  const modelPath = path
    .get('properties')
    .filter((p: NodePath) => bt.isObjectProperty(p.node) && getMemberFilter('model')(p));

  if (!modelPath.length) {
    return null;
  }

  const modelValue = modelPath.length && modelPath[0].get('value');

  if (!bt.isObjectExpression(modelValue.node)) {
    return null;
  }

  const modelPropertyNamePath = modelValue
    .get('properties')
    .filter((p: NodePath) => bt.isObjectProperty(p.node) && getMemberFilter('prop')(p));

  if (!modelPropertyNamePath.length) {
    return null;
  }

  const valuePath = modelPropertyNamePath[0].get('value');

  return bt.isStringLiteral(valuePath.node) ? valuePath.node.value : null;
}

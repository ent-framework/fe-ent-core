import * as bt from '@babel/types';
import getMemberFilter from 'vue-docgen-api/dist/utils/getPropsFilter.js';
import {
  describeImportPropsFromValue,
  describePropsFromValue
} from '../utils/describe-props-from-value.js';
import resolveVar from '../utils/resolve-var.js';
import { parseType } from '../utils/parse-type.js';
import type { Documentation, ParseOptions } from 'vue-docgen-api';
import type { NodePath } from 'ast-types/lib/node-path';

/**
 * Extract props information form an object-style VueJs component
 */
export async function propExtHandler(
  documentation: Documentation,
  path: NodePath,
  ast: bt.File,
  opt: ParseOptions
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
      const cwd = process.cwd();
      //直接定义在vue文件中的props
      if (varDesc && varDesc.init && varDesc.init.type === 'ObjectExpression') {
        const vals = resolveVar(ast);
        const varDescPath = vals.get(varName);
        // @ts-ignore
        await describePropsFromValue(documentation, varDescPath, ast, opt, cwd, modelPropertyName);
      } else {
        //从import中查找定义的props
        await describeImportPropsFromValue(
          documentation,
          ast,
          opt,
          cwd,
          varName,
          modelPropertyName
        );
      }
    } else if (bt.isObjectExpression(propsValuePath.node)) {
      // 增强部分, 增加对propTypes的解析
      const propsPaths = propsValuePath
        .get('properties')
        .filter((p: NodePath) => bt.isObjectProperty(p.node));
      if (propsPaths) {
        propsPaths.forEach((p: NodePath) => {
          const propDescriptor = documentation.getPropDescriptor(p.node.key.name);
          if (propDescriptor.type?.func) {
            parseType(propDescriptor, p);
          }
        });
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

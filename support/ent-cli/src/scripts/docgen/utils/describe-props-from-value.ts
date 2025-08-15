import * as nodePath from 'path';
import * as bt from '@babel/types';
import { print, visit } from 'recast';
import getDocblock from 'vue-docgen-api/dist/utils/getDocblock.js';
import getDoclets from 'vue-docgen-api/dist/utils/getDoclets.js';
import transformTagsIntoObject from 'vue-docgen-api/dist/utils/transformTagsIntoObject.js';
import getTemplateExpressionAST from 'vue-docgen-api/dist/utils/getTemplateExpressionAST.js';
import parseValidatorForValues from 'vue-docgen-api/dist/script-handlers/utils/parseValidator.js';
import resolvePathFrom from 'vue-docgen-api/dist/utils/resolvePathFrom.js';
import getMemberFilter from './member-filter.js';
import { parseType } from './parse-type.js';
import readFile from './read-file.js';
import resolveVar from './resolve-var.js';
import type { Expression, SpreadElement } from '@babel/types';
import type Documentation from 'vue-docgen-api/dist/Documentation';
import type {
  BlockTag,
  DocBlockTags,
  ParamTag,
  PropDescriptor,
  UnnamedParam
} from 'vue-docgen-api/dist/Documentation';
import type { NodePath } from 'ast-types/lib/node-path';
import type { ParseOptions } from 'vue-docgen-api/dist/parse';
import type { PropsValuePath } from '../types';

type ValueLitteral = bt.StringLiteral | bt.BooleanLiteral | bt.NumericLiteral;

export function getRawValueParsedFromFunctionsBlockStatementNode(
  blockStatementNode: bt.BlockStatement
): string | null {
  const { body } = blockStatementNode;
  // if there is more than a return statement in the body,
  // we cannot resolve the new object, we let the function display as a function
  if (body.length !== 1 || !bt.isReturnStatement(body[0])) {
    return null;
  }
  const [ret] = body;
  return ret.argument ? print(ret.argument).code : null;
}

export async function describeImportPropsFromValue(
  documentation: Documentation,
  ast: bt.File,
  opt: ParseOptions,
  cwd: string,
  varName: string,
  modelPropertyName: string | null
) {
  const importDesc = ast.program.body
    .filter((n) => n.type === 'ImportDeclaration')
    .find((val) => {
      const n = val as bt.ImportDeclaration;
      return n.specifiers.map((m) => m.local.name).includes(varName);
    }) as bt.ImportDeclaration;
  if (importDesc) {
    const importFileLocation = nodePath.resolve(cwd, opt.filePath);
    const currentDir = nodePath.dirname(importFileLocation);
    const importFile = resolvePathFrom(importDesc.source.value, [currentDir]);
    if (importFile) {
      const importAst = readFile(importFile);
      const nodePaths = resolveVar(importAst);
      if (nodePaths.has(varName)) {
        const p = nodePaths.get(varName) as PropsValuePath;
        // @ts-ignore
        await describePropsFromValue(
          documentation,
          // @ts-ignore
          p,
          importAst,
          { ...opt, filePath: importFile },
          cwd,
          modelPropertyName
        );
      }
    }
  }
}

export async function describePropsFromValue(
  documentation: Documentation,
  propsValuePath: NodePath<bt.ObjectExpression, any> | NodePath<bt.ArrayExpression, any>,
  ast: bt.File,
  opt: ParseOptions,
  cwd: string,
  modelPropertyName: string | null
) {
  if (bt.isObjectExpression(propsValuePath.node)) {
    const objProp: NodePath<bt.Property>[] = propsValuePath.get('properties');

    await Promise.all(
      objProp.map(async (prop) => {
        if (bt.isProperty(prop.node)) {
          await describeObjectPropsFromValue(prop, documentation, ast, opt, modelPropertyName);
        }
        // 内嵌元素
        if (bt.isSpreadElement(prop.node)) {
          const importFileLocation = nodePath.resolve(cwd, opt.filePath);
          const currentDir = nodePath.dirname(importFileLocation);
          await describeSpreadPropsFromValue(
            (prop.node as SpreadElement).argument,
            documentation,
            ast,
            opt,
            currentDir,
            modelPropertyName
          );
        }
      })
    );
  } else if (bt.isArrayExpression(propsValuePath.node)) {
    propsValuePath
      .get('elements')
      .filter((e: NodePath) => bt.isStringLiteral(e.node))
      .forEach((e: NodePath<bt.StringLiteral>) => {
        const propDescriptor = documentation.getPropDescriptor(e.node.value);
        propDescriptor.type = { name: 'undefined' };
      });
  }
}

async function describeObjectPropsFromValue(
  prop: NodePath<bt.Property>,
  documentation: Documentation,
  ast: bt.File,
  opt: ParseOptions,
  modelPropertyName: string | null
) {
  const propNode = prop.node;

  // description
  const docBlock = getDocblock(prop);
  const jsDoc: DocBlockTags = docBlock ? getDoclets(docBlock) : { description: '', tags: [] };
  const jsDocTags: BlockTag[] = jsDoc.tags ? jsDoc.tags : [];

  // if it's the v-model describe it only as such
  const propertyName = bt.isIdentifier(propNode.key)
    ? propNode.key.name
    : bt.isStringLiteral(propNode.key)
      ? propNode.key.value
      : null;

  if (!propertyName) {
    return;
  }
  const isPropertyModel =
    jsDocTags.some((t) => t.title === 'model') || propertyName === modelPropertyName;
  const propName = isPropertyModel ? 'v-model' : propertyName;

  const propDescriptor = documentation.getPropDescriptor(propName);

  const propValuePath = prop.get('value');

  if (jsDoc.description) {
    propDescriptor.description = jsDoc.description;
  }

  if (jsDocTags.length) {
    propDescriptor.tags = transformTagsIntoObject(jsDocTags);
  }

  extractValuesFromTags(propDescriptor);

  if (bt.isArrayExpression(propValuePath.node) || bt.isIdentifier(propValuePath.node)) {
    // if it's an immediately typed property, resolve its type immediately
    propDescriptor.type = getTypeFromTypePath(propValuePath);
  } else if (bt.isObjectExpression(propValuePath.node)) {
    // standard default + type + required
    const propPropertiesPath = propValuePath
      .get('properties')
      .filter(
        (p: NodePath) => bt.isObjectProperty(p.node) || bt.isObjectMethod(p.node)
      ) as NodePath<bt.ObjectProperty | bt.ObjectMethod>[];

    // type
    const literalType = describeType(propPropertiesPath, propDescriptor);

    // required
    describeRequired(propPropertiesPath, propDescriptor);

    // default
    describeDefault(propPropertiesPath, propDescriptor, literalType || '');

    // validator => values
    await describeValues(propPropertiesPath, propDescriptor, ast, opt);
  } else if (bt.isTSAsExpression(propValuePath.node)) {
    const propValuePathExpression = propValuePath.get('expression');

    if (bt.isObjectExpression(propValuePathExpression.node)) {
      // standard default + type + required with TS as annotation
      const propPropertiesPath = propValuePathExpression
        .get('properties')
        .filter((p: NodePath) => bt.isObjectProperty(p.node)) as NodePath<bt.ObjectProperty>[];

      // type and values
      describeTypeAndValuesFromPath(propValuePath, propDescriptor);

      // required
      describeRequired(propPropertiesPath, propDescriptor);

      // default
      describeDefault(
        propPropertiesPath,
        propDescriptor,
        (propDescriptor.type && propDescriptor.type.name) || ''
      );
    } else if (bt.isIdentifier(propValuePathExpression.node)) {
      describeTypeAndValuesFromPath(propValuePath, propDescriptor);
    }
  } else {
    // in any other case, just display the code for the typing
    propDescriptor.type = {
      name: print(prop.get('value')).code,
      func: true
    };
    parseType(propDescriptor, prop);
  }
}

async function describeSpreadPropsFromValue(
  prop: Expression,
  documentation: Documentation,
  ast: bt.File,
  opt: ParseOptions,
  cwd: string,
  modelPropertyName: string | null
) {
  if (bt.isIdentifier(prop)) {
    // 先找找是否有变量声明 比如 const xx = {} 形式
    let varDesc = ast.program.body
      .filter((n) => n.type === 'VariableDeclaration')
      .flatMap((val) => {
        const n = val as bt.VariableDeclaration;
        return n.declarations;
      })
      .find((val) => {
        const n = val as bt.VariableDeclarator;
        return (n.id as bt.Identifier).name === prop.name;
      });

    //找不到再找找是否声明成export 形式了 比如 export const xx = {}
    if (!varDesc) {
      varDesc = ast.program.body
        .filter((n) => n.type === 'ExportNamedDeclaration')
        .filter((val) => bt.isVariableDeclaration((val as bt.ExportNamedDeclaration).declaration))
        .flatMap((val) => {
          const n = val as bt.ExportNamedDeclaration;
          return (n.declaration as bt.VariableDeclaration).declarations;
        })
        .find((val) => {
          const n = val as bt.VariableDeclarator;
          return (n.id as bt.Identifier).name === prop.name;
        });
    }
    if (varDesc && varDesc.init && varDesc.init.type === 'ObjectExpression') {
      const vals = resolveVar(ast);
      const varDescPath = vals.get(prop.name);
      // @ts-ignore
      await describePropsFromValue(documentation, varDescPath, ast, opt, modelPropertyName);
    } else {
      //从import中查找定义的props
      await describeImportPropsFromValue(
        documentation,
        ast,
        opt,
        cwd,
        prop.name,
        modelPropertyName
      );
    }
  }
}

/**
 * Deal with the description of the type
 * @param propPropertiesPath
 * @param propDescriptor
 * @returns the unaltered type member of the prop object
 */
export function describeType(
  propPropertiesPath: NodePath<bt.ObjectProperty | bt.ObjectMethod>[],
  propDescriptor: PropDescriptor
): string | undefined {
  const typeArray = propPropertiesPath.filter(getMemberFilter('type'));

  if (propDescriptor.tags && propDescriptor.tags.type) {
    const [{ type: typeDesc }] = propDescriptor.tags.type as UnnamedParam[];
    if (typeDesc) {
      const typedAST = getTemplateExpressionAST(`let a:${typeDesc.name}`);
      let typeValues: string[] | undefined;
      visit(typedAST.program, {
        visitVariableDeclaration(path) {
          const { typeAnnotation } = path.get('declarations', 0, 'id', 'typeAnnotation').value;
          if (
            bt.isTSUnionType(typeAnnotation) &&
            typeAnnotation.types.every((t) => bt.isTSLiteralType(t))
          ) {
            typeValues = typeAnnotation.types.map((val: bt.TSType) => {
              const t = val as bt.TSLiteralType;
              return bt.isUnaryExpression(t.literal)
                ? (t.literal as bt.UnaryExpression).argument.toString()
                : (t.literal as bt.StringLiteral).value.toString();
            });
          }
          return false;
        }
      });
      if (typeValues) {
        propDescriptor.values = typeValues;
      } else {
        propDescriptor.type = typeDesc;
        return getTypeFromTypePath(typeArray[0].get('value')).name;
      }
    }
  }

  if (typeArray.length) {
    return describeTypeAndValuesFromPath(typeArray[0].get('value'), propDescriptor);
  } else {
    // deduce the type from default expression
    const defaultArray = propPropertiesPath.filter(getMemberFilter('default'));
    if (defaultArray.length) {
      const typeNode = defaultArray[0].node;
      if (bt.isObjectProperty(typeNode)) {
        const func =
          bt.isArrowFunctionExpression(typeNode.value) || bt.isFunctionExpression(typeNode.value);
        const typeValueNode = defaultArray[0].get('value').node as ValueLitteral;
        const typeName = typeof typeValueNode.value;
        propDescriptor.type = { name: func ? 'func' : typeName };
      }
    }
  }
  return undefined;
}

const VALID_VUE_TYPES = [
  'string',
  'number',
  'boolean',
  'array',
  'object',
  'date',
  'function',
  'symbol'
];

function resolveParenthesis(typeAnnotation: bt.TSType): bt.TSType {
  let finalAnno = typeAnnotation;
  while (bt.isTSParenthesizedType(finalAnno)) {
    finalAnno = finalAnno.typeAnnotation;
  }
  return finalAnno;
}

function describeTypeAndValuesFromPath(
  propPropertiesPath: NodePath<bt.TSAsExpression>,
  propDescriptor: PropDescriptor
): string {
  // values
  const values = getValuesFromTypePath(propPropertiesPath.node.typeAnnotation);

  // if it has an "as" annotation defining values
  if (values) {
    propDescriptor.values = values;
    propDescriptor.type = { name: 'string' };
  } else {
    // Get natural type from its identifier
    // (classic way)
    // type: Object
    propDescriptor.type = getTypeFromTypePath(propPropertiesPath);
  }
  return propDescriptor.type.name;
}

export function getTypeFromTypePath(typePath: NodePath<bt.TSAsExpression | bt.Identifier>): {
  name: string;
  func?: boolean;
} {
  const typeNode = typePath.node;
  const { typeAnnotation } = typeNode;

  const typeName =
    bt.isTSTypeReference(typeAnnotation) && typeAnnotation.typeParameters
      ? print(resolveParenthesis(typeAnnotation.typeParameters.params[0])).code
      : bt.isArrayExpression(typeNode)
        ? typePath
            .get('elements')
            .map((t: NodePath) => getTypeFromTypePath(t).name)
            .join('|')
        : typeNode &&
            bt.isIdentifier(typeNode) &&
            VALID_VUE_TYPES.includes(typeNode.name.toLowerCase())
          ? typeNode.name.toLowerCase()
          : print(typeNode).code;
  return {
    name: typeName === 'function' ? 'func' : typeName
  };
}

/**
 * When a prop is type annotated with the "as" keyword,
 * It means that its possible values can be extracted from it
 * this extracts the values from the as
 * @param typeAnnotation the as annotation
 */
function getValuesFromTypePath(typeAnnotation: bt.TSType): string[] | undefined {
  if (bt.isTSTypeReference(typeAnnotation) && typeAnnotation.typeParameters) {
    const type = resolveParenthesis(typeAnnotation.typeParameters.params[0]);
    return getValuesFromTypeAnnotation(type);
  }
  return undefined;
}

export function getValuesFromTypeAnnotation(type: bt.TSType): string[] | undefined {
  if (bt.isTSUnionType(type) && type.types.every((t) => bt.isTSLiteralType(t))) {
    return type.types.map((t) =>
      bt.isTSLiteralType(t) && !bt.isUnaryExpression(t.literal)
        ? ((t as bt.TSLiteralType).literal as bt.StringLiteral).value.toString()
        : ''
    );
  }
  return undefined;
}

export function describeRequired(
  propPropertiesPath: NodePath<bt.ObjectProperty | bt.ObjectMethod>[],
  propDescriptor: PropDescriptor
) {
  const requiredArray = propPropertiesPath.filter(getMemberFilter('required'));
  const requiredNode = requiredArray.length ? requiredArray[0].get('value').node : undefined;
  const required =
    requiredNode && bt.isBooleanLiteral(requiredNode) ? requiredNode.value : undefined;
  if (required !== undefined) {
    propDescriptor.required = required;
  }
}

export function describeDefault(
  propPropertiesPath: NodePath<bt.ObjectProperty | bt.ObjectMethod>[],
  propDescriptor: PropDescriptor,
  propType: string
): void {
  const defaultArray = propPropertiesPath.filter(getMemberFilter('default'));
  if (defaultArray.length) {
    /**
     * This means the default value is formatted like so: `default: any`
     */
    const defaultValueIsProp = bt.isObjectProperty(defaultArray[0].value);
    /**
     * This means the default value is formatted like so: `default () { return {} }`
     */
    const defaultValueIsObjectMethod = bt.isObjectMethod(defaultArray[0].value);
    // objects and arrays should try to extract the body from functions
    if (propType === 'object' || propType === 'array') {
      if (defaultValueIsProp) {
        /* TODO: add correct type info here ↓ */
        const defaultFunction = defaultArray[0].get('value');
        const isArrowFunction = bt.isArrowFunctionExpression(defaultFunction.node);
        const isOldSchoolFunction = bt.isFunctionExpression(defaultFunction.node);

        // if default is undefined or null, literals are allowed
        if (
          bt.isNullLiteral(defaultFunction.node) ||
          (bt.isIdentifier(defaultFunction.node) && defaultFunction.node.name === 'undefined')
        ) {
          propDescriptor.defaultValue = {
            func: false,
            value: print(defaultFunction.node).code
          };
          return;
        }

        // check if the prop value is a function
        if (!isArrowFunction && !isOldSchoolFunction) {
          throw new Error(
            'A default value needs to be a function when your type is an object or array'
          );
        }
        // retrieve the function "body" from the arrow function
        if (isArrowFunction) {
          const arrowFunctionBody = defaultFunction.get('body');
          // arrow function looks like `() => { return {} }`
          if (bt.isBlockStatement(arrowFunctionBody.node)) {
            const rawValueParsed = getRawValueParsedFromFunctionsBlockStatementNode(
              arrowFunctionBody.node
            );
            if (rawValueParsed) {
              propDescriptor.defaultValue = {
                func: false,
                value: rawValueParsed
              };
              return;
            }
          }

          if (
            bt.isArrayExpression(arrowFunctionBody.node) ||
            bt.isObjectExpression(arrowFunctionBody.node)
          ) {
            const rawCode = print(arrowFunctionBody.node).code;
            const value = arrowFunctionBody.node.extra?.parenthesized
              ? rawCode.slice(1, -1)
              : rawCode;
            propDescriptor.defaultValue = {
              func: false,
              value
            };
            return;
          }

          // arrow function looks like `() => ({})`
          propDescriptor.defaultValue = {
            func: true,
            value: print(defaultFunction).code
          };
          return;
        }
      }
      // defaultValue was either an ObjectMethod or an oldSchoolFunction
      // in either case we need to retrieve the blockStatement and work with that
      /* todo: add correct type info here ↓ */
      const defaultBlockStatement = defaultValueIsObjectMethod
        ? defaultArray[0].get('body')
        : defaultArray[0].get('value').get('body');
      const defaultBlockStatementNode: bt.BlockStatement = defaultBlockStatement.node;
      const rawValueParsed =
        getRawValueParsedFromFunctionsBlockStatementNode(defaultBlockStatementNode);
      if (rawValueParsed) {
        propDescriptor.defaultValue = {
          func: false,
          value: rawValueParsed
        };
        return;
      }
    }

    // otherwise the rest should return whatever there is
    if (defaultValueIsProp) {
      // in this case, just return the rawValue
      let defaultPath = defaultArray[0].get('value');
      if (bt.isTSAsExpression(defaultPath.value)) {
        defaultPath = defaultPath.get('expression');
      }
      const rawValue = print(defaultPath).code;
      propDescriptor.defaultValue = {
        func: bt.isFunction(defaultPath.node),
        value: rawValue
      };
      return;
    }

    if (defaultValueIsObjectMethod) {
      // in this case, just the function needs to be reconstructed a bit
      const defaultObjectMethod = defaultArray[0].get('value');
      const paramNodeArray = defaultObjectMethod.node.params;
      const params = paramNodeArray.map((p: any) => p.name).join(', ');

      const defaultBlockStatement = defaultArray[0].get('body');
      const rawValue = print(defaultBlockStatement).code;
      // the function should be reconstructed as "old-school" function, because they have the same handling of "this", whereas arrow functions do not.
      const rawValueParsed = `function(${params}) ${rawValue.trim()}`;
      propDescriptor.defaultValue = {
        func: true,
        value: rawValueParsed
      };
      return;
    }
    throw new Error('Your default value was formatted incorrectly');
  }
}

async function describeValues(
  propPropertiesPath: NodePath<bt.ObjectProperty | bt.ObjectMethod>[],
  propDescriptor: PropDescriptor,
  ast: bt.File,
  options: ParseOptions
) {
  if (propDescriptor.values) {
    return;
  }

  const validatorArray = propPropertiesPath.filter(getMemberFilter('validator'));
  if (validatorArray.length) {
    const validatorNode = validatorArray[0].get('value').node;
    const values = await parseValidatorForValues(validatorNode, ast, options);
    if (values) {
      propDescriptor.values = values;
    }
  }
}

export function extractValuesFromTags(propDescriptor: PropDescriptor) {
  if (propDescriptor.tags && propDescriptor.tags.values) {
    const values = propDescriptor.tags.values.map((tag) => {
      const description = (tag as any as ParamTag).description;
      const choices = typeof description === 'string' ? description.split(',') : undefined;
      if (choices) {
        return choices.map((v: string) => v.trim());
      }
      return [];
    });
    propDescriptor.values = ([] as string[]).concat(...values);

    delete propDescriptor.tags.values;
  }
}

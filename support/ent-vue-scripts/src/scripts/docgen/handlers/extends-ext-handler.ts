import * as path from 'path';
import fs from 'fs';
import * as bt from '@babel/types';
import resolveLocal from 'vue-docgen-api/dist/utils/resolveLocal';
import resolveRequired from 'vue-docgen-api/dist/utils/resolveRequired';
import { addDefaultAndExecuteHandlers } from 'vue-docgen-api/dist/parse-script';
import consola from 'consola';
import type { WebType } from '../../../utils/web-types';
import type { ImportedVariableSet } from 'vue-docgen-api/dist/utils/resolveRequired';
import type { NodePath } from 'ast-types/lib/node-path';
import type { Documentation, ParseOptions } from 'vue-docgen-api';

export async function extendsExtHandler(
  documentation: Documentation,
  componentDefinition: NodePath,
  astPath: bt.File,
  opt: ParseOptions,
) {
  if (!(typeof componentDefinition.get === 'function')) {
    consola.error(
      `NodePath.get is not a function, maybe it is setup vue component : \n ${opt.filePath}`,
    );
    return;
  }

  const extendsVariableName = getExtendsVariableName(componentDefinition);

  // if there is no extends or extends is a direct require
  if (!extendsVariableName) {
    return;
  }

  const variablesResolvedToCurrentFile = resolveLocal(astPath, [extendsVariableName]);

  if (variablesResolvedToCurrentFile.get(extendsVariableName)) {
    await addDefaultAndExecuteHandlers(
      variablesResolvedToCurrentFile,
      astPath,
      {
        ...opt,
        nameFilter: [extendsVariableName],
      },
      documentation,
    );
  } else {
    // get all require / import statements
    const extendsFilePath = resolveRequired(astPath, [extendsVariableName]);

    // get each doc for each mixin using parse
    await documentRequiredComponents(documentation, extendsFilePath, 'extends', opt);
  }
}

function getExtendsVariableName(compDef: NodePath): string | undefined {
  const extendsVariable: NodePath | undefined =
    compDef &&
    bt.isClassDeclaration(compDef.node) &&
    compDef.node.superClass &&
    bt.isIdentifier(compDef.node.superClass)
      ? (compDef.get('superClass') as NodePath<bt.Identifier>)
      : getExtendsVariableNameFromCompDef(compDef);

  if (extendsVariable) {
    const extendsValue = bt.isProperty(extendsVariable.node)
      ? extendsVariable.node.value
      : extendsVariable.node;
    return extendsValue && bt.isIdentifier(extendsValue) ? extendsValue.name : undefined;
  }
  return undefined;
}

function getExtendsVariableNameFromCompDef(compDef: NodePath): NodePath | undefined {
  if (!compDef) {
    return undefined;
  }

  const compDefProperties = compDef.get('properties');
  const pathExtends = compDefProperties.value
    ? compDefProperties.filter(
        (p: NodePath<bt.Property>) => bt.isIdentifier(p.node.key) && p.node.key.name === 'extends',
      )
    : [];
  return pathExtends.length ? pathExtends[0] : undefined;
}

async function documentRequiredComponents(
  documentation: Documentation | undefined,
  varToFilePath: ImportedVariableSet,
  originObject: 'extends' | 'mixin' | undefined,
  opt: ParseOptions,
): Promise<void> {
  const originalDirName = path.dirname(opt.filePath);
  const resolvedPaths = path.resolve(process.cwd(), originalDirName);
  if (resolvedPaths) {
    try {
      const rootPath = searchForNodeRoot(resolvedPaths);
      const content = fs.readFileSync(
        `${rootPath}/node_modules/${varToFilePath[Object.keys(varToFilePath)[0]].filePath[0]}/web-types.json`,
        {
          encoding: 'utf-8',
        },
      );
      const webType = JSON.parse(content) as WebType;
      const component = webType.contributions.html['vue-components'].find(
        (component) => component.name == Object.keys(varToFilePath)[0],
      );
      if (component) {
        component.props.forEach((prop) => {
          const propDescriptor = documentation?.getPropDescriptor(prop.name);
          if (propDescriptor) {
            propDescriptor.type = {
              name: prop.type as string,
            };
            propDescriptor.description = prop.description;
          }
        });
      }
    } catch {
      consola.error(`Could not find ${opt.filePath}`);
    }
  }
}

function searchForNodeRoot(resolvedPaths: string) {
  let rootPath = resolvedPaths;
  while (!fs.existsSync(path.resolve(rootPath, 'package.json'))) {
    rootPath = path.resolve(rootPath, '..');
  }
  return rootPath;
}

import * as nodePath from 'path';
import fs from 'fs-extra';
import * as bt from '@babel/types';
import consola from 'consola';
import loadDoc from '../utils/doc-markdown';
import resolveDocLocation from '../utils/resolve-doc-location';
import downloadMarkdown from '../utils/download-md';
import type { NodePath } from 'ast-types/lib/node-path';
import type { Documentation, ParseOptions } from 'vue-docgen-api';
export async function extendsExtHandler(
  documentation: Documentation,
  componentDefinition: NodePath,
  ast: bt.File,
  opt: ParseOptions,
) {
  const extendsVariable = getExtendsVariable(componentDefinition);

  if (!extendsVariable) {
    return;
  }

  const extendsVariableName = getExtendsVariableName(extendsVariable);
  // if there is no extends or extends is a direct require
  if (!extendsVariableName) {
    return;
  }
  //从import中查找定义的变量
  const importDesc = ast.program.body
    .filter((n) => n.type === 'ImportDeclaration')
    .find((val) => {
      const n = val as bt.ImportDeclaration;
      return n.specifiers.map((m) => m.local.name).includes(extendsVariableName);
    }) as bt.ImportDeclaration;

  if (!importDesc) {
    return;
  }
  //查找导入文件，能找到是本地文件
  const currentFileLocation = nodePath.resolve(process.cwd(), opt.filePath);
  const currentFilePath = nodePath.dirname(currentFileLocation);
  const importFileLocation = nodePath.resolve(currentFilePath, `${importDesc.source.value}`);
  //不是本地文件，则是外部引入包
  if (!fs.existsSync(importFileLocation)) {
    const filePath = nodePath.dirname(nodePath.resolve(process.cwd(), opt.filePath));

    const mdFileLocation = nodePath.resolve(filePath, `${extendsVariableName}.md`);
    if (!fs.existsSync(mdFileLocation)) {
      const docLocation = resolveDocLocation(extendsVariable);
      if (docLocation) {
        await downloadMarkdown(docLocation, filePath, extendsVariableName);
      }
    }
    if (fs.existsSync(mdFileLocation)) {
      await loadDoc(mdFileLocation, documentation, {
        name: extendsVariableName,
        path: 'antdv',
      });
    } else {
      consola.warn(`${extendsVariableName}.md 不存在，请确保网络及注释配置正确`);
    }
  }
}

function getExtendsVariable(compDef: NodePath): NodePath | undefined {
  return compDef &&
    bt.isClassDeclaration(compDef.node) &&
    compDef.node.superClass &&
    bt.isIdentifier(compDef.node.superClass)
    ? (compDef.get('superClass') as NodePath<bt.Identifier>)
    : getExtendsVariableNameFromCompDef(compDef);
}

function getExtendsVariableName(compDef: NodePath): string | undefined {
  const extendsValue = bt.isProperty(compDef.node) ? compDef.node.value : compDef.node;
  return extendsValue && bt.isIdentifier(extendsValue) ? extendsValue.name : undefined;
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

import * as nodePath from 'path';
import fs from 'fs-extra';
import consola from 'consola';
import loadDoc from '../utils/doc-markdown';
import downloadMarkdown from '../utils/download-md';
import type * as bt from '@babel/types';
import type { NodePath } from 'ast-types/lib/node-path';
import type { Documentation, ParseOptions } from 'vue-docgen-api';
import type { ParamTag } from 'vue-inbrowser-compiler-independent-utils';

export async function extendsExtHandler(
  documentation: Documentation,
  componentDefinition: NodePath,
  ast: bt.File,
  opt: ParseOptions,
) {
  const componentDoc = documentation.toObject();
  const docLocationTags = componentDoc.tags['docLocation'];
  const extendsTags = componentDoc.tags['extends'];
  if (docLocationTags && docLocationTags.length === 1 && extendsTags && extendsTags.length == 1) {
    const extendsVariableName = `${(extendsTags[0] as ParamTag).description}`;
    const filePath = nodePath.dirname(nodePath.resolve(process.cwd(), opt.filePath));

    const mdFileLocation = nodePath.resolve(filePath, `${extendsVariableName}.md`);
    if (!fs.existsSync(mdFileLocation)) {
      const docLocation = `${(docLocationTags[0] as ParamTag).description}`;
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

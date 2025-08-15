import getDocblock from 'vue-docgen-api/dist/utils/getDocblock.js';
import getDoclets from 'vue-docgen-api/dist/utils/getDoclets.js';
import type { DocBlockTags } from 'vue-docgen-api/dist/Documentation';
import type { PropDescriptor, Tag } from 'vue-docgen-api';
import type { NodePath } from 'ast-types/lib/node-path';
import type { ParamTag } from 'vue-inbrowser-compiler-independent-utils';
export function parseType(prop: PropDescriptor, path: NodePath) {
  const typeMatch = prop.type?.name.match(
    /propTypes\.(string|bool|func|number|object|integer|array|oneOfType|oneOf)/
  );

  if (typeMatch) {
    const docBlock = getDocblock(path);
    if (docBlock) {
      const jsDoc: DocBlockTags = getDoclets(docBlock);
      if (jsDoc.tags) {
        const typeTag = jsDoc.tags.find((t) => t.title === 'type');
        if (typeTag) {
          prop.type = {
            name: `${(typeTag as ParamTag).type?.name}`,
            func: false
          };
        }
        const defaultTag = jsDoc.tags.find((t) => t.title === 'default');
        if (defaultTag) {
          prop.defaultValue = {
            value: `${(defaultTag as Tag).content}`,
            func: false
          };
        }
        const requiredTag = jsDoc.tags.find((t) => t.title === 'required');
        if (requiredTag) {
          prop.required = true;
        }
      }
    }
  }
}

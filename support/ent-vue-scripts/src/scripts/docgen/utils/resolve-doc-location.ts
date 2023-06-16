import getDoclets from 'vue-docgen-api/dist/utils/getDoclets';
import getDocblock from 'vue-docgen-api/dist/utils/getDocblock';
import type { NodePath } from 'ast-types/lib/node-path';
import type { Tag } from 'vue-inbrowser-compiler-independent-utils';

export default function resolveDocLocation(nodePath: NodePath) {
  let i = 0;
  let docBlock = getDocblock(nodePath, { commentIndex: i });
  docBlock = getDocblock(nodePath);
  while (docBlock) {
    // if no doc block return
    if (!docBlock || !docBlock.length) {
      return undefined;
    }

    const jsDoc = getDoclets(docBlock);
    if (jsDoc.tags) {
      const slotTag = jsDoc.tags.find((a: any) => a.title === 'docLocation');
      if (slotTag) {
        return (slotTag as Tag).content as string;
      }
    }
    docBlock = getDocblock(nodePath, { commentIndex: ++i });
  }
  return undefined;
}

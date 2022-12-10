import { EP_PKG, EP_PREFIX } from '@ent-core/build-constants';
import type { Plugin } from 'rollup';

export function EntExtAlias(): Plugin {
  return {
    name: 'ent-ext-alias-plugin',
    resolveId(id, importer, options) {
      if (!id.startsWith(EP_PREFIX)) return;

      if (id.startsWith(EP_PREFIX)) {
        return {
          id: id.replaceAll(EP_PREFIX, `${EP_PKG}`),
          external: 'absolute',
        };
      }
      return this.resolve(id, importer, { skipSelf: true, ...options });
    },
  };
}

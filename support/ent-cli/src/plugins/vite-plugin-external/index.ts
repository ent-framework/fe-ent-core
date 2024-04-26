import type { Plugin } from 'vite';

export default function externalPlugin(deps: string[]): Plugin {
  return {
    name: 'vite:external-node_modules',
    enforce: 'pre',
    async resolveId(source: string, importer) {
      if (source) {
        for (const dep of deps) {
          if (source.startsWith(dep)) {
            return false;
          }
        }
      }
      const result = await this.resolve(source, importer, {
        skipSelf: true,
        custom: { 'node-resolve': {} }
      });

      if (result && /node_modules/.test(result.id)) {
        return false;
      }

      return null;
    }
  };
}

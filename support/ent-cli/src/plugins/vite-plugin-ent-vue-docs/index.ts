import { transformChangelog, transformDemo, transformMain } from './markdown.js';
import { getDescriptor } from './descriptor.js';
import { getFrontMatter, getVueId, isDemoMarkdown, isVirtualModule } from './utils.js';
import marked from './marked.js';
import type { ModuleNode, Plugin } from 'vite';

export default function vueMdPlugin(): Plugin {
  let vuePlugin: Plugin | undefined;

  return {
    name: 'vite:ent-vue-docs',
    enforce: 'pre',
    configResolved(resolvedConfig) {
      // 获取vue插件，在hotUpload中使用
      vuePlugin = resolvedConfig.plugins.find((p) => p.name === 'vite:vue');
    },
    resolveId(id: string) {
      // 遇到虚拟md模块，直接返回id
      if (isVirtualModule(id)) {
        return id;
      }
      return null;
    },
    load(id) {
      // 遇到虚拟md模块，直接返回缓存的内容
      if (isVirtualModule(id)) {
        return getDescriptor(id);
      }
      return null;
    },
    transform(code: string, id: string) {
      if (!id.endsWith('.md')) {
        return null;
      }
      if (!vuePlugin) {
        return this.error('Not found plugin [vite:vue]');
      }

      const transform =
        'handler' in vuePlugin.transform! ? vuePlugin.transform!.handler : vuePlugin.transform!;

      if (isVirtualModule(id)) {
        return transform?.call(this, code, getVueId(id));
      }

      const tokens = marked.Lexer.lex(code);
      const frontMatter = getFrontMatter(tokens);

      if (frontMatter?.changelog) {
        return transformChangelog(tokens);
      }

      const vueCode = isDemoMarkdown(id)
        ? transformDemo(tokens, id, frontMatter)
        : transformMain(tokens, id, frontMatter);

      return transform?.call(this, vueCode, getVueId(id));
    },

    async handleHotUpdate(ctx) {
      if (!ctx.file.endsWith('.md') || !vuePlugin) {
        return undefined;
      }

      const { file, read, timestamp, server, modules } = ctx;
      const { moduleGraph } = server;

      const content = await read();

      const tokens = marked.Lexer.lex(content);
      const frontMatter = getFrontMatter(tokens);

      if (frontMatter?.changelog) {
        return modules;
      }

      const isDemo = isDemoMarkdown(file);

      const component = isDemo
        ? transformDemo(tokens, file, frontMatter)
        : transformMain(tokens, file, frontMatter);

      // 3. 让 Vite 继续对生成的 .vue 做 HMR
      const vueModule = server.moduleGraph.getModuleById(getVueId(file))
      if (vueModule) {
        vueModule.transformResult = null     // 强制重新 transform
        return [vueModule]
      }
    }
  };
}

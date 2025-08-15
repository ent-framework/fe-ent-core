import path from 'path';
import { parse } from '@vue/compiler-sfc';
import { marked } from 'marked';
import yaml from 'js-yaml';
import Prism from 'prismjs';
import loadLanguages from 'prismjs/components/index.js';
import { cleanUrl, escape } from './helper.js';
import type { FileImportToken, I18nDescriptionToken } from './interface.js';

const languages = ['shell', 'js', 'ts', 'jsx', 'tsx', 'less', 'diff'];
loadLanguages(languages);

const frontMatter = {
  name: 'frontMatter',
  level: 'block',
  tokenizer(src: string) {
    const rule = /^```yaml\n+(.+?)\n+```(?:\n|$)/s;
    const match = rule.exec(src);
    if (match) {
      const text = match[1].trim();
      const attributes = yaml.load(text);

      return {
        type: 'frontMatter',
        raw: match[0],
        text,
        attributes
      };
    }
    return undefined;
  },
  renderer() {
    // frontMatter不返回内用
    return '';
  }
};

const fileImport = {
  name: 'fileImport',
  level: 'block',
  tokenizer(src: string) {
    const rule = /^@import\s+(.+)(?:\n|$)/;
    const match = rule.exec(src);
    if (match) {
      const filename = match[1].trim();
      const basename = path.basename(filename, '.md');

      return {
        type: 'fileImport',
        raw: match[0],
        filename,
        basename
      };
    }
    return undefined;
  },
  renderer(token: FileImportToken) {
    return `<demo-${token.basename} />\n`;
  }
};

const i18nDescription = {
  name: 'i18nDescription',
  level: 'block',
  tokenizer(src: string) {
    const rule = /^##\s+(zh-CN|en-US)\n+(.+?)\n+---(?:\n|$)/s;
    const match = rule.exec(src);

    if (match) {
      const text = match[2].trim();
      const content = marked.parse(text);
      return {
        type: 'i18nDescription',
        raw: match[0],
        text,
        locale: match[1],
        content
      };
    }
    return undefined;
  },
  renderer(token: I18nDescriptionToken) {
    return token.content;
  }
};

marked.setOptions({
  highlight(
    code: string,
    lang: string,
    callback?: (error: any, code?: string) => void
  ): string | void {
    if (lang === 'vue') {
      const { descriptor } = parse(code);
      const { script, styles } = descriptor;

      let htmlContent = code;
      const hasStyle = Boolean(styles.length > 0);
      if (script?.content) {
        htmlContent = htmlContent.replace(script.content, '$script$');
      }
      if (hasStyle) {
        styles.forEach((style, index) => {
          htmlContent = htmlContent.replace(style.content, `$style-${index}$`);
        });
      }

      let highlighted = Prism.highlight(htmlContent, Prism.languages.html, 'html');
      if (script?.content) {
        const lang = script.lang ?? 'js';
        const highlightedScript = Prism.highlight(script.content, Prism.languages[lang], lang);
        highlighted = highlighted.replace('$script$', highlightedScript);
      }
      if (hasStyle) {
        styles.forEach((style, index) => {
          const lang = style.lang ?? 'css';
          const highlightedStyle = Prism.highlight(style.content, Prism.languages[lang], lang);
          highlighted = highlighted.replace(`$style-${index}$`, highlightedStyle);
        });
      }

      return highlighted;
    }
    if (languages.includes(lang)) {
      return Prism.highlight(code, Prism.languages[lang], lang);
    }
    return code;
  }
});

marked.use({
  breaks: true,
  xhtml: true,
  renderer: {
    heading(text: string, level: number, raw: string) {
      if (level === 2) {
        const anchor = raw.replace(/\s+/g, '-');
        return `<a-page-header level="${level}" href="${anchor}">${text}</a-page-header>`;
      }
      return `<h${level} id="${raw}">${text}</h${level}>`;
    },
    link(this: any, href, title, text) {
      href = cleanUrl(this.options.sanitize, this.options.baseUrl, href as string);
      if (href === null) {
        return text;
      }
      let out = `<a class="link" href="${escape(href as string, 'utf-8')}"`;
      if (title) {
        if (/_blank/.test(title)) {
          out += ` target="_blank"`;
          title = title.replace('_blank', '').trim();
          if (title) {
            out += ` title="${title}"`;
          }
        } else {
          out += ` title="${title}"`;
        }
      }
      out += `>${text}</a>`;
      return out;
    },
    code(this: any, code, infostring) {
      const lang = (infostring || '').match(/\S*/)?.[0];
      if (this.options.highlight) {
        const out = this.options.highlight(code, lang);
        if (out != null && out !== code) {
          code = out;
        }
      }
      code = code.replace(/{{|}}/g, (string) => {
        if (string === '{{') {
          return '&#123;&#123;';
        }
        return '&#125;&#125;';
      });
      code = `${code.replace(/\n$/, '')}\n`;

      if (!lang) {
        return `<pre class="code-content"><code>${code}</code></pre>\n`;
      }

      return `<pre class="code-content"><code class="${this.options.langPrefix}lang">${code}</code></pre>\n`;
    },
    table(header: string, body: string) {
      return `<div class="ant-table ant-table-small ant-table-bordered">
<div class="ant-table-container"><div class="ant-table-content">
<table class="component-api-table" style="table-layout: auto;">
  <colgroup>
    <col style="min-width: 120px"/>
  </colgroup>
  <thead class="ant-table-thead">${header}</thead><tbody class="ant-table-tbody">${body}</tbody>
</table></div></div></div>`;
    },
    tablerow(content: string): string {
      return `<tr>${content}</tr>`;
    },
    tablecell(content: string, { header, align }): string {
      if (header) {
        return `<th class="ant-table-cell">${content}</th>`;
      }
      return `<td class="ant-table-cell">${content}</td>`;
    }
  },
  // @ts-ignore @types/marked版本过低导致
  extensions: [i18nDescription, fileImport, frontMatter]
});

export default marked;

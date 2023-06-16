import path from 'path';
import type { marked } from 'marked';
import type { FileImportToken, I18nDescriptionToken } from './interface';

export function isParagraph(token: marked.Token): token is marked.Tokens.Paragraph {
  return (token as marked.Tokens.Paragraph).type === 'paragraph';
}

export function isCode(token: marked.Token): token is marked.Tokens.Code {
  return (token as marked.Tokens.Code).type === 'code';
}

export function isHeading(token: marked.Token): token is marked.Tokens.Heading {
  return (token as marked.Tokens.Heading).type === 'heading';
}

export const isFileImport = (token: any): token is FileImportToken => {
  return token.type === 'fileImport';
};

export const isI18nDescription = (token: any): token is I18nDescriptionToken => {
  return token.type === 'i18nDescription';
};

export function isSpace(token: marked.Token): token is marked.Tokens.Space {
  return (token as marked.Tokens.Space).type === 'space';
}

export const toKebabCase = (string: string): string => {
  string = string.trim();
  if (/\s\w/.test(string)) {
    string = string.replace('s(w)', (match, word) => {
      return word.toUpperCase();
    });
  }

  return string.replace(/[A-Z]/g, (match, offset) => {
    return `${offset > 0 ? '-' : ''}${match.toLowerCase()}`;
  });
};

export const toPascalCase = (string: string): string => {
  string = string.trim();

  return string
    .replace(/^[a-z]/, (match: string) => match.toLocaleUpperCase())
    .replace(/-(\w)/g, (match: string, p1: string) => {
      return p1.toLocaleUpperCase();
    });
};

/**
 * 将字符串转换为模板中的字符串格式
 */
export const getTemplateString = (string: string): string => {
  return `'${string.replace(/'/g, `\\'`)}'`;
};

export const isVirtualModule = (id: string) => {
  return /\/@virtual/.test(id);
};

export const isDemoMarkdown = (id: string) => {
  return /\/__demo__\//.test(id);
};

export const getFrontMatter = (tokens: any[]) => {
  for (const token of tokens) {
    if (token.type === 'frontMatter') {
      return token.attributes;
    }
  }
  return undefined;
};

export const getVueId = (id: string) => {
  return id.replace('.md', '.vue');
};

export const getValidFilename = (filename: string) => {
  return path.extname(filename) ? filename : `${filename}.md`;
};

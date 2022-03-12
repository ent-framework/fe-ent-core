import { withInstall } from 'fe-ent-core';
import markDown from './src/Markdown.vue';
import markDownViewer from './src/MarkdownViewer.vue';

export const EntMarkDown = withInstall(markDown);
export const EntMarkdownViewer = withInstall(markDownViewer);
export * from './src/typing';

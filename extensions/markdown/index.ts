import { withInstall } from 'fe-ent-core';
import markDown from './src/markdown.vue';
import markDownViewer from './src/markdown-viewer.vue';

export const EntMarkDown = withInstall(markDown);
export const EntMarkdownViewer = withInstall(markDownViewer);
export * from './src/typing';

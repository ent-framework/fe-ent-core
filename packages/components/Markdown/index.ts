import { withInstall } from 'ent-fe-core/utils';
import markDown from './src/Markdown.vue';
import markDownViewer from './src/MarkdownViewer.vue';

export const MarkDown = withInstall(markDown);
export const MarkdownViewer = withInstall(markDownViewer);
export * from './src/typing';

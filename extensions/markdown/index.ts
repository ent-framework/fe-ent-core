import { withInstall } from 'fe-ent-core/lib/utils';
import markDown from './markdown.vue';
import markDownViewer from './markdown-viewer.vue';

export const EntMarkDown = withInstall(markDown);
export const EntMarkdownViewer = withInstall(markDownViewer);
export * from './typing';

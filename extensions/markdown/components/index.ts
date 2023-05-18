import { withInstall } from 'fe-ent-core/lib/utils';
import markDown from './markdown/markdown.vue';
import markDownViewer from './markdown/markdown-viewer.vue';

import './index.less';
export const EntMarkDown = withInstall(markDown);
export const EntMarkdownViewer = withInstall(markDownViewer);
export * from './markdown/typing';

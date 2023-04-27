import { withInstall } from 'fe-ent-core';
import markDown from './markdown.vue';
import markDownViewer from './markdown-viewer.vue';

import './index.less';
export const EntMarkDown = withInstall(markDown);
export const EntMarkdownViewer = withInstall(markDownViewer);
export * from './typing';

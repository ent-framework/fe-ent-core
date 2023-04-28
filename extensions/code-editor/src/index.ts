import { withInstall } from '../../../packages/core';
import codeEditor from './code-editor.vue';
import jsonPreview from './json-preview/json-preview.vue';
export const CodeEditor = withInstall(codeEditor);
export const JsonPreview = withInstall(jsonPreview);
import './index.less';

export * from './typing';

import { withInstall } from 'fe-ent-core/lib/utils';
import codeEditor from './src/code-editor.vue';
import jsonPreview from './src/json-preview/json-preview.vue';
export const CodeEditor = withInstall(codeEditor);
export const JsonPreview = withInstall(jsonPreview);

export * from './src/typing';

import codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css'; // import base style
import 'codemirror/mode/xml/xml.js'; // language
import 'codemirror/addon/selection/active-line.js'; // require active-line.js
import 'codemirror/addon/edit/closetag.js';

// autoCloseTags
import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';
// load all highlight.js languages
import { lowlight } from 'lowlight';
import renderItems from '../utils/command-list';
import getSuggestionItems from '../utils/command-items';

import {
  Doc,
  Text,
  Paragraph,
  // text extensions
  Bold,
  Underline,
  Italic,
  Strike,
  Code,
  FontFamily,
  FontSize,
  Color,
  Highlight,
  FormatClear,
  // paragraph extensions
  Heading,
  BulletList,
  OrderedList,
  TaskList,
  TextAlign,
  LineHeight,
  Indent,
  Blockquote,
  CodeBlock,
  // rich and tools extensions
  Link,
  Image,
  Table,
  Iframe,
  HorizontalRule,
  Fullscreen,
  Print,
  SelectAll,
  History,
  CodeView,
  Gapcursor,
  Commands,
  Dropcursor,
  CodeBlockLowlight
} from '../extensions';

lowlight.registerLanguage('html', html);
lowlight.registerLanguage('css', css);
lowlight.registerLanguage('js', js);
lowlight.registerLanguage('ts', ts);

export const textExtensions = [
  Doc,
  Text,
  Paragraph,
  Bold,
  Underline,
  Italic,
  Strike,
  Code,
  FontFamily,
  FontSize,
  Color.configure({ bubble: true }),
  Highlight.configure({ bubble: true }),
  FormatClear,
  History
];

export const paragraphExtensions = [
  Doc,
  Text,
  Paragraph,
  Heading.configure({ level: 5 }),
  BulletList,
  OrderedList,
  TaskList,
  TextAlign,
  LineHeight,
  Indent,
  Blockquote,
  CodeBlock,
  History
];

export const richAndToolsExtensions = [
  Doc,
  Text,
  Paragraph,
  Link,
  Image,
  Iframe,
  Table.configure({ resizable: true }),
  HorizontalRule,
  Print,
  SelectAll,
  Fullscreen,
  CodeView.configure({
    codemirror,
    codemirrorOptions: {
      styleActiveLine: true,
      autoCloseTags: true
    }
  }),
  // Gapcursor,
  History
];
export const allExtensions = [
  Doc,
  Text,
  Paragraph,
  Bold.configure({ bubble: true }),
  Underline.configure({ bubble: true }),
  Italic.configure({ bubble: true }),
  Strike.configure({ bubble: true }),
  FontFamily.configure({ bubble: true }),
  FontSize.configure({ bubble: false }),
  Color.configure({ bubble: true }),
  Highlight.configure({ bubble: true }),
  FormatClear.configure({ bubble: true }),
  History.configure({ depth: 10 }),
  Heading.configure({ level: 5, bubble: false }),
  BulletList.configure({ bubble: false }),
  OrderedList.configure({ bubble: false }),
  TaskList.configure({ bubble: false }),
  TextAlign.configure({ bubble: false }),
  LineHeight.configure({ bubble: false }),
  Indent.configure({ bubble: false }),
  Blockquote.configure({ bubble: false }),
  CodeBlockLowlight.configure({ lowlight }),
  Link.configure({
    bubble: true,
    addLinkPlaceholder: 'add link',
    editLinkPlaceholder: 'edit link'
  }),
  Commands.configure({
    suggestion: {
      items: getSuggestionItems,
      render: renderItems
    }
  }),
  Image.configure({
    bubble: false,
    defaultWidth: 400,
    draggable: true
  }),
  Iframe.configure({ bubble: false }),
  Table.configure({ resizable: true }),
  HorizontalRule.configure({ bubble: false }),
  Print.configure({ bubble: false }),
  SelectAll.configure({ bubble: false }),
  Fullscreen.configure({ bubble: false }),
  CodeView.configure({
    bubble: false,
    codemirror,
    codemirrorOptions: {
      styleActiveLine: false,
      autoCloseTags: true
    }
  }),
  Gapcursor,
  CodeBlock,
  Dropcursor
];

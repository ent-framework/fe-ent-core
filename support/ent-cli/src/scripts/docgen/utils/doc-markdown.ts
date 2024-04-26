import { marked } from 'marked';
import fs from 'fs-extra';
import type { ComponentDoc, Documentation } from 'vue-docgen-api';
import type { Module } from 'vue-inbrowser-compiler-independent-utils';
export default async function (
  location: string,
  documentation: Documentation,
  module: Module
): Promise<ComponentDoc | undefined> {
  const content = fs.readFileSync(location);
  const mkdown = marked.Lexer.lex(content.toString());

  function getNextTable(mkdown: marked.TokensList, index: number) {
    let i = index;
    while (i < mkdown.length) {
      if (mkdown[i].type === 'paragraph') {
        const paragraph = mkdown[i] as marked.Tokens.Paragraph;
        const tokens = marked.Lexer.lex(paragraph.raw);
        if (tokens[0].type === 'table') {
          const table = tokens[0] as marked.Tokens.Table;
          return { index: i, table };
        }
      } else if (mkdown[i].type === 'table') {
        return { index: i, table: mkdown[i] as marked.Tokens.Table };
      }
      i++;
    }
    return { index };
  }
  if (mkdown.length == 0) return undefined;

  const doc: ComponentDoc = { displayName: '', exportName: '', tags: {} };
  let loop = 0;

  function getProps(cells: marked.Tokens.TableCell[][]) {
    cells.forEach((val) => {
      const propDescriptor = documentation.getPropDescriptor(val[0].text);
      propDescriptor.type = {
        name: val[2].text
      };
      propDescriptor.description = val[1].text;
      propDescriptor.defaultValue = {
        value: val[3].text
      };
      if (val.length > 4) {
        propDescriptor.tags = { version: [{ title: val[4].text, description: val[4].text }] };
      }
      propDescriptor.extends = module;
    });
  }

  function getEvents(cells: marked.Tokens.TableCell[][]) {
    cells.forEach((val) => {
      const eventDescriptor = documentation.getEventDescriptor(val[0].text);
      eventDescriptor.description = val[1].text;
      if (val.length > 3) {
        eventDescriptor.tags = [{ title: val[3].text, description: val[3].text }];
      }
      eventDescriptor.extends = module;
    });
  }

  while (loop < mkdown.length) {
    const token = mkdown[loop];
    if (token.type === 'heading') {
      if (token.text.includes('API')) {
        const { index, table } = getNextTable(mkdown, loop);
        if (table) {
          const { rows } = table;
          getProps(rows);
          loop = index;
        } else {
          loop++;
        }
      } else if (token.text.includes('事件')) {
        const { index, table } = getNextTable(mkdown, loop);
        if (table) {
          const { rows } = table;
          getEvents(rows);
          loop = index;
        } else {
          loop++;
        }
      } else {
        loop++;
      }
    } else {
      loop++;
    }
  }
  return doc;
}

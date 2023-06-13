import marked from 'marked';
import fs from 'fs-extra';
import type { ComponentDoc, Documentation } from 'vue-docgen-api';
import type { Module } from 'vue-inbrowser-compiler-independent-utils';
export default async function (
  location: string,
  documentation: Documentation,
  module: Module,
): Promise<ComponentDoc | undefined> {
  const content = fs.readFileSync(location);
  const mkdown = marked.lexer(content.toString(), { sanitize: false });

  function getNextTable(mkdown: marked.TokensList, index: number) {
    let i = index;
    while (i < mkdown.length) {
      if (mkdown[i].type === 'table') {
        return { index: i, table: mkdown[i] as marked.Tokens.Table };
      }
      i++;
    }
    return { index };
  }
  if (mkdown.length == 0) return undefined;

  let doc: ComponentDoc = { displayName: '', exportName: '', tags: {} };
  let loop = 0;

  function getProps(cells: string[][]) {
    cells.forEach((val) => {
      const propDescriptor = documentation.getPropDescriptor(val[0]);
      propDescriptor.type = {
        name: val[2],
      };
      propDescriptor.description = val[1];
      propDescriptor.defaultValue = {
        value: val[3],
      };
      if (val.length > 4) {
        propDescriptor.tags = { version: [{ title: val[4], description: val[4] }] };
      }
      propDescriptor.extends = module;
    });
  }

  function getEvents(cells: string[][]) {
    cells.forEach((val) => {
      const eventDescriptor = documentation.getEventDescriptor(val[0]);
      eventDescriptor.description = val[1];
      if (val.length > 3) {
        eventDescriptor.tags = [{ title: val[3], description: val[3] }];
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
          const { cells } = table;
          getProps(cells);
          loop = index;
        } else {
          loop++;
        }
      } else if (token.text.includes('事件')) {
        const { index, table } = getNextTable(mkdown, loop);
        if (table) {
          const { cells } = table;
          getEvents(cells);
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

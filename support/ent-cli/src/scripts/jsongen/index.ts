import path from 'path';
import fs from 'fs-extra';
import fg from 'fast-glob';
import { parse as parseComponent } from 'vue-docgen-api';
import { toKebabCase } from '../../utils/convert-case.js';
import { slotTagHandler } from '../docgen/handlers/slot-tag-handler.js';
import { propExtHandler } from '../docgen/handlers/prop-ext-handler.js';
import { extendsExtHandler } from '../docgen/handlers/extends-ext-handler.js';
import { getPackage } from '../../utils/get-package.js';
import type { ComponentDoc, ParamTag } from 'vue-docgen-api';

const getComponentsFromTemplates = async () => {
  const templates = await fg('src/components/**/TEMPLATE.md');

  const components: string[] = [];
  for (const item of templates) {
    const dirname = path.dirname(item);
    const source = await fs.readFile(item, 'utf8');
    const matches = Array.from(source.matchAll(/%%API\((.+?)\)%%/g));
    matches.forEach((match) => {
      if (match[1]) {
        components.push(path.resolve(dirname, match[1]));
      }
    });
  }

  return components;
};

interface ComponentData {
  name: string;
  description: string;
  props: Array<{
    name: string;
    type?: string;
    defaultValue?: string;
    description: {
      zh: string;
      en: string;
    };
  }>;
  events: Array<{
    name: string;
    description: {
      zh: string;
      en: string;
    };
  }>;
  slots: Array<{
    name: string;
    description: {
      zh: string;
      en: string;
    };
  }>;
}

const isLanguageTag = (title: string): title is 'zh' | 'en' => {
  return ['zh', 'en'].includes(title);
};

const resolveComponent = (doc: ComponentDoc): ComponentData => {
  return {
    name: `${doc.displayName}`,
    description: doc.description || '',
    props:
      doc.props
        ?.map((descriptor) => {
          let description: {
            zh: string;
            en: string;
          };
          if (descriptor.description) {
            description = {
              zh: descriptor.description,
              en: descriptor.description
            };
          } else {
            description = Object.values(descriptor.tags ?? {}).reduce(
              (pre, item) => {
                item.forEach((tag) => {
                  if (isLanguageTag(tag.title)) {
                    pre[tag.title] = (tag as ParamTag).description as string;
                  }
                });
                return pre;
              },
              { zh: '', en: '' }
            );
          }

          return {
            name: toKebabCase(descriptor.name),
            type: descriptor.type?.name,
            defaultValue: descriptor.defaultValue?.value ?? descriptor.defaultValue?.value ?? '',
            description
          };
        })
        .filter((item) => Boolean(item.description.en)) ?? [],
    events:
      doc.events
        ?.map((descriptor) => {
          let description: {
            zh: string;
            en: string;
          };
          if (descriptor.description) {
            description = {
              zh: descriptor.description,
              en: descriptor.description
            };
          } else {
            description = (descriptor.tags ?? []).reduce(
              (pre, item) => {
                if (isLanguageTag(item.title)) {
                  // @ts-ignore
                  pre[item.title] = item.content;
                }
                return pre;
              },
              { zh: '', en: '' }
            );
          }

          return {
            name: toKebabCase(descriptor.name),
            description
          };
        })
        .filter((item) => Boolean(item.description.en) && !item.name.startsWith('update:')) ?? [],
    slots:
      doc.slots
        ?.map((descriptor) => {
          let description: {
            zh: string;
            en: string;
          };
          if (descriptor.description) {
            description = {
              zh: descriptor.description,
              en: descriptor.description
            };
          } else {
            description = Object.values(descriptor.tags ?? {}).reduce(
              (pre, item) => {
                // @ts-ignore
                if (isLanguageTag(item.title)) {
                  // @ts-ignore
                  pre[item.title] = item.content;
                }
                return pre;
              },
              { zh: '', en: '' }
            );
          }

          return {
            name: toKebabCase(descriptor.name),
            description
          };
        })
        .filter((item) => Boolean(item.description.en)) ?? []
  };
};

const isValidType = (type: string) => {
  const types = type.split('|').map((item) => item.trim());
  for (const item of types) {
    if (item && !/^(number|string|boolean|array|object)$/.test(item)) {
      return false;
    }
  }
  return true;
};

const transformToVetur = (components: ComponentData[]) => {
  const tags: Record<string, any> = {};
  const attributes: Record<string, any> = {};

  for (const component of components) {
    const attrs: string[] = [];
    for (const item of component.events ?? []) {
      attrs.push(item.name);
      attributes[`${component.name}/${item.name}`] = {
        description: item.description.en
      };
    }
    for (const item of component.props ?? []) {
      const attrName = item.name.replace(/^on-/, '');
      if (!attrs.includes(attrName)) {
        attrs.push(attrName);
        attributes[`${component.name}/${attrName}`] = {
          description: item.description.en,
          type: isValidType(item.type || '') ? item.type : undefined
        };
      }
    }
    tags[component.name] = {
      attributes: attrs
    };
  }

  return {
    tags,
    attributes
  };
};

const transformToWebTypes = (
  components: ComponentData[],
  { name, version }: { name: string; version: string }
) => {
  const json = {
    $schema: 'https://raw.githubusercontent.com/JetBrains/web-types/master/schema/web-types.json',
    framework: 'vue',
    name,
    'js-types-syntax': 'typescript',
    version,
    contributions: {
      html: {
        'vue-components': []
      }
    }
  };

  for (const component of components) {
    const data = {
      name: component.name,
      description: component.description,
      source: {
        symbol: component.name
      },
      // @ts-ignore
      slots: component.slots?.map((item) => ({
        name: item.name,
        description: item.description.zh || item.description.en
      })),
      attributes: [],
      props: component.props?.map((item) => ({
        name: item.name,
        description: item.description.zh || item.description.en,
        type: item.type,
        default: item.defaultValue
      })),
      js: {
        events: component.events?.map((item) => ({
          name: item.name,
          description: item.description.zh || item.description.en
        }))
      }
    };

    // @ts-ignore
    json.contributions.html['vue-components'].push(data);
  }

  return json;
};

const jsongen = async () => {
  const packageData = await getPackage();

  const components = await getComponentsFromTemplates();

  const docs: any[] = [];
  let typographyBase;
  let datePickerBase;
  for (const item of components) {
    const componentDoc = await parseComponent(item, {
      addScriptHandlers: [propExtHandler, slotTagHandler, extendsExtHandler]
    });
    const doc = resolveComponent(componentDoc);
    if (/date-picker\/picker/.test(item)) {
      datePickerBase = doc;
      continue;
    }
    if (/typography\/base.tsx/.test(item)) {
      typographyBase = doc;
      continue;
    }
    if (/date-picker\/pickers\//.test(item)) {
      doc.props.push(...(datePickerBase?.props ?? []));
      doc.events.push(...(datePickerBase?.events ?? []));
      doc.slots.push(...(datePickerBase?.slots ?? []));
    }
    if (/typography\/(title|paragraph|text)/.test(item)) {
      doc.props.push(...(typographyBase?.props ?? []));
      doc.events.push(...(typographyBase?.events ?? []));
      doc.slots.push(...(typographyBase?.slots ?? []));
    }

    docs.push(doc);
  }

  await fs.emptyDir(path.resolve(process.cwd(), 'json'));

  // @ts-ignore
  const { tags, attributes } = transformToVetur(docs);

  await fs.writeFile(
    path.resolve(process.cwd(), 'json/vetur-tags.json'),
    JSON.stringify(tags, null, 2),
    { encoding: 'utf8', flag: 'w' }
  );
  await fs.writeFile(
    path.resolve(process.cwd(), 'json/vetur-attributes.json'),
    JSON.stringify(attributes, null, 2),
    { encoding: 'utf8', flag: 'w' }
  );

  // @ts-ignore
  const web = transformToWebTypes(docs, { name: packageData.name, version: packageData.version });

  await fs.writeFile(
    path.resolve(process.cwd(), 'json/web-types.json'),
    JSON.stringify(web, null, 2),
    { encoding: 'utf8', flag: 'w' }
  );
};

export default jsongen;

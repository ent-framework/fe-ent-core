/* eslint-disable no-await-in-loop */
import path from 'path';
import fs from 'fs-extra';
import glob from 'glob';
import chalk from 'chalk';
import print from './utils/print';
import templates from './templates';
import parseInterface from './utils/parse-interface';
import { getTemplate, toKebabCase } from './utils';
import { slotTagHandler } from './slot-tag-handler';
import propExtHandler from './propExtHandler';
import type { ComponentDoc } from 'vue-docgen-api';

const MD_TEMPLATE = 'TEMPLATE.md';
const MD_TARGET = 'README.zh-CN.md';
const MD_TARGET_EN = 'README.en-US.md';
const MD_MATERIAL_README = 'docs/README.md';
const MD_MATERIAL_README_EN = 'docs/README.en-US.md';
const TEMPLATE_GLOB = `{hooks,store,router}/**/${MD_TEMPLATE}`;

type ComponentDocType = ComponentDoc | ComponentDoc[];
type ApiType = 'component' | 'interface';

const getApiTmpl = (componentDoc: ComponentDocType, type: ApiType, lang: string) => {
  const componentDocList = Array.isArray(componentDoc) ? componentDoc : [componentDoc];

  const res: string[] = [];

  componentDocList.forEach((item) => {
    const { displayName, props, events, methods, slots, tags } = item;

    const getTmpl = (suffix: string, content: string) => {
      if (!content) return '';
      let title = displayName;

      if (type === 'component') {
        title = tags?.noBrackets ? displayName : `<${toKebabCase(displayName)}>`;
        title = `\`${title}\` ${suffix}`;
      }

      if (tags?.version) {
        const version = (tags.version[0] as any)?.description;
        version && (title += ` (${version})`);
      }

      let description = '';
      if (suffix === 'Props' && tags?.[lang]) {
        description = (tags[lang][0] as any)?.description;
      } else if (item.description) {
        description = item.description;
      }
      return `### ${title}${description ? `\n${description}` : ''}\n${content}`;
    };

    const propsTmpl = getTmpl(
      'Props',
      templates.props(props || [], { isInterface: type === 'interface' }, lang),
    );
    const eventsTmpl = getTmpl('Events', templates.events(events || [], lang));
    const methodsTmpl = getTmpl('Methods', templates.methods(methods || [], lang));
    const slotsTmpl = getTmpl('Slots', templates.slots(slots || [], lang));

    res.push(`\n${propsTmpl}${eventsTmpl}${methodsTmpl}${slotsTmpl}\n`);
  });

  return res.join('\n');
};

const getComponentNameFormDir = (dir: string) => {
  const matchRes = dir.match(/[^/]+$/g);
  return matchRes ? matchRes[0] : '';
};

// 占位符替换
const replacePlaceholderToDoc = async ({
  dir,
  template,
  placeholderMatchers,
  parser,
  type,
  lang,
}: {
  dir: string;
  template: string;
  placeholderMatchers: RegExp;
  parser: (filePath: string) => Promise<ComponentDocType> | ComponentDocType;
  type: ApiType;
  lang: string;
}) => {
  let result = template;
  const matches = Array.from(result.matchAll(placeholderMatchers));
  for (const item of matches) {
    try {
      // @ts-ignore
      // eslint-disable-next-line
      const componentDoc = await parser(path.resolve(dir, item[1]), {
        addScriptHandlers: [propExtHandler, slotTagHandler],
      });
      result = result.replace(item[0], getApiTmpl(componentDoc, type, lang));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err, dir);
    }
  }
  return result;
};

const apigen = async ({ input }: { input?: string }) => {
  const files = [];

  if (input) {
    const filename = path.resolve(process.cwd(), input);
    try {
      await fs.ensureFile(filename);
      files.push(filename);
    } catch {
      return;
    }
  } else {
    // 读取组件列表
    const templates = glob.sync(TEMPLATE_GLOB, { absolute: true });
    files.push(...templates);
  }

  print.info('Start to generate api document...');

  for (const filename of files) {
    const dirname = path.dirname(filename);
    const result = fs.readFileSync(filename, 'utf8');
    let zhResult = getTemplate(result, 'zh');
    let enResult = getTemplate(result, 'en');

    // INTERFACE占位符替换
    zhResult = await replacePlaceholderToDoc({
      dir: dirname,
      template: zhResult,
      placeholderMatchers: /%%INTERFACE\((.+?)\)%%/g,
      parser: parseInterface,
      type: 'interface',
      lang: 'zh',
    });

    enResult = await replacePlaceholderToDoc({
      dir: dirname,
      template: enResult,
      placeholderMatchers: /%%INTERFACE\((.+?)\)%%/g,
      parser: parseInterface,
      type: 'interface',
      lang: 'en',
    });

    try {
      const outputPath = input
        ? path.resolve(process.cwd(), MD_MATERIAL_README)
        : path.resolve(dirname, MD_TARGET);

      await fs.outputFile(outputPath, zhResult);

      const outputPath2 = input
        ? path.resolve(process.cwd(), MD_MATERIAL_README_EN)
        : path.resolve(dirname, MD_TARGET_EN);

      await fs.outputFile(outputPath2, enResult);

      if (!input) {
        const componentName = getComponentNameFormDir(dirname);

        print.success(`Generate README of api ${chalk.black.bold(`${componentName}`)} Success!`);
      }
    } catch (err) {
      print.error(err);
    }
  }
};

export default apigen;

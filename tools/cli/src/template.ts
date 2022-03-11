import ejs from 'ejs';
import glob from 'fast-glob';
import fs from 'fs-extra';
import { cliRoot } from './index';
import path from 'path';
import type { Logger } from './logger';
import chalk from 'chalk';

export const copyTemplates = async (
  template: string,
  out: string,
  context: Record<string, any>,
  log: Logger,
) => {
  const templateRoot = `${cliRoot()}/templates`;
  const templateSub = `${templateRoot}/${template}`;
  const files = await glob('**/*', {
    cwd: path.resolve(templateRoot, template),
    dot: true,
  });
  log.info(chalk.green(`正在创建应用 ${chalk.red(context['name'])}`));
  let count = 0;
  for (const index in files) {
    const file = files[index];
    if (file.endsWith('.ejs')) {
      const templateFile = path.resolve(templateSub, file);
      ejs.renderFile(templateFile, context, {}, function (error, data) {
        if (error) {
          log.error(error.name);
          log.error(error.message);
          process.exit(1);
        } else {
          const fileName = file.replace('.ejs', '');
          fs.writeFileSync(path.resolve(out, fileName), data, {
            encoding: 'utf8',
          });
          log.info(chalk.green(`${fileName}`));
        }
      });
    } else {
      fs.copyFileSync(path.resolve(templateSub, file), path.resolve(out, file));
      log.info(chalk.green(`${file}`));
    }
    count++;
  }
  log.info(chalk.green(`成功复制文件 ${chalk.red(count)} 个`));
};

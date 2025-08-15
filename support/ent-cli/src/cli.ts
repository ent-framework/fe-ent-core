#!/usr/bin/env node

import path from 'node:path';
import fs from 'fs-extra';
import { Command } from 'commander';
import icongen from './scripts/icongen/index.js';
import lessgen from './scripts/lessgen/index.js';
import docgen from './scripts/docgen/index.js';
import dtsgen from './scripts/dtsgen/index.js';
import viteSite from './scripts/site/index.js';
import viteProject from './scripts/build-project/index.js';
import viteApp from './scripts/build-app/index.js';
import buildComponent from './scripts/build-component/index.js';
import buildStyle from './scripts/build-style/index.js';
import buildLibrary from './scripts/build-library/index.js';
import changelog from './scripts/changelog/index.js';
import jsongen from './scripts/jsongen/index.js';

import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const program = new Command();

const packageContent = fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf8');
const packageData: any = JSON.parse(packageContent);

program.version(packageData.version).name('ent-vue-scripts').usage('command [options]');

program
  .command('docgen')
  .description(
    'generate document of component. e.g. arco-scripts-vue docgen --components menu,affix,button'
  )
  .option('-i, --input <filename>', 'specified input file')
  .option('-c, --components <names>', 'component name(s) joined by comma(,)')
  .action(({ input, components }) => {
    components = typeof components === 'string' ? components.split(',') : [];
    docgen({ input, components });
  });

program
  .command('icongen')
  .description('generate icon components.')
  .action(() => {
    icongen();
  });
program
  .command('lessgen')
  .description('generate index less file.')
  .action(() => {
    lessgen();
  });

program
  .command('dtsgen')
  .option('--base <base>', 'base dir contains source code')
  .option('--tsconfig <tsconfig>', 'base dir contains source code')
  .description('emit .d.ts files for vue files.')
  .action(({ base = 'src', tsconfig = 'tsconfig.json' }) => {
    dtsgen(base, tsconfig);
  });

program
  .command('dev:site')
  .description('start vite server for site development.')
  .option('-p --port <port>', `[number] specify port`, '5000')
  .action(async ({ port }) => {
    await viteSite({ command: 'serve', mode: 'development' }, port);
  });

program
  .command('dev:project')
  .description('start vite server for project development.')
  .option('-p --port <port>', `[number] specify port`, '5500')
  .action(async ({ port }) => {
    await viteProject({ command: 'serve', mode: 'development' }, port);
  });

program
  .command('build:component')
  .description('build production files.')
  .option('-u, --umd', 'build with UMD file')
  .action(async ({ umd }) => {
    await buildComponent({ umd });
  });

program
  .command('build:library')
  .description('build library')
  .option('-u, --umd', 'build with UMD file')
  .option('-s, --source', 'build with library source')
  .action(async ({ umd, source = false }) => {
    await buildLibrary({ umd, source });
  });

program
  .command('build:style')
  .description('build style related files.')
  .action(async () => {
    await buildStyle();
  });

program
  .command('build:site')
  .description('build document site.')
  .action(async () => {
    await viteSite({ command: 'build', mode: 'production' }, -1);
  });

program
  .command('build:project')
  .description('build project.')
  .action(async () => {
    await viteProject({ command: 'build', mode: 'production' }, -1);
  });

program
  .command('build:app')
  .description('package the app.')
  .action(async () => {
    await viteApp();
  });

program
  .command('changelog')
  .description('Obtain and organize changelog information through the git repository.')
  .action(async () => {
    await changelog();
  });

program
  .command('jsongen')
  .description('generate vetur and web-types json files')
  .action(async () => {
    await jsongen();
  });

program.parse(process.argv);

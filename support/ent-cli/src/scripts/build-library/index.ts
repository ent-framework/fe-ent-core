import path from 'path';
import fs from 'fs-extra';
import consola from 'consola';
import { build } from 'vite';
import { defineLibraryConfig } from '../../configs/library.js';
import { defineUmdLibraryConfig } from '../../configs/library.umd.js';
import { cleanTempStyles, copyLessFiles } from '../../utils/style.js';

async function run({ umd = false, source = false }) {
  consola.info(`building library... with umd ${umd}, source: ${source}`);
  const cwd = process.cwd();
  await fs.emptyDir(path.resolve(cwd, 'dist'));
  await build(await defineLibraryConfig(source));
  consola.success(`build library successfully in path ${cwd}`);
  cleanTempStyles();
  copyLessFiles();
  if (umd) {
    consola.info(`start build library umd in path ${cwd}`);
    await build(await defineUmdLibraryConfig());
    consola.success(`build library umd successfully in path ${cwd}`);
  }
}

export default run;

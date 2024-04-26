import path from 'path';
import fs from 'fs-extra';
import glob from 'fast-glob';
import consola from 'consola';
import { build } from 'vite';
import { defineLibraryConfig } from '../../configs/library';
import { defineUmdLibraryConfig } from '../../configs/library.umd';

async function run({ umd = false, source = false }) {
  consola.info(`building library... with umd ${umd}, source: ${source}`);
  const cwd = process.cwd();
  await fs.emptyDir(path.resolve(cwd, 'dist'));
  await build(await defineLibraryConfig(source));
  consola.success(`build library successfully in path ${cwd}`);
  if (fs.existsSync(path.resolve(process.cwd(), 'lib/style.css'))) {
    fs.removeSync(path.resolve(process.cwd(), 'lib/style.css'));
  }
  if (fs.existsSync(path.resolve(process.cwd(), 'es/style.css'))) {
    fs.removeSync(path.resolve(process.cwd(), 'es/style.css'));
  }
  if (umd) {
    consola.info(`start build library umd in path ${cwd}`);
    await build(await defineUmdLibraryConfig(source));
    consola.success(`build library umd successfully in path ${cwd}`);
  }
}

export default run;
